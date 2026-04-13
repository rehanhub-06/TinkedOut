import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Mentors", href: "#mentors" },
    { label: "Community", href: "#community" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled ? "rgba(15,17,21,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #FF6A3D, #FF8C66)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(255,106,61,0.4)",
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 18, fontWeight: 700 }}>T</span>
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            TinkedOut
          </span>
        </a>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: "#B0B3B8",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 400,
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#FFFFFF";
                (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#B0B3B8";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden md:flex">
          <button
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              color: "#FFFFFF",
              padding: "9px 20px",
              fontSize: 14,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onClick={() => navigate("/login")}
            onMouseEnter={(e) => {
              (e.currentTarget).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.background = "transparent";
              (e.currentTarget).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "#FF6A3D",
              border: "none",
              borderRadius: 10,
              color: "#FFFFFF",
              padding: "9px 22px",
              fontSize: 14,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              cursor: "pointer",
              fontWeight: 500,
              boxShadow: "0 0 20px rgba(255,106,61,0.3)",
              transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.transform = "translateY(-2px) scale(1.02)";
              (e.currentTarget).style.boxShadow = "0 4px 28px rgba(255,106,61,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.transform = "translateY(0) scale(1)";
              (e.currentTarget).style.boxShadow = "0 0 20px rgba(255,106,61,0.3)";
            }}
          >
            Get Started →
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#fff",
                borderRadius: 2,
                transition: "transform 0.2s, opacity 0.2s",
                transform:
                  menuOpen && i === 0 ? "translateY(6px) rotate(45deg)" :
                  menuOpen && i === 1 ? "scaleX(0)" :
                  menuOpen && i === 2 ? "translateY(-6px) rotate(-45deg)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(21,24,33,0.97)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 24px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "#B0B3B8",
                textDecoration: "none",
                padding: "12px 0",
                fontSize: 16,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={() => navigate("/login")} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fff", padding: "11px", fontSize: 14, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer" }}>
              Sign in
            </button>
            <button onClick={() => navigate("/login")} style={{ flex: 1, background: "#FF6A3D", border: "none", borderRadius: 10, color: "#fff", padding: "11px", fontSize: 14, fontFamily: "'DM Sans', system-ui, sans-serif", cursor: "pointer", fontWeight: 500 }}>
              Get Started →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}