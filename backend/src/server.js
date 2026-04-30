import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import executeRoute from "./routes/executeRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // disable CSP for SPA compatibility
  crossOriginEmbedderPolicy: false, // needed for Stream video SDK
}));

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL, // Dynamically load CLIENT_URL from .env
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

// Test route
app.get("/api", (req, res) => {
  res.status(200).json({ msg: "Success from api" });
});

app.use("/api/execute", executeRoute);
// Inngest endpoint
app.use(
  "/api/inngest",
  serve({ client: inngest, functions })
);
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Serve React app for unknown routes (SPA routing) - use regex to avoid path-to-regexp issues
app.get(/^(?!\/api\/).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

// Global error handler — catches unhandled errors from all routes
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err.message);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message,
  });
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
