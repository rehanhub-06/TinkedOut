/* ── MENTORS — Search, Filter, Book ── */

var mentors = [
  // Data & AI
  { init: 'DR', name: 'Dr. Ravi Kumar',      role: 'ML Research Scientist',       sector: 'Data',       tags: ['AI / ML', 'Deep Learning', 'NLP'],               rating: 4.9, rev: 48, hr: 800, proj: 4000, av: true  },
  { init: 'SM', name: 'Suresh Menon',         role: 'Data Engineering Lead',       sector: 'Data',       tags: ['Data Science', 'Python', 'Spark'],                rating: 4.8, rev: 41, hr: 650, proj: 3200, av: false },
  { init: 'HC', name: 'Harini Chakraborty',   role: 'Computer Vision Researcher',  sector: 'Data',       tags: ['PyTorch', 'OpenCV', 'GANs'],                      rating: 4.9, rev: 36, hr: 820, proj: 4300, av: true  },
  // Software
  { init: 'PK', name: 'Priya Krishnan',       role: 'Full Stack Architect',        sector: 'Software',   tags: ['Web Dev', 'React', 'Node.js'],                    rating: 4.8, rev: 62, hr: 600, proj: 3000, av: true  },
  { init: 'AS', name: 'Arun Sharma',          role: 'Cybersecurity Expert',        sector: 'Software',   tags: ['Cybersecurity', 'OWASP', 'Pen Testing'],          rating: 4.7, rev: 35, hr: 700, proj: 3500, av: false },
  { init: 'NV', name: 'Nisha Venkat',         role: 'Cloud Solutions Architect',   sector: 'Software',   tags: ['Cloud', 'AWS', 'DevOps'],                         rating: 4.9, rev: 55, hr: 900, proj: 5000, av: true  },
  { init: 'KR', name: 'Kiran Reddy',          role: 'Blockchain Developer',        sector: 'Software',   tags: ['Blockchain', 'Solidity', 'Web3'],                 rating: 4.6, rev: 28, hr: 750, proj: 4500, av: true  },
  // Mechanical
  { init: 'RG', name: 'Rajesh Gupta',         role: 'CAD & FEA Expert',            sector: 'Mechanical', tags: ['SolidWorks', 'ANSYS', 'FEA'],                     rating: 4.7, rev: 38, hr: 550, proj: 2800, av: true  },
  { init: 'VP', name: 'Vidya Prasad',         role: 'Thermal Systems Engineer',    sector: 'Mechanical', tags: ['CFD', 'HVAC', 'AutoCAD'],                         rating: 4.6, rev: 22, hr: 500, proj: 2500, av: true  },
  { init: 'MK', name: 'Mahesh Kumar',         role: 'Robotics & Automation Lead',  sector: 'Mechanical', tags: ['Robotics', 'PLC', 'AutoCAD'],                     rating: 4.8, rev: 31, hr: 620, proj: 3100, av: false },
  { init: 'SP', name: 'Sanjay Pillai',        role: 'Manufacturing Process Eng',   sector: 'Mechanical', tags: ['Lean Mfg', 'Six Sigma', 'CNC'],                   rating: 4.5, rev: 19, hr: 480, proj: 2400, av: true  },
  // Electrical
  { init: 'AN', name: 'Ananya Krishnan',      role: 'Embedded Systems Architect',  sector: 'Electrical', tags: ['Embedded C', 'RTOS', 'ARM'],                      rating: 4.9, rev: 44, hr: 700, proj: 3800, av: true  },
  { init: 'PN', name: 'Prakash Nair',         role: 'Power Electronics Engineer',  sector: 'Electrical', tags: ['MATLAB', 'Simulink', 'FPGA'],                     rating: 4.7, rev: 26, hr: 600, proj: 3000, av: false },
  { init: 'TK', name: 'Tejas Kumar',          role: 'VLSI Design Expert',          sector: 'Electrical', tags: ['VLSI', 'Verilog', 'CMOS'],                        rating: 4.8, rev: 33, hr: 750, proj: 4000, av: true  },
  // Civil
  { init: 'RB', name: 'Ramesh Babu',          role: 'Structural Analysis Expert',  sector: 'Civil',      tags: ['STAAD Pro', 'AutoCAD', 'SAP2000'],                rating: 4.6, rev: 28, hr: 520, proj: 2600, av: true  },
  { init: 'SL', name: 'Seema Latha',          role: 'Environmental Engineer',      sector: 'Civil',      tags: ['GIS', 'EPANET', 'Water Mgmt'],                    rating: 4.5, rev: 16, hr: 480, proj: 2200, av: true  },
  // Aerospace
  { init: 'VK', name: 'Vikram Kamath',        role: 'Aerospace Systems Engineer',  sector: 'Aerospace',  tags: ['CATIA', 'CFD', 'Propulsion'],                     rating: 4.9, rev: 22, hr: 900, proj: 5500, av: false },
  { init: 'DM', name: 'Deepa Murthy',         role: 'Avionics & Control Systems',  sector: 'Aerospace',  tags: ['Flight Dynamics', 'MATLAB', 'Simulink'],          rating: 4.8, rev: 18, hr: 850, proj: 4800, av: true  },
  // Biomedical
  { init: 'PS', name: 'Preethi Sundaram',     role: 'Biomedical Devices Engineer', sector: 'Biomedical', tags: ['LabVIEW', 'Signal Processing', 'FDA Compliance'], rating: 4.7, rev: 24, hr: 680, proj: 3400, av: true  },
  { init: 'GA', name: 'Girish Anand',         role: 'Medical Imaging Specialist',  sector: 'Biomedical', tags: ['MATLAB', 'Image Processing', 'MRI'],              rating: 4.6, rev: 19, hr: 650, proj: 3000, av: false },
  // Chemical
  { init: 'LR', name: 'Lakshmi Rao',          role: 'Process & Safety Engineer',   sector: 'Chemical',   tags: ['Aspen Plus', 'HAZOP', 'Process Sim'],             rating: 4.7, rev: 21, hr: 580, proj: 2900, av: true  },
  // Product
  { init: 'MV', name: 'Meera Venkat',         role: 'Product Design Lead',         sector: 'Product',    tags: ['Figma', 'User Research', 'Prototyping'],           rating: 4.9, rev: 67, hr: 750, proj: 4200, av: true  },
  { init: 'SB', name: 'Siddharth Bose',       role: 'Product Manager — B2B SaaS',  sector: 'Product',    tags: ['Product Strategy', 'Roadmap', 'Agile'],            rating: 4.8, rev: 53, hr: 800, proj: 4500, av: true  },
];

var activeSector = 'All', selMentor = null;

function initMentors() { renderMentors(); }

function renderMentors() {
  var q        = (document.getElementById('mentor-search') || { value: '' }).value.toLowerCase();
  var g        = document.getElementById('mcards');
  g.innerHTML  = '';

  var filtered = mentors.filter(function (m) {
    var ms = activeSector === 'All' || m.sector === activeSector;
    var mq = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) ||
             m.sector.toLowerCase().includes(q) || m.tags.some(function (t) { return t.toLowerCase().includes(q); });
    return ms && mq;
  });

  document.getElementById('mentor-count').textContent = filtered.length;

  if (!filtered.length) {
    g.innerHTML = '<div style="color:var(--d-muted);font-size:13px;font-style:italic;padding:2rem 0;grid-column:1/-1;font-weight:300">No mentors found. Try a different search or sector.</div>';
    return;
  }

  filtered.forEach(function (m) {
    var idx = mentors.indexOf(m);
    var d   = document.createElement('div'); d.className = 'm-card';
    d.innerHTML =
      '<div class="m-banner"></div>' +
      '<div class="m-body">' +
        '<div class="m-av">' + m.init + '</div>' +
        '<div class="m-name">' + m.name + '</div>' +
        '<div class="m-role">' + m.role + '</div>' +
        '<div style="font-size:10px;color:var(--d-muted);margin-bottom:6px;font-weight:300">' + m.sector + ' Engineering</div>' +
        '<div class="m-tags">' + m.tags.map(function (t) { return '<span class="m-tag">' + t + '</span>'; }).join('') + '</div>' +
        '<div class="m-meta">' +
          '<div><div class="m-rate">₹' + m.hr + '/hr · ₹' + m.proj + '</div>' +
          '<div class="m-rating"><span class="star">★</span> ' + m.rating + ' (' + m.rev + ')</div></div>' +
          '<span class="m-avail ' + (m.av ? 'yes' : 'no') + '">' + (m.av ? 'Available' : 'Busy') + '</span>' +
        '</div>' +
        '<button class="m-book-btn" onclick="selM(' + idx + ')">Book Session</button>' +
      '</div>';
    g.appendChild(d);
  });
}

function filterMentors() { renderMentors(); }

function setSector(el, s) {
  document.querySelectorAll('#sector-chips .p-chip').forEach(function (c) { c.classList.remove('on'); });
  el.classList.add('on');
  activeSector = s;
  renderMentors();
}

function selM(i) {
  selMentor = mentors[i];
  document.getElementById('bpempty').style.display = 'none';
  document.getElementById('bpcontent').classList.add('show');
  document.getElementById('bpav').textContent   = selMentor.init;
  document.getElementById('bpname').textContent = selMentor.name;
  document.getElementById('bprole').textContent = selMentor.role;
  var sec = document.getElementById('bpsector'); if (sec) sec.textContent = selMentor.sector + ' Engineering';
  document.getElementById('bph').textContent    = '₹' + selMentor.hr + '/hr';
  document.getElementById('bpp').textContent    = '₹' + selMentor.proj;
  document.getElementById('bptotal').textContent = '₹' + selMentor.hr;
  document.querySelectorAll('.bp-type').forEach(function (t) { t.classList.remove('on'); });
  document.querySelector('.bp-type').classList.add('on');
  document.querySelectorAll('.bp-slot:not(.taken)').forEach(function (s, j) { s.classList.toggle('on', j === 0); });
}

function bpType(el, t) {
  document.querySelectorAll('.bp-type').forEach(function (x) { x.classList.remove('on'); });
  el.classList.add('on');
  if (selMentor) document.getElementById('bptotal').textContent = t === 'h' ? '₹' + selMentor.hr : '₹' + selMentor.proj;
}

function bpSlot(el) {
  document.querySelectorAll('.bp-slot:not(.taken)').forEach(function (s) { s.classList.remove('on'); });
  el.classList.add('on');
}

function bpConfirm() {
  if (!selMentor) return;
  alert('Session booked with ' + selMentor.name + '!\nA confirmation will be sent to your email.');
}
