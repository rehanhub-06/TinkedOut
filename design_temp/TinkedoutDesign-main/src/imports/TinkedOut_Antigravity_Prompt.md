# 🚀 TINKEDOUT — ANTIGRAVITY MASTER PROMPT
### Full-Stack Development Specification for Claude / Cursor / Any AI Agent

---

## 🧠 CONTEXT & PROJECT DNA

You are building **TinkedOut** — a next-generation social collaboration platform for engineering students. Think: Tinder × Discord × LinkedIn, built for builders.

**Existing codebase** is a single-file HTML/CSS/JS app (vanilla) with:
- Splash screen, Login page with OAuth buttons, App shell with nav
- Screens: Match (ring-based discovery), Swipe (drag cards), Chat, Collab (channels), Mentor, Profile
- Parchment/dark gold color palette (`--d-gold`, `--d-bg`, `--p-brown`)
- Playfair Display (serif headings) + DM Sans (body)
- All JS in separate files: `auth.js`, `swipe.js`, `match.js`, `mentor.js`, `collab.js`, `profile.js`, `nav.js`, `splash.js`

**Your job**: Fully rebuild this into a polished, production-quality SPA — same HTML/CSS/JS stack (no frameworks required) — but with the design system, animations, and features described below. Preserve the existing file structure but rewrite every screen from scratch.

---

## 🎨 DESIGN SYSTEM (STRICT — DO NOT DEVIATE)

### Color Tokens
```css
:root {
  /* backgrounds */
  --bg-main: #0F1115;
  --bg-secondary: #151821;
  --bg-tertiary: #1a1d26;

  /* glass surfaces */
  --glass: rgba(255,255,255,0.05);
  --glass-hover: rgba(255,255,255,0.08);
  --glass-border: rgba(255,255,255,0.08);

  /* accent — orange-red */
  --accent: #FF6A3D;
  --accent-soft: #FF8C66;
  --accent-glow: rgba(255,106,61,0.25);
  --accent-glow-strong: rgba(255,106,61,0.45);

  /* text */
  --text-primary: #FFFFFF;
  --text-secondary: #B0B3B8;
  --text-muted: #6C7075;

  /* semantic */
  --success: #22c55e;
  --danger: #ef4444;
  --info: #3b82f6;

  /* preserved brand */
  --gold: #b89b6a;
  --gold-soft: #d4b880;
}
```

### Typography
- **Headings**: `'Playfair Display', Georgia, serif` — use for app name, screen titles, hero text
- **Body/UI**: `'DM Sans', system-ui, sans-serif` — use for everything else
- **Scale**: 11px (micro labels) → 13px (meta) → 15px (body) → 18px (subheading) → 28px (heading) → 48px (hero) → 80px (splash)
- **Weights**: 300 (light/mono), 400 (regular), 500 (medium), 700 (display only)

### Glass Component Base
```css
.glass {
  background: var(--glass);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
}
.glass-sm { border-radius: 12px; }
.glass-pill { border-radius: 999px; }
```

### Motion Background (CANVAS — REQUIRED ON ALL SCREENS)
Every screen must have a persistent `<canvas id="bg-canvas">` behind all content:
```js
// Implement a THREE-LAYER animated background:

// LAYER 1 — Floating orbs (3-5 large blurred circles)
// Colors: accent orange, deep purple, blue-violet
// Behavior: slow drift (60-90s full cycle), gentle pulse in opacity (0.04–0.12)
// Size: 300–600px diameter, heavily blurred

// LAYER 2 — Particle mesh (80-120 tiny dots)
// Colors: white at 0.15–0.35 opacity
// Behavior: slow random drift, connect with lines when within 120px (line opacity scales with distance)
// Size: 1.5–2.5px radius

// LAYER 3 — Noise shimmer (subtle)
// A very faint scanline or grain overlay, opacity ~0.02
// Achieved with a repeating CSS gradient or canvas noise pass

// Implementation: requestAnimationFrame loop, canvas fills full viewport
// Performance: use offscreen canvas for particles, only redraw dirty regions
```

```css
#bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
}
/* All app content layers sit above z-index: 1 */
```

---

## 🎬 ANIMATION SYSTEM (EVERY ANIMATION DEFINED)

### Base Transitions
```css
/* ALL interactive elements */
* { transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease; }

/* Buttons */
.btn {
  transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), 
              box-shadow 0.2s ease,
              background 0.2s ease;
}
.btn:hover  { transform: translateY(-2px) scale(1.02); }
.btn:active { transform: translateY(0) scale(0.97); }
```

### Page Transitions
```css
/* Screens enter with fade + slide-up */
.screen {
  position: absolute; inset: 0;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1),
              transform 0.35s cubic-bezier(0.4,0,0.2,1);
  pointer-events: none;
}
.screen.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}
/* Exiting screen fades up and out */
.screen.exit {
  opacity: 0;
  transform: translateY(-12px);
}
```

### Micro Interactions
```css
/* Glow pulse on accent elements */
@keyframes glow-pulse {
  0%,100% { box-shadow: 0 0 0 0 var(--accent-glow); }
  50%      { box-shadow: 0 0 0 12px transparent; }
}

/* Floating elements */
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}

/* Score fill animation */
@keyframes fill-bar {
  from { width: 0%; }
}

/* Match burst */
@keyframes match-burst {
  0%   { transform: scale(1); box-shadow: 0 0 0 0 var(--accent-glow-strong); }
  50%  { transform: scale(1.08); box-shadow: 0 0 0 40px transparent; }
  100% { transform: scale(1); box-shadow: none; }
}

/* Chip pop */
@keyframes chip-pop {
  0%   { transform: scale(0.7); opacity: 0; }
  70%  { transform: scale(1.08); }
  100% { transform: scale(1); opacity: 1; }
}

/* Slide-up panel */
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

/* Typing dots */
@keyframes typing-dot {
  0%,60%,100% { transform: translateY(0); opacity: 0.4; }
  30%          { transform: translateY(-6px); opacity: 1; }
}
```

---

## 📱 SCREENS — FULL IMPLEMENTATION SPEC

---

### SCREEN 0: SPLASH
**Duration**: 2.8 seconds, then auto-transition to login

**Animation sequence**:
1. `t=0ms` — Background canvas starts (orbs fade in over 1s)
2. `t=200ms` — "T" drops in (translateY 30px → 0, opacity 0→1, 500ms ease-out)
3. `t=400ms` — "inked" expands from width 0 (max-width reveal, 900ms ease)
4. `t=600ms` — "O" drops in (same as T, 200ms delay)
5. `t=700ms` — "ut" expands (600ms)
6. `t=1200ms` — Tagline fades in + accent line expands width 0→120px
7. `t=2400ms` — Entire splash fades out (opacity → 0, 400ms), reveals login

**Visual**: Logo is massive (80px), Playfair Display, white. Tagline in DM Sans 11px uppercase spaced. Small glowing dot pulses near the logo.

---

### SCREEN 1: LOGIN / AUTH

**Layout**: Two-panel (desktop) / stacked (mobile)

**LEFT PANEL** (dark, `--bg-secondary`):
- Large decorative "TO" watermark text (400px, opacity 0.04)
- TinkedOut logo (SVG + wordmark)
- Hero headline: `"Build better teams,\nfind your match."` — Playfair 42px
- Subtext: DM Sans 15px, `--text-secondary`
- 4 feature pills (icon + text), each with subtle glass background, staggered fade-in on mount
- Bottom: tiny "Trusted by 2,400+ engineers" social proof line

**RIGHT PANEL** (slightly lighter, `--bg-tertiary`):
- Glass form card (blur, border)
- Title: "Welcome back" (Playfair 26px)
- OAuth row: Google + GitHub buttons (glass, hover lift)
- Divider: `──── or continue with email ────`
- Tabs: Sign in / Create account (pill switcher with sliding indicator)
- **Sign in**: Email + Password fields, forgot link, Submit CTA
- **Sign up**: First + Last name (row), Email, Password (strength bars: 4 segments, color shifts weak→strong), Terms line
- Guest mode: subtle text link at bottom

**Field animation**:
```css
.field input {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: var(--text-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
  outline: none;
}
```

**Submit CTA**: Full-width, `--accent` background, white text, subtle shine sweep on hover (pseudo-element animation), glow on press.

---

### SCREEN 2: ONBOARDING / INTEREST PICKER
*(Shown after first signup, before entering the app)*

**Flow**: 3-step stepper

**Step 1 — "What do you build?"**
- 18 interest chips in a flowing wrap layout
- Each chip: glass pill, 14px, accent border on selected, scale pop animation
- Categories: AI/ML, Web Dev, Cloud, DevOps, Cybersecurity, Blockchain, Mobile, Game Dev, Data Science, AR/VR, IoT, Embedded, UI/UX, Open Source, Competitive Programming, Research, Robotics, FinTech

**Step 2 — "What's your vibe?"**
- Role selector: Student / Mentor / Both
- Collaboration style: Hackathons / Side Projects / Research / Startup
- Availability: cards with icons

**Step 3 — "Set up your profile"**
- Avatar color picker (8 gradient options)
- Display name confirm
- Bio textarea (140 char limit with live counter)
- Department select

**CTA**: "Continue →" pill button, slides to next step. Final step: "Enter TinkedOut →" with glow burst on click.

---

### SCREEN 3: MATCH ENGINE (MAIN DISCOVERY SCREEN)

**Concept**: Radar / connection hub UI — NOT the swipe screen. This is the "I want to find someone with X skills" screen.

**Layout**:
```
┌─────────────────────────────────────────┐
│  Animated radar ring (center)            │
│  "Finding your match..." status          │
│                                          │
│  Interest input + preset chips           │
│                                          │
│  [Connect / Stop] CTA                   │
│                                          │
│  Match card slides up when found        │
│  → Quick chat opens below               │
└─────────────────────────────────────────┘
```

**Radar animation** (CSS only):
```css
.ring-outer {
  width: 280px; height: 280px;
  border-radius: 50%;
  border: 1px solid rgba(255,106,61,0.2);
  position: relative;
  animation: ring-rotate 8s linear infinite;
}
/* 3 concentric rings, each with different rotation speeds */
/* Inner ring has accent color glow dot that orbits */
/* Sweep line rotates inside like a radar sweep */
@keyframes sweep {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.sweep-line {
  position: absolute;
  width: 50%; height: 1px;
  background: linear-gradient(to right, transparent, var(--accent));
  transform-origin: right center;
  top: 50%; right: 50%;
  animation: sweep 3s linear infinite;
}
/* Sweep leaves a conic fading trail */
```

**Interest chips**: Glass pills with `+` icon, clicking adds to active set. Active chips have accent border + glow.

**Match card** (slides up from bottom):
- Glass card, slide-up animation (0.4s cubic-bezier spring)
- Avatar circle (initials, gradient fill)
- Name (Playfair 20px), Role (DM Sans 13px muted)
- Skill tags (small glass chips)
- Match score: animated progress bar fills on appear (1s ease-out)
- 2 buttons: "Skip" (glass) / "Connect & Chat" (accent)

**Quick chat** (replaces match card with slide):
- Same glass panel
- 3 pre-seeded messages animate in (staggered 150ms each)
- Input bar at bottom with send icon
- Auto-reply after 900ms

---

### SCREEN 4: SWIPE (DISCOVERY DECK) ← MOST IMPORTANT SCREEN

**Concept**: Full-screen immersive swipe experience. No nav visible during swipe. Cards are large and dramatic.

**Card Stack Rendering**:
- Top card: full size (100% width, ~70vh height on mobile)
- Card 2: scaled 97%, translateY -12px, behind
- Card 3: scaled 94%, translateY -24px, furthest behind
- Soft shadow cascades down the stack

**Card Design**:
```css
.sw-card {
  position: absolute;
  width: 100%; max-width: 420px;
  border-radius: 24px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid rgba(255,255,255,0.06);
  /* Distinct from glass — more solid */
  transform-origin: bottom center;
  cursor: grab;
  will-change: transform;
}
```

**Card internals**:
- TOP half: gradient avatar zone — large initial letters on a mesh gradient background (each user gets a unique 2-color gradient, deterministic from name hash)
- Floating match score badge: top-right, glass pill with glow, `"91% match"`
- BOTTOM half: name (Playfair 22px), role (13px muted), skill chips, bio (2 lines max), subtle score bar
- STAMP overlays: "CONNECT" (green, rotated -20°) and "SKIP" (red, rotated 20°) — opacity driven by drag distance

**Drag Physics**:
```js
// Implement with pointer events (works mouse + touch)
// On drag:
//   dx > 0: rotate right (dx * 0.08 degrees), tint green overlay (opacity dx/200)
//   dx < 0: rotate left, tint red overlay
//   dy follows naturally
// Release threshold: ±90px triggers swipe
// Velocity: track last 5 pointer events, if speed > 600px/s trigger even before threshold
// Snap back: spring easing (cubic-bezier(0.34, 1.56, 0.64, 1)) if not past threshold
// Fly-out: translateX(±160%) + rotate(±30deg) + opacity 0, 0.5s ease-in
```

**Match Animation** (when right swipe):
```js
// 1. Card flies right
// 2. Small confetti burst at card position (20 particles, accent + gold colors)
// 3. Full-screen overlay flashes for 200ms: semi-transparent green glow
// 4. "It's a Match!" modal slides up:
//    - Two avatars slide together from sides, overlap slightly
//    - Glow ring pulses around both
//    - "Start chatting" CTA
//    - "Keep swiping" ghost CTA
```

**Confetti implementation**:
```js
function burstConfetti(cx, cy) {
  const colors = ['#FF6A3D','#FFD700','#22c55e','#fff','#b89b6a'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-p';
    const angle = (i / 22) * 360;
    const dist  = 80 + Math.random() * 80;
    const tx = Math.cos(angle * Math.PI/180) * dist;
    const ty = Math.sin(angle * Math.PI/180) * dist - 60;
    p.style.cssText = `
      left:${cx}px; top:${cy}px;
      background:${colors[i % colors.length]};
      --tx:${tx}px; --ty:${ty}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

/* CSS */
.confetti-p {
  position: fixed; width: 8px; height: 8px;
  border-radius: 2px; pointer-events: none; z-index: 9999;
  animation: confetti-fly 0.8s cubic-bezier(0,0.6,1,1) forwards;
}
@keyframes confetti-fly {
  to { transform: translate(var(--tx), var(--ty)) rotate(540deg); opacity: 0; }
}
```

**Action Buttons** (floating below card):
- 3 buttons: Skip (×), Super (★), Connect (♥)
- Glass circles, icon inside
- Skip: red accent on hover, scale 1.1
- Connect: accent orange glow on hover
- Super: gold gradient, bounces on hover (`animation: float 1s ease-in-out infinite`)
- Tap animation: ripple + scale 0.9 → 1.1

**Filter Panel** (slides in from top on filter icon tap):
- Semi-transparent glass overlay
- Role chips, Interest filters
- "Apply" slides it back up

**Right-side "Matches" panel** (desktop only):
- Scrollable list of mutual matches
- Each item: avatar initials circle + name + top 2 skills + ♥ icon
- Fades in staggered on first render

---

### SCREEN 5: CHAT (1:1 AND CHANNEL)

**Layout**:
```
[ Conversation List | Chat Panel ]
(mobile: full-screen chat, back arrow to list)
```

**Conversation List**:
- Each item: avatar, name, last message preview, timestamp, unread count badge
- Hover: glass tint + translateX(4px)
- Active: accent left border, slightly brighter background

**Chat Panel**:
```css
/* Message bubbles */
.msg-me {
  background: var(--accent);
  color: #fff;
  border-radius: 18px 18px 4px 18px;
  align-self: flex-end;
  max-width: 72%;
  padding: 10px 14px;
  animation: msg-in-right 0.25s cubic-bezier(0.34,1.4,0.64,1);
}
.msg-them {
  background: var(--glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 18px 18px 18px 4px;
  align-self: flex-start;
  max-width: 72%;
  padding: 10px 14px;
  animation: msg-in-left 0.25s cubic-bezier(0.34,1.4,0.64,1);
}
@keyframes msg-in-right {
  from { transform: translateX(20px) scale(0.9); opacity: 0; }
  to   { transform: translateX(0)    scale(1);   opacity: 1; }
}
@keyframes msg-in-left {
  from { transform: translateX(-20px) scale(0.9); opacity: 0; }
  to   { transform: translateX(0)     scale(1);   opacity: 1; }
}
```

**Typing indicator**: 3 dots, each with `animation: typing-dot 1.2s ease-in-out infinite` at 0s, 0.2s, 0.4s delays respectively.

**Input bar**:
- Fixed bottom, glass background
- Textarea auto-expands on typing (max 4 lines)
- On focus: border glows accent
- Send button: accent circle, spins 360deg on click then resets
- Attach icon (left): paperclip, hover lift

**Chat header**: Avatar + name + "Online" dot (pulsing green) + call/video icons

---

### SCREEN 6: COLLAB (DISCORD-STYLE CHANNELS)

**3-column layout**:
```
[ Channel list ] [ Message area ] [ Members panel ]
   200px             flex-1            200px
```

**Channel list** (leftmost):
- Server name at top with icon
- Category headers ("GENERAL", "PROJECTS", "VOICE")
- Channel items: `# channel-name` with unread count badge
- Active channel: accent tint background, accent left strip
- Add channel button: `+` icon, ghost style

**Channel item hover**: Smooth background transition, text brightens

**Message area** — same as chat but with:
- Channel header with description subtitle
- Pinned message banner (dismissible)
- Reactions on messages (emoji row, hover reveals add button)
- Reaction add animation: scale pop from 0.5 → 1.2 → 1.0

**Members panel** (rightmost):
- "ONLINE — 4" header
- Avatar list: initials circle + name + role badge
- Hover: slight glow ring around avatar
- Collapse to icons on narrow viewports

**Mobile**: Bottom tabs switch between channels/chat/members

---

### SCREEN 7: MENTOR

**Layout**: Masonry/list hybrid — NOT cards

```
[ Search bar ] [ Filter chips: Domain · Price · Rating ]

  ┌──────────────────────────────────────────────────────┐
  │  [Avatar]  Rohan Mehta                    ₹500/hr    │
  │            AI/ML · Computer Vision      ⭐ 4.9 (42)  │
  │            "I help students ship ML projects fast."  │
  │            [React] [TensorFlow] [Python]    [Book →] │
  └──────────────────────────────────────────────────────┘
```

**Each mentor row**:
- No box/card border — just spacing separates rows
- Subtle `border-bottom: 1px solid rgba(255,255,255,0.04)`
- Avatar: 48px circle, gradient initials
- Hover: `translateY(-2px)`, subtle left accent bar appears
- Skills: small glass chips
- Book CTA: accent pill button, glow on hover

**Detail panel** (slides up from bottom on click):
- Full profile: larger avatar, bio, all skills
- Availability calendar grid (7 days × time slots, glass cells, accent on available)
- Booking CTA: "Book 1hr session" — accent full-width
- Reviews section: glass list items with star ratings

**Booking confirmation**:
- Modal overlay (glass, centered)
- Slot summary, price, confirm button
- On confirm: green checkmark animation (SVG path draws itself), "Booking confirmed!" text fades in

---

### SCREEN 8: PROFILE

**Layout**: Scrollable single-column, NO boxes

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                                        [Edit]
    ┌────┐
    │ AK │   ← 80px avatar circle, gradient bg
    └────┘
  Arjun Kumar
  Full Stack Dev  ·  VIT-AP  ·  Year 3

  "Building scalable web apps and ML systems..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERESTS
  [AI/ML] [Web Dev] [Cloud] [DevOps] [+3 more]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATS
  42 matches  ·  8 collabs  ·  3 mentor sessions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVITY
  Recent matches (mini cards, horizontal scroll)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Sections separated by**: `border-top: 1px solid rgba(255,255,255,0.05)` + `padding: 24px 0` — NO card borders

**Edit flow**: Pencil icon → slide-up modal glass panel → inline editable fields → Save button → smooth DOM update (no page reload)

**Chip animation on profile**: Each interest chip fades in staggered (30ms per chip) on screen enter.

**Stats row**: Numbers count up from 0 on first view (IntersectionObserver + requestAnimationFrame counter).

---

## 🧭 NAVIGATION

### Bottom Nav (Mobile)
```css
.bottom-nav {
  position: fixed; bottom: 20px; left: 50%;
  transform: translateX(-50%);
  background: rgba(21,24,33,0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  padding: 10px 24px;
  display: flex; gap: 32px;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
```

**Nav items**: Icon (SVG, 22px) + optional label (10px, appears on active only)

**Active state**:
- Icon gains accent color
- Small glowing dot below icon
- Label fades in (opacity 0 → 1, translateY 4px → 0)

**Tab switch animation**: Active dot slides between positions (CSS left transition, 0.3s cubic-bezier spring)

**Tap**: Ripple effect from tap point (scale 0 → 2.5 opacity 0.15 → 0, 0.4s)

### Sidebar Nav (Desktop, ≥1024px)
```
Left sidebar: 68px collapsed / 220px expanded (hover)
Logo at top
Icon + label nav items
Bottom: avatar + settings icon
```

---

## 🗄️ DATABASE SCHEMA (Supabase PostgreSQL)

```sql
-- Users
CREATE TABLE users (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  avatar_color TEXT DEFAULT '#FF6A3D',
  bio         TEXT,
  department  TEXT,
  year        INT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Interests
CREATE TABLE interests (
  id   SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- User ↔ Interests (many-many)
CREATE TABLE user_interests (
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  interest_id INT  REFERENCES interests(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, interest_id)
);

-- Swipes
CREATE TABLE swipes (
  id        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user UUID REFERENCES users(id),
  to_user   UUID REFERENCES users(id),
  action    TEXT CHECK (action IN ('right','left','super')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_user, to_user)
);

-- Matches (mutual right swipes)
CREATE TABLE matches (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user1      UUID REFERENCES users(id),
  user2      UUID REFERENCES users(id),
  score      FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id   UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),   -- null if channel message
  channel_id  UUID REFERENCES channels(id), -- null if DM
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Channels (collab rooms)
CREATE TABLE channels (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE channel_members (
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  role       TEXT DEFAULT 'member',
  PRIMARY KEY (channel_id, user_id)
);

-- Mentors
CREATE TABLE mentors (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES users(id),
  domain       TEXT,
  hourly_rate  DECIMAL(10,2),
  bio          TEXT,
  rating       FLOAT DEFAULT 0
);

CREATE TABLE mentor_skills (
  mentor_id UUID REFERENCES mentors(id),
  skill     TEXT,
  PRIMARY KEY (mentor_id, skill)
);

-- Bookings
CREATE TABLE bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES users(id),
  mentor_id   UUID REFERENCES mentors(id),
  time_slot   TIMESTAMPTZ NOT NULL,
  status      TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (enable on all tables)
ALTER TABLE users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches      ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages     ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels     ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings     ENABLE ROW LEVEL SECURITY;
```

---

## ⚙️ MATCHING ALGORITHM

```js
/**
 * Jaccard similarity with interest rarity weighting.
 * rareInterests: Set of interests that fewer than 10% of users have.
 * Those get a 2x weight bonus.
 */
function matchScore(userAInterests, userBInterests, rareInterests = new Set()) {
  const a = new Set(userAInterests);
  const b = new Set(userBInterests);
  let common = 0, total = new Set([...a, ...b]).size;
  for (const i of a) {
    if (b.has(i)) {
      common += rareInterests.has(i) ? 2 : 1;
    }
  }
  return total === 0 ? 0 : Math.round((common / total) * 100);
}
```

---

## 🔧 REALTIME (Supabase)

```js
// Chat messages — subscribe to new messages in a channel or DM
const sub = supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `receiver_id=eq.${userId}`
  }, (payload) => {
    appendMessage(payload.new);
  })
  .subscribe();

// Typing indicator — presence channel
const room = supabase.channel(`typing:${chatId}`);
room
  .on('presence', { event: 'sync' }, () => {
    const state = room.presenceState();
    updateTypingUI(Object.keys(state));
  })
  .subscribe();
```

---

## 📁 FILE STRUCTURE (PRESERVE)

```
TinkedOut/
├── index.html          ← All screens as <div id="screen-name">
├── css/
│   └── style.css       ← Full design system + all screen styles
├── js/
│   ├── app.js          ← NEW: main init, screen router, canvas bg
│   ├── auth.js         ← Login, signup, OAuth, session
│   ├── match.js        ← Match engine, radar, interest scoring
│   ├── swipe.js        ← Card stack, drag physics, confetti
│   ├── chat.js         ← 1:1 messages, realtime
│   ├── collab.js       ← Channels, member list
│   ├── mentor.js       ← Mentor list, booking, detail panel
│   ├── profile.js      ← Profile render, edit modal
│   ├── nav.js          ← Navigation, screen transitions
│   └── splash.js       ← Splash sequence
└── assets/
    └── logo.svg
```

---

## ✅ QUALITY CHECKLIST (Verify before done)

- [ ] Canvas background renders on all screens, no flicker between transitions
- [ ] Swipe cards work with both mouse drag and touch (pointer events)
- [ ] Match confetti fires correctly and cleans up (no DOM leaks)
- [ ] All page transitions: fade + slide-up (no jump cuts)
- [ ] Nav active state updates correctly on screen change
- [ ] Chat messages animate in, typing indicator works
- [ ] Mentor booking panel slides up smoothly, closes on backdrop click
- [ ] Profile stats count up on first view (IntersectionObserver)
- [ ] All inputs: focus glow, error state, disabled state styled
- [ ] Mobile-responsive: bottom nav pill, single-column layouts
- [ ] No `console.error` in base state (demo data preloaded everywhere)
- [ ] Dark backgrounds don't flash white on page load (HTML bg set early)
- [ ] Onboarding interest chips: tap to toggle, min 3 to proceed
- [ ] Guest mode: loads app with dummy data, auth prompts on restricted actions

---

## 🚀 DEMO DATA (Pre-seed in JS)

Pre-load these profiles so the app works immediately without a backend:

```js
const DEMO_PROFILES = [
  { id:'u1', init:'AK', name:'Arjun Kumar',   role:'Full Stack Dev',  dept:'CSE·VIT-AP', tags:['AI/ML','Web Dev','Cloud'],          bio:'Building scalable web apps and ML systems. Hackathon veteran.',    score:91, gradient:['#FF6A3D','#FF4081'] },
  { id:'u2', init:'SR', name:'Sneha Rao',     role:'Data Scientist',  dept:'DS·VIT-AP',  tags:['Data Science','AI/ML','Python'],     bio:'Passionate about data pipelines and recommendation systems.',       score:86, gradient:['#7C4DFF','#448AFF'] },
  { id:'u3', init:'RM', name:'Rahul Mehta',   role:'Security Eng',    dept:'CSE·VIT-AP', tags:['Cybersecurity','Blockchain','CTF'],   bio:'Web3 enthusiast and ethical hacker. CTF competitor.',               score:78, gradient:['#00BCD4','#009688'] },
  { id:'u4', init:'PV', name:'Priya Venkat',  role:'Mobile Dev',      dept:'IT·VIT-AP',  tags:['Flutter','React Native','UI/UX'],    bio:'Flutter dev. Love building cross-platform mobile experiences.',     score:83, gradient:['#E91E63','#9C27B0'] },
  { id:'u5', init:'DK', name:'Dev Krishnan',  role:'Cloud Architect', dept:'CSE·VIT-AP', tags:['AWS','DevOps','Kubernetes'],          bio:'AWS certified. Building CI/CD pipelines and cloud-native apps.',    score:88, gradient:['#4CAF50','#00BCD4'] },
  { id:'u6', init:'MS', name:'Meera Sharma',  role:'Game Dev',        dept:'CSE·VIT-AP', tags:['Unity','AI/ML','C#'],                bio:'Unity developer exploring AI-driven game mechanics and procedural worlds.', score:80, gradient:['#FF9800','#F44336'] },
  { id:'u7', init:'TN', name:'Tarun Nair',    role:'Embedded Eng',    dept:'ECE·VIT-AP', tags:['IoT','Embedded','Robotics'],         bio:'ROS enthusiast. Building autonomous robots for warehouses.',        score:75, gradient:['#607D8B','#455A64'] },
  { id:'u8', init:'LK', name:'Lakshmi K',     role:'UI/UX Designer',  dept:'IT·VIT-AP',  tags:['Figma','Web Dev','Animation'],       bio:'Design systems and motion design. Making tech beautiful.',          score:82, gradient:['#FF6A3D','#FFD700'] },
];

const DEMO_MENTORS = [
  { init:'RV', name:'Rohan Varma',    domain:'AI/ML',         rate:500, rating:4.9, reviews:42, skills:['PyTorch','NLP','Computer Vision'], bio:'IIT grad, ex-Google. 5 yrs teaching ML to students.' },
  { init:'AS', name:'Ananya Singh',   domain:'Full Stack',    rate:400, rating:4.8, reviews:31, skills:['React','Node','PostgreSQL'],         bio:'Startup founder, ex-Flipkart. Build full-stack products fast.' },
  { init:'VK', name:'Vikram Kumar',   domain:'Cybersecurity', rate:600, rating:4.7, reviews:18, skills:['Pentesting','CTF','OSINT'],           bio:'CEH certified. Teaches ethical hacking from basics to advanced.' },
  { init:'NP', name:'Neha Patel',     domain:'Cloud/DevOps',  rate:450, rating:4.9, reviews:55, skills:['AWS','Docker','Terraform'],           bio:'AWS SA certified. Helped 200+ students crack cloud interviews.' },
];
```

---

*End of TinkedOut Antigravity Prompt — v2.0*
*Feed this entire document to your AI agent to build the complete app.*
