import { db } from './firebaseConfig.js';
import { collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';

/**
 * 게스트북 데이터 받아와서 출력 함수
 * 정열순서는 작성 시간 순, 최신 것이 위로 오게
 * 쿼리 요청 응답하고 메서드 실행을 위해, async, await 사용
 */
async function fetchAndDisplayData() {
  const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  const dataDiv = document.getElementById('guestList');
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const div = document.createElement('div');
    div.textContent = `ID: ${doc.id}, Data: ${JSON.stringify(docData)}`;
    div.innerHTML = `
    
      <p>이름: ${docData.name}</p>
      <p>연락처(이메일): ${docData.email}</p>
      <p>메세지: ${docData.message}</p>
      <p>Timestamp: ${docData.timestamp.toDate().toString()}</p>
      <hr>
    `;
    dataDiv.appendChild(div);
  });
}

// fetchAndDisplayData();


document.getElementById('guestForm').addEventListener('submit', async (e) => {
  console.log(e);
  e.preventDefault();

  const name = document.getElementById('guestName').value;
  const email = document.getElementById('guestEmail').value;
  const message = document.getElementById('guestMessage').value;

  try {
    const docRef = await addDoc(collection(db, 'guestbook'), {
      name,
      email,
      message,
      timestamp: new Date()
    });
    alert('데이터가 성공적으로 저장되었습니다!');
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('데이터 저장에 실패했습니다.');
  }
});
