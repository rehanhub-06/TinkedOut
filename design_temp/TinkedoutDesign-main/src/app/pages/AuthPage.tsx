import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AnimatedBackground } from "../components/AnimatedBackground";

const featurePills = [
  { icon: "🎯", text: "Smart interest matching algorithm" },
  { icon: "🃏", text: "Tinder-style team discovery" },
  { icon: "⚡", text: "Discord-style collab channels" },
  { icon: "🎓", text: "Book 1:1 sessions with mentors" },
];

function PasswordStrength({ password }: { password: string }) {
  const getScore = () => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const score = getScore();
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i < score ? colors[score - 1] : "rgba(255,255,255,0.1)", transition: "background 0.3s ease" }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: score > 0 ? colors[score - 1] : "#6C7075", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {score > 0 ? labels[score - 1] : ""}
      </span>
    </div>
  );
}

function InputField({ label, type = "text", placeholder, value, onChange }: { label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void; }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, color: "#B0B3B8", fontFamily: "'DM Sans', system-ui, sans-serif", marginBottom: 6, letterSpacing: "0.03em" }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "#FF6A3D" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 10,
          color: "#FFFFFF",
          padding: "12px 14px",
          fontSize: 14,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(255,106,61,0.15)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    if (tab === "signup") navigate("/onboarding");
    else navigate("/app/swipe");
  };

  const OAuthBtn = ({ icon, label }: { icon: string; label: string }) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1,
          background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          color: "#FFFFFF",
          padding: "11px 12px",
          fontSize: 13,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transform: hov ? "translateY(-2px)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontSize: 16 }}>{icon}</span>{label}
      </button>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F1115", display: "flex", fontFamily: "'DM Sans', system-ui, sans-serif", position: "relative" }}>
      <AnimatedBackground />

      {/* Left panel */}
      <div
        style={{
          flex: "0 0 50%",
          background: "#151821",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
        className="auth-left"
      >
        {/* Watermark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 360, fontWeight: 700,
          color: "rgba(255,255,255,0.025)",
          pointerEvents: "none", userSelect: "none", lineHeight: 1,
          whiteSpace: "nowrap",
        }}>TO</div>

        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 48,
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-10px)",
          transition: "all 0.5s ease",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg,#FF6A3D,#FF8C66)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 24px rgba(255,106,61,0.4)",
          }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", color: "#fff", fontSize: 20, fontWeight: 700 }}>T</span>
          </div>
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>TinkedOut</span>
        </div>

        {/* Hero headline */}
        <h1
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 400,
            color: "#FFFFFF", margin: "0 0 16px", lineHeight: 1.25,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          Build better teams,<br />find your <span style={{ color: "#FF6A3D" }}>match.</span>
        </h1>
        <p style={{
          fontSize: 15, color: "#B0B3B8", lineHeight: 1.7, marginBottom: 40, maxWidth: 380,
          opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
        }}>
          Join 2,400+ engineering students already discovering teammates, mentors, and projects.
        </p>

        {/* Feature pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {featurePills.map((p, i) => (
            <div key={p.text} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "12px 16px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateX(-16px)",
              transition: `all 0.5s ease ${0.2 + i * 0.1}s`,
            }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <span style={{ fontSize: 13, color: "#B0B3B8" }}>{p.text}</span>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          opacity: mounted ? 0.6 : 0, transition: "opacity 0.6s ease 0.7s",
        }}>
          {["AK","PS","RV","NK","AS"].map((ini, i) => (
            <div key={ini} style={{
              width: 28, height: 28, borderRadius: "50%",
              background: ["#FF6A3D","#8b5cf6","#3b82f6","#22c55e","#ec4899"][i],
              border: "2px solid #151821",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: "#fff",
              marginLeft: i > 0 ? -8 : 0,
            }}>{ini}</div>
          ))}
          <span style={{ fontSize: 12, color: "#6C7075", marginLeft: 8 }}>
            Trusted by <strong style={{ color: "#B0B3B8" }}>2,400+</strong> engineers
          </span>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "48px 40px", background: "#1a1d26", zIndex: 1, position: "relative",
      }} className="auth-right">
        <div style={{
          width: "100%", maxWidth: 420,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24, padding: "36px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(24px)",
          transition: "all 0.6s ease 0.15s",
        }}>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 400, color: "#FFFFFF", margin: "0 0 8px" }}>
            {tab === "signin" ? "Welcome back" : "Join TinkedOut"}
          </h2>
          <p style={{ fontSize: 14, color: "#6C7075", marginBottom: 28 }}>
            {tab === "signin" ? "Sign in to continue building." : "Create your account in 2 minutes."}
          </p>

          {/* OAuth */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            <OAuthBtn icon="G" label="Google" />
            <OAuthBtn icon="⌥" label="GitHub" />
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            <span style={{ fontSize: 12, color: "#6C7075", whiteSpace: "nowrap" }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* Tab switcher */}
          <div style={{
            display: "flex", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10,
            padding: 4, marginBottom: 24, position: "relative",
          }}>
            {(["signin","signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "9px",
                background: tab === t ? "rgba(255,255,255,0.08)" : "transparent",
                border: "none", borderRadius: 8, cursor: "pointer",
                color: tab === t ? "#FFFFFF" : "#6C7075",
                fontSize: 13, fontFamily: "'DM Sans',system-ui,sans-serif",
                fontWeight: tab === t ? 500 : 400,
                transition: "all 0.2s ease",
              }}>
                {t === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Sign in form */}
          {tab === "signin" && (
            <div>
              <InputField label="Email" type="email" placeholder="you@university.edu" value={email} onChange={setEmail} />
              <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />
              <div style={{ textAlign: "right", marginTop: -8, marginBottom: 20 }}>
                <a href="#" style={{ fontSize: 12, color: "#FF8C66", textDecoration: "none" }}>Forgot password?</a>
              </div>
            </div>
          )}

          {/* Sign up form */}
          {tab === "signup" && (
            <div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <InputField label="First name" placeholder="Arjun" value={firstName} onChange={setFirstName} />
                </div>
                <div style={{ flex: 1 }}>
                  <InputField label="Last name" placeholder="Kumar" value={lastName} onChange={setLastName} />
                </div>
              </div>
              <InputField label="Email" type="email" placeholder="you@university.edu" value={email} onChange={setEmail} />
              <InputField label="Password" type="password" placeholder="Create a password" value={password} onChange={setPassword} />
              <PasswordStrength password={password} />
              <p style={{ fontSize: 11, color: "#6C7075", marginTop: 16, lineHeight: 1.6 }}>
                By creating an account you agree to our{" "}
                <a href="#" style={{ color: "#FF8C66", textDecoration: "none" }}>Terms</a>{" "}and{" "}
                <a href="#" style={{ color: "#FF8C66", textDecoration: "none" }}>Privacy Policy</a>.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", marginTop: 20,
              background: loading ? "rgba(255,106,61,0.6)" : "#FF6A3D",
              border: "none", borderRadius: 12,
              color: "#FFFFFF", padding: "14px",
              fontSize: 15, fontFamily: "'DM Sans',system-ui,sans-serif",
              fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 28px rgba(255,106,61,0.35)",
              transition: "all 0.2s ease",
              position: "relative", overflow: "hidden",
            }}
          >
            {loading ? "..." : tab === "signin" ? "Sign in →" : "Create account →"}
          </button>

          {/* Guest mode */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#6C7075" }}>
            Want to explore first?{" "}
            <button onClick={() => navigate("/app/swipe")} style={{
              background: "none", border: "none", color: "#FF8C66",
              cursor: "pointer", fontSize: 13, padding: 0,
              fontFamily: "'DM Sans',system-ui,sans-serif",
            }}>
              Continue as guest
            </button>
          </p>
        </div>
      </div>

      {/* Back to landing */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, color: "#B0B3B8",
          padding: "8px 16px", fontSize: 13,
          fontFamily: "'DM Sans',system-ui,sans-serif",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          transition: "all 0.2s ease",
        }}
      >
        ← Back
      </button>

      <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
          .auth-right { flex: 1 !important; }
        }
      `}</style>
    </div>
  );
}
