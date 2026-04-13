import { useState, useRef, useEffect } from "react";

const CONVOS = [
  { id:"1", name:"Priya Sharma", initials:"PS", gradient:["#8b5cf6","#a78bfa"], lastMsg:"Let's sync tomorrow for the ML sprint!", time:"2m", unread:2, online:true },
  { id:"2", name:"Rahul Verma", initials:"RV", gradient:["#3b82f6","#60a5fa"], lastMsg:"The Docker setup is done, push your changes.", time:"14m", unread:0, online:true },
  { id:"3", name:"Neha Kapoor", initials:"NK", gradient:["#22c55e","#4ade80"], lastMsg:"Thanks for the React tips 🙌", time:"1h", unread:0, online:false },
  { id:"4", name:"Aditya Singh", initials:"AS", gradient:["#ec4899","#f472b6"], lastMsg:"Ready for the game jam this weekend?", time:"3h", unread:1, online:false },
  { id:"5", name:"Kavya Menon", initials:"KM", gradient:["#f59e0b","#fbbf24"], lastMsg:"CTF writeup is up on my GitHub!", time:"1d", unread:0, online:false },
];

type Msg = { id: number; text: string; me: boolean; time: string };

const INIT_MSGS: Record<string, Msg[]> = {
  "1": [
    { id:1, text:"Hey! Saw you're into NLP too 👋", me:false, time:"10:02 AM" },
    { id:2, text:"Yeah! Currently working on a RAG pipeline with LangChain", me:true, time:"10:03 AM" },
    { id:3, text:"No way, me too! We should definitely collab on this", me:false, time:"10:04 AM" },
    { id:4, text:"100% — want to hop on a call this week?", me:true, time:"10:05 AM" },
    { id:5, text:"Let's sync tomorrow for the ML sprint!", me:false, time:"10:06 AM" },
  ],
  "2": [
    { id:1, text:"Got your message about the K8s issue", me:false, time:"9:30 AM" },
    { id:2, text:"Yeah the ingress config was off, fixed it now", me:true, time:"9:32 AM" },
    { id:3, text:"The Docker setup is done, push your changes.", me:false, time:"9:45 AM" },
  ],
};

const AUTOREPLIES = [
  "That's awesome! When are you free to connect?",
  "Interesting! I've been working on something similar.",
  "Let's set up a call to discuss further 🚀",
  "100%! Great minds think alike 😄",
  "I'll check that out and get back to you!",
];

function getGrad(g: string[]) { return `linear-gradient(135deg,${g[0]},${g[1]})`; }

export function ChatPage() {
  const [activeId, setActiveId] = useState("1");
  const [messages, setMessages] = useState<Record<string, Msg[]>>(INIT_MSGS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const msgId = useRef(100);

  const convo = CONVOS.find(c => c.id === activeId)!;
  const msgs = messages[activeId] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    const newMsg: Msg = { id: ++msgId.current, text, me: true, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));

    // Auto-reply after 900ms
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    const reply: Msg = {
      id: ++msgId.current,
      text: AUTOREPLIES[Math.floor(Math.random() * AUTOREPLIES.length)],
      me: false,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), reply] }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 96) + "px"; }
  }, [input]);

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      {/* Conversation list */}
      <div style={{
        width: 300, flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        background: "rgba(21,24,33,0.6)",
      }} className={mobileShowChat ? "chat-list-hidden" : ""}>
        {/* Header */}
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: "#FFFFFF", margin: "0 0 4px" }}>Messages</h2>
          <p style={{ fontSize: 13, color: "#6C7075" }}>{CONVOS.filter(c => c.unread > 0).length} unread</p>
        </div>

        {/* Search */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, padding: "9px 12px",
          }}>
            <span style={{ color: "#6C7075", fontSize: 14 }}>🔍</span>
            <span style={{ fontSize: 13, color: "#6C7075" }}>Search conversations...</span>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {CONVOS.map(c => {
            const active = c.id === activeId;
            return (
              <div key={c.id}
                onClick={() => { setActiveId(c.id); setMobileShowChat(true); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px",
                  background: active ? "rgba(255,106,61,0.08)" : "transparent",
                  borderLeft: active ? "3px solid #FF6A3D" : "3px solid transparent",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(4px)"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; } }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: getGrad(c.gradient),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 700, color: "#fff",
                  }}>{c.initials}</div>
                  {c.online && (
                    <div style={{
                      position: "absolute", bottom: 1, right: 1,
                      width: 10, height: 10, borderRadius: "50%",
                      background: "#22c55e", border: "2px solid #151821",
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: active ? 500 : 400 }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: "#6C7075", flexShrink: 0 }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6C7075", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.lastMsg}
                  </div>
                </div>
                {c.unread > 0 && (
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "#FF6A3D",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: "#fff", fontWeight: 700, flexShrink: 0,
                  }}>{c.unread}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }} className={!mobileShowChat ? "chat-panel-hidden" : ""}>
        {/* Chat header */}
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: 14,
          background: "rgba(21,24,33,0.5)",
          backdropFilter: "blur(12px)",
        }}>
          <button className="mobile-back-btn" onClick={() => setMobileShowChat(false)} style={{
            display: "none", background: "none", border: "none",
            color: "#B0B3B8", cursor: "pointer", fontSize: 20, padding: 0, marginRight: 4,
          }}>←</button>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: getGrad(convo.gradient),
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "#fff",
            }}>{convo.initials}</div>
            {convo.online && (
              <div style={{
                position: "absolute", bottom: 1, right: 1,
                width: 10, height: 10, borderRadius: "50%",
                background: "#22c55e", border: "2px solid #0F1115",
                animation: "pulse-green 2s ease-in-out infinite",
              }} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 500 }}>{convo.name}</div>
            <div style={{ fontSize: 12, color: convo.online ? "#22c55e" : "#6C7075" }}>
              {convo.online ? "● Online" : "Offline"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["📞","📹"].map(icon => (
              <button key={icon} style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer", fontSize: 16, display: "flex",
                alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              >{icon}</button>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
          {msgs.map(m => (
            <div key={m.id} style={{
              alignSelf: m.me ? "flex-end" : "flex-start",
              maxWidth: "72%",
              display: "flex", flexDirection: "column",
              alignItems: m.me ? "flex-end" : "flex-start",
            }}>
              <div style={{
                background: m.me ? "#FF6A3D" : "rgba(255,255,255,0.06)",
                border: m.me ? "none" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: m.me ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "10px 14px", fontSize: 14, color: "#FFFFFF",
                lineHeight: 1.5,
                animation: m.me ? "msg-in-right 0.25s cubic-bezier(0.34,1.4,0.64,1)" : "msg-in-left 0.25s cubic-bezier(0.34,1.4,0.64,1)",
              }}>
                {m.text}
              </div>
              <span style={{ fontSize: 10, color: "#6C7075", marginTop: 4 }}>{m.time}</span>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 4, padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#B0B3B8",
                  animation: `typing-dot 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{
          padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(21,24,33,0.8)", backdropFilter: "blur(20px)",
          display: "flex", gap: 10, alignItems: "flex-end",
        }}>
          <button style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer", color: "#B0B3B8", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
          }}>📎</button>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12,
              color: "#FFFFFF", padding: "10px 14px", fontSize: 14,
              fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
              resize: "none", lineHeight: 1.5,
              transition: "border-color 0.2s",
            }}
            onFocus={e => { e.target.style.borderColor = "#FF6A3D"; e.target.style.boxShadow = "0 0 0 3px rgba(255,106,61,0.12)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
          />

          <button
            onClick={send}
            style={{
              width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
              background: input.trim() ? "#FF6A3D" : "rgba(255,255,255,0.05)",
              border: "none", cursor: input.trim() ? "pointer" : "default",
              color: "#fff", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s ease",
              boxShadow: input.trim() ? "0 0 16px rgba(255,106,61,0.4)" : "none",
            }}
          >↑</button>
        </div>
      </div>

      <style>{`
        @keyframes typing-dot {
          0%,60%,100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes msg-in-right {
          from { transform: translateX(20px) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes msg-in-left {
          from { transform: translateX(-20px) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes pulse-green {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .chat-list-hidden { display: none !important; }
          .chat-panel-hidden { display: none !important; }
          .mobile-back-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
