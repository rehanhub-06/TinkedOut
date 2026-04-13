import { useEffect, useRef, useState } from "react";

const mentors = [
  {
    initials: "RM",
    name: "Rohan Mehta",
    domain: "AI/ML · Computer Vision",
    rate: "₹500/hr",
    rating: 4.9,
    reviews: 42,
    bio: "I help students ship ML projects fast. Ex-Google, IIT Bombay alum.",
    skills: ["React", "TensorFlow", "Python"],
    gradient: ["#FF6A3D", "#FF8C66"],
    available: true,
  },
  {
    initials: "NK",
    name: "Neha Kapoor",
    domain: "Full Stack · Cloud Architecture",
    rate: "₹400/hr",
    rating: 4.8,
    reviews: 31,
    bio: "AWS Solutions Architect. Love helping juniors crack system design.",
    skills: ["AWS", "Node.js", "Docker"],
    gradient: ["#8b5cf6", "#a78bfa"],
    available: true,
  },
  {
    initials: "AS",
    name: "Aditya Singh",
    domain: "DevOps · Kubernetes",
    rate: "₹350/hr",
    rating: 4.7,
    reviews: 28,
    bio: "Platform Engineer at Razorpay. Teaching infra from zero to hero.",
    skills: ["K8s", "Terraform", "CI/CD"],
    gradient: ["#3b82f6", "#60a5fa"],
    available: false,
  },
  {
    initials: "PJ",
    name: "Priya Joshi",
    domain: "UI/UX · Design Systems",
    rate: "₹450/hr",
    rating: 5.0,
    reviews: 19,
    bio: "Lead Designer at Swiggy. Making interfaces that people actually love.",
    skills: ["Figma", "React", "Motion"],
    gradient: ["#ec4899", "#f472b6"],
    available: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#b89b6a", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 > 0 ? "½" : ""}
    </span>
  );
}

function MentorRow({ mentor, index, visible }: { mentor: typeof mentors[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "24px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-2px)" : "translateY(0)"
          : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.3s ease`,
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Accent bar on hover */}
      <div
        style={{
          position: "absolute",
          left: -24,
          top: 0,
          bottom: 0,
          width: 3,
          borderRadius: 999,
          background: "#FF6A3D",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Avatar */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${mentor.gradient[0]}, ${mentor.gradient[1]})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          flexShrink: 0,
          boxShadow: hovered ? `0 0 20px ${mentor.gradient[0]}40` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {mentor.initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 17,
              color: "#FFFFFF",
            }}
          >
            {mentor.name}
          </span>
          {mentor.available && (
            <div
              style={{
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 999,
                padding: "2px 10px",
                fontSize: 10,
                color: "#22c55e",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Available
            </div>
          )}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            color: "#6C7075",
            marginBottom: 8,
          }}
        >
          {mentor.domain} &nbsp;·&nbsp; <StarRating rating={mentor.rating} /> {mentor.rating} ({mentor.reviews})
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            color: "#B0B3B8",
            marginBottom: 10,
          }}
        >
          "{mentor.bio}"
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {mentor.skills.map((skill) => (
            <span
              key={skill}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
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
      </div>

      {/* Rate + CTA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 18,
            color: "#FFFFFF",
          }}
        >
          {mentor.rate}
        </div>
        <button
          style={{
            background: hovered ? "#FF6A3D" : "rgba(255,106,61,0.1)",
            border: "1px solid rgba(255,106,61,0.3)",
            borderRadius: 999,
            color: hovered ? "#fff" : "#FF6A3D",
            padding: "8px 20px",
            fontSize: 13,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
            boxShadow: hovered ? "0 0 20px rgba(255,106,61,0.35)" : "none",
            whiteSpace: "nowrap",
          }}
        >
          Book →
        </button>
      </div>
    </div>
  );
}

export function MentorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mentors"
      ref={sectionRef}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
          alignItems: "start",
        }}
        className="mentor-grid"
      >
        {/* Left: header */}
        <div
          style={{
            position: "sticky",
            top: 100,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 999,
              padding: "5px 16px",
              fontSize: 11,
              color: "#22c55e",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Mentor Connect
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            Learn from<br />
            <span style={{ color: "#22c55e" }}>engineers</span><br />
            who've shipped
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 14,
              color: "#B0B3B8",
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Book 1-on-1 sessions with senior engineers across every domain. Real mentors, real projects, real growth.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              { icon: "📅", text: "Live availability calendar" },
              { icon: "⭐", text: "Verified ratings & reviews" },
              { icon: "💳", text: "Pay only after booking" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 13,
                  color: "#B0B3B8",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: mentor list */}
        <div style={{ paddingLeft: 24, borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
          {/* Search bar */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              marginBottom: 8,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            <span style={{ color: "#6C7075", fontSize: 16 }}>🔍</span>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 14, color: "#6C7075" }}>
              Search by skill or domain...
            </span>
          </div>

          {/* Filter chips */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 24,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.15s",
            }}
          >
            {["All", "AI/ML", "Web Dev", "DevOps", "Design"].map((chip, i) => (
              <div
                key={chip}
                style={{
                  background: i === 0 ? "rgba(255,106,61,0.12)" : "rgba(255,255,255,0.04)",
                  border: i === 0 ? "1px solid rgba(255,106,61,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  padding: "5px 14px",
                  fontSize: 12,
                  color: i === 0 ? "#FF6A3D" : "#B0B3B8",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  cursor: "pointer",
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          {/* Mentor rows */}
          <div>
            {mentors.map((mentor, i) => (
              <MentorRow key={mentor.name} mentor={mentor} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mentor-grid {
            grid-template-columns: 1fr !important;
          }
          .mentor-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
