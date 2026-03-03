import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Sending to Wandbox:", req.body); // add this

    const response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text(); // get raw text first
    console.log("Raw Wandbox response:", text); // log it

    const data = JSON.parse(text);
    res.json(data);
  } catch (error) {
    console.error("Execute error:", error.message);
    res.status(500).json({ error: error.message });
  }
});
router.get("/compilers", async (req, res) => {
  try {
    const response = await fetch("https://wandbox.org/api/list.json");
    const data = await response.json();
    // Return only the compiler names for easy reading
    const compilers = data.map(c => ({ name: c.name, language: c.language }));
    res.json(compilers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;