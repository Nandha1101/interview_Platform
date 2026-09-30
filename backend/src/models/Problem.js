import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"]
  },
  category: {
    type: String,
    required: true
  },
  description: {
    text: { type: String, required: true },
    notes: [{ type: String }]
  },
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
      explanation: { type: String }
    }
  ],
  constraints: [{ type: String }],
  starterCode: {
    javascript: { type: String },
    python: { type: String },
    java: { type: String }
  },
  expectedOutput: {
    javascript: { type: String },
    python: { type: String },
    java: { type: String }
  }
}, { timestamps: true });

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
