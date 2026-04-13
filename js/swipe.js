/* ── SWIPE CARDS ── */

var swProfiles = [
  { init: 'AK', name: 'Arjun Kumar',  role: 'Full Stack Dev · VIT-AP', tags: ['AI / ML', 'Web Dev', 'Cloud'],    bio: 'Building scalable web apps and ML systems. Looking for hackathon teammates.', score: 91 },
  { init: 'SR', name: 'Sneha Rao',    role: 'Data Scientist · VIT-AP', tags: ['Data Science', 'AI / ML'],        bio: 'Passionate about data pipelines and recommendation systems.',                  score: 86 },
  { init: 'RM', name: 'Rahul Mehta',  role: 'Security Eng · VIT-AP',   tags: ['Cybersecurity', 'Blockchain'],    bio: 'Web3 enthusiast and ethical hacker. CTF competitor.',                          score: 78 },
  { init: 'PV', name: 'Priya Venkat', role: 'Mobile Dev · VIT-AP',     tags: ['App Dev', 'Web Dev'],             bio: 'Flutter dev. Love building cross-platform apps.',                              score: 83 },
  { init: 'DK', name: 'Dev Krishnan', role: 'Cloud Arch · VIT-AP',     tags: ['Cloud', 'DevOps'],                bio: 'AWS certified. Building CI/CD pipelines and cloud-native apps.',                score: 88 },
  { init: 'MS', name: 'Meera Sharma', role: 'Game Dev · VIT-AP',       tags: ['Game Dev', 'AI / ML'],            bio: 'Unity developer exploring AI-driven game mechanics.',                          score: 80 },
];

var swIdx = 0, swMatches = [];

function initSwipe() { renderSwStack(); }

function renderSwStack() {
  var st = document.getElementById('cstack');
  st.innerHTML = '';
  for (var i = Math.min(swIdx + 2, swProfiles.length - 1); i >= swIdx; i--) {
    if (i >= swProfiles.length) continue;
    var p = swProfiles[i];
    var c = document.createElement('div');
    c.className = 'sw-card';
    c.dataset.i = i;
    c.innerHTML =
      '<div class="stamp stamp-c">CONNECT</div>' +
      '<div class="stamp stamp-s">SKIP</div>' +
      '<div class="sw-banner"><div class="sw-banner-av">' + p.init + '</div></div>' +
      '<div class="sw-body">' +
        '<div class="sw-name">' + p.name + '</div>' +
        '<div class="sw-role">' + p.role + '</div>' +
        '<div class="sw-tags">' + p.tags.map(function (t) { return '<span class="sw-tag">' + t + '</span>'; }).join('') + '</div>' +
        '<div class="sw-bio">' + p.bio + '</div>' +
        '<div class="sw-score">' +
          '<span class="sw-score-lbl">Match score</span>' +
          '<div class="sw-score-bar"><div class="sw-score-fill" style="width:' + p.score + '%"></div></div>' +
          '<span class="sw-score-val">' + p.score + '%</span>' +
        '</div>' +
      '</div>';

    // drag-to-swipe
    (function (card, prof) {
      var sx, sy, drag = false;
      card.addEventListener('mousedown', function (e) { sx = e.clientX; sy = e.clientY; drag = true; card.style.transition = 'none'; });
      document.addEventListener('mousemove', function (e) {
        if (!drag || card !== document.getElementById('cstack').lastElementChild) return;
        var dx = e.clientX - sx, dy = e.clientY - sy, rot = dx * 0.06;
        card.style.transform = 'translateX(' + dx + 'px) translateY(' + dy + 'px) rotate(' + rot + 'deg)';
        var sc = card.querySelector('.stamp-c'), ss = card.querySelector('.stamp-s');
        if (dx > 40)       { sc.style.opacity = Math.min((dx - 40) / 100, 1); ss.style.opacity = 0; }
        else if (dx < -40) { ss.style.opacity = Math.min((-dx - 40) / 100, 1); sc.style.opacity = 0; }
        else               { sc.style.opacity = 0; ss.style.opacity = 0; }
      });
      document.addEventListener('mouseup', function (e) {
        if (!drag) return; drag = false; card.style.transition = '';
        var dx = e.clientX - sx;
        if (dx > 90)       doSwR(card, prof);
        else if (dx < -90) doSwL(card);
        else { card.style.transform = ''; card.querySelector('.stamp-c').style.opacity = 0; card.querySelector('.stamp-s').style.opacity = 0; }
      });
    })(c, p);

    st.appendChild(c);
  }
  if (swIdx >= swProfiles.length) {
    st.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--d-muted);font-size:13px;text-align:center;font-weight:300">No more profiles!<br>Check back later.</div>';
  }
}

function getTop() { return document.getElementById('cstack').lastElementChild; }

function doSwR(c, p) {
  c.classList.add('fly-r');
  swMatches.push(p);
  updMatches();
  setTimeout(function () { swIdx++; renderSwStack(); }, 560);
  document.getElementById('sw-hint').textContent = 'Connected with ' + p.name + '!';
}

function doSwL(c) {
  c.classList.add('fly-l');
  setTimeout(function () { swIdx++; renderSwStack(); }, 560);
  document.getElementById('sw-hint').textContent = 'Skipped';
}

function swR()     { var c = getTop(); if (!c || !c.classList.contains('sw-card')) return; doSwR(c, swProfiles[swIdx]); }
function swL()     { var c = getTop(); if (!c || !c.classList.contains('sw-card')) return; doSwL(c); }
function swSuper() { var c = getTop(); if (!c || !c.classList.contains('sw-card')) return; document.getElementById('sw-hint').textContent = 'Super connect!'; doSwR(c, swProfiles[swIdx]); }

function updMatches() {
  document.getElementById('mcount').textContent = swMatches.length;
  var l = document.getElementById('mlist'); l.innerHTML = '';
  swMatches.forEach(function (m) {
    var d = document.createElement('div'); d.className = 'sw-match-item';
    d.innerHTML = '<div class="sw-mi-av">' + m.init + '</div><div><div class="sw-mi-name">' + m.name + '</div><div class="sw-mi-tags">' + m.tags.slice(0, 2).join(', ') + '</div></div><div class="sw-mi-heart">♥</div>';
    l.appendChild(d);
  });
}

function sfChip(c) {
  document.querySelectorAll('.sw-filter-chips .p-chip').forEach(function (x) { x.classList.remove('on'); });
  c.classList.add('on');
}
