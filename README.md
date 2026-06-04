# NexStream 🎥

A full-stack live streaming platform — think a lightweight Twitch clone. Stream live via RTMP (OBS, etc.), watch streams in-browser with live chat, follow channels, and manage your account settings.

---

## Architecture

```
live-streaming-app/
├── client/          # React 19 + Vite frontend
├── server/          # Node.js + Express 5 REST API + Socket.IO
└── rtmp-server/     # Node Media Server (RTMP ingest + HTTP-FLV output)
```

### How it works

```
OBS / Streaming Software
        │
        │  RTMP  (port 1935)
        ▼
┌──────────────────┐
│   rtmp-server    │  Node Media Server — ingests RTMP stream,
│   (port 1935)    │  serves HTTP-FLV at /live/<streamKey>.flv
│   (port 8000)    │
└──────────────────┘
        │
        │  HTTP-FLV  (port 8000)
        ▼
┌──────────────────┐          ┌──────────────────┐
│     server       │◄────────►│   MongoDB Atlas  │
│   (port 5002)    │  REST API│  (users, channels│
│   + Socket.IO    │          │   messages)      │
└──────────────────┘          └──────────────────┘
        │
        │  HTTP + WebSocket
        ▼
┌──────────────────┐
│     client       │  React app — browse channels, watch
│   (port 3000)    │  live streams via flv.js, live chat,
│                  │  auth, settings
└──────────────────┘
```

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Zustand, Axios, Socket.IO client, flv.js |
| Backend | Node.js, Express 5, Socket.IO, Mongoose, JWT, bcryptjs |
| Database | MongoDB Atlas (or in-memory fallback for dev) |
| Streaming | Node Media Server (RTMP → HTTP-FLV) |

---

## Prerequisites

- **Node.js** v18+ (v22 recommended)
- **npm** v9+
- **OBS Studio** (or any RTMP-capable streaming software)
- A **MongoDB Atlas** account (free tier works) — or use the built-in in-memory fallback

---

## Setup & Run

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd live-streaming-app

# Install all three services
cd rtmp-server && npm install && cd ..
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 2. Configure the server environment

Create `server/.env` (copy from `server/.env.example`):

```env
API_PORT=5002
MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=StreamZ"
Token_KEY="your-secret-jwt-key-here"
```

> **Note:** If `MONGO_URI` is omitted, the server falls back to an in-memory MongoDB instance (data is lost on restart).

### 3. Start all three services

Open **three separate terminals**:

**Terminal 1 — RTMP Server**
```bash
cd rtmp-server
npm start
# Listening: RTMP :1935, HTTP :8000
```

**Terminal 2 — API Server**
```bash
cd server
npm start
# Listening: HTTP/WS :5002
```

**Terminal 3 — Frontend**
```bash
cd client
npm start
# App running at http://localhost:3000
```

---

## Using the App

### Register / Login
- Navigate to `http://localhost:3000`
- Click **Login** in the nav → switch to **Register** to create an account
- Passwords are bcrypt-hashed; sessions use short-lived JWTs

### Browse Channels
- Click **Browse** in the nav to see all active channels
- Channels marked **🔴 LIVE** are currently streaming

### Go Live (OBS Setup)
1. Open OBS → **Settings → Stream**
2. **Service:** Custom
3. **Server:** `rtmp://localhost/live`
4. **Stream Key:** Your key from **My Account → Settings → Stream Key**
5. Click **Start Streaming**

Your channel will automatically appear as **🔴 LIVE** on the dashboard.

### Watch a Stream
- Click any channel card to open the channel view
- Live streams play automatically via the built-in FLV player
- Offline channels show a placeholder

### Live Chat
- Chat is available on every channel page (real-time via Socket.IO)
- You must be logged in to send messages

### Follow Channels
- Open any channel → click the **Follow** button next to the streamer's name
- Followed channels appear in the **sidebar** with their live status

### Account Settings
- **My Account** in the nav → update channel title, description, avatar URL
- Change your password
- Copy your stream key for OBS

---

## Seeding Dummy Data

A one-time seed script is available to populate the database with test users:

```bash
cd server
node seed.js   # Creates alice@example.com, bob@example.com, charlie@example.com
               # Password for all: password123
```

---

## Project Structure

```
server/
├── index.js                  # Entry point — Express app + MongoDB connect
└── src/
    ├── controllers/
    │   ├── auth/             # register, login
    │   ├── channels/         # getChannels, getChannelDetails, followChannel
    │   └── settings/         # channel settings, password change
    ├── io/                   # Socket.IO server + chat events
    ├── middlewares/          # JWT auth middleware
    ├── models/               # Mongoose models: User, Channel, Message
    └── routes/               # Express routers

client/src/
├── api/                      # Axios API client + all request functions
├── Auth/                     # Login & Register pages
├── DashBoard/
│   ├── Nav/                  # Top navigation bar
│   ├── Sidebar/              # Followed channels sidebar
│   └── Content/
│       ├── Channels/         # Channel grid (browse page)
│       ├── ChannelView/      # Stream player + chat
│       └── Settings/         # Account & channel settings
├── shared/
│   ├── hooks/                # Custom React hooks (useChannels, useUserDetails, etc.)
│   └── components/           # Shared UI (LoadingSpinner)
└── store/                    # Zustand global state
```
