import { useState, useRef, useCallback, useEffect } from "react";

const CARDS = [
  { id:1, initials:"PS", name:"Priya Sharma", role:"ML Engineer", college:"NIT Trichy", year:4, skills:["Python","TensorFlow","FastAPI","Scikit-learn"], bio:"Obsessed with NLP and deploying models at scale. Looking for teammates for an LLM project.", match:91, gradient:["#8b5cf6","#a78bfa"] },
  { id:2, initials:"RV", name:"Rahul Verma", role:"DevOps Engineer", college:"BITS Pilani", year:3, skills:["Kubernetes","AWS","Docker","Terraform"], bio:"Automating everything, one pipeline at a time. Need a frontend dev for my SaaS.", match:84, gradient:["#3b82f6","#60a5fa"] },
  { id:3, initials:"NK", name:"Neha Kapoor", role:"Full Stack Dev", college:"IIT Delhi", year:4, skills:["React","Node.js","PostgreSQL","Redis"], bio:"Ex-intern at Razorpay. Building a fintech side project and need ML expertise.", match:78, gradient:["#22c55e","#4ade80"] },
  { id:4, initials:"AS", name:"Aditya Singh", role:"Game Developer", college:"IIT Bombay", year:2, skills:["Unity","C#","Blender","WebGL"], bio:"Making immersive VR experiences. Looking for a sound designer and UI/UX person.", match:73, gradient:["#ec4899","#f472b6"] },
  { id:5, initials:"KM", name:"Kavya Menon", role:"Cybersecurity", college:"NIT Calicut", year:3, skills:["Pentesting","Python","Rust","CTF"], bio:"CTF champion 2024. Building an open-source vulnerability scanner.", match:69, gradient:["#f59e0b","#fbbf24"] },
  { id:6, initials:"SR", name:"Siddharth Rao", role:"IoT Engineer", college:"VIT Vellore", year:3, skills:["Arduino","MQTT","React","C++"], bio:"Building smart campus solutions. Need a mobile dev to bring the app side.", match:65, gradient:["#06b6d4","#22d3ee"] },
];

const recentMatches = [
  { initials:"AK", name:"Arjun K.", skills:["React","Node"], gradient:["#FF6A3D","#FF8C66"] },
  { initials:"MJ", name:"Mia J.", skills:["Python","ML"], gradient:["#8b5cf6","#a78bfa"] },
  { initials:"TR", name:"Tarun R.", skills:["AWS","K8s"], gradient:["#3b82f6","#60a5fa"] },
];

function getGrad(g: string[]) { return `linear-gradient(135deg,${g[0]},${g[1]})`; }

function burstConfetti(cx: number, cy: number) {
  const colors = ["#FF6A3D","#FFD700","#22c55e","#fff","#b89b6a"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    const angle = (i / 22) * 360;
    const dist = 80 + Math.random() * 80;
    const tx = Math.cos(angle * Math.PI / 180) * dist;
    const ty = Math.sin(angle * Math.PI / 180) * dist - 60;
    p.style.cssText = `
      position:fixed; width:8px; height:8px; left:${cx}px; top:${cy}px;
      background:${colors[i % colors.length]}; border-radius:2px;
      pointer-events:none; z-index:9999;
      animation:confetti-fly 0.8s cubic-bezier(0,0.6,1,1) forwards;
      --tx:${tx}px; --ty:${ty}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

export function SwipePage() {
  const [deck, setDeck] = useState(CARDS);
  const [gone, setGone] = useState(false);
  const [matchModal, setMatchModal] = useState<typeof CARDS[0] | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Drag state
  const cardRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startY: 0, dx: 0, dy: 0, history: [] as number[] });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragState.current = { active: true, startX: e.clientX, startY: e.clientY, dx: 0, dy: 0, history: [] };
    cardRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    dragState.current.dx = dx;
    dragState.current.dy = dy;
    dragState.current.history.push(e.clientX);
    if (dragState.current.history.length > 5) dragState.current.history.shift();

    const card = cardRef.current;
    if (!card) return;
    const rot = dx * 0.06;
    card.style.transform = `translateX(${dx}px) translateY(${dy * 0.3}px) rotate(${rot}deg)`;
    card.style.transition = "none";

    // Stamp overlays
    const connectStamp = card.querySelector(".stamp-connect") as HTMLElement;
    const skipStamp = card.querySelector(".stamp-skip") as HTMLElement;
    if (connectStamp) connectStamp.style.opacity = String(Math.max(0, dx / 150));
    if (skipStamp) skipStamp.style.opacity = String(Math.max(0, -dx / 150));
  }, []);

  const flyOut = useCallback((dir: "left" | "right") => {
    const card = cardRef.current;
    if (!card) return;
    const tx = dir === "right" ? 160 : -160;
    const rot = dir === "right" ? 30 : -30;
    card.style.transition = "transform 0.5s ease-in, opacity 0.5s ease-in";
    card.style.transform = `translateX(${tx}vw) rotate(${rot}deg)`;
    card.style.opacity = "0";

    setTimeout(() => {
      setDeck(prev => {
        const next = [...prev.slice(1), prev[0]];
        return next;
      });
      if (card) {
        card.style.transform = "";
        card.style.opacity = "1";
        card.style.transition = "";
      }
    }, 500);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    const { dx, history } = dragState.current;
    const card = cardRef.current;
    if (!card) return;

    const vel = history.length >= 2 ? Math.abs(history[history.length - 1] - history[0]) : 0;
    const thresh = Math.abs(dx) > 90 || vel > 300;

    const connectStamp = card.querySelector(".stamp-connect") as HTMLElement;
    const skipStamp = card.querySelector(".stamp-skip") as HTMLElement;
    if (connectStamp) connectStamp.style.opacity = "0";
    if (skipStamp) skipStamp.style.opacity = "0";

    if (thresh) {
      const dir = dx > 0 ? "right" : "left";
      if (dir === "right") {
        burstConfetti(e.clientX, e.clientY);
        setTimeout(() => setMatchModal(deck[0]), 300);
      }
      flyOut(dir);
    } else {
      card.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";
      card.style.transform = "";
    }
  }, [deck, flyOut]);

  const handleBtn = (dir: "left" | "right" | "super") => {
    if (dir === "right") {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      setTimeout(() => setMatchModal(deck[0]), 300);
    }
    flyOut(dir === "right" || dir === "super" ? "right" : "left");
  };

  const top = deck[0];
  const second = deck[1];
  const third = deck[2];

  return (
    <div style={{ minHeight: "100vh", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 32, maxWidth: 1000, margin: "0 auto" }}>

        {/* Main swipe area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Header */}
          <div style={{ width: "100%", maxWidth: 420, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, color: "#FFFFFF", margin: "0 0 2px" }}>Discover</h1>
              <p style={{ fontSize: 13, color: "#6C7075" }}>Swipe right to connect</p>
            </div>
            <button onClick={() => setFilterOpen(true)} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12, color: "#B0B3B8", padding: "10px 16px", fontSize: 13,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}>⚙ Filter</button>
          </div>

          {/* Card stack */}
          <div style={{ position: "relative", width: "100%", maxWidth: 420, height: 520, marginBottom: 28 }}>
            {/* Third card */}
            <div style={{
              position: "absolute", inset: 0,
              background: "#151821", border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 24, transform: "scale(0.94) translateY(-24px)",
              opacity: 0.7, overflow: "hidden",
            }}>
              <div style={{ height: "40%", background: getGrad(third.gradient), opacity: 0.5 }} />
            </div>
            {/* Second card */}
            <div style={{
              position: "absolute", inset: 0,
              background: "#151821", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24, transform: "scale(0.97) translateY(-12px)",
              opacity: 0.85, overflow: "hidden",
            }}>
              <div style={{ height: "40%", background: getGrad(second.gradient), opacity: 0.6 }} />
            </div>

            {/* Top card (draggable) */}
            <div
              ref={cardRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                position: "absolute", inset: 0,
                background: "#151821",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24, overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                cursor: "grab", userSelect: "none",
                willChange: "transform",
                touchAction: "none",
              }}
            >
              {/* CONNECT stamp */}
              <div className="stamp-connect" style={{
                position: "absolute", top: 28, left: 20, zIndex: 10,
                border: "3px solid #22c55e", borderRadius: 8,
                padding: "6px 14px", opacity: 0,
                transform: "rotate(-20deg)", pointerEvents: "none",
                transition: "opacity 0.05s",
              }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#22c55e", letterSpacing: 2 }}>CONNECT</span>
              </div>
              {/* SKIP stamp */}
              <div className="stamp-skip" style={{
                position: "absolute", top: 28, right: 20, zIndex: 10,
                border: "3px solid #ef4444", borderRadius: 8,
                padding: "6px 14px", opacity: 0,
                transform: "rotate(20deg)", pointerEvents: "none",
                transition: "opacity 0.05s",
              }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", letterSpacing: 2 }}>SKIP</span>
              </div>

              {/* Avatar zone */}
              <div style={{
                height: "42%", background: getGrad(top.gradient),
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  width: 90, height: 90, borderRadius: "50%",
                  background: "rgba(0,0,0,0.2)",
                  border: "3px solid rgba(255,255,255,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: 30, fontWeight: 700, color: "#fff",
                }}>{top.initials}</div>
                {/* Match badge */}
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: "rgba(15,17,21,0.75)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,106,61,0.4)", borderRadius: 999,
                  padding: "5px 14px", fontSize: 13, color: "#FF6A3D", fontWeight: 500,
                }}>{top.match}% match</div>
              </div>

              {/* Info zone */}
              <div style={{ padding: "20px 22px 22px" }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: "#fff", marginBottom: 3 }}>{top.name}</div>
                <div style={{ fontSize: 13, color: "#6C7075", marginBottom: 14 }}>
                  {top.role} · {top.college} · Year {top.year}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {top.skills.map(s => (
                    <span key={s} style={{
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#B0B3B8",
                    }}>{s}</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "#B0B3B8", lineHeight: 1.6, margin: "0 0 16px" }}>{top.bio}</p>
                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${top.match}%`, background: "linear-gradient(90deg,#FF6A3D,#FF8C66)", borderRadius: 999 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <button onClick={() => handleBtn("left")} style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444", fontSize: 24, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s cubic-bezier(0.34,1.56,0.64,1)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
            >✕</button>
            <button onClick={() => handleBtn("super")} style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(184,155,106,0.15)", border: "1px solid rgba(184,155,106,0.3)",
              color: "#b89b6a", fontSize: 20, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "float-star 2s ease-in-out infinite",
              transition: "all 0.15s cubic-bezier(0.34,1.56,0.64,1)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >★</button>
            <button onClick={() => handleBtn("right")} style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "rgba(255,106,61,0.12)", border: "1px solid rgba(255,106,61,0.3)",
              color: "#FF6A3D", fontSize: 24, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s cubic-bezier(0.34,1.56,0.64,1)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,106,61,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >♥</button>
          </div>

          <p style={{ fontSize: 12, color: "#6C7075", marginTop: 16 }}>Drag the card or use the buttons</p>
        </div>

        {/* Right panel — recent matches (desktop) */}
        <div style={{ width: 240, flexShrink: 0 }} className="matches-panel">
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: "#FFFFFF", marginBottom: 16 }}>Your Matches</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentMatches.map((m, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12,
                cursor: "pointer", transition: "all 0.2s ease",
                animation: `fade-in-match 0.4s ease ${i * 0.1}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                  background: getGrad(m.gradient),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#fff",
                }}>{m.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 3 }}>{m.name}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {m.skills.map(s => (
                      <span key={s} style={{ fontSize: 10, background: "rgba(255,255,255,0.06)", borderRadius: 999, padding: "2px 6px", color: "#6C7075" }}>{s}</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 14, color: "#FF6A3D" }}>♥</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Match modal */}
      {matchModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          animation: "fade-in-overlay 0.2s ease",
        }} onClick={() => setMatchModal(null)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#151821", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px 24px 0 0", padding: "40px 32px 48px",
              width: "100%", maxWidth: 480, textAlign: "center",
              animation: "slide-up-modal 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: "#FFFFFF", margin: "0 0 8px" }}>
              It's a Match!
            </h2>
            <p style={{ fontSize: 15, color: "#B0B3B8", marginBottom: 28 }}>
              You and <strong style={{ color: "#FFFFFF" }}>{matchModal.name}</strong> both swiped right.
            </p>

            {/* Two avatars */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: -12, marginBottom: 32 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg,#FF6A3D,#FF8C66)",
                border: "3px solid #151821",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: "#fff",
                animation: "slide-in-left 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
                boxShadow: "0 0 30px rgba(255,106,61,0.4)",
              }}>AK</div>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: getGrad(matchModal.gradient),
                border: "3px solid #151821",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: "#fff",
                animation: "slide-in-right 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
                boxShadow: `0 0 30px ${matchModal.gradient[0]}60`,
                marginLeft: -12,
              }}>{matchModal.initials}</div>
            </div>

            <button style={{
              width: "100%", background: "#FF6A3D", border: "none", borderRadius: 14,
              color: "#FFFFFF", padding: "14px", fontSize: 16,
              fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500,
              cursor: "pointer", marginBottom: 12,
              boxShadow: "0 0 30px rgba(255,106,61,0.4)",
            }} onClick={() => setMatchModal(null)}>
              Start chatting →
            </button>
            <button style={{
              width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14, color: "#6C7075", padding: "13px", fontSize: 15,
              cursor: "pointer",
            }} onClick={() => setMatchModal(null)}>
              Keep swiping
            </button>
          </div>
        </div>
      )}

      {/* Filter panel */}
      {filterOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
        }} onClick={() => setFilterOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", top: 0, left: 0, right: 0,
              background: "rgba(21,24,33,0.97)", backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0 0 24px 24px",
              padding: "24px", animation: "slide-down 0.3s ease",
            }}
          >
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: "#FFFFFF", marginBottom: 20 }}>Filter</h3>
            <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Role</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["Student","Mentor","Both"].map(r => (
                <button key={r} style={{
                  background: "rgba(255,106,61,0.1)", border: "1px solid rgba(255,106,61,0.3)",
                  borderRadius: 999, padding: "8px 18px", fontSize: 13, color: "#FF8C66",
                  cursor: "pointer",
                }}>{r}</button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Interests</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {["AI/ML","Web Dev","Mobile","DevOps","Game Dev"].map(i => (
                <button key={i} style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 999, padding: "7px 14px", fontSize: 12, color: "#B0B3B8",
                  cursor: "pointer",
                }}>{i}</button>
              ))}
            </div>
            <button onClick={() => setFilterOpen(false)} style={{
              width: "100%", background: "#FF6A3D", border: "none", borderRadius: 12,
              color: "#fff", padding: "13px", fontSize: 15, cursor: "pointer",
              fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500,
            }}>Apply Filters</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes confetti-fly {
          to { transform: translate(var(--tx), var(--ty)) rotate(540deg); opacity: 0; }
        }
        @keyframes float-star {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fade-in-overlay { from { opacity: 0; } }
        @keyframes slide-up-modal {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-match {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 768px) {
          .matches-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
