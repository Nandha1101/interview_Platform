import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

// GET all problems (basic info only for listing/modal selection)
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find({}, "id title difficulty category description.text");
    res.status(200).json({ problems });
  } catch (error) {
    console.error("Error in GET /api/problems:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET a specific problem by title (e.g. for matching Session.js DB title mapping)
router.get("/by-title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const problem = await Problem.findOne({ title });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ problem });
  } catch (error) {
    console.error(`Error in GET /api/problems/by-title/${title}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET a specific problem by ID (e.g. 'two-sum')
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findOne({ id });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ problem });
  } catch (error) {
    console.error(`Error in GET /api/problems/${id}:`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
