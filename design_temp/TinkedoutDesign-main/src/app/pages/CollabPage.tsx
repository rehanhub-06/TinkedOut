import { useState } from "react";

const CHANNELS = [
  { category:"GENERAL", items:[
    { id:"general", name:"general", unread:3 },
    { id:"announcements", name:"announcements", unread:0 },
    { id:"introductions", name:"introductions", unread:1 },
  ]},
  { category:"PROJECTS", items:[
    { id:"ml-pipeline", name:"ml-pipeline", unread:5 },
    { id:"web-app", name:"web-app", unread:0 },
    { id:"devops-infra", name:"devops-infra", unread:2 },
  ]},
  { category:"VOICE", items:[
    { id:"standup", name:"daily-standup", unread:0 },
    { id:"pair-prog", name:"pair-programming", unread:0 },
  ]},
];

const MEMBERS = [
  { initials:"AK", name:"Arjun Kumar", role:"Full Stack", gradient:["#FF6A3D","#FF8C66"], status:"online" },
  { initials:"PS", name:"Priya Sharma", role:"ML Engineer", gradient:["#8b5cf6","#a78bfa"], status:"online" },
  { initials:"RV", name:"Rahul Verma", role:"DevOps", gradient:["#3b82f6","#60a5fa"], status:"online" },
  { initials:"NK", name:"Neha Kapoor", role:"Full Stack", gradient:["#22c55e","#4ade80"], status:"idle" },
  { initials:"AS", name:"Aditya Singh", role:"Game Dev", gradient:["#ec4899","#f472b6"], status:"offline" },
  { initials:"KM", name:"Kavya Menon", role:"Security", gradient:["#f59e0b","#fbbf24"], status:"offline" },
];

const MESSAGES: Record<string, { id:number; user:string; initials:string; gradient:string[]; text:string; time:string; reactions?:{emoji:string;count:number}[] }[]> = {
  "general": [
    { id:1, user:"Priya Sharma", initials:"PS", gradient:["#8b5cf6","#a78bfa"], text:"Hey team! Just pushed the first version of the RAG pipeline. Would love some feedback 🚀", time:"10:02 AM", reactions:[{emoji:"🔥",count:4},{emoji:"👀",count:2}] },
    { id:2, user:"Rahul Verma", initials:"RV", gradient:["#3b82f6","#60a5fa"], text:"Looks great! I'll test it with the Docker setup I've been working on.", time:"10:05 AM" },
    { id:3, user:"Arjun Kumar", initials:"AK", gradient:["#FF6A3D","#FF8C66"], text:"Amazing work everyone. The integration between the ML pipeline and the web app is coming together nicely 💪", time:"10:08 AM", reactions:[{emoji:"❤️",count:3}] },
    { id:4, user:"Neha Kapoor", initials:"NK", gradient:["#22c55e","#4ade80"], text:"I can help with the frontend integration this afternoon. Are we using WebSockets or REST for the inference API?", time:"10:15 AM" },
    { id:5, user:"Priya Sharma", initials:"PS", gradient:["#8b5cf6","#a78bfa"], text:"WebSockets for realtime streaming! I'll share the API docs in #ml-pipeline", time:"10:17 AM", reactions:[{emoji:"✅",count:2}] },
  ],
  "ml-pipeline": [
    { id:1, user:"Priya Sharma", initials:"PS", gradient:["#8b5cf6","#a78bfa"], text:"API docs: POST /infer → returns streaming response via WebSocket at /ws/stream", time:"11:00 AM" },
    { id:2, user:"Arjun Kumar", initials:"AK", gradient:["#FF6A3D","#FF8C66"], text:"Perfect! Implementing the WebSocket client now.", time:"11:05 AM" },
  ],
};

function getGrad(g: string[]) { return `linear-gradient(135deg,${g[0]},${g[1]})`; }

const statusColors: Record<string, string> = {
  online: "#22c55e",
  idle: "#f59e0b",
  offline: "#6C7075",
};

export function CollabPage() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [input, setInput] = useState("");
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);
  const [messages, setMessages] = useState(MESSAGES);

  const msgs = messages[activeChannel] || [];
  const msgId = { current: 100 };

  const send = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: ++msgId.current,
      user: "Arjun Kumar",
      initials: "AK",
      gradient: ["#FF6A3D","#FF8C66"] as [string,string],
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => ({ ...prev, [activeChannel]: [...(prev[activeChannel] || []), newMsg] }));
    setInput("");
  };

  const onlineCount = MEMBERS.filter(m => m.status === "online").length;
  const channelName = CHANNELS.flatMap(c => c.items).find(i => i.id === activeChannel)?.name || activeChannel;

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* Channel list */}
      <div style={{
        width: 220, flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(15,17,21,0.8)",
        display: "flex", flexDirection: "column",
        overflowY: "auto",
      }} className="collab-sidebar">
        {/* Server header */}
        <div style={{
          padding: "16px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#FF6A3D,#FF8C66)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#fff",
            flexShrink: 0,
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>TinkedOut Dev</div>
            <div style={{ fontSize: 11, color: "#22c55e" }}>● {onlineCount} online</div>
          </div>
        </div>

        {/* Channel categories */}
        {CHANNELS.map(cat => (
          <div key={cat.category} style={{ padding: "8px 0" }}>
            <div style={{
              padding: "4px 14px 6px",
              fontSize: 10, color: "#6C7075",
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontWeight: 500, display: "flex", justifyContent: "space-between",
              alignItems: "center",
            }}>
              {cat.category}
              <button style={{ background: "none", border: "none", color: "#6C7075", cursor: "pointer", fontSize: 14 }}>+</button>
            </div>
            {cat.items.map(ch => {
              const active = ch.id === activeChannel;
              return (
                <button key={ch.id} onClick={() => setActiveChannel(ch.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px",
                  background: active ? "rgba(255,106,61,0.1)" : "transparent",
                  borderLeft: active ? "2px solid #FF6A3D" : "2px solid transparent",
                  border: "none", cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ color: active ? "#B0B3B8" : "#6C7075", fontSize: 14 }}>#</span>
                  <span style={{ fontSize: 13, color: active ? "#FF8C66" : "#B0B3B8", flex: 1, textAlign: "left" }}>{ch.name}</span>
                  {ch.unread > 0 && (
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF6A3D", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{ch.unread}</div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Channel header */}
        <div style={{
          padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(21,24,33,0.5)", backdropFilter: "blur(12px)",
        }}>
          <span style={{ color: "#B0B3B8", fontSize: 18 }}>#</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 500 }}>{channelName}</div>
            <div style={{ fontSize: 11, color: "#6C7075" }}>Where the magic happens</div>
          </div>
          <button onClick={() => setMembersOpen(!membersOpen)} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, color: "#B0B3B8", padding: "7px 12px", fontSize: 12,
            cursor: "pointer",
          }}>👥 {MEMBERS.length}</button>
        </div>

        {/* Pinned banner */}
        {pinnedOpen && (
          <div style={{
            padding: "10px 20px", background: "rgba(255,106,61,0.06)",
            borderBottom: "1px solid rgba(255,106,61,0.15)",
            display: "flex", alignItems: "center", gap: 10,
            animation: "fade-in-collab 0.3s ease",
          }}>
            <span style={{ fontSize: 14 }}>📌</span>
            <span style={{ fontSize: 13, color: "#B0B3B8", flex: 1 }}>
              <strong style={{ color: "#FF8C66" }}>Pinned:</strong> Sprint planning doc — updated goals for Week 4
            </span>
            <button onClick={() => setPinnedOpen(false)} style={{ background: "none", border: "none", color: "#6C7075", cursor: "pointer", fontSize: 16 }}>×</button>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {msgs.map((m, i) => {
            const showHeader = i === 0 || msgs[i-1].user !== m.user;
            return (
              <div key={m.id} style={{ padding: showHeader ? "12px 0 4px" : "2px 0", display: "flex", gap: 12, position: "relative" }}
                className="msg-row"
              >
                {showHeader ? (
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                    background: getGrad(m.gradient),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 2,
                  }}>{m.initials}</div>
                ) : (
                  <div style={{ width: 38, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {showHeader && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{m.user}</span>
                      <span style={{ fontSize: 11, color: "#6C7075" }}>{m.time}</span>
                    </div>
                  )}
                  <p style={{ fontSize: 14, color: "#B0B3B8", lineHeight: 1.6, margin: 0 }}>{m.text}</p>
                  {m.reactions && (
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      {m.reactions.map(r => (
                        <button key={r.emoji} style={{
                          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 999, padding: "3px 10px", fontSize: 12,
                          color: "#B0B3B8", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 4,
                          transition: "all 0.15s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,106,61,0.1)"; e.currentTarget.style.transform = "scale(1.08)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "scale(1)"; }}
                        >
                          {r.emoji} <span>{r.count}</span>
                        </button>
                      ))}
                      <button style={{
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 999, padding: "3px 8px", fontSize: 12, color: "#6C7075",
                        cursor: "pointer",
                      }}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(21,24,33,0.8)",
        }}>
          <div style={{
            display: "flex", gap: 10, alignItems: "center",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12, padding: "10px 14px",
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder={`Message #${channelName}`}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                color: "#FFFFFF", fontSize: 14, fontFamily: "'DM Sans',system-ui,sans-serif",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              {["😊","📎","@"].map(icon => (
                <button key={icon} style={{ background: "none", border: "none", color: "#6C7075", cursor: "pointer", fontSize: 16 }}>{icon}</button>
              ))}
              <button onClick={send} style={{
                width: 32, height: 32, borderRadius: "50%",
                background: input ? "#FF6A3D" : "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer", color: "#fff",
                fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}>↑</button>
            </div>
          </div>
        </div>
      </div>

      {/* Members panel */}
      {membersOpen && (
        <div style={{
          width: 200, flexShrink: 0,
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(15,17,21,0.8)",
          overflowY: "auto", padding: "16px 0",
        }} className="members-panel">
          <div style={{ padding: "0 14px 10px", fontSize: 10, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ONLINE — {onlineCount}
          </div>
          {MEMBERS.filter(m => m.status !== "offline").map(m => (
            <div key={m.initials} style={{ padding: "7px 14px", display: "flex", alignItems: "center", gap: 10 }}
              onMouseEnter={e => { (e.currentTarget.querySelector(".avatar-glow") as HTMLElement)?.style && ((e.currentTarget.querySelector(".avatar-glow") as HTMLElement).style.boxShadow = `0 0 14px ${m.gradient[0]}60`); }}
              onMouseLeave={e => { (e.currentTarget.querySelector(".avatar-glow") as HTMLElement)?.style && ((e.currentTarget.querySelector(".avatar-glow") as HTMLElement).style.boxShadow = "none"); }}
            >
              <div className="avatar-glow" style={{
                width: 28, height: 28, borderRadius: "50%",
                background: getGrad(m.gradient), flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: "#fff",
                transition: "box-shadow 0.2s ease",
                position: "relative",
              }}>
                {m.initials}
                <div style={{
                  position: "absolute", bottom: -1, right: -1,
                  width: 8, height: 8, borderRadius: "50%",
                  background: statusColors[m.status], border: "1.5px solid #0a0c10",
                }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#B0B3B8" }}>{m.name.split(" ")[0]}</div>
                <div style={{ fontSize: 10, color: "#6C7075" }}>{m.role}</div>
              </div>
            </div>
          ))}

          <div style={{ padding: "12px 14px 6px", fontSize: 10, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase", borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 8 }}>
            OFFLINE — {MEMBERS.filter(m => m.status === "offline").length}
          </div>
          {MEMBERS.filter(m => m.status === "offline").map(m => (
            <div key={m.initials} style={{ padding: "7px 14px", display: "flex", alignItems: "center", gap: 10, opacity: 0.5 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: "#fff",
              }}>{m.initials}</div>
              <div style={{ fontSize: 12, color: "#6C7075" }}>{m.name.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fade-in-collab { from { opacity: 0; } }
        @media (max-width: 900px) { .members-panel { display: none !important; } }
        @media (max-width: 640px) { .collab-sidebar { display: none !important; } }
      `}</style>
    </div>
  );
}
