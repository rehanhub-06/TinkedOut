import { useEffect, useRef, useState } from "react";

const interests = [
  "AI/ML", "Web Dev", "Cloud", "DevOps", "Cybersecurity",
  "Blockchain", "Mobile", "Game Dev", "Data Science", "AR/VR",
  "IoT", "Embedded", "UI/UX", "Open Source", "Competitive Prog.",
  "Research", "Robotics", "FinTech",
];

const testimonials = [
  {
    initials: "SA",
    name: "Sanya Agarwal",
    role: "Final Year · IIIT Hyderabad",
    text: "Found my hackathon team through TinkedOut in under 10 minutes. We shipped a full SaaS MVP in 36 hours and won. This platform is insane.",
    gradient: ["#FF6A3D", "#FF8C66"],
  },
  {
    initials: "KR",
    name: "Karan Reddy",
    role: "Year 2 · NIT Warangal",
    text: "The mentor feature is 🔥. Booked a session with Rohan, completely changed how I approach ML deployment. Worth every rupee.",
    gradient: ["#8b5cf6", "#a78bfa"],
  },
  {
    initials: "MB",
    name: "Meera Bhat",
    role: "Year 3 · VIT Chennai",
    text: "I matched with a DevOps engineer from BITS. We've been collaborating for 3 months now — built two open-source tools together.",
    gradient: ["#22c55e", "#4ade80"],
  },
];

export function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeChips, setActiveChips] = useState<Set<number>>(new Set([0, 3, 7, 12]));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleChip = (i: number) => {
    setActiveChips((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section
      id="community"
      ref={sectionRef}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        background: "rgba(21,24,33,0.4)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 999,
              padding: "5px 16px",
              fontSize: 11,
              color: "#60a5fa",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Community
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
            Built by builders,<br />
            <span style={{ color: "#60a5fa" }}>for builders</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 16,
              color: "#6C7075",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            2,400+ engineers from 80+ colleges have found their people here.
          </p>
        </div>

        {/* Interest chip picker */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              color: "#6C7075",
              marginBottom: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            What do you build? Select your interests ↓
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {interests.map((interest, i) => {
              const active = activeChips.has(i);
              return (
                <button
                  key={interest}
                  onClick={() => toggleChip(i)}
                  style={{
                    background: active ? "rgba(255,106,61,0.12)" : "rgba(255,255,255,0.04)",
                    border: active ? "1px solid rgba(255,106,61,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 999,
                    padding: "8px 18px",
                    fontSize: 13,
                    color: active ? "#FF8C66" : "#B0B3B8",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    cursor: "pointer",
                    boxShadow: active ? "0 0 12px rgba(255,106,61,0.2)" : "none",
                    transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: active ? "scale(1.05)" : "scale(1)",
                    opacity: visible ? 1 : 0,
                    animation: visible ? `chip-pop 0.4s ease ${i * 0.04}s both` : "none",
                  }}
                >
                  {active ? "✓ " : "+"} {interest}
                </button>
              );
            })}
          </div>
          {activeChips.size > 0 && (
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: "#FF8C66",
                marginTop: 16,
                animation: "fade-in 0.3s ease",
              }}
            >
              {activeChips.size} interest{activeChips.size !== 1 ? "s" : ""} selected — find your match →
            </p>
          )}
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "28px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
              }}
            >
              {/* Stars */}
              <div style={{ color: "#b89b6a", fontSize: 14, marginBottom: 16 }}>★★★★★</div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  color: "#B0B3B8",
                  lineHeight: 1.7,
                  margin: "0 0 24px",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#6C7075" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes chip-pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
