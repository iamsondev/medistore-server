import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local", override: true });
config({ path: ".env" });

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