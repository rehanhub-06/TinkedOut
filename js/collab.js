/* ── COLLAB — Full Discord-style ── */

var membersVisible = true;
var searchVisible  = false;
var mutedMic       = false;
var deafened       = false;
var currentVC      = null;
var currentChannel = 'general';
var typingTimers   = {};

var channelMessages = {
  general: [],
  ideas: [
    { av:'AK', name:'Arjun Kumar', color:'#4a6a9a', nc:'#7a9aca', text:'What if we add a "team formation" feature where matched users can form persistent groups?', time:'8:40 AM', reactions:[{e:'🔥',n:3}] },
    { av:'SR', name:'Sneha Rao',   color:'#4a9a6a', nc:'#7aca9a', text:'Yes! And we could track team productivity via Supabase analytics.', time:'8:44 AM', reactions:[] },
    { av:'N',  name:'Naazil N',    color:'var(--d-gold)', nc:'var(--d-gold)', text:'Love it. Should we prototype this for the hackathon demo?', time:'8:50 AM', reactions:[{e:'👍',n:2}], mine:true },
  ],
  'code-review': [
    { av:'RM', name:'Rahul Mehta', color:'#9a4a6a', nc:'#ca7a9a', text:'PR #12 — Added rate limiting to the /match endpoint. Ready for review.', time:'10:15 AM', reactions:[] },
    { av:'AK', name:'Arjun Kumar', color:'#4a6a9a', nc:'#7a9aca', text:'LGTM! One suggestion — add exponential backoff for repeated failures. Otherwise ship it.', time:'10:22 AM', reactions:[{e:'✅',n:1}] },
  ],
  resources: [
    { av:'SR', name:'Sneha Rao', color:'#4a9a6a', nc:'#7aca9a', text:'📚 Great paper on cosine similarity for interest matching: arxiv.org/abs/2301.xxxxx', time:'7:30 AM', reactions:[{e:'📖',n:2}] },
  ],
  announcements: [
    { av:'N', name:'Naazil N', color:'var(--d-gold)', nc:'var(--d-gold)', text:'📢 Hackathon submission deadline is this Friday at 11:59 PM! Let\'s make it count 🚀', time:'Yesterday', reactions:[{e:'🚀',n:4},{e:'💪',n:3}], mine:true },
  ],
  tasks: [
    { av:'N', name:'Naazil N', color:'var(--d-gold)', nc:'var(--d-gold)', text:'📋 **Sprint Tasks:**\n✅ Splash animation\n✅ Login page\n✅ Random match\n🔄 Swipe cards\n⬜ Real-time chat\n⬜ Supabase integration', time:'Yesterday', reactions:[], mine:true },
    { av:'AK', name:'Arjun Kumar', color:'#4a6a9a', nc:'#7a9aca', text:'Taking the Supabase integration task. Will push a branch today.', time:'9:00 AM', reactions:[{e:'👏',n:2}] },
  ]
};

var collabReplies = ['Good point!','On it.','I\'ll push a fix.','Agreed, let\'s go.','Merging now.','Will review tomorrow.','Nice, that makes sense!','Let me check and get back.'];
var dmReplies     = ['Hey! Sure, let\'s connect.','On it, give me a sec.','Check the #code-review channel.','Let\'s sync in the standup.','Good idea, raising it with the team.'];

document.addEventListener('DOMContentLoaded', function () {
  syncUserPanel();
  renderChannel('general');
  var inp = document.getElementById('cinp');
  if (inp) {
    inp.addEventListener('input', function () {
      if (!this.value) { clearTyping(); return; }
      document.getElementById('dc-typing').textContent = 'Arjun Kumar is typing...';
      clearTimeout(typingTimers.t);
      typingTimers.t = setTimeout(clearTyping, 2000);
    });
  }
});

function syncUserPanel() {
  var navAv = document.getElementById('nav-av');
  var navNm = document.getElementById('nav-uname');
  if (navAv && navAv.textContent !== '?') {
    var a = document.getElementById('dc-user-av');
    if (a) { a.textContent = navAv.textContent; a.style.background = navAv.style.background || 'var(--d-gold)'; }
    var n = document.getElementById('dc-user-name');
    if (n && navNm) n.textContent = navNm.textContent;
  }
}

function buildMsgEl(m) {
  var g = document.createElement('div');
  g.className = 'dc-msg-group';
  var reactions = '';
  if (m.reactions && m.reactions.length) {
    reactions = '<div class="dc-reactions">' + m.reactions.map(function(r){ return '<div class="dc-reaction" onclick="toggleReact(this)">'+r.e+' '+r.n+'</div>'; }).join('') + '</div>';
  }
  var text = (m.text||'').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  g.innerHTML =
    '<div class="dc-av" style="background:'+m.color+'">'+m.av+'</div>'+
    '<div class="dc-msg-content">'+
      '<div class="dc-msg-meta">'+
        '<span class="dc-msg-name" style="color:'+m.nc+'">'+m.name+'</span>'+
        '<span class="dc-msg-time">'+m.time+'</span>'+
      '</div>'+
      '<div class="dc-msg-text">'+text+'</div>'+
      reactions+
    '</div>'+
    '<div class="dc-msg-actions">'+
      '<button class="dc-msg-action" onclick="addReaction(this)" title="React">😊</button>'+
      '<button class="dc-msg-action" title="Reply">↩</button>'+
      '<button class="dc-msg-action" title="More">•••</button>'+
    '</div>';
  return g;
}

function renderChannel(ch) {
  currentChannel = ch;
  var feed = document.getElementById('dc-feed');
  feed.innerHTML = '';
  var welcome = document.createElement('div'); welcome.className = 'dc-welcome';
  welcome.innerHTML = '<div class="dc-welcome-icon">#</div><div class="dc-welcome-title">Welcome to #'+ch+'!</div><div class="dc-welcome-sub">Start of the #'+ch+' channel.</div>';
  feed.appendChild(welcome);
  var datePill = document.createElement('div'); datePill.className = 'dc-date-pill'; datePill.textContent = 'Today';
  feed.appendChild(datePill);
  (channelMessages[ch]||[]).forEach(function(m){ feed.appendChild(buildMsgEl(m)); });
  feed.scrollTop = feed.scrollHeight;
}

function switchCh(el) {
  document.querySelectorAll('.dc-ch').forEach(function(c){ c.classList.remove('active'); });
  el.classList.add('active');
  var ch = el.dataset.ch, desc = el.dataset.desc;
  var badge = el.querySelector('.dc-unread'); if (badge) badge.remove();
  document.getElementById('dc-topbar-icon').textContent = '#';
  document.getElementById('dc-topbar-name').textContent = ch;
  document.getElementById('dc-topbar-desc').textContent = desc;
  document.getElementById('cinp').placeholder = 'Message #'+ch+'...';
  renderChannel(ch);
}

function sendCollab() {
  var inp = document.getElementById('cinp'), text = inp.value.trim(); if (!text) return;
  var feed = document.getElementById('dc-feed');
  var now = new Date(), h = now.getHours(), m = now.getMinutes();
  var ts = (h%12||12)+':'+(m<10?'0':'')+m+' '+(h>=12?'PM':'AM');
  var msg = { av:'N', name:'Naazil N', color:'var(--d-gold)', nc:'var(--d-gold)', text:text, time:ts, reactions:[], mine:true };
  if (!channelMessages[currentChannel]) channelMessages[currentChannel]=[];
  channelMessages[currentChannel].push(msg);
  feed.appendChild(buildMsgEl(msg)); inp.value=''; feed.scrollTop=feed.scrollHeight; clearTyping();
  setTimeout(function(){
    var senders=[{av:'AK',name:'Arjun Kumar',color:'#4a6a9a',nc:'#7a9aca'},{av:'SR',name:'Sneha Rao',color:'#4a9a6a',nc:'#7aca9a'},{av:'RM',name:'Rahul Mehta',color:'#9a4a6a',nc:'#ca7a9a'}];
    var s=senders[Math.floor(Math.random()*senders.length)];
    var now2=new Date(),h2=now2.getHours(),m2=now2.getMinutes(),ts2=(h2%12||12)+':'+(m2<10?'0':'')+m2+' '+(h2>=12?'PM':'AM');
    var reply={av:s.av,name:s.name,color:s.color,nc:s.nc,text:collabReplies[Math.floor(Math.random()*collabReplies.length)],time:ts2,reactions:[]};
    channelMessages[currentChannel].push(reply);
    feed.appendChild(buildMsgEl(reply)); feed.scrollTop=feed.scrollHeight;
  }, 1200+Math.random()*1000);
}

function clearTyping(){ var el=document.getElementById('dc-typing'); if(el && !currentVC) el.textContent=''; }

function toggleReact(el) {
  el.classList.toggle('on');
  var parts=el.textContent.trim().split(' '), emoji=parts[0], count=parseInt(parts[1])||0;
  el.textContent=emoji+' '+(el.classList.contains('on')?count+1:Math.max(count-1,0));
}
function addReaction(btn) {
  var emojis=['👍','❤️','🔥','😂','🚀','👀'];
  var e=emojis[Math.floor(Math.random()*emojis.length)];
  var content=btn.closest('.dc-msg-group').querySelector('.dc-msg-content');
  var reactions=content.querySelector('.dc-reactions');
  if(!reactions){reactions=document.createElement('div');reactions.className='dc-reactions';content.appendChild(reactions);}
  var r=document.createElement('div');r.className='dc-reaction on';r.onclick=function(){toggleReact(this);};r.textContent=e+' 1';
  reactions.appendChild(r);
}

function switchServer(el,srv) {
  document.querySelectorAll('.dc-rail-icon').forEach(function(i){i.classList.remove('active');});
  el.classList.add('active');
  var names={tinkedout:'TinkedOut',hackathon:'Hackathon Team',study:'Study Group'};
  document.getElementById('dc-srv-name').textContent=names[srv]||srv;
}

function joinVC(el,name) {
  if(currentVC===name){currentVC=null;document.getElementById('dc-typing').textContent='';return;}
  currentVC=name;
  document.getElementById('dc-typing').textContent='🔊 Connecting to '+name+'...';
  setTimeout(function(){if(currentVC===name)document.getElementById('dc-typing').textContent='🔊 You are in '+name;},1000);
}

function toggleMembers() {
  membersVisible=!membersVisible;
  var p=document.getElementById('dc-members-panel');
  if(p)p.style.display=membersVisible?'block':'none';
}

function toggleSearch() {
  searchVisible=!searchVisible;
  var bar=document.getElementById('dc-search-bar');
  if(bar){bar.style.display=searchVisible?'flex':'none';}
  if(searchVisible)setTimeout(function(){var s=document.getElementById('dc-search-input');if(s)s.focus();},50);
}
function searchMessages(q) {
  document.querySelectorAll('#dc-feed .dc-msg-text').forEach(function(m){
    var row=m.closest('.dc-msg-group');if(!row)return;
    row.style.opacity=(!q||m.textContent.toLowerCase().includes(q.toLowerCase()))?'1':'0.2';
  });
}

function toggleMute(btn) {
  mutedMic=!mutedMic; btn.classList.toggle('active',mutedMic); btn.title=mutedMic?'Unmute':'Mute';
  document.getElementById('dc-status-label').textContent=mutedMic?'Muted':(deafened?'Deafened':'Online');
  var dot=document.querySelector('.dc-user-status .dc-status-dot');
  if(dot)dot.className='dc-status-dot '+(mutedMic||deafened?'dnd':'online');
}
function toggleDeafen(btn) {
  deafened=!deafened; btn.classList.toggle('active',deafened); btn.title=deafened?'Undeafen':'Deafen';
  document.getElementById('dc-status-label').textContent=deafened?'Deafened':(mutedMic?'Muted':'Online');
  var dot=document.querySelector('.dc-user-status .dc-status-dot');
  if(dot)dot.className='dc-status-dot '+(mutedMic||deafened?'dnd':'online');
}
function toggleStatus() {
  var statuses=['Online','Idle','Do Not Disturb','Invisible'];
  var lbl=document.getElementById('dc-status-label'),dot=document.querySelector('.dc-user-status .dc-status-dot');
  var cur=statuses.indexOf(lbl.textContent),next=statuses[(cur+1)%statuses.length];
  lbl.textContent=next;
  if(dot)dot.className='dc-status-dot '+(next==='Online'?'online':next==='Idle'?'idle':'dnd');
}

function insertEmoji() {
  var emojis=['😊','🔥','👍','🚀','💡','✅','❤️','🤔','😂','👀'];
  var inp=document.getElementById('cinp');
  inp.value+=emojis[Math.floor(Math.random()*emojis.length)]; inp.focus();
}

function openDM(init,name,color) {
  document.getElementById('dc-dm-overlay').style.display='block';
  ['dm-av','dm-av2'].forEach(function(id){var a=document.getElementById(id);if(a){a.textContent=init;a.style.background=color;}});
  ['dm-name','dm-name2'].forEach(function(id){var a=document.getElementById(id);if(a)a.textContent=name;});
  var inp=document.getElementById('dm-inp');if(inp){inp.placeholder='Message '+name+'...';setTimeout(function(){inp.focus();},50);}
}
function closeDM(){document.getElementById('dc-dm-overlay').style.display='none';}
function sendDM() {
  var inp=document.getElementById('dm-inp'),t=inp.value.trim();if(!t)return;
  var msgs=document.getElementById('dm-msgs');
  var d=document.createElement('div');d.className='dc-msg-group';
  d.innerHTML='<div class="dc-av" style="background:var(--d-gold);color:#0c0b09;width:28px;height:28px;font-size:10px">N</div><div class="dc-msg-content"><div class="dc-msg-meta"><span class="dc-msg-name" style="color:var(--d-gold)">You</span><span class="dc-msg-time">just now</span></div><div class="dc-msg-text">'+t+'</div></div>';
  msgs.appendChild(d);inp.value='';msgs.scrollTop=msgs.scrollHeight;
  setTimeout(function(){
    var av=document.getElementById('dm-av2'),name=document.getElementById('dm-name2').textContent;
    var r=document.createElement('div');r.className='dc-msg-group';
    r.innerHTML='<div class="dc-av" style="background:'+av.style.background+';width:28px;height:28px;font-size:10px">'+av.textContent+'</div><div class="dc-msg-content"><div class="dc-msg-meta"><span class="dc-msg-name">'+name+'</span><span class="dc-msg-time">just now</span></div><div class="dc-msg-text">'+dmReplies[Math.floor(Math.random()*dmReplies.length)]+'</div></div>';
    msgs.appendChild(r);msgs.scrollTop=msgs.scrollHeight;
  },900);
}
