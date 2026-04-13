/* ── NAV ── */

function goScreen(n) {
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
  document.getElementById('screen-' + n).classList.add('active');
}

function setNav(i) {
  document.querySelectorAll('.nav-btn').forEach(function (b, j) { b.classList.toggle('active', i === j); });
}
