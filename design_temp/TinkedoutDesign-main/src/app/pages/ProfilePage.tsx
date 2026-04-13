import { useState, useEffect, useRef } from "react";

const INTERESTS = ["AI/ML","Web Dev","Cloud","DevOps","Open Source","React","Node.js"];
const STATS = [
  { label:"Matches", value:42 },
  { label:"Collabs", value:8 },
  { label:"Mentor Sessions", value:3 },
  { label:"Projects Shipped", value:5 },
];
const RECENT_MATCHES = [
  { initials:"PS", name:"Priya S.", role:"ML Engineer", match:91, gradient:["#8b5cf6","#a78bfa"] },
  { initials:"RV", name:"Rahul V.", role:"DevOps", match:84, gradient:["#3b82f6","#60a5fa"] },
  { initials:"NK", name:"Neha K.", role:"Full Stack", match:78, gradient:["#22c55e","#4ade80"] },
  { initials:"AS", name:"Aditya S.", role:"Game Dev", match:73, gradient:["#ec4899","#f472b6"] },
];

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const val = useCountUp(stat.value, active);
  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: "#FFFFFF", lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: 12, color: "#6C7075", marginTop: 6 }}>{stat.label}</div>
    </div>
  );
}

function getGrad(g: string[]) { return `linear-gradient(135deg,${g[0]},${g[1]})`; }

export function ProfilePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Editable fields
  const [name, setName] = useState("Arjun Kumar");
  const [bio, setBio] = useState("Building scalable web apps and exploring ML systems. Open to hackathons and startup collabs.");
  const [dept, setDept] = useState("Computer Science");
  const [year, setYear] = useState("Year 3");
  const [college, setCollege] = useState("VIT-AP");
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);

  const AVATAR_GRADIENTS = [
    ["#FF6A3D","#FF8C66"],["#8b5cf6","#a78bfa"],["#3b82f6","#60a5fa"],
    ["#22c55e","#4ade80"],["#ec4899","#f472b6"],["#f59e0b","#fbbf24"],
    ["#06b6d4","#22d3ee"],["#e11d48","#fb7185"],
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const saveEdit = () => {
    setName(editName);
    setBio(editBio);
    setEditOpen(false);
  };

  const avatarGrad = AVATAR_GRADIENTS[avatarIdx];

  return (
    <div style={{ minHeight: "100vh", maxWidth: 700, margin: "0 auto", padding: "40px 28px 80px" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: 32,
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
        transition: "all 0.5s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: getGrad(avatarGrad),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, color: "#fff",
            boxShadow: `0 0 32px ${avatarGrad[0]}40`,
            flexShrink: 0,
          }}>
            {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, color: "#FFFFFF", margin: "0 0 4px" }}>{name}</h1>
            <p style={{ fontSize: 14, color: "#6C7075", margin: 0 }}>
              {dept} · {college} · {year}
            </p>
          </div>
        </div>
        <button onClick={() => { setEditName(name); setEditBio(bio); setEditOpen(true); }} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, color: "#B0B3B8", padding: "9px 18px", fontSize: 13,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >✏ Edit</button>
      </div>

      {/* Bio */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 0",
        opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.1s",
      }}>
        <p style={{ fontSize: 15, color: "#B0B3B8", lineHeight: 1.75, margin: 0, maxWidth: 560 }}>
          "{bio}"
        </p>
      </div>

      {/* Interests */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 0",
        opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.15s",
      }}>
        <div style={{ fontSize: 11, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Interests</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {INTERESTS.map((interest, i) => (
            <div key={interest} style={{
              background: "rgba(255,106,61,0.08)", border: "1px solid rgba(255,106,61,0.2)",
              borderRadius: 999, padding: "7px 16px", fontSize: 13, color: "#FF8C66",
              animation: mounted ? `chip-fade 0.4s ease ${0.2 + i * 0.04}s both` : "none",
            }}>{interest}</div>
          ))}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 999, padding: "7px 16px", fontSize: 13, color: "#6C7075",
          }}>+3 more</div>
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 0",
          opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.2s",
        }}
      >
        <div style={{ fontSize: 11, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Stats</div>
        <div style={{ display: "flex", gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ flex: 1, borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", paddingRight: 20, marginRight: 20 }}>
              <StatItem stat={s} active={statsVisible} />
            </div>
          ))}
        </div>
      </div>

      {/* Activity — recent matches */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 0",
        opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.25s",
      }}>
        <div style={{ fontSize: 11, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Recent Matches</div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {RECENT_MATCHES.map((m, i) => (
            <div key={m.name} style={{
              flexShrink: 0, width: 140,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "16px", textAlign: "center",
              cursor: "pointer",
              animation: `chip-fade 0.4s ease ${0.3 + i * 0.07}s both`,
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "50%", margin: "0 auto 10px",
                background: getGrad(m.gradient),
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16, fontWeight: 700, color: "#fff",
              }}>{m.initials}</div>
              <div style={{ fontSize: 13, color: "#FFFFFF", marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#6C7075", marginBottom: 8 }}>{m.role}</div>
              <div style={{
                background: "rgba(255,106,61,0.1)", border: "1px solid rgba(255,106,61,0.25)",
                borderRadius: 999, padding: "3px 10px", fontSize: 10, color: "#FF6A3D",
              }}>{m.match}% match</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings section */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 0",
        opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
      }}>
        <div style={{ fontSize: 11, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Settings</div>
        {["Notification Preferences","Privacy Settings","Connected Accounts","Sign Out"].map((item, i) => (
          <button key={item} style={{
            width: "100%", display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "14px 0",
            background: "none", border: "none",
            borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
            color: item === "Sign Out" ? "#ef4444" : "#B0B3B8",
            fontSize: 14, cursor: "pointer",
            fontFamily: "'DM Sans',system-ui,sans-serif",
            transition: "color 0.2s ease",
          }}
            onMouseEnter={e => { if (item !== "Sign Out") e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={e => { if (item !== "Sign Out") e.currentTarget.style.color = "#B0B3B8"; }}
          >
            {item}
            {item !== "Sign Out" && <span style={{ color: "#6C7075" }}>›</span>}
          </button>
        ))}
      </div>

      {/* Edit modal */}
      {editOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
        }} onClick={() => setEditOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#151821", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px 24px 0 0", padding: "28px 28px 40px",
            width: "100%", maxWidth: 560,
            animation: "slide-up-edit 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.15)" }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: "#FFFFFF", margin: "0 0 20px" }}>Edit Profile</h3>

            {/* Avatar color picker */}
            <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Avatar color</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {AVATAR_GRADIENTS.map((g, i) => (
                <button key={i} onClick={() => setAvatarIdx(i)} style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: getGrad(g),
                  border: avatarIdx === i ? "3px solid #FFFFFF" : "3px solid transparent",
                  cursor: "pointer", padding: 0,
                  boxShadow: avatarIdx === i ? `0 0 12px ${g[0]}80` : "none",
                  transform: avatarIdx === i ? "scale(1.15)" : "scale(1)",
                  transition: "all 0.2s ease",
                }} />
              ))}
            </div>

            {/* Name */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, color: "#B0B3B8", marginBottom: 6 }}>Display name</label>
              <input value={editName} onChange={e => setEditName(e.target.value)} style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                color: "#FFFFFF", padding: "11px 14px", fontSize: 14,
                fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
                boxSizing: "border-box",
              }} />
            </div>

            {/* Bio */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, color: "#B0B3B8", marginBottom: 6 }}>Bio <span style={{ color: "#6C7075" }}>({editBio.length}/140)</span></label>
              <textarea value={editBio} onChange={e => e.target.value.length <= 140 && setEditBio(e.target.value)} rows={3} style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                color: "#FFFFFF", padding: "11px 14px", fontSize: 14,
                fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
                resize: "none", boxSizing: "border-box",
              }} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditOpen(false)} style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                color: "#B0B3B8", padding: "13px", fontSize: 14,
                cursor: "pointer",
              }}>Cancel</button>
              <button onClick={saveEdit} style={{
                flex: 2, background: "#FF6A3D", border: "none", borderRadius: 12,
                color: "#FFFFFF", padding: "13px", fontSize: 15,
                fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(255,106,61,0.35)",
              }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chip-fade {
          from { opacity: 0; transform: scale(0.8) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slide-up-edit {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
