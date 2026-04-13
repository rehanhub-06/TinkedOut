import { useEffect, useRef, useState } from "react";

const cards = [
  {
    initials: "AK",
    name: "Arjun Kumar",
    role: "Full Stack Dev · VIT-AP · Year 3",
    skills: ["React", "Node.js", "PostgreSQL"],
    bio: "Building scalable web apps and exploring ML systems...",
    match: 91,
    gradient: ["#FF6A3D", "#FF8C66"],
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "ML Engineer · NIT Trichy · Year 4",
    skills: ["Python", "TensorFlow", "FastAPI"],
    bio: "Obsessed with NLP and deploying models at scale...",
    match: 84,
    gradient: ["#8b5cf6", "#a78bfa"],
  },
  {
    initials: "RV",
    name: "Rahul Verma",
    role: "DevOps Engineer · BITS Pilani · Year 3",
    skills: ["Kubernetes", "AWS", "Docker"],
    bio: "Automating everything, one pipeline at a time...",
    match: 78,
    gradient: ["#3b82f6", "#60a5fa"],
  },
];

function getGradient(gradient: string[]) {
  return `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`;
}

export function SwipePreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [topCard, setTopCard] = useState(0);
  const [swiping, setSwiping] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSwipe = (dir: "left" | "right") => {
    setSwiping(dir);
    setTimeout(() => {
      setTopCard((prev) => (prev + 1) % cards.length);
      setSwiping(null);
    }, 400);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "80px 24px 100px",
        position: "relative",
        zIndex: 1,
        background: "rgba(21,24,33,0.5)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
        className="flex-col-mobile"
      >
        {/* Left: Text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
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
            Swipe Discovery
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(30px, 4vw, 46px)",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: "0 0 20px",
              lineHeight: 1.25,
            }}
          >
            Find teammates<br />
            <span style={{ color: "#b89b6a" }}>faster than ever</span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 15,
              color: "#B0B3B8",
              lineHeight: 1.75,
              margin: "0 0 32px",
              maxWidth: 420,
            }}
          >
            Swipe through a curated deck of engineers matched to your interests. Our algorithm uses Jaccard similarity with rarity weighting — so rare interests get you better matches.
          </p>

          {/* Feature list */}
          {[
            "Physics-based drag & drop (mouse + touch)",
            "CONNECT / SKIP stamp overlays",
            "Confetti burst on mutual match",
            "Instant chat opens on connect",
          ].map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "rgba(255,106,61,0.15)",
                  border: "1px solid rgba(255,106,61,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: "#FF6A3D",
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: "#B0B3B8" }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Card preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(30px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {/* Card stack */}
          <div style={{ position: "relative", width: 320, height: 420 }}>
            {/* Cards behind */}
            {[2, 1].map((offset) => {
              const idx = (topCard + offset) % cards.length;
              const card = cards[idx];
              return (
                <div
                  key={`bg-${offset}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#151821",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 24,
                    transform: `scale(${1 - offset * 0.03}) translateY(${offset * -12}px)`,
                    transition: "transform 0.3s ease",
                    zIndex: offset === 1 ? 1 : 0,
                    overflow: "hidden",
                    opacity: 1 - offset * 0.15,
                  }}
                >
                  <div style={{ height: "45%", background: getGradient(card.gradient), opacity: 0.6 }} />
                </div>
              );
            })}

            {/* Top card */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#151821",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                overflow: "hidden",
                zIndex: 3,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                transform: swiping === "right"
                  ? "translateX(160%) rotate(30deg)"
                  : swiping === "left"
                  ? "translateX(-160%) rotate(-30deg)"
                  : "translateX(0) rotate(0deg)",
                transition: swiping ? "transform 0.4s cubic-bezier(0.4,0,1,1)" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "grab",
              }}
            >
              {/* Avatar zone */}
              <div
                style={{
                  height: "45%",
                  background: getGradient(cards[topCard].gradient),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.25)",
                    border: "3px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {cards[topCard].initials}
                </div>
                {/* Match badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "rgba(15,17,21,0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,106,61,0.4)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontSize: 12,
                    color: "#FF6A3D",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {cards[topCard].match}% match
                </div>
              </div>

              {/* Info zone */}
              <div style={{ padding: "18px 20px 20px" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 20,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {cards[topCard].name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 12,
                    color: "#6C7075",
                    marginBottom: 14,
                  }}
                >
                  {cards[topCard].role}
                </div>

                {/* Skills */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {cards[topCard].skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontSize: 11,
                        color: "#B0B3B8",
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <div
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 13,
                    color: "#6C7075",
                    lineHeight: 1.5,
                  }}
                >
                  {cards[topCard].bio}
                </div>

                {/* Match bar */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${cards[topCard].match}%`,
                        background: "linear-gradient(90deg, #FF6A3D, #FF8C66)",
                        borderRadius: 999,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <button
              onClick={() => handleSwipe("left")}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#ef4444",
                fontSize: 22,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
            >
              ✕
            </button>
            <button
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(184,155,106,0.15)",
                border: "1px solid rgba(184,155,106,0.3)",
                color: "#b89b6a",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",
                animation: "float-btn 2s ease-in-out infinite",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              ★
            </button>
            <button
              onClick={() => handleSwipe("right")}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(255,106,61,0.12)",
                border: "1px solid rgba(255,106,61,0.3)",
                color: "#FF6A3D",
                fontSize: 22,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,106,61,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              ♥
            </button>
          </div>

          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 12, color: "#6C7075", textAlign: "center" }}>
            Try swiping the card ↑
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float-btn {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @media (max-width: 768px) {
          .flex-col-mobile {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
