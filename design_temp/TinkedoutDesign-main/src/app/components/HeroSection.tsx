import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const pillData = [
  { icon: "✦", label: "Tinder-style Matching" },
  { icon: "⚡", label: "Discord-like Collab" },
  { icon: "🔗", label: "LinkedIn for Builders" },
];

const stats = [
  { value: "2,400+", label: "Engineers" },
  { value: "15K+", label: "Matches Made" },
  { value: "500+", label: "Projects Launched" },
];

export function HeroSection() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,106,61,0.1)",
          border: "1px solid rgba(255,106,61,0.25)",
          borderRadius: 999,
          padding: "6px 16px",
          marginBottom: 32,
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#FF6A3D",
            display: "inline-block",
            animation: "glow-pulse-hero 2s ease-in-out infinite",
          }}
        />
        <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#FF8C66", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Now in Beta · 2,400+ Engineers Joined
        </span>
      </div>

      {/* Logo / Hero text */}
      <div
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          marginBottom: 8,
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(56px, 10vw, 100px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-2px",
          }}
        >
          <span style={{ color: "#FF6A3D" }}>T</span>inked
          <span style={{ color: "#FF6A3D" }}>O</span>ut
        </h1>
      </div>

      {/* Accent underline */}
      <div
        style={{
          height: 2,
          background: "linear-gradient(90deg, transparent, #FF6A3D, transparent)",
          borderRadius: 999,
          marginBottom: 32,
          width: show ? 160 : 0,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s",
        }}
      />

      {/* Headline */}
      <div
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          marginBottom: 20,
          maxWidth: 700,
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 400,
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          Build better teams,<br />
          <span style={{ color: "#FF6A3D" }}>find your match.</span>
        </h2>
      </div>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "#B0B3B8",
          maxWidth: 520,
          lineHeight: 1.7,
          margin: "0 auto 40px",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
        }}
      >
        The social collaboration platform where engineering students discover teammates, mentors, and projects — powered by smart interest matching.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 56,
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
        }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#FF6A3D",
            border: "none",
            borderRadius: 14,
            color: "#FFFFFF",
            padding: "15px 34px",
            fontSize: 16,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(255,106,61,0.4), 0 4px 20px rgba(255,106,61,0.2)",
            transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 0 60px rgba(255,106,61,0.6), 0 8px 30px rgba(255,106,61,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(255,106,61,0.4), 0 4px 20px rgba(255,106,61,0.2)";
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(0) scale(0.97)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; }}
        >
          Start Building →
        </button>
        <button
          onClick={() => navigate("/app/swipe")}
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            color: "#FFFFFF",
            padding: "15px 34px",
            fontSize: 16,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 400,
            cursor: "pointer",
            transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          Watch Demo ▶
        </button>
      </div>

      {/* Platform pills */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 64,
          opacity: show ? 1 : 0,
          transition: "opacity 0.6s ease 0.75s",
        }}
      >
        {pillData.map((p, i) => (
          <div
            key={p.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999,
              padding: "8px 18px",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              color: "#B0B3B8",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s ease ${0.75 + i * 0.1}s, transform 0.5s ease ${0.75 + i * 0.1}s`,
            }}
          >
            <span style={{ fontSize: 14 }}>{p.icon}</span>
            {p.label}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: "clamp(24px, 5vw, 72px)",
          justifyContent: "center",
          flexWrap: "wrap",
          opacity: show ? 1 : 0,
          transition: "opacity 0.6s ease 1s",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${1 + i * 0.15}s, transform 0.5s ease ${1 + i * 0.15}s`,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 13, color: "#6C7075", marginTop: 6 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: show ? 0.5 : 0,
          transition: "opacity 0.6s ease 1.5s",
          animation: "float-slow 2.5s ease-in-out infinite",
        }}
      >
        <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 11, color: "#6C7075", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, rgba(255,106,61,0.5), transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes glow-pulse-hero {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,106,61,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(255,106,61,0); }
        }
        @keyframes float-slow {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </section>
  );
}