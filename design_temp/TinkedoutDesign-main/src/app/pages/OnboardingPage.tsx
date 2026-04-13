import { useState } from "react";
import { useNavigate } from "react-router";
import { AnimatedBackground } from "../components/AnimatedBackground";

const INTERESTS = [
  "AI/ML","Web Dev","Cloud","DevOps","Cybersecurity","Blockchain",
  "Mobile","Game Dev","Data Science","AR/VR","IoT","Embedded",
  "UI/UX","Open Source","Competitive Prog.","Research","Robotics","FinTech",
];
const ROLES = [
  { id: "student", icon: "🎓", label: "Student", desc: "Looking to learn & build" },
  { id: "mentor", icon: "🏆", label: "Mentor", desc: "Ready to guide others" },
  { id: "both", icon: "🔄", label: "Both", desc: "Learn & teach at once" },
];
const COLLAB_STYLES = [
  { id: "hackathon", icon: "⚡", label: "Hackathons" },
  { id: "sideproject", icon: "🛠️", label: "Side Projects" },
  { id: "research", icon: "🔬", label: "Research" },
  { id: "startup", icon: "🚀", label: "Startup" },
];
const AVAILABILITY = [
  { id: "weekends", icon: "📅", label: "Weekends only" },
  { id: "evenings", icon: "🌙", label: "Evenings (weekdays)" },
  { id: "flexible", icon: "⏰", label: "Flexible" },
  { id: "fulltime", icon: "💼", label: "Full-time" },
];
const AVATAR_GRADIENTS = [
  ["#FF6A3D","#FF8C66"],["#8b5cf6","#a78bfa"],["#3b82f6","#60a5fa"],
  ["#22c55e","#4ade80"],["#ec4899","#f472b6"],["#f59e0b","#fbbf24"],
  ["#06b6d4","#22d3ee"],["#e11d48","#fb7185"],
];
const DEPARTMENTS = ["Computer Science","Electronics","Mechanical","Civil","Chemical","Biomedical","Information Technology","Other"];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [role, setRole] = useState("student");
  const [collabStyles, setCollabStyles] = useState<Set<string>>(new Set());
  const [availability, setAvailability] = useState("flexible");
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [dept, setDept] = useState("Computer Science");

  const toggleInterest = (i: string) => {
    setInterests(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  const toggleCollab = (c: string) => {
    setCollabStyles(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });
  };

  const stepTitles = ["What do you build?", "What's your vibe?", "Set up your profile"];
  const progress = ((step) / 3) * 100;

  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onClick}
        style={{
          background: active ? "rgba(255,106,61,0.12)" : hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
          border: active ? "1px solid rgba(255,106,61,0.45)" : "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999, padding: "9px 18px", fontSize: 13,
          color: active ? "#FF8C66" : "#B0B3B8",
          cursor: "pointer", fontFamily: "'DM Sans',system-ui,sans-serif",
          boxShadow: active ? "0 0 12px rgba(255,106,61,0.2)" : "none",
          transform: active ? "scale(1.05)" : hov ? "scale(1.02)" : "scale(1)",
          transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >{children}</button>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F1115", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative" }}>
      <AnimatedBackground />

      <div style={{
        width: "100%", maxWidth: 620, position: "relative", zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#FF6A3D,#FF8C66)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(255,106,61,0.4)" }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", color: "#fff", fontSize: 18, fontWeight: 700 }}>T</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>TinkedOut</span>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 12, display: "flex", gap: 8, justifyContent: "center" }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i <= step ? "#FF6A3D" : "rgba(255,255,255,0.08)", transition: "background 0.4s ease", maxWidth: 120 }} />
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#6C7075", marginBottom: 32, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
          Step {step + 1} of 3
        </p>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px",
        }}>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 400, color: "#FFFFFF", margin: "0 0 8px", textAlign: "center" }}>
            {stepTitles[step]}
          </h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#6C7075", marginBottom: 32, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
            {step === 0 && "Pick all that apply — this powers your match score"}
            {step === 1 && "Tell us how you like to work"}
            {step === 2 && "Almost done — make yourself discoverable"}
          </p>

          {/* STEP 1: Interests */}
          {step === 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {INTERESTS.map(i => (
                <Chip key={i} active={interests.has(i)} onClick={() => toggleInterest(i)}>
                  {interests.has(i) ? "✓ " : "+ "}{i}
                </Chip>
              ))}
            </div>
          )}

          {/* STEP 2: Vibe */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans',system-ui,sans-serif" }}>Your role</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                {ROLES.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)} style={{
                    flex: 1, background: role === r.id ? "rgba(255,106,61,0.1)" : "rgba(255,255,255,0.04)",
                    border: role === r.id ? "1px solid rgba(255,106,61,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14, padding: "16px 12px", cursor: "pointer", textAlign: "center",
                    transition: "all 0.2s ease",
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{r.icon}</div>
                    <div style={{ fontSize: 13, color: role === r.id ? "#FF8C66" : "#FFFFFF", fontWeight: 500, marginBottom: 2 }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: "#6C7075" }}>{r.desc}</div>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans',system-ui,sans-serif" }}>Collab style (pick all)</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
                {COLLAB_STYLES.map(c => (
                  <Chip key={c.id} active={collabStyles.has(c.id)} onClick={() => toggleCollab(c.id)}>
                    {c.icon} {c.label}
                  </Chip>
                ))}
              </div>

              <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans',system-ui,sans-serif" }}>Availability</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {AVAILABILITY.map(a => (
                  <Chip key={a.id} active={availability === a.id} onClick={() => setAvailability(a.id)}>
                    {a.icon} {a.label}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Profile setup */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: 12, color: "#6C7075", marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans',system-ui,sans-serif" }}>Choose your avatar color</p>
              <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
                {AVATAR_GRADIENTS.map((g, i) => (
                  <button key={i} onClick={() => setAvatarIdx(i)} style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: `linear-gradient(135deg,${g[0]},${g[1]})`,
                    border: avatarIdx === i ? "3px solid #FFFFFF" : "3px solid transparent",
                    cursor: "pointer", boxShadow: avatarIdx === i ? `0 0 16px ${g[0]}80` : "none",
                    transition: "all 0.2s ease",
                    transform: avatarIdx === i ? "scale(1.15)" : "scale(1)",
                    padding: 0,
                  }} />
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, color: "#B0B3B8", marginBottom: 6, fontFamily: "'DM Sans',system-ui,sans-serif" }}>Display name</label>
                <input
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Arjun Kumar"
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                    color: "#FFFFFF", padding: "12px 14px", fontSize: 14,
                    fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, color: "#B0B3B8", marginBottom: 6, fontFamily: "'DM Sans',system-ui,sans-serif" }}>Bio <span style={{ color: "#6C7075" }}>({bio.length}/140)</span></label>
                <textarea
                  value={bio}
                  onChange={e => e.target.value.length <= 140 && setBio(e.target.value)}
                  placeholder="Tell people what you're building..."
                  rows={3}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                    color: "#FFFFFF", padding: "12px 14px", fontSize: 14,
                    fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
                    resize: "none", boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, color: "#B0B3B8", marginBottom: 6, fontFamily: "'DM Sans',system-ui,sans-serif" }}>Department</label>
                <select
                  value={dept}
                  onChange={e => setDept(e.target.value)}
                  style={{
                    width: "100%", background: "#1a1d26",
                    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                    color: "#FFFFFF", padding: "12px 14px", fontSize: 14,
                    fontFamily: "'DM Sans',system-ui,sans-serif", outline: "none",
                    boxSizing: "border-box", cursor: "pointer",
                  }}
                >
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                flex: "0 0 auto", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                color: "#B0B3B8", padding: "13px 24px", fontSize: 14,
                fontFamily: "'DM Sans',system-ui,sans-serif", cursor: "pointer",
                transition: "all 0.2s ease",
              }}>← Back</button>
            )}
            <button
              onClick={() => step < 2 ? setStep(s => s + 1) : navigate("/app/swipe")}
              style={{
                flex: 1, background: "#FF6A3D", border: "none", borderRadius: 12,
                color: "#FFFFFF", padding: "13px",
                fontSize: 15, fontFamily: "'DM Sans',system-ui,sans-serif",
                fontWeight: 500, cursor: "pointer",
                boxShadow: "0 0 28px rgba(255,106,61,0.35)",
                transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.01)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(255,106,61,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 28px rgba(255,106,61,0.35)"; }}
            >
              {step < 2 ? "Continue →" : "Enter TinkedOut →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
