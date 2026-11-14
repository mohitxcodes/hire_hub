# 🚀 HireHub – Modern Full-Stack Job Portal Platform

A complete, production-grade, modern Job Portal platform built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Tailwind CSS**, and **Redux Toolkit**.

Developed by **Mohit Kumar** (UID: **24BCS12347**, Section: **KRG_617_A**) at **Chandigarh University**.

---

## 🌟 Key Highlights & Architecture

HireHub is a fully-integrated, enterprise-ready web platform with three distinct role-based experiences:

- 🎯 **Job Seeker**: Discover verified jobs with faceted filters, bookmark positions, submit 1-click applications with cover letters, scan resume ATS compatibility score, configure automated job alerts, and monitor live application review and interview stages.
- 🏢 **Recruiter / Employer**: Build company branding profile, publish and manage job vacancies, review applicant pipelines with AI skill fit scoring, inspect candidate resumes, shortlist/reject applicants, and coordinate technical interviews with Google Meet/Zoom video links.
- 🛡️ **Platform Administrator**: Global system analytics, user moderation (activate/suspend accounts), job verification (remove scam/inappropriate postings), company approval badges, and community dispute report resolution.
- ⚡ **Zero-Configuration MongoDB**: Built-in support for both MongoDB Atlas and zero-dependency in-memory MongoDB with automated realistic dataset seeding on startup.

---

## 🛠️ Technology Stack

| Layer                    | Technologies                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Frontend UI**          | React.js (Vite), Tailwind CSS, Framer Motion, Lucide Icons, Recharts                                           |
| **State Management**     | Redux Toolkit (`authSlice`, `jobSlice`, `applicationSlice`, `companySlice`, `adminSlice`, `notificationSlice`) |
| **Networking & Routing** | Axios (with bearer token interceptors), React Router DOM v6                                                    |
| **Backend API**          | Node.js, Express.js (ESM), Multer (file uploads), Cookie-Parser                                                |
| **Database & ODM**       | MongoDB with Mongoose, In-Memory Mongo Server fallback                                                         |
| **Security & Auth**      | JWT Authentication, Bcrypt password hashing, Helmet, Rate Limiting, HTTP-only cookies                          |

---

## 🔑 Pre-Seeded One-Click Demo Credentials

The platform auto-seeds with realistic initial data (companies, jobs, applications) on initial launch. You can log in using the one-click demo buttons on `/login` or enter:

| Role              | Email                   | Password      |
| ----------------- | ----------------------- | ------------- |
| **Job Seeker**    | `seeker@hirehub.com`    | `password123` |
| **Recruiter**     | `recruiter@hirehub.com` | `password123` |
| **Administrator** | `admin@hirehub.com`     | `password123` |

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Backend Server Setup

```bash
cd server
npm install
node server.js
```

The server will boot on `http://localhost:5001` and automatically start the in-memory MongoDB server and seed data if needed.

### 3. Frontend Client Setup

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```text
hire_hub/
├── HireHub_Project_Report.docx       # Generated Academic Project Report (.docx)
├── generate_report.js               # Report generation utility script
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/              # Navbar, Footer, JobCard, Badge, ProtectedRoute, etc.
│       │   └── layout/              # DashboardLayout with responsive role sidebar
│       ├── pages/
│       │   ├── auth/                # Login, Register, ForgotPassword, ResetPassword
│       │   ├── public/              # LandingPage, BrowseJobs, JobDetails, Companies, etc.
│       │   ├── seeker/              # SeekerDashboard, Profile, EditProfile, Applications, etc.
│       │   ├── recruiter/           # RecruiterDashboard, PostJob, ManageJobs, Applicants, etc.
│       │   └── admin/               # AdminDashboard, Users, Jobs, Companies, Reports
│       ├── services/                # Axios API instance with interceptors
│       ├── store/                   # Redux Toolkit store and feature slices
│       └── App.jsx                  # React Router DOM configuration
│
└── server/
    ├── config/                      # MongoDB connection (Atlas + MongoMemoryServer)
    ├── controllers/                 # Auth, User, Job, Application, Company, Admin controllers
    ├── middleware/                  # JWT Protect, Role Authorize, Multer upload, Centralized Error
    ├── models/                      # User, Job, Company, Application, SavedJob, Notification, Report
    ├── routes/                      # RESTful Express routers
    ├── utils/                       # Auto-seeder with realistic production data
    └── server.js                    # Express application entrypoint
```

---

## 📚 REST API Reference

### Authentication

- `POST /api/auth/register` – Register new Job Seeker or Recruiter
- `POST /api/auth/login` – Authenticate user and receive JWT
- `POST /api/auth/logout` – Clear authentication cookie
- `GET /api/auth/me` – Retrieve current authenticated user profile
- `POST /api/auth/forgot-password` – Generate password reset token
- `PUT /api/auth/reset-password/:token` – Update password with token

### Jobs

- `GET /api/jobs` – Faceted search with filters (keyword, location, jobType, workplaceType, minSalary, sort, page)
- `GET /api/jobs/:id` – Detailed job specs and related vacancies
- `POST /api/jobs` – Post new vacancy (Recruiter only)
- `PUT /api/jobs/:id` – Update job vacancy
- `DELETE /api/jobs/:id` – Delete vacancy and associated applications

### Applications

- `POST /api/applications/:jobId` – Submit 1-click application with resume and cover letter
- `GET /api/applications/my-applications` – Candidate applications tracking pipeline
- `GET /api/applications/job/:jobId` – Applicants for specific job posting
- `GET /api/applications/recruiter/all` – All applicants across recruiter's jobs
- `PUT /api/applications/:id/status` – Update candidate stage and set interview schedule

### Admin & Moderation

- `GET /api/admin/dashboard` – Global platform metrics and charts
- `GET /api/admin/users` – User management and role filtering
- `PUT /api/admin/users/:id/status` – Suspend or activate user accounts
- `GET /api/admin/companies` – Review employer verification requests
- `PUT /api/admin/companies/:id/status` – Approve or reject companies

---

## 🎓 Academic Submission

- **Student Name**: Mohit Kumar
- **UID**: 24BCS12347
- **Class / Section**: KRG_617_A
- **University**: Chandigarh University
- **Deliverable Report**: `HireHub_Project_Report.docx`
