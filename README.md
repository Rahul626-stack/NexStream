# NexStream - Live Streaming App

NexStream is a full-stack live streaming platform inspired by Twitch and Kick. It allows creators to broadcast live using OBS or any RTMP-compatible software, while viewers can watch streams directly in the browser, chat in real time, follow their favorite creators, and manage their own channels.

The project was built to explore the complete live-streaming workflow from video ingestion and delivery to real-time communication, authentication, and channel management.

---

## Features

- Live streaming through RTMP using OBS
- Browser-based stream playback with HTTP-FLV
- Real-time chat powered by Socket.IO
- JWT-based authentication and authorization
- Channel customization and account management
- Follow/unfollow functionality
- Live channel discovery
- MongoDB-backed persistence
- In-memory database fallback for development

---

## Architecture

```text
OBS / Streaming Software
        │
        │ RTMP
        ▼
┌──────────────────┐
│  Node Media      │
│     Server       │
└──────────────────┘
        │
        │ HTTP-FLV
        ▼
┌──────────────────┐
│   React Client   │
└──────────────────┘

        ▲
        │ REST API + WebSockets
        ▼

┌──────────────────┐
│ Express Server   │
│  + Socket.IO     │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ MongoDB Atlas    │
└──────────────────┘
```

When a creator starts streaming from OBS, the stream is sent to the RTMP server. Node Media Server ingests the video feed and exposes it as an HTTP-FLV stream. The React frontend consumes the stream using `flv.js`, while Socket.IO powers real-time chat functionality. User accounts, channel information, messages, and follower relationships are stored in MongoDB.

---

## Tech Stack

## Tech Stack

| Category | Technologies |
|-----------|-------------|
| Frontend | React 19, Vite, Zustand, Axios, Socket.IO Client, flv.js |
| Backend | Node.js, Express 5, Socket.IO, Mongoose, JWT, bcryptjs |
| Database | MongoDB Atlas, In-Memory MongoDB |
| Streaming | Node Media Server, RTMP, HTTP-FLV |
| Dev Tools | npm, OBS Studio |
---

## Project Structure

```text
live-streaming-app/
├── client/           # React frontend application
├── server/           # Express API + Socket.IO server
└── rtmp-server/      # Node Media Server for RTMP ingest and HTTP-FLV delivery
```

### Backend

```text
server/
├── index.js                  # Application entry point
└── src/
    ├── controllers/
    │   ├── auth/             # Authentication (register, login)
    │   ├── channels/         # Channel browsing, details, follows
    │   └── settings/         # User and channel settings
    ├── io/                   # Socket.IO configuration and chat events
    ├── middlewares/          # JWT authentication middleware
    ├── models/               # Mongoose schemas and models
    └── routes/               # API route definitions
```

### Frontend

```text
client/src/
├── api/                      # Axios instance and API requests
├── Auth/                     # Login and registration pages
├── DashBoard/
│   ├── Nav/                  # Top navigation bar
│   ├── Sidebar/              # Followed channels list
│   └── Content/
│       ├── Channels/         # Browse available channels
│       ├── ChannelView/      # Stream player and live chat
│       └── Settings/         # Account and channel settings
├── shared/
│   ├── hooks/                # Reusable custom React hooks
│   └── components/           # Shared UI components
└── store/                    # Zustand global state management
```
---

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js v18+ (v22 recommended)
- npm v9+
- OBS Studio (or any RTMP-compatible streaming software)
- MongoDB Atlas account (optional)

---

### Clone the Repository

```bash
git clone <repository-url>
cd live-streaming-app
```

### Install Dependencies

```bash
cd rtmp-server && npm install && cd ..
cd server && npm install && cd ..
cd client && npm install && cd ..
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
API_PORT=5002
MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/"
Token_KEY="your-secret-jwt-key"
```

If no MongoDB connection string is provided, the application automatically falls back to an in-memory database for local development.

---

## Running the Application

The application consists of three independent services.

### 1. Start the Streaming Server

```bash
cd rtmp-server
npm start
```

Runs:

- RTMP Server → Port 1935
- HTTP-FLV Server → Port 8000

---

### 2. Start the Backend API

```bash
cd server
npm start
```

Runs:

- Express API → Port 5002
- Socket.IO Server

---

### 3. Start the Frontend

```bash
cd client
npm start
```

Application available at:

```text
http://localhost:3000
```

---

## Using NexStream

### Creating an Account

1. Open the application.
2. Navigate to the Login page.
3. Switch to Register.
4. Create an account.

Passwords are securely hashed using bcrypt and authentication is handled with JWT tokens.

---

### Going Live

1. Open OBS Studio.
2. Navigate to **Settings → Stream**.
3. Select **Custom Streaming Server**.
4. Configure:

```text
Server: rtmp://localhost/live
Stream Key: <your-stream-key>
```

5. Start streaming.

Your channel will automatically appear as live inside NexStream.

---

### Watching Streams

- Browse available channels from the dashboard.
- Live channels are marked with a red LIVE indicator.
- Click any channel to start watching.
- Streams are delivered using HTTP-FLV for low-latency playback.

---

### Real-Time Chat

Every channel includes a dedicated live chat powered by Socket.IO.

Features include:

- Instant message delivery
- Persistent message storage
- Authenticated user participation

---

### Following Streamers

Users can follow creators directly from the channel page.

Followed channels appear in the sidebar, making it easy to see which creators are currently live.

---

### Channel Management

Users can customize:

- Channel title
- Channel description
- Profile avatar
- Password
- Stream key

All settings are available from the account dashboard.

---

## Demo Data

To populate the database with sample users:

```bash
cd server
node seed.js
```

Created Accounts:

| Email | Password |
|---------|---------|
| alice@example.com | password123 |
| bob@example.com | password123 |
| charlie@example.com | password123 |

---


## Key Learnings

Building NexStream provided hands-on experience with:

- Real-time application development using Socket.IO
- Authentication and authorization using JWT
- Media streaming workflows using RTMP and HTTP-FLV
- State management with Zustand
- Designing scalable REST APIs with Express
- MongoDB schema design and data modeling
- Full-stack application architecture and deployment considerations

---

## Future Improvements

- Adaptive bitrate streaming (HLS/DASH)
- Stream recording and playback
- Stream moderation tools
- Creator analytics dashboard
- Notifications for followed channels
- Subscription and monetization features
- Multi-server streaming infrastructure
