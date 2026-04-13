import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,106,61,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,106,61,0.1)",
            border: "1px solid rgba(255,106,61,0.25)",
            borderRadius: 999,
            padding: "5px 16px",
            fontSize: 11,
            color: "#FF8C66",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          Ready to build?
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0 0 20px",
            lineHeight: 1.15,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Find your team.<br />
          <span style={{ color: "#FF6A3D" }}>Ship something great.</span>
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 17,
            color: "#B0B3B8",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: "0 auto 44px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          Join 2,400+ engineers already discovering teammates, mentors, and projects on TinkedOut. It takes 3 minutes to set up.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 40,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <button
            style={{
              background: "#FF6A3D",
              border: "none",
              borderRadius: 14,
              color: "#FFFFFF",
              padding: "16px 40px",
              fontSize: 17,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 0 60px rgba(255,106,61,0.45), 0 8px 32px rgba(255,106,61,0.25)",
              transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
              animation: "glow-pulse-cta 3s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 80px rgba(255,106,61,0.6), 0 12px 40px rgba(255,106,61,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(255,106,61,0.45), 0 8px 32px rgba(255,106,61,0.25)";
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; }}
          >
            Enter TinkedOut →
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              color: "#FFFFFF",
              padding: "16px 36px",
              fontSize: 17,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 400,
              cursor: "pointer",
              transition: "background 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            Sign in with Google
          </button>
        </div>

        {/* Trust line */}
        <div
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            color: "#6C7075",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          🔒 No credit card required &nbsp;·&nbsp; Free to join &nbsp;·&nbsp; Trusted by 2,400+ engineers
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse-cta {
          0%,100% { box-shadow: 0 0 60px rgba(255,106,61,0.45), 0 8px 32px rgba(255,106,61,0.25); }
          50% { box-shadow: 0 0 80px rgba(255,106,61,0.6), 0 12px 40px rgba(255,106,61,0.3); }
        }
      `}</style>
    </section>
  );
}