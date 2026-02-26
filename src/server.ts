import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

prisma.$connect().catch((err) => {
  console.log("Database connection error", err);
});

if (process.env.NODE_ENV !== "production") {
  async function main() {
    try {
      await prisma.$connect();
      console.log("Connected to database successfully");
      app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.log("An error occurred", err);
      process.exit(1);
    }
  }
  main();
}

export default app;
