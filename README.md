# TinkedOut — Engineer Collaboration Platform

> ML-powered engineer matchmaking. Find teammates, swipe to connect, collaborate in real-time, book expert mentors.

---

## Project Structure

```
tinkedout/
├── index.html          ← main entry point
├── css/
│   └── style.css       ← all styles (splash, login, dark app, all screens)
├── js/
│   ├── splash.js       ← TO split animation, init trigger
│   ├── auth.js         ← login, signup, password strength, enterApp()
│   ├── nav.js          ← goScreen(), setNav()
│   ├── match.js        ← interest vector, random matchmaking, chat
│   ├── swipe.js        ← swipe card stack, drag, like/skip
│   ├── collab.js       ← Discord-style channel chat
│   ├── mentor.js       ← mentor search, sector filter, booking panel
│   └── profile.js      ← edit profile modal, save, share
├── assets/
│   └── logo.svg        ← TinkedOut TO logo
└── README.md
```

---

## How to Run

### Option 1 — VS Code Live Server (recommended)
1. Open VS Code → File → Open Folder → select `tinkedout/`
2. Install extension: **Live Server** by Ritwick Dey
3. Right-click `index.html` → **Open with Live Server**
4. Opens at `http://127.0.0.1:5500`

### Option 2 — Terminal
```bash
cd tinkedout
python3 -m http.server 5500
# then open http://localhost:5500
```

### Option 3 — Direct browser
```bash
firefox index.html
# or
google-chrome index.html
```

---

## Features

| Screen | Description |
|--------|-------------|
| **Splash** | TO logo splits, "inkedOut" reveals, tagline fades in |
| **Login** | Two-column — Google/GitHub OAuth ready, email sign in/register, password strength meter |
| **Random Match** | Omegle-style — add interests → Connect → matched by cosine similarity |
| **Swipe** | Tinder-style draggable cards — swipe right to connect, left to skip |
| **Collab** | Discord dark sidebar — channels, voice, tasks, live team chat |
| **Mentors** | 23 mentors across 9 engineering sectors, search + filter, hourly/project booking |
| **Profile** | Edit modal — name, email, dept, bio, interests, avatar colour picker |

---

## Tech Stack (current — frontend only)

- Pure HTML / CSS / Vanilla JS
- Google Fonts — Playfair Display + DM Sans
- No frameworks, no build tools, works offline

## Tech Stack (planned — full backend per SRS)

- **Frontend**: React / Next.js + Tailwind CSS
- **Backend**: Python + FastAPI
- **Database**: Supabase (PostgreSQL + Realtime)
- **Auth**: Supabase Auth (Google + GitHub OAuth)
- **ML Matching**: Cosine similarity on interest vectors
- **Real-time**: WebSocket via Supabase Realtime
- **P2P**: WebRTC for video calls

---

## Adding Real Supabase Auth

1. Create project at [supabase.com](https://supabase.com)
2. Enable Google + GitHub providers in Authentication → Providers
3. Open `js/auth.js` and add at the top:

```js
const supabase = window.supabase.createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);
```

4. Add to `index.html` head:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

---

## Team

- Dhyanesh Vinothkumar
- Samarjayvishnu KK
- Rehan Shaik
- Naazil N

Department of Computer Science and Engineering — VIT-AP University, Amaravati
