export function Footer() {
  const links = {
    Product: ["Features", "How it Works", "Swipe Discovery", "Mentor Connect", "Collab Channels"],
    Company: ["About", "Blog", "Careers", "Press Kit"],
    Community: ["Discord", "GitHub", "Twitter / X", "Newsletter"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer
      style={{
        background: "#0a0c10",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "64px 24px 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(4, 1fr)",
            gap: 40,
            marginBottom: 60,
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #FF6A3D, #FF8C66)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(255,106,61,0.3)",
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 17, fontWeight: 700 }}>T</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>
                TinkedOut
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: "#6C7075",
                lineHeight: 1.7,
                maxWidth: 200,
                marginBottom: 20,
              }}
            >
              The social collaboration platform for engineering students. Build better teams, find your match.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {["𝕏", "GH", "DC", "IN"].map((icon) => (
                <div
                  key={icon}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#6C7075",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,106,61,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#FF8C66";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.color = "#6C7075";
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 11,
                  color: "#6C7075",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                {category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 13,
                      color: "#6C7075",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#B0B3B8"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#6C7075"; }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#6C7075" }}>
            © 2026 TinkedOut. All rights reserved.
          </span>
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#6C7075" }}>
            Made with ♥ for engineers, by engineers
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "online-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#6C7075" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes online-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
