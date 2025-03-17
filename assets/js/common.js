(function() {
  if (window.location.pathname.startsWith("/m")) return;

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(userAgent);

  if (isMobile) {
    window.location.href = "/m";
  }
})();

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
