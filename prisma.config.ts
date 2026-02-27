import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm tsx ./src/scripts/seedAdmin.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
