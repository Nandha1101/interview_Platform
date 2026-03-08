import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import executeRoute from "./routes/executeRoute.js";
import path from 'path';
const app = express();

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL, // Dynamically load CLIENT_URL from .env
      'https://interview-platform-git-main-nandhakishor507-4064s-projects.vercel.app',
      'https://interview-platform-oekeh11ag-nandhakishor507-4064s-projects.vercel.app',
      'https://interview-platform-five-fawn.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(clerkMiddleware()); //this adds auth field to request object

app.use("/api/execute", executeRoute);
// Inngest endpoint
app.use(
  "/api/inngest",
  serve({ client: inngest, functions })
);
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)

// Serve static files from the frontend build folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Replace the wildcard route with app.use()
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success from api" });
});

// ✅ SINGLE server start
const PORT = process.env.PORT || ENV.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server", error);
    process.exit(1);
  }
};

// ✅ CALL IT
startServer();
