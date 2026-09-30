import Problem from "../models/Problem.js";
import { PROBLEMS } from "./problemsData.js";

export const seedProblems = async () => {
  try {
    const count = await Problem.countDocuments();
    if (count === 0) {
      console.log("No coding problems found in database. Seeding initial problems...");
      // Convert PROBLEMS object to array of values
      const problemsArray = Object.values(PROBLEMS);
      await Problem.insertMany(problemsArray);
      console.log(`Successfully seeded ${problemsArray.length} problems!`);
    } else {
      console.log("Coding problems already exist in database. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding coding problems:", error.message);
  }
};
