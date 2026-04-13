import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

const navItems = [
  { path: "/app/match", icon: "🎯", label: "Match" },
  { path: "/app/swipe", icon: "🃏", label: "Swipe" },
  { path: "/app/chat", icon: "💬", label: "Chat" },
  { path: "/app/collab", icon: "⚡", label: "Collab" },
  { path: "/app/mentor", icon: "🎓", label: "Mentor" },
  { path: "/app/profile", icon: "👤", label: "Profile" },
];

export function AppNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const activeIdx = navItems.findIndex(n => location.pathname.startsWith(n.path));

  return (
    <>
      {/* Sidebar — desktop */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: expanded ? 220 : 68,
          background: "rgba(21,24,33,0.92)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column",
          zIndex: 200, transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
        className="app-sidebar"
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{
            padding: "20px 16px 16px",
            display: "flex", alignItems: "center", gap: 12,
            cursor: "pointer", flexShrink: 0,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            marginBottom: 8,
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg,#FF6A3D,#FF8C66)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 18px rgba(255,106,61,0.35)",
          }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", color: "#fff", fontSize: 18, fontWeight: 700 }}>T</span>
          </div>
          <span style={{
            fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700,
            color: "#FFFFFF", whiteSpace: "nowrap",
            opacity: expanded ? 1 : 0, transition: "opacity 0.2s ease",
          }}>TinkedOut</span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item, i) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                  background: active ? "rgba(255,106,61,0.12)" : "transparent",
                  border: active ? "1px solid rgba(255,106,61,0.2)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                  position: "relative", overflow: "visible",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {/* Active left strip */}
                {active && (
                  <div style={{
                    position: "absolute", left: -10, top: "20%", bottom: "20%",
                    width: 3, borderRadius: 999, background: "#FF6A3D",
                  }} />
                )}
                <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                <span style={{
                  fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: 14,
                  color: active ? "#FF8C66" : "#B0B3B8", whiteSpace: "nowrap",
                  fontWeight: active ? 500 : 400,
                  opacity: expanded ? 1 : 0, transition: "opacity 0.2s ease",
                }}>
                  {item.label}
                </span>

                {/* Active glow dot */}
                {active && (
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#FF6A3D",
                    boxShadow: "0 0 8px #FF6A3D",
                    marginLeft: "auto", flexShrink: 0,
                    opacity: expanded ? 1 : 0, transition: "opacity 0.2s ease",
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: avatar + settings */}
        <div style={{
          padding: "12px 10px 20px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg,#FF6A3D,#FF8C66)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display',Georgia,serif", fontSize: 13,
            fontWeight: 700, color: "#fff", cursor: "pointer",
          }}>
            AK
          </div>
          <div style={{ opacity: expanded ? 1 : 0, transition: "opacity 0.2s ease", overflow: "hidden" }}>
            <div style={{ fontSize: 13, color: "#FFFFFF", whiteSpace: "nowrap", fontFamily: "'DM Sans',system-ui,sans-serif" }}>Arjun Kumar</div>
            <div style={{ fontSize: 11, color: "#6C7075", whiteSpace: "nowrap" }}>Full Stack Dev</div>
          </div>
          <button style={{
            marginLeft: "auto", background: "none", border: "none",
            color: "#6C7075", cursor: "pointer", fontSize: 16, flexShrink: 0,
            opacity: expanded ? 1 : 0, transition: "opacity 0.2s ease",
            padding: 4,
          }}>⚙</button>
        </div>
      </aside>

      {/* Bottom nav — mobile */}
      <nav
        style={{
          position: "fixed", bottom: 20, left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(21,24,33,0.92)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999, padding: "10px 20px",
          display: "flex", gap: 4, zIndex: 200,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        className="app-bottom-nav"
      >
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3, padding: "8px 12px", borderRadius: 20,
                background: active ? "rgba(255,106,61,0.12)" : "transparent",
                border: active ? "1px solid rgba(255,106,61,0.2)" : "1px solid transparent",
                cursor: "pointer", position: "relative",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontSize: 9, fontFamily: "'DM Sans',system-ui,sans-serif",
                color: active ? "#FF8C66" : "#6C7075",
                letterSpacing: "0.03em",
                maxHeight: active ? 14 : 0, overflow: "hidden",
                opacity: active ? 1 : 0,
                transition: "all 0.25s ease",
              }}>
                {item.label}
              </span>
              {/* Active dot */}
              {active && (
                <div style={{
                  position: "absolute", bottom: 3, left: "50%",
                  transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%",
                  background: "#FF6A3D",
                  boxShadow: "0 0 8px rgba(255,106,61,0.8)",
                }} />
              )}
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (min-width: 769px) { .app-bottom-nav { display: none !important; } }
        @media (max-width: 768px) { .app-sidebar { display: none !important; } }
      `}</style>
    </>
  );
}
