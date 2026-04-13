/* ── EDIT PROFILE MODAL ── */

var epInts       = new Set(['AI / ML', 'Web Dev', 'Cloud', 'Cybersecurity']);
var epAvColor    = '#b89b6a';
var epAvTextColor = '#0c0b09';

function openEditModal() {
  // prefill from current profile
  var nameEl = document.getElementById('prof-name');
  var parts  = (nameEl ? nameEl.textContent : 'Naazil N').split(' ');
  document.getElementById('ep-fname').value = parts[0] || '';
  document.getElementById('ep-lname').value = parts.slice(1).join(' ') || '';

  var subEl   = document.getElementById('prof-sub');
  var subText = subEl ? subEl.innerText : '';
  var lines   = subText.split('\n');
  var deptUni = (lines[0] || '').split('·');
  document.getElementById('ep-dept').value  = (deptUni[0] || '').trim();
  document.getElementById('ep-uni').value   = (deptUni[1] || '').trim();
  document.getElementById('ep-email').value = lines[1] || '';

  var aboutEl = document.querySelector('.prof-about');
  document.getElementById('ep-bio').value = aboutEl ? aboutEl.textContent : '';

  // interests
  var profTags = document.querySelectorAll('.prof-tag');
  epInts = new Set();
  profTags.forEach(function (t) { epInts.add(t.textContent); });
  renderEpInts();

  // show modal
  document.getElementById('edit-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  document.getElementById('edit-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function updateAvPreview() {
  var f    = document.getElementById('ep-fname').value;
  var l    = document.getElementById('ep-lname').value;
  var init = ((f[0] || '') + (l[0] || '')).toUpperCase() || '?';
  document.getElementById('edit-av-preview').textContent = init;
}

function setAvColor(el, bg, fg) {
  epAvColor     = bg;
  epAvTextColor = fg;
  var av = document.getElementById('edit-av-preview');
  av.style.background = bg;
  av.style.color      = fg;
  document.querySelectorAll('.av-color').forEach(function (c) { c.style.border = '2px solid transparent'; });
  el.style.border = '2px solid var(--d-gold2)';
}

function epAddInt() {
  var i = document.getElementById('ep-int-inp'), v = i.value.trim();
  if (!v) return;
  epInts.add(v);
  i.value = '';
  renderEpInts();
}

function epRemInt(l) {
  epInts.delete(l);
  renderEpInts();
}

function renderEpInts() {
  var c = document.getElementById('ep-int-list');
  c.innerHTML = '';
  epInts.forEach(function (l) {
    var d = document.createElement('div');
    d.className = 'a-chip';
    d.innerHTML = l + '<button onclick="epRemInt(\'' + l + '\')">&times;</button>';
    c.appendChild(d);
  });
}

function saveProfile() {
  var fname = document.getElementById('ep-fname').value.trim();
  var lname = document.getElementById('ep-lname').value.trim();
  var email = document.getElementById('ep-email').value.trim();
  var dept  = document.getElementById('ep-dept').value.trim();
  var uni   = document.getElementById('ep-uni').value.trim();
  var bio   = document.getElementById('ep-bio').value.trim();

  if (!fname) { document.getElementById('ep-fname').style.borderColor = 'var(--d-redl)'; return; }

  var fullname = (fname + ' ' + lname).trim();
  document.getElementById('prof-name').textContent = fullname;

  var subParts = [];
  if (dept && uni) subParts.push(dept + ' · ' + uni);
  else if (dept)   subParts.push(dept);
  else if (uni)    subParts.push(uni);
  if (email)       subParts.push(email);
  document.getElementById('prof-sub').innerHTML = subParts.join('<br>');

  var init = ((fname[0] || '') + (lname[0] || '')).toUpperCase() || '?';
  var av   = document.getElementById('prof-av');
  av.textContent       = init;
  av.style.background  = epAvColor;
  av.style.color       = epAvTextColor;

  var aboutEl = document.querySelector('.prof-about');
  if (aboutEl && bio) aboutEl.textContent = bio;

  var tagsEl = document.querySelector('.prof-tags');
  if (tagsEl) {
    tagsEl.innerHTML = '';
    epInts.forEach(function (l) {
      var s = document.createElement('span'); s.className = 'prof-tag'; s.textContent = l;
      tagsEl.appendChild(s);
    });
  }

  // update nav
  var nav = document.getElementById('nav-av');
  nav.textContent      = init;
  nav.style.background = epAvColor;
  nav.style.color      = epAvTextColor;
  document.getElementById('nav-uname').textContent = fname;

  // toast
  var toast = document.getElementById('ep-toast');
  toast.style.opacity = '1';
  setTimeout(function () { toast.style.opacity = '0'; setTimeout(closeEditModal, 400); }, 1400);
}

function shareProfile() {
  var name = document.getElementById('prof-name').textContent;
  if (navigator.share) {
    navigator.share({ title: 'TinkedOut — ' + name, url: window.location.href });
  } else {
    navigator.clipboard && navigator.clipboard.writeText(window.location.href);
    alert('Profile link copied!');
  }
}

// close on backdrop click
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('edit-modal').addEventListener('click', function (e) {
    if (e.target === this) closeEditModal();
  });
});

/* ── THEME TOGGLE ── */
var isDark = true;

function toggleTheme() {
  isDark = !isDark;
  var body  = document.body;
  var thumb = document.getElementById('theme-thumb');
  var label = document.getElementById('theme-label');
  var track = document.getElementById('theme-toggle');
  body.classList.toggle('light-mode', !isDark);
  if (isDark) {
    if (thumb) { thumb.style.transform = 'translateX(0px)'; thumb.textContent = '🌙'; }
    if (track) track.style.background = 'var(--d-gold)';
    if (label) label.textContent = 'Dark mode';
  } else {
    if (thumb) { thumb.style.transform = 'translateX(20px)'; thumb.textContent = '☀️'; }
    if (track) track.style.background = '#c4870a';
    if (label) label.textContent = 'Light mode';
  }
}

var _origOpenEdit = openEditModal;
openEditModal = function () {
  _origOpenEdit();
  var thumb = document.getElementById('theme-thumb');
  var track = document.getElementById('theme-toggle');
  var label = document.getElementById('theme-label');
  if (!isDark) {
    if (thumb) { thumb.style.transform = 'translateX(20px)'; thumb.textContent = '☀️'; }
    if (track) track.style.background = '#c4870a';
    if (label) label.textContent = 'Light mode';
  } else {
    if (thumb) { thumb.style.transform = 'translateX(0px)'; thumb.textContent = '🌙'; }
    if (track) track.style.background = 'var(--d-gold)';
    if (label) label.textContent = 'Dark mode';
  }
};
