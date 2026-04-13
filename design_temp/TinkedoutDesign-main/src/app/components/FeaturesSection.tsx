import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "🎯",
    title: "Smart Match Engine",
    description:
      "Radar-based discovery powered by Jaccard similarity scoring. Finds people who share your exact tech interests, weighted by rarity.",
    pills: ["AI Matching", "Interest Graph", "Radar UI"],
    accent: "#FF6A3D",
    highlight: true,
  },
  {
    icon: "🃏",
    title: "Swipe Discovery",
    description:
      "Tinder-style card deck with physics-based drag. Swipe right to connect, left to skip. Full touch + mouse support with confetti on match.",
    pills: ["Drag Physics", "Card Stack", "Confetti"],
    accent: "#b89b6a",
  },
  {
    icon: "💬",
    title: "Real-time Chat",
    description:
      "1:1 instant messaging with typing indicators, animated bubbles, and auto-reactions. Your matched teammates are just a message away.",
    pills: ["Live Typing", "Message Bubbles", "Online Status"],
    accent: "#3b82f6",
  },
  {
    icon: "⚡",
    title: "Collab Channels",
    description:
      "Discord-style project rooms. Create channels, pin messages, add emoji reactions, and see who's online in your team right now.",
    pills: ["Channels", "Reactions", "Members"],
    accent: "#8b5cf6",
  },
  {
    icon: "🎓",
    title: "Mentor Connect",
    description:
      "Book 1-on-1 sessions with senior engineers. Browse by domain, check availability on a live calendar, and confirm your slot instantly.",
    pills: ["Booking", "Calendar", "Reviews"],
    accent: "#22c55e",
  },
  {
    icon: "🚀",
    title: "Onboarding Flow",
    description:
      "3-step interest picker guides you to your niche. Choose your stack, set your collab style, and hit the ground running on day one.",
    pills: ["18 Tags", "Role Select", "Profile Setup"],
    accent: "#FF6A3D",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: hovered
          ? `1px solid ${feature.accent}44`
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "28px 28px 24px",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease`,
        boxShadow: hovered ? `0 8px 40px ${feature.accent}18` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow spot on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${feature.accent}18 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `${feature.accent}18`,
          border: `1px solid ${feature.accent}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          marginBottom: 20,
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 400,
          color: "#FFFFFF",
          margin: "0 0 10px",
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          color: "#B0B3B8",
          lineHeight: 1.7,
          margin: "0 0 20px",
        }}
      >
        {feature.description}
      </p>

      {/* Pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {feature.pills.map((pill) => (
          <span
            key={pill}
            style={{
              background: `${feature.accent}14`,
              border: `1px solid ${feature.accent}28`,
              borderRadius: 999,
              padding: "4px 12px",
              fontSize: 11,
              color: feature.accent,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div
        ref={titleRef}
        style={{
          textAlign: "center",
          marginBottom: 64,
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,106,61,0.1)",
            border: "1px solid rgba(255,106,61,0.2)",
            borderRadius: 999,
            padding: "5px 16px",
            fontSize: 11,
            color: "#FF8C66",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Platform Features
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
          Everything you need to<br />
          <span style={{ color: "#FF6A3D" }}>build your dream team</span>
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
          Six powerful screens, one seamless experience. From first swipe to shipped project.
        </p>
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
