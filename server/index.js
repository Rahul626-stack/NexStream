import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// Load .env with explicit path before anything else so MONGO_URI is always available
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

import users from "./src/models/users.js";
import Message from "./src/models/Message.js";
import Channel from "./src/models/Channel.js";

import authRoutes from "./src/routes/authRoutes.js";
import channelsRoutes from "./src/routes/channelsRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";
import { registerSocketServer } from "./src/io/io.js";

const PORT = process.env.PORT || process.env.API_PORT || 5002;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

registerSocketServer(server);

app.get("/", (req, res) => {
    return res.send("Server Online");
});

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelsRoutes);
app.use("/api/settings", settingsRoutes);

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        if (!uri) {
            console.log("No MONGO_URI provided. Starting MongoMemoryServer...");
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
        }
        await mongoose.connect(uri);
        server.listen(PORT, () => {
            console.log(`server is listening ${PORT}`);
        });
    } catch (err) {
        console.log("could not connect to server");
        console.log(err);
    }
};

connectDB();