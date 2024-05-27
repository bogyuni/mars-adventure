import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('contactTitle').value;
  const contact = document.getElementById('contactEmail').value;
  const username = document.getElementById('contactName').value;
  const message = document.getElementById('contactMessage').value;

  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      title,
      contact,
      username,
      message,
      timestamp: new Date()
    });
    alert('데이터가 성공적으로 저장되었습니다!');
  } catch (e) {
    console.error('Error adding document: ', e);
    alert('데이터 저장에 실패했습니다.');
  }
});
