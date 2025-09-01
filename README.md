🧑‍💼 Freelance Job Portal
A full-stack MERN Job Portal Application where employers can post jobs and freelancers/job seekers can search, apply, and manage their applications.

🚀 Features
Frontend (React + Tailwind / Chakra UI)
User authentication (Register, Login, Logout).

Role-based access (Job Seeker & Employer).

Browse, search, and filter jobs.

Apply for jobs with real-time feedback.

Post, edit, and delete jobs (Employer only).

Responsive design with modern UI.

Backend (Node.js + Express + MongoDB)
RESTful API with JWT authentication.

Role-based middleware for employers and job seekers.

Job CRUD operations.

User authentication & profile management.

Stripe integration for payments.

Webhook support for secure payment events.

🛠️ Tech Stack
Frontend: React, React Router, Context API / Redux, TailwindCSS / Chakra UI

Backend: Node.js, Express.js, MongoDB (Mongoose), JWT

Payments: Stripe API

⚙️ Installation
1️⃣ Clone Repo
git clone https://github.com/your-username/job-portal.git
cd job-portal
2️⃣ Backend Setup
cd backend
npm install
Create a .env file in backend/ and add:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
Create a .env file in frontend/ and add:

VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
Run frontend:

npm run dev
🌍 Deployment
Backend: Render

Frontend: Netlify / Vercel

Update API URL in frontend .env when deployed:

VITE_API_URL=https://your-backend.onrender.com/api
🤝 Contributing
Fork the repo

Create a new branch (feature/awesome-feature)

Commit changes (git commit -m 'Add awesome feature')

Push branch (git push origin feature/awesome-feature)

Open a Pull Request



Deployment: Render (Backend), Netlify/Vercel (Frontend)

