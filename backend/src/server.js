import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { serve } from "inngest/express";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

// Inngest endpoint
app.use(
  "/api/inngest",
  serve({ client: inngest, functions })
);

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
