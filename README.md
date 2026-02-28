💊 MediStore – Backend API (Online Medicine Shop)

🔗 Frontend Live: https://medistore-client-bice.vercel.app

🔗 Backend Live: https://medistore-server-fawn.vercel.app

🎥 Demo Video: https://drive.google.com/file/d/15dPqwcP9rfxQYUSjQkfi8nzgI-WNqPrr/view?usp=sharing

📂 Frontend Repository: https://github.com/iamsondev/mdeistore-client

📂 Backend Repository: https://github.com/iamsondev/medistore-server

🚀 Project Overview

MediStore Backend is the REST API server for the MediStore full-stack e-commerce web application.

It handles:

Authentication (Google OAuth)

Medicine Management (CRUD)

Cart System

Order Processing

Role-based Authorization

Stock Validation

This backend is built with scalability, modular architecture, and secure authentication practices.

🛠 Tech Stack
⚙ Backend

Node.js

Express.js

PostgreSQL

Prisma ORM

Better Auth (Google OAuth)

Zod Validation

Vercel Serverless Deployment

🔐 Authentication

Google OAuth Login

Secure session handling using Better Auth

Role-based user management (Admin / User)

Protected Routes Middleware

✨ Core Features

🧾 Medicine CRUD (Admin Only)

👤 User Management

🛒 Cart Management

📦 Order Placement & Processing

❌ Out-of-stock Handling

🛡 Input Validation using Zod

🗄 Database Management with Prisma ORM

📦 Installation Guide
1️⃣ Clone Repository
git clone https://github.com/iamsondev/medistore-server
cd medistore-server
npm install
2️⃣ Environment Variables

Create .env file:

DATABASE_URL=your_postgres_database_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_secret
3️⃣ Run Prisma
npx prisma generate
npx prisma migrate dev
4️⃣ Start Server
npm run dev

Server runs on:

http://localhost:5000
🗄 Database Schema

Built using Prisma ORM with:

User

Medicine

Order

Cart

Role-based system

🌍 Live Deployment

Backend deployed on Vercel Serverless Functions

Production Database: PostgreSQL

📈 Future Improvements

💳 Payment Gateway Integration

📊 Admin Analytics

📦 Order Tracking System

⭐ Review & Rating System

📧 Email Notification System

👨‍💻 Author

Sondip Kumar
Full Stack Developer (MERN + Next.js + PostgreSQL)

GitHub: https://github.com/iamsondev

📜 License

This project is for educational purposes.
