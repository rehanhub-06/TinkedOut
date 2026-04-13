/* ── RANDOM MATCH ── */

// shared interest set (also used by match)
var iSet = new Set();

function addCI() {
  var i = document.getElementById('ci'), v = i.value.trim();
  if (!v) return;
  addI(v, null);
  i.value = '';
}

function tPreset(c) {
  c.classList.contains('on') ? remI(c.textContent) : addI(c.textContent, c);
}

function addI(l, c) {
  if (iSet.has(l)) return;
  iSet.add(l);
  if (c) c.classList.add('on');
  renderI();
}

function remI(l) {
  iSet.delete(l);
  document.querySelectorAll('.p-chip').forEach(function (c) { if (c.textContent === l) c.classList.remove('on'); });
  renderI();
}

function renderI() {
  var r = document.getElementById('achips');
  document.getElementById('vcount').textContent = iSet.size;
  if (!iSet.size) { r.innerHTML = '<span class="empty-chips">None added yet</span>'; return; }
  r.innerHTML = '';
  iSet.forEach(function (l) {
    var d = document.createElement('div');
    d.className = 'a-chip';
    d.innerHTML = l + '<button onclick="remI(\'' + l + '\')">&times;</button>';
    r.appendChild(d);
  });
}

// matchmaking
var mpool = [
  { init: 'AK', name: 'Arjun Kumar',  role: 'Full Stack Dev · VIT-AP', tags: ['AI / ML', 'Web Dev', 'Cloud'],        score: 91 },
  { init: 'SR', name: 'Sneha Rao',    role: 'Data Scientist · VIT-AP', tags: ['Data Science', 'AI / ML'],             score: 86 },
  { init: 'RM', name: 'Rahul Mehta',  role: 'Security Eng · VIT-AP',   tags: ['Cybersecurity', 'Blockchain'],         score: 78 },
  { init: 'PV', name: 'Priya Venkat', role: 'Mobile Dev · VIT-AP',     tags: ['App Dev', 'Web Dev'],                  score: 83 },
  { init: 'DK', name: 'Dev Krishnan', role: 'Cloud Arch · VIT-AP',     tags: ['Cloud', 'DevOps'],                     score: 88 },
];

var mcon = false, midx = 0, mTimer = null;

function toggleConnect() {
  if (!iSet.size) { document.getElementById('cstatus').textContent = 'Add at least one interest first.'; return; }
  mcon ? disconnectM() : startM();
}

function showM(u) {
  var ring = document.getElementById('cring');
  ring.classList.remove('pulse');
  document.getElementById('cstatus').textContent = 'Match found!';
  document.getElementById('mc-av').textContent   = u.init;
  document.getElementById('mc-name').textContent = u.name;
  document.getElementById('mc-role').textContent = u.role;
  document.getElementById('mc-tags').innerHTML   = u.tags.map(function (t) { return '<span class="mc-tag">' + t + '</span>'; }).join('');
  document.getElementById('sfill').style.width   = '0%';
  document.getElementById('sval').textContent    = '0%';
  document.getElementById('mcard').classList.add('show');
  setTimeout(function () {
    document.getElementById('sfill').style.width = u.score + '%';
    document.getElementById('sval').textContent  = u.score + '%';
  }, 100);
}

function startM() {
  mcon = true;
  var ring = document.getElementById('cring');
  ring.classList.add('on', 'pulse');
  document.getElementById('rlabel').textContent = 'Stop';
  ['r1', 'r2', 'r3'].forEach(function (id) { document.getElementById(id).style.display = 'block'; });
  document.getElementById('cstatus').textContent = 'Looking for engineers with matching interests...';
  document.getElementById('mcard').classList.remove('show');
  document.getElementById('chatwrap').classList.remove('show');
  mTimer = setTimeout(function () { if (mcon) showM(mpool[midx++ % mpool.length]); }, 2600);
}

function openChat() {
  document.getElementById('chav').textContent  = document.getElementById('mc-av').textContent;
  document.getElementById('chname').textContent = document.getElementById('mc-name').textContent;
  document.getElementById('cmsgs').innerHTML =
    '<div class="msg-them">Hey! Looks like we matched on similar interests 🔥</div>' +
    '<div class="msg-me">Nice! What are you building?</div>' +
    '<div class="msg-them">An ML rec engine for the hackathon. You?</div>';
  document.getElementById('chatwrap').classList.add('show');
  document.getElementById('mcard').classList.remove('show');
}

function skipM() {
  document.getElementById('mcard').classList.remove('show');
  document.getElementById('cstatus').textContent = 'Skipped. Finding next match...';
  document.getElementById('cring').classList.add('pulse');
  mTimer = setTimeout(function () { if (mcon) showM(mpool[midx++ % mpool.length]); }, 1800);
}

function disconnectM() {
  mcon = false;
  clearTimeout(mTimer);
  var ring = document.getElementById('cring');
  ring.classList.remove('on', 'pulse');
  document.getElementById('rlabel').textContent = 'Connect';
  ['r1', 'r2', 'r3'].forEach(function (id) { document.getElementById(id).style.display = 'none'; });
  document.getElementById('cstatus').textContent = 'Disconnected.';
  document.getElementById('mcard').classList.remove('show');
  document.getElementById('chatwrap').classList.remove('show');
  setTimeout(function () { document.getElementById('cstatus').textContent = ''; }, 2000);
}

var mreplies = ['Sounds good!', 'Let me check.', 'Sync tomorrow?', 'I can take that module.', "Let's ship it!", 'Nice, check the repo.'];

function sendM() {
  var i = document.getElementById('cinput'), t = i.value.trim();
  if (!t) return;
  var m = document.getElementById('cmsgs');
  var d = document.createElement('div'); d.className = 'msg-me'; d.textContent = t;
  m.appendChild(d); i.value = ''; m.scrollTop = m.scrollHeight;
  setTimeout(function () {
    var r = document.createElement('div'); r.className = 'msg-them';
    r.textContent = mreplies[Math.floor(Math.random() * mreplies.length)];
    m.appendChild(r); m.scrollTop = m.scrollHeight;
  }, 900);
}
