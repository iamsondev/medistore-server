import { prisma } from "../lib/prisma.js";
import { userRole } from "../middlewares/auth.js";
import dotenv from "dotenv";
dotenv.config();

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      role: userRole[process.env.ADMIN_ROLE as keyof typeof userRole],
      password: process.env.ADMIN_PASS as string,
    };
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const signUpAdmin = await fetch(
      "https://medistore-server-fawn.vercel.app/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://medistore-client-bice.vercel.app",
        },
        body: JSON.stringify(adminData),
      },
    );

    const result = await signUpAdmin.json();
    console.log("Server Response:", result);
    console.log(signUpAdmin);
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
