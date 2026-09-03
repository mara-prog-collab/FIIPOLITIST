/* Fii Polițist.Ro — acces PRO local, pregătit pentru sincronizare cu backend-ul. */
const PRO_PRICE='15 lei/lună';
function isPro(){return localStorage.getItem('fp_pro')==='active'}
function setPro(active){localStorage.setItem('fp_pro',active?'active':'inactive');window.dispatchEvent(new Event('fp-pro-change'))}
function requirePro(){if(isPro())return true;location.href='abonament.html';return false}
