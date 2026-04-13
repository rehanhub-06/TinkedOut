/* ── AUTH — Login, Sign Up, Guest Flow ── */

var isGuest        = false;
var guestAvColor   = '#b89b6a';
var guestIntSel    = new Set();
var currentGuestPage = 1;

// ── REGULAR LOGIN TABS ──
function lpTab(btn, id) {
  document.querySelectorAll('.lp-tab').forEach(function (t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('lp-si').style.display = id === 'si' ? 'block' : 'none';
  document.getElementById('lp-su').style.display = id === 'su' ? 'block' : 'none';
  document.getElementById('lp-title').textContent = id === 'si' ? 'Welcome back' : 'Create account';
  document.getElementById('lp-sub').textContent   = id === 'si' ? 'Sign in to your TinkedOut account' : 'Join thousands of engineers on TinkedOut';
  document.getElementById('lp-msg').className = 'lp-msg';
}

function showMsg(t, c) {
  var m = document.getElementById('lp-msg');
  m.textContent = t;
  m.className = 'lp-msg ' + c;
}

function oauthDemo(p) {
  // Simulate full account login for Google/GitHub
  var fakeName  = p === 'google' ? 'Dhyanesh V' : 'Rehan Shaik';
  var fakeEmail = p === 'google' ? 'dhyanesh@gmail.com' : 'rehan@github.com';
  showMsg('Connecting to ' + p.charAt(0).toUpperCase() + p.slice(1) + '...', 'ok');
  setTimeout(function () { enterApp({ name: fakeName, email: fakeEmail, provider: p, full: true }); }, 1000);
}

function doSignIn() {
  var e = document.getElementById('si-email').value.trim();
  var p = document.getElementById('si-pw').value;
  if (!e || !p) { showMsg('Please fill in all fields.', 'err'); return; }
  if (!e.includes('@')) { showMsg('Enter a valid email address.', 'err'); return; }
  var btn = document.getElementById('si-btn');
  btn.classList.add('loading');
  btn.innerHTML = '<div class="spin"></div><span>Signing in...</span>';
  setTimeout(function () { enterApp({ name: e.split('@')[0], email: e, full: true }); }, 1200);
}

function doSignUp() {
  var fn = document.getElementById('su-fname').value.trim();
  var ln = document.getElementById('su-lname').value.trim();
  var e  = document.getElementById('su-email').value.trim();
  var p  = document.getElementById('su-pw').value;
  if (!fn || !e || !p) { showMsg('Please fill in all required fields.', 'err'); return; }
  if (p.length < 6)    { showMsg('Password must be at least 6 characters.', 'err'); return; }
  var btn = document.getElementById('su-btn');
  btn.classList.add('loading');
  btn.innerHTML = '<div class="spin"></div><span>Creating account...</span>';
  setTimeout(function () { enterApp({ name: fn + ' ' + ln, email: e, full: true }); }, 1200);
}

function doForgot() {
  var e = document.getElementById('si-email').value.trim();
  if (!e) { showMsg('Enter your email address above first.', 'err'); return; }
  showMsg('Password reset link sent to ' + e, 'ok');
}

function pwStrength(v) {
  var b = [document.getElementById('pw1'), document.getElementById('pw2'),
           document.getElementById('pw3'), document.getElementById('pw4')];
  b.forEach(function (x) { x.className = 'pw-bar'; });
  var s = 0;
  if (v.length >= 6) s++;
  if (v.length >= 10) s++;
  if (/[A-Z]/.test(v) && /[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  var c    = s <= 1 ? 'w' : s <= 2 ? 'f' : 's';
  var lbls = ['', 'Weak — try adding numbers', 'Fair — add symbols to strengthen', 'Strong', 'Very strong'];
  for (var i = 0; i < s; i++) b[i].className = 'pw-bar ' + c;
  document.getElementById('pw-hint').textContent = v.length > 0 ? lbls[s] : '';
}

// ── ENTER APP ──
function enterApp(user) {
  isGuest = !user.full;
  document.getElementById('login-page').classList.remove('visible');
  document.getElementById('guest-modal').style.display = 'none';
  document.getElementById('app').classList.add('visible');

  if (user) {
    var init = (user.name || '?').split(' ').map(function (n) { return n[0] || ''; }).join('').slice(0, 2).toUpperCase() || '?';
    var av   = document.getElementById('nav-av');
    av.textContent       = init;
    av.style.background  = user.avColor || 'var(--d-gold)';
    av.style.color       = '#0c0b09';
    document.getElementById('nav-uname').textContent = (user.name || 'Guest').split(' ')[0];
    document.getElementById('prof-av').textContent   = init;
    document.getElementById('prof-av').style.background = user.avColor || 'var(--d-gold)';
    document.getElementById('prof-name').textContent = user.name || 'Guest';
    if (user.email) document.getElementById('prof-sub').innerHTML = (user.dept || 'Computer Science') + ' · VIT-AP University<br>' + user.email;

    // update about if bio provided
    if (user.bio) {
      var aboutEl = document.querySelector('.prof-about');
      if (aboutEl) aboutEl.textContent = user.bio;
    }

    // update interest tags
    if (user.interests && user.interests.length) {
      var tagsEl = document.querySelector('.prof-tags');
      if (tagsEl) {
        tagsEl.innerHTML = '';
        user.interests.forEach(function (l) {
          var s = document.createElement('span'); s.className = 'prof-tag'; s.textContent = l;
          tagsEl.appendChild(s);
        });
      }
    }

    // Guest badge in nav
    if (isGuest) {
      var uname = document.getElementById('nav-uname');
      uname.innerHTML = user.name + ' <span style="font-size:10px;background:var(--d-border2);padding:1px 6px;border-radius:8px;color:var(--d-muted2)">Guest</span>';
    }

    // Lock / unlock collab in nav
    updateCollabNav();
  }
}

// ── COLLAB LOCK ──
function updateCollabNav() {
  // We intercept the Collab nav button click via goScreen override
}

// Override goScreen to handle collab restriction
var _origGoScreen = null;
document.addEventListener('DOMContentLoaded', function () {
  _origGoScreen = window.goScreen;
  window.goScreen = function (n) {
    if (n === 'collab' && isGuest) {
      showCollabLocked();
      return;
    }
    _origGoScreen(n);
  };
});

function showCollabLocked() {
  // Replace the collab screen content temporarily
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('active'); });
  var collab = document.getElementById('screen-collab');
  collab.classList.add('active');

  // inject locked UI if not already there
  if (!document.getElementById('collab-locked-view')) {
    var locked = document.createElement('div');
    locked.id = 'collab-locked-view';
    locked.className = 'collab-locked';
    locked.innerHTML =
      '<div class="collab-locked-icon">🔒</div>' +
      '<div class="collab-locked-title">Collaboration Rooms</div>' +
      '<div class="collab-locked-sub">Team chat, voice channels, and project boards are available for signed-in users only. Create a free account to unlock the full experience.</div>' +
      '<div class="collab-locked-perks">' +
        '<div class="collab-locked-perk"><div class="collab-locked-perk-icon">💬</div><div><div class="collab-locked-perk-text">Team Chat Rooms</div><div class="collab-locked-perk-sub">Discord-style channels with your matched team</div></div></div>' +
        '<div class="collab-locked-perk"><div class="collab-locked-perk-icon">🔊</div><div><div class="collab-locked-perk-text">Voice & Video Channels</div><div class="collab-locked-perk-sub">WebRTC-powered calls with your team</div></div></div>' +
        '<div class="collab-locked-perk"><div class="collab-locked-perk-icon">✅</div><div><div class="collab-locked-perk-text">Project Board</div><div class="collab-locked-perk-sub">Track tasks, milestones and hackathon deadlines</div></div></div>' +
      '</div>' +
      '<div class="collab-locked-btns">' +
        '<button class="collab-locked-btn-primary" onclick="goToSignIn()">Sign in to unlock</button>' +
        '<button class="collab-locked-btn-secondary" onclick="goToSignUp()">Create account</button>' +
      '</div>';

    // Hide original discord shell and show lock
    var shell = collab.querySelector('.dc-shell');
    if (shell) shell.style.display = 'none';
    collab.appendChild(locked);
    collab.style.padding = '0';
  }
}

function goToSignIn() {
  // back to login, sign in tab
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-page').classList.add('visible');
  isGuest = false;
  var tabs = document.querySelectorAll('.lp-tab');
  if (tabs[0]) lpTab(tabs[0], 'si');
}

function goToSignUp() {
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-page').classList.add('visible');
  isGuest = false;
  var tabs = document.querySelectorAll('.lp-tab');
  if (tabs[1]) lpTab(tabs[1], 'su');
}

// ── GUEST FLOW ──
function startGuestFlow() {
  var num = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('g-name').value = '';
  document.getElementById('g-name-preview').textContent = 'Guest#' + num;
  document.getElementById('g-av-preview').textContent = 'G';
  document.getElementById('g-av-preview').style.background = guestAvColor;
  document.getElementById('g-bio').value = '';
  document.getElementById('g-dept').value = '';
  guestIntSel = new Set();
  document.querySelectorAll('.g-chip').forEach(function (c) { c.classList.remove('on'); });
  guestNext(1);
  var modal = document.getElementById('guest-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeGuestModal() {
  document.getElementById('guest-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function guestNext(page) {
  currentGuestPage = page;
  [1, 2, 3].forEach(function (i) {
    document.getElementById('g-page' + i).style.display = i === page ? 'block' : 'none';
    var step = document.getElementById('gstep' + i);
    if (step) step.style.background = i <= page ? 'var(--p-brown)' : 'var(--p-bg2)';
  });
}

function updateGuestPreview() {
  var val  = document.getElementById('g-name').value.trim();
  var num  = Math.floor(1000 + Math.random() * 9000);
  var name = val || 'Guest#' + num;
  document.getElementById('g-name-preview').textContent = name;
  var init = val ? val[0].toUpperCase() : 'G';
  document.getElementById('g-av-preview').textContent = init;
}

function setGuestColor(el, color) {
  guestAvColor = color;
  document.getElementById('g-av-preview').style.background = color;
  document.querySelectorAll('#guest-modal [onclick^="setGuestColor"]').forEach(function (c) {
    c.style.border = '2px solid transparent';
  });
  el.style.border = '2px solid var(--p-brown)';
}

function toggleGuestInt(chip) {
  chip.classList.toggle('on');
  var lbl = chip.textContent;
  if (chip.classList.contains('on')) guestIntSel.add(lbl);
  else guestIntSel.delete(lbl);
}

function finishGuestSetup() {
  var nameVal = document.getElementById('g-name').value.trim();
  var num     = Math.floor(1000 + Math.random() * 9000);
  var name    = nameVal || ('Guest#' + num);
  var bio     = document.getElementById('g-bio').value.trim();
  var dept    = document.getElementById('g-dept').value.trim();

  closeGuestModal();
  document.getElementById('login-page').classList.remove('visible');

  enterApp({
    name:      name,
    email:     '',
    bio:       bio,
    dept:      dept,
    interests: Array.from(guestIntSel),
    avColor:   guestAvColor,
    full:      false   // guest = restricted
  });
}

// close guest modal on backdrop click
document.addEventListener('DOMContentLoaded', function () {
  var gm = document.getElementById('guest-modal');
  if (gm) {
    gm.addEventListener('click', function (e) {
      if (e.target === this) closeGuestModal();
    });
  }
});
