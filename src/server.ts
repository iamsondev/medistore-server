import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });
dotenv.config();
import app from "./app.js";
import { prisma } from "./lib/prisma.js";

console.log("--- AI SERVICE STARTUP ---");
console.log("GROQ_API_KEY from process.env:", process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 10) + "..." : "MISSING");
console.log("------------------------");

const PORT = process.env.PORT || 5000;

async function main() {
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();