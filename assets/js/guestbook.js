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
  const itemWrap = document.getElementById('guestList');
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const item = document.createElement('li');
    item.classList.add('guest-item');
    item.textContent = `ID: ${doc.id}, Data: ${JSON.stringify(docData)}`;
    item.innerHTML = `
      <div class="top-row">
        <div class="guest">
          <div class="portrait">초상화 사진</div>
          <div class="name">
            <a href="mailto:${docData.email}">${docData.name}</a><br />
            <span class="from">from <br /> ${docData.from}</span>
          </div>
        </div>
        <div class="message square-line">${docData.message}<span class="arrow"></span></div>
      </div>
      <div class="date">${docData.timestamp.toDate().toString()}</div>
    `;
    itemWrap.appendChild(item);
  });
}

fetchAndDisplayData();


document.getElementById('guestForm').addEventListener('submit', async (e) => {
  console.log(e);
  e.preventDefault();

  const name = document.getElementById('guestName').value;
  const email = document.getElementById('guestEmail').value;
  const message = document.getElementById('guestMessage').value;
  const from = document.getElementById('guestFrom').value;

  try {
    const docRef = await addDoc(collection(db, 'guestbook'), {
      name,
      email,
      message,
      from,
      timestamp: new Date()
    });
    alert('데이터가 성공적으로 저장되었습니다!');
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('데이터 저장에 실패했습니다.');
  }
});
