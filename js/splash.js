/* ── SPLASH ANIMATION ── */
document.addEventListener('DOMContentLoaded', function () {
  var T   = document.getElementById('s-T');
  var O   = document.getElementById('s-O');
  var ink = document.getElementById('s-inked');
  var ut  = document.getElementById('s-ut');

  setTimeout(function () { T.classList.add('in'); }, 300);
  setTimeout(function () { O.classList.add('in'); }, 400);
  setTimeout(function () { ink.classList.add('show'); ut.classList.add('show'); }, 700);
  setTimeout(function () { document.getElementById('s-line').classList.add('show'); }, 2800);
  setTimeout(function () { document.getElementById('s-sub').classList.add('show'); }, 3000);

  setTimeout(function () {
    var s = document.getElementById('splash');
    s.classList.add('hide');
    setTimeout(function () {
      s.style.display = 'none';
      document.getElementById('login-page').classList.add('visible');
    }, 1000);
  }, 4200);

  // init other modules after DOM ready
  initSwipe();
  initMentors();
});
