const inCnt = 99;
const adminLink = window.location.origin + '/admin.html';
let adminCnt = 0;

window.onkeydown = (e) => {
  if (e.key === 'Enter') {
    if (adminCnt >= inCnt) {
      window.open(adminLink);
    } else {
      adminCnt = 0;
    }
  } else {
    if (!isNaN(e.key)){
      adminCnt = adminCnt + parseInt(e.key);
    }
  }
}
