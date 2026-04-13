import { useState, useEffect, useRef } from "react";

const SUGGESTIONS = ["AI/ML","Web Dev","React","Python","Cloud","DevOps","ML","Blockchain","Mobile","Game Dev","IoT","AR/VR"];

const mockMatches = [
  { initials:"PS", name:"Priya Sharma", role:"ML Engineer · NIT Trichy", skills:["Python","TensorFlow"], score:91, gradient:["#8b5cf6","#a78bfa"] },
  { initials:"RV", name:"Rahul Verma", role:"DevOps · BITS Pilani", skills:["K8s","Docker"], score:84, gradient:["#3b82f6","#60a5fa"] },
  { initials:"NK", name:"Neha Kapoor", role:"Full Stack · IIT Delhi", skills:["React","Node.js"], score:78, gradient:["#22c55e","#4ade80"] },
];

const quickReplies = [
  "Hey! I saw you're into {topic} too — want to collab?",
  "Cool stack! I'm working on something similar. Let's connect.",
  "Your interests align perfectly with my current project!",
];

function RadarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const size = canvas.width;
    const cx = size / 2, cy = size / 2;
    let angle = 0;

    const rings = [
      { r: size * 0.45, speed: 0.005, opacity: 0.2 },
      { r: size * 0.31, speed: -0.008, opacity: 0.3 },
      { r: size * 0.17, speed: 0.012, opacity: 0.4 },
    ];

    // Orbiting dots
    const dots = [
      { ring: 0, theta: 0, speed: 0.007 },
      { ring: 1, theta: 2.1, speed: -0.012 },
      { ring: 2, theta: 4.0, speed: 0.018 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Rings
      rings.forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,106,61,${r.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Sweep line
      const sweepGrad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * rings[0].r, cy + Math.sin(angle) * rings[0].r);
      sweepGrad.addColorStop(0, "transparent");
      sweepGrad.addColorStop(1, "rgba(255,106,61,0.8)");
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * rings[0].r, cy + Math.sin(angle) * rings[0].r);
      ctx.strokeStyle = sweepGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Sweep trail (conic glow)
      const trailGrad = ctx.createConicalGradient ? null : null;
      for (let i = 0; i < 40; i++) {
        const a = angle - (i * 0.04);
        const opacity = (1 - i / 40) * 0.06;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, rings[0].r, a, a + 0.04);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,106,61,${opacity})`;
        ctx.fill();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6A3D";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#FF6A3D";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbiting dots
      dots.forEach(d => {
        d.theta += d.speed;
        const r = rings[d.ring].r;
        const x = cx + Math.cos(d.theta) * r;
        const y = cy + Math.sin(d.theta) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#FF6A3D";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#FF6A3D";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      angle += 0.025;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} width={280} height={280} style={{ display: "block" }} />;
}

export function MatchPage() {
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set(["AI/ML","React"]));
  const [scanning, setScanning] = useState(false);
  const [matchIdx, setMatchIdx] = useState(-1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ me: boolean; text: string }[]>([]);
  const [status, setStatus] = useState("Ready to find your match");

  const toggleChip = (c: string) => {
    setActiveChips(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });
  };

  const startScan = async () => {
    setScanning(true);
    setMatchIdx(-1);
    setChatOpen(false);
    const statuses = ["Scanning network...", "Analyzing interests...", "Calculating match scores...", "Found a match!"];
    for (let i = 0; i < statuses.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setStatus(statuses[i]);
    }
    setMatchIdx(Math.floor(Math.random() * mockMatches.length));
    setScanning(false);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { me: true, text: msg }]);
    await new Promise(r => setTimeout(r, 900));
    setChatMessages(prev => [...prev, { me: false, text: "That sounds awesome! Let's definitely connect 🚀" }]);
  };

  const match = matchIdx >= 0 ? mockMatches[matchIdx] : null;

  return (
    <div style={{ minHeight: "100vh", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: "#FFFFFF", margin: "0 0 6px" }}>Match Engine</h1>
          <p style={{ fontSize: 14, color: "#6C7075" }}>Radar-based discovery — find teammates by interest</p>
        </div>

        {/* Radar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <RadarCanvas />
            {/* Status overlay */}
            <div style={{
              position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
              background: "rgba(21,24,33,0.9)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,106,61,0.2)", borderRadius: 999,
              padding: "6px 20px", whiteSpace: "nowrap",
            }}>
              <span style={{ fontSize: 12, color: scanning ? "#FF8C66" : "#6C7075", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
                {scanning && <span style={{ marginRight: 6 }}>●</span>}
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Interest chips */}
        <div style={{
          background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
          padding: "20px", marginBottom: 20,
        }}>
          <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Filter by interests
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SUGGESTIONS.map(c => {
              const active = activeChips.has(c);
              return (
                <button key={c} onClick={() => toggleChip(c)} style={{
                  background: active ? "rgba(255,106,61,0.12)" : "rgba(255,255,255,0.04)",
                  border: active ? "1px solid rgba(255,106,61,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 999, padding: "7px 16px", fontSize: 12,
                  color: active ? "#FF8C66" : "#B0B3B8", cursor: "pointer",
                  fontFamily: "'DM Sans',system-ui,sans-serif",
                  boxShadow: active ? "0 0 10px rgba(255,106,61,0.2)" : "none",
                  transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: active ? "scale(1.04)" : "scale(1)",
                }}>
                  {active ? "✓ " : "+ "}{c}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={scanning ? () => { setScanning(false); setStatus("Scan stopped"); } : startScan}
          style={{
            width: "100%",
            background: scanning ? "rgba(239,68,68,0.12)" : "#FF6A3D",
            border: scanning ? "1px solid rgba(239,68,68,0.3)" : "none",
            borderRadius: 14, color: scanning ? "#ef4444" : "#FFFFFF",
            padding: "15px", fontSize: 16, fontFamily: "'DM Sans',system-ui,sans-serif",
            fontWeight: 500, cursor: "pointer",
            boxShadow: scanning ? "none" : "0 0 30px rgba(255,106,61,0.35)",
            transition: "all 0.2s ease", marginBottom: 24,
          }}
        >
          {scanning ? "◼ Stop Scan" : "▶ Start Matching"}
        </button>

        {/* Match card (slides up) */}
        {match && !chatOpen && (
          <div style={{
            background: "rgba(255,255,255,0.05)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
            padding: "24px",
            animation: "slide-up-match 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg,${match.gradient[0]},${match.gradient[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#fff",
                boxShadow: `0 0 20px ${match.gradient[0]}40`,
              }}>{match.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: "#FFFFFF", marginBottom: 3 }}>{match.name}</div>
                <div style={{ fontSize: 13, color: "#6C7075", marginBottom: 10 }}>{match.role}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {match.skills.map(s => (
                    <span key={s} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#B0B3B8" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{
                background: "rgba(255,106,61,0.1)", border: "1px solid rgba(255,106,61,0.3)",
                borderRadius: 999, padding: "4px 14px", fontSize: 13,
                color: "#FF6A3D", fontWeight: 500, whiteSpace: "nowrap",
                animation: "glow-pulse-m 2s ease-in-out infinite",
              }}>
                {match.score}% match
              </div>
            </div>

            {/* Match score bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#6C7075" }}>Interest overlap</span>
                <span style={{ fontSize: 11, color: "#FF8C66" }}>{match.score}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{
                  height: "100%", background: "linear-gradient(90deg,#FF6A3D,#FF8C66)",
                  borderRadius: 999, animation: "fill-bar-anim 1s ease-out forwards",
                  width: `${match.score}%`,
                }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setMatchIdx(-1)} style={{
                flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, color: "#B0B3B8", padding: "12px", fontSize: 14,
                fontFamily: "'DM Sans',system-ui,sans-serif", cursor: "pointer",
              }}>Skip</button>
              <button onClick={() => setChatOpen(true)} style={{
                flex: 2, background: "#FF6A3D", border: "none", borderRadius: 12,
                color: "#FFFFFF", padding: "12px", fontSize: 14,
                fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500, cursor: "pointer",
                boxShadow: "0 0 20px rgba(255,106,61,0.35)",
              }}>Connect & Chat →</button>
            </div>
          </div>
        )}

        {/* Quick chat */}
        {match && chatOpen && (
          <div style={{
            background: "rgba(255,255,255,0.05)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
            overflow: "hidden", animation: "slide-up-match 0.3s ease",
          }}>
            {/* Chat header */}
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `linear-gradient(135deg,${match.gradient[0]},${match.gradient[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff",
              }}>{match.initials}</div>
              <div>
                <div style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>{match.name}</div>
                <div style={{ fontSize: 11, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "online-pulse 2s infinite" }} />
                  Online now
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: "16px 20px", minHeight: 140, display: "flex", flexDirection: "column", gap: 10 }}>
              {chatMessages.length === 0 && (
                <div style={{ fontSize: 13, color: "#6C7075", textAlign: "center", padding: "20px 0" }}>
                  Say hi to {match.name.split(" ")[0]}! 👋
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.me ? "flex-end" : "flex-start",
                  background: m.me ? "#FF6A3D" : "rgba(255,255,255,0.06)",
                  border: m.me ? "none" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: m.me ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "10px 14px", maxWidth: "75%",
                  fontSize: 13, color: "#FFFFFF",
                  animation: m.me ? "msg-in-right 0.25s cubic-bezier(0.34,1.4,0.64,1)" : "msg-in-left 0.25s cubic-bezier(0.34,1.4,0.64,1)",
                }}>{m.text}</div>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", gap: 10, alignItems: "center",
            }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Message..."
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                  color: "#FFFFFF", padding: "10px 14px", fontSize: 13,
                  fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
                }}
              />
              <button onClick={sendMessage} style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "#FF6A3D", border: "none", cursor: "pointer",
                color: "#fff", fontSize: 16, display: "flex",
                alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>↑</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up-match {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow-pulse-m {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,106,61,0.3); }
          50% { box-shadow: 0 0 0 8px transparent; }
        }
        @keyframes fill-bar-anim {
          from { width: 0; }
        }
        @keyframes online-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes msg-in-right {
          from { transform: translateX(20px) scale(0.9); opacity: 0; }
          to   { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes msg-in-left {
          from { transform: translateX(-20px) scale(0.9); opacity: 0; }
          to   { transform: translateX(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
