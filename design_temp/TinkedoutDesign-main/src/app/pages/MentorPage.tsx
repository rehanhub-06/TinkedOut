import { useState } from "react";

const MENTORS = [
  { id:"1", initials:"RM", name:"Rohan Mehta", domain:"AI/ML · Computer Vision", rate:"₹500/hr", rating:4.9, reviews:42, bio:"I help students ship ML projects fast. Ex-Google, IIT Bombay alum.", skills:["React","TensorFlow","Python","OpenCV"], gradient:["#FF6A3D","#FF8C66"], available:true, experience:"5 yrs", sessions:156 },
  { id:"2", initials:"NK", name:"Neha Kapoor", domain:"Full Stack · Cloud Architecture", rate:"₹400/hr", rating:4.8, reviews:31, bio:"AWS Solutions Architect. Love helping juniors crack system design interviews.", skills:["AWS","Node.js","Docker","PostgreSQL"], gradient:["#8b5cf6","#a78bfa"], available:true, experience:"4 yrs", sessions:98 },
  { id:"3", initials:"AS", name:"Aditya Singh", domain:"DevOps · Platform Engineering", rate:"₹350/hr", rating:4.7, reviews:28, bio:"Platform Engineer at Razorpay. Teaching infra from zero to hero.", skills:["K8s","Terraform","CI/CD","Linux"], gradient:["#3b82f6","#60a5fa"], available:false, experience:"6 yrs", sessions:74 },
  { id:"4", initials:"PJ", name:"Priya Joshi", domain:"UI/UX · Design Systems", rate:"₹450/hr", rating:5.0, reviews:19, bio:"Lead Designer at Swiggy. Making interfaces that people actually love.", skills:["Figma","React","Motion","Accessibility"], gradient:["#ec4899","#f472b6"], available:true, experience:"3 yrs", sessions:62 },
  { id:"5", initials:"VK", name:"Vijay Kumar", domain:"Cybersecurity · Ethical Hacking", rate:"₹550/hr", rating:4.6, reviews:22, bio:"OSCP certified. Building the next generation of security-aware developers.", skills:["Pentesting","Python","Rust","CTF"], gradient:["#f59e0b","#fbbf24"], available:true, experience:"7 yrs", sessions:43 },
];

const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM","4:00 PM","6:00 PM","7:00 PM"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const AVAILABLE_SLOTS = new Set(["Mon-9:00 AM","Mon-2:00 PM","Tue-10:00 AM","Tue-3:00 PM","Wed-11:00 AM","Thu-9:00 AM","Thu-6:00 PM","Fri-10:00 AM","Fri-4:00 PM","Sat-11:00 AM","Sat-2:00 PM","Sat-3:00 PM"]);

function getGrad(g: string[]) { return `linear-gradient(135deg,${g[0]},${g[1]})`; }
function Stars({ r }: { r: number }) {
  return <span style={{ color: "#b89b6a" }}>{"★".repeat(Math.floor(r))}</span>;
}

export function MentorPage() {
  const [selected, setSelected] = useState<typeof MENTORS[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const filters = ["All","AI/ML","Full Stack","DevOps","Design","Security"];
  const filtered = MENTORS.filter(m => {
    if (activeFilter !== "All" && !m.domain.toLowerCase().includes(activeFilter.toLowerCase())) return false;
    if (searchVal && !m.name.toLowerCase().includes(searchVal.toLowerCase()) && !m.domain.toLowerCase().includes(searchVal.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", padding: "32px 32px 60px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: "#FFFFFF", margin: "0 0 6px" }}>Mentor Connect</h1>
        <p style={{ fontSize: 14, color: "#6C7075" }}>Book 1-on-1 sessions with engineers who've shipped real products</p>
      </div>

      {/* Search + filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
        <div style={{
          flex: "1 1 240px", display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, padding: "11px 14px",
        }}>
          <span style={{ color: "#6C7075" }}>🔍</span>
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search by name or skill..."
            style={{
              background: "none", border: "none", outline: "none",
              color: "#FFFFFF", fontSize: 14, fontFamily: "'DM Sans',system-ui,sans-serif",
              flex: 1,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              background: activeFilter === f ? "rgba(255,106,61,0.12)" : "rgba(255,255,255,0.04)",
              border: activeFilter === f ? "1px solid rgba(255,106,61,0.35)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999, padding: "8px 18px", fontSize: 13,
              color: activeFilter === f ? "#FF8C66" : "#B0B3B8",
              cursor: "pointer", fontFamily: "'DM Sans',system-ui,sans-serif",
              transition: "all 0.2s ease",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Mentor list */}
      <div>
        {filtered.map((m, i) => (
          <MentorRow key={m.id} mentor={m} index={i} onSelect={setSelected} />
        ))}
      </div>

      {/* Detail panel (slide-up) */}
      {selected && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)",
        }} onClick={() => { setSelected(null); setConfirmed(false); setConfirmOpen(false); setSelectedSlot(""); }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "#151821", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px 24px 0 0",
              maxHeight: "90vh", overflowY: "auto",
              animation: "slide-up-panel 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.15)" }} />
            </div>

            <div style={{ padding: "20px 28px 40px" }}>
              {/* Profile header */}
              <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
                  background: getGrad(selected.gradient),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, color: "#fff",
                  boxShadow: `0 0 28px ${selected.gradient[0]}50`,
                }}>{selected.initials}</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, color: "#FFFFFF", marginBottom: 4 }}>{selected.name}</div>
                  <div style={{ fontSize: 14, color: "#6C7075", marginBottom: 8 }}>{selected.domain}</div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, color: "#FFFFFF", fontWeight: 600 }}>{selected.experience}</div>
                      <div style={{ fontSize: 11, color: "#6C7075" }}>Experience</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, color: "#FFFFFF", fontWeight: 600 }}>{selected.sessions}</div>
                      <div style={{ fontSize: 11, color: "#6C7075" }}>Sessions</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, color: "#b89b6a", fontWeight: 600 }}>{selected.rating}★</div>
                      <div style={{ fontSize: 11, color: "#6C7075" }}>{selected.reviews} reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: "#B0B3B8", lineHeight: 1.7, marginBottom: 20 }}>{selected.bio}</p>

              {/* Skills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {selected.skills.map(s => (
                  <span key={s} style={{ background: "rgba(255,106,61,0.1)", border: "1px solid rgba(255,106,61,0.25)", borderRadius: 999, padding: "5px 14px", fontSize: 12, color: "#FF8C66" }}>{s}</span>
                ))}
              </div>

              {/* Availability calendar */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: "#FFFFFF", marginBottom: 14 }}>Pick a slot</h3>
                <div style={{ overflowX: "auto" }}>
                  <div style={{ display: "grid", gridTemplateColumns: `80px repeat(${DAYS.length}, 1fr)`, gap: 4, minWidth: 560 }}>
                    {/* Header row */}
                    <div />
                    {DAYS.map(d => (
                      <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#6C7075", padding: "4px 0", letterSpacing: "0.05em" }}>{d}</div>
                    ))}
                    {/* Time slots */}
                    {TIME_SLOTS.map(slot => (
                      <>
                        <div key={`label-${slot}`} style={{ fontSize: 11, color: "#6C7075", display: "flex", alignItems: "center", paddingRight: 8 }}>{slot}</div>
                        {DAYS.map(day => {
                          const key = `${day}-${slot}`;
                          const avail = AVAILABLE_SLOTS.has(key);
                          const sel = selectedSlot === key;
                          return (
                            <button key={key}
                              disabled={!avail}
                              onClick={() => setSelectedSlot(key)}
                              style={{
                                height: 32, borderRadius: 6,
                                background: sel ? "#FF6A3D" : avail ? "rgba(255,106,61,0.1)" : "rgba(255,255,255,0.03)",
                                border: sel ? "1px solid #FF6A3D" : avail ? "1px solid rgba(255,106,61,0.25)" : "1px solid rgba(255,255,255,0.05)",
                                cursor: avail ? "pointer" : "default",
                                transition: "all 0.15s ease",
                              }}
                            />
                          );
                        })}
                      </>
                    ))}
                  </div>
                </div>
                {selectedSlot && (
                  <p style={{ fontSize: 13, color: "#FF8C66", marginTop: 10 }}>
                    Selected: {selectedSlot.replace("-", " at ")} · {selected.rate}
                  </p>
                )}
              </div>

              {/* Booking CTA */}
              {!confirmed ? (
                <button
                  disabled={!selectedSlot}
                  onClick={() => setConfirmOpen(true)}
                  style={{
                    width: "100%", background: selectedSlot ? "#FF6A3D" : "rgba(255,255,255,0.06)",
                    border: "none", borderRadius: 14,
                    color: selectedSlot ? "#FFFFFF" : "#6C7075",
                    padding: "16px", fontSize: 16,
                    fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500,
                    cursor: selectedSlot ? "pointer" : "not-allowed",
                    boxShadow: selectedSlot ? "0 0 30px rgba(255,106,61,0.35)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  Book 1hr Session {selectedSlot ? `· ${selected.rate}` : "— Select a slot first"}
                </button>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 40, marginBottom: 12, animation: "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>✅</div>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: "#22c55e", marginBottom: 8 }}>Booking Confirmed!</div>
                  <div style={{ fontSize: 14, color: "#B0B3B8" }}>{selected.name} · {selectedSlot.replace("-", " at ")}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking confirm modal */}
      {confirmOpen && selected && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }} onClick={() => setConfirmOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#151821", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24, padding: "36px", maxWidth: 380, width: "100%",
            animation: "pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: "#FFFFFF", margin: "0 0 16px" }}>Confirm Booking</h3>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#6C7075" }}>Mentor</span>
                <span style={{ fontSize: 13, color: "#FFFFFF" }}>{selected.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#6C7075" }}>Slot</span>
                <span style={{ fontSize: 13, color: "#FFFFFF" }}>{selectedSlot.replace("-", " at ")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#6C7075" }}>Price</span>
                <span style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 600 }}>{selected.rate}</span>
              </div>
            </div>
            <button onClick={() => { setConfirmOpen(false); setConfirmed(true); }} style={{
              width: "100%", background: "#FF6A3D", border: "none", borderRadius: 12,
              color: "#FFFFFF", padding: "14px", fontSize: 15,
              fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500,
              cursor: "pointer", marginBottom: 10,
              boxShadow: "0 0 24px rgba(255,106,61,0.35)",
            }}>Confirm & Pay</button>
            <button onClick={() => setConfirmOpen(false)} style={{
              width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12, color: "#6C7075", padding: "13px", cursor: "pointer",
            }}>Cancel</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up-panel {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes mentor-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function MentorRow({ mentor, index, onSelect }: { mentor: typeof MENTORS[0], index: number, onSelect: (m: typeof MENTORS[0]) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div key={mentor.id}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: 16, padding: "24px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        position: "relative", cursor: "pointer",
        transform: hov ? "translateY(-2px)" : "none",
        transition: "transform 0.2s ease",
        animation: `mentor-in 0.4s ease ${index * 0.08}s both`,
      }}
      onClick={() => onSelect(mentor)}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: -20, top: "10%", bottom: "10%",
        width: 3, borderRadius: 999, background: "#FF6A3D",
        opacity: hov ? 1 : 0, transition: "opacity 0.2s ease",
      }} />

      {/* Avatar */}
      <div style={{
        width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
        background: getGrad(mentor.gradient),
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, color: "#fff",
        boxShadow: hov ? `0 0 20px ${mentor.gradient[0]}40` : "none",
        transition: "box-shadow 0.3s ease",
      }}>{mentor.initials}</div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: "#FFFFFF" }}>{mentor.name}</span>
          {mentor.available ? (
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 999, padding: "2px 10px", fontSize: 10, color: "#22c55e" }}>Available</div>
          ) : (
            <div style={{ background: "rgba(108,112,117,0.1)", border: "1px solid rgba(108,112,117,0.2)", borderRadius: 999, padding: "2px 10px", fontSize: 10, color: "#6C7075" }}>Booked</div>
          )}
        </div>
        <div style={{ fontSize: 13, color: "#6C7075", marginBottom: 8 }}>
          {mentor.domain} · <Stars r={mentor.rating} /> {mentor.rating} ({mentor.reviews} reviews)
        </div>
        <div style={{ fontSize: 13, color: "#B0B3B8", marginBottom: 10, fontStyle: "italic" }}>"{mentor.bio}"</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {mentor.skills.map(s => (
            <span key={s} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#B0B3B8" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Rate + CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: "#FFFFFF" }}>{mentor.rate}</div>
        <button onClick={e => { e.stopPropagation(); onSelect(mentor); }} style={{
          background: hov ? "#FF6A3D" : "rgba(255,106,61,0.1)",
          border: "1px solid rgba(255,106,61,0.3)",
          borderRadius: 999, color: hov ? "#fff" : "#FF6A3D",
          padding: "8px 20px", fontSize: 13,
          fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 500,
          cursor: "pointer", whiteSpace: "nowrap",
          boxShadow: hov ? "0 0 20px rgba(255,106,61,0.35)" : "none",
          transition: "all 0.2s ease",
        }}>Book →</button>
      </div>
    </div>
  );
}