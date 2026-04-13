import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Pick your tech interests from 18 categories, set your collaboration style, choose your role (student, mentor, or both), and write a short bio.",
    detail: "Takes under 3 minutes",
    icon: "👤",
    color: "#FF6A3D",
  },
  {
    number: "02",
    title: "Swipe & Match",
    description:
      "Browse the discovery deck — swipe right on teammates who excite you. When it's mutual, confetti flies and a chat opens instantly.",
    detail: "Smart interest scoring",
    icon: "🃏",
    color: "#b89b6a",
  },
  {
    number: "03",
    title: "Collab & Ship",
    description:
      "Jump into project channels, jam in real-time chat, book mentor sessions, and turn your matched team into a shipped product.",
    detail: "Real-time collaboration",
    icon: "🚀",
    color: "#22c55e",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,106,61,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(184,155,106,0.1)",
            border: "1px solid rgba(184,155,106,0.2)",
            borderRadius: 999,
            padding: "5px 16px",
            fontSize: 11,
            color: "#d4b880",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          How it works
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 400,
            color: "#FFFFFF",
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          From zero to<br />
          <span style={{ color: "#b89b6a" }}>shipped project</span>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 16,
            color: "#6C7075",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Three simple steps separate you from your next great collab.
        </p>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          position: "relative",
        }}
      >
        {/* Connecting line (desktop) */}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: "calc(16.66% + 24px)",
            right: "calc(16.66% + 24px)",
            height: 1,
            background: "linear-gradient(90deg, rgba(255,106,61,0.3), rgba(184,155,106,0.3), rgba(34,197,94,0.3))",
            pointerEvents: "none",
          }}
          className="desktop-line"
        />

        {steps.map((step, i) => (
          <div
            key={step.number}
            style={{
              textAlign: "center",
              padding: "0 16px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}
          >
            {/* Step circle */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `${step.color}12`,
                border: `2px solid ${step.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                position: "relative",
                boxShadow: `0 0 30px ${step.color}15`,
              }}
            >
              <span style={{ fontSize: 32 }}>{step.icon}</span>
              {/* Step number badge */}
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: step.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontWeight: 500,
                  color: "#fff",
                  border: "2px solid #0F1115",
                }}
              >
                {i + 1}
              </div>
            </div>

            {/* Step number text */}
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                color: step.color,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 10,
                opacity: 0.7,
              }}
            >
              Step {step.number}
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#FFFFFF",
                margin: "0 0 14px",
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 14,
                color: "#B0B3B8",
                lineHeight: 1.7,
                margin: "0 0 16px",
                maxWidth: 300,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {step.description}
            </p>

            {/* Detail chip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: `${step.color}10`,
                border: `1px solid ${step.color}22`,
                borderRadius: 999,
                padding: "5px 14px",
                fontSize: 12,
                color: step.color,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                animation: "chip-pop 0.6s ease forwards",
              }}
            >
              <span>✓</span>
              {step.detail}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes chip-pop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .desktop-line {
          display: block;
        }
        @media (max-width: 768px) {
          .desktop-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}