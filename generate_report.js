import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  PageBreak,
} from 'docx';

async function generateDocxReport() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // ================= COVER PAGE =================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 200 },
            children: [
              new TextRun({
                text: 'CHANDIGARH UNIVERSITY',
                bold: true,
                size: 36,
                color: '1E3A8A', // Navy Blue
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 600 },
            children: [
              new TextRun({
                text: 'DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING',
                bold: true,
                size: 24,
                color: '475569',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: 'PROJECT REPORT',
                bold: true,
                size: 28,
                color: '0F172A',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 300 },
            children: [
              new TextRun({
                text: 'HireHub – Modern Job Portal Platform',
                bold: true,
                size: 44,
                color: '4F46E5', // Indigo
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 1200 },
            children: [
              new TextRun({
                text: 'A Full-Stack Enterprise Application Built with the MERN Stack, Role-Based Access Control, and AI Candidate Matching',
                italics: true,
                size: 22,
                color: '64748B',
                font: 'Arial',
              }),
            ],
          }),

          // Student Details Table
          new Table({
            alignment: AlignmentType.CENTER,
            width: { size: 85, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'EEF2FF', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 60 },
                        children: [
                          new TextRun({ text: 'Submitted By:', bold: true, size: 22, color: '1E293B' }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { before: 60, after: 60 },
                        children: [
                          new TextRun({ text: 'Name: ', bold: true, size: 22 }),
                          new TextRun({ text: 'Mohit Kumar', bold: true, size: 22, color: '4338CA' }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { before: 60, after: 60 },
                        children: [
                          new TextRun({ text: 'UID: ', bold: true, size: 22 }),
                          new TextRun({ text: '24BCS12347', bold: true, size: 22, color: '0F172A' }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { before: 60, after: 120 },
                        children: [
                          new TextRun({ text: 'Section: ', bold: true, size: 22 }),
                          new TextRun({ text: 'KRG_617_A', bold: true, size: 22, color: '0F172A' }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    shading: { fill: 'F8FAFC', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        spacing: { before: 120, after: 60 },
                        children: [
                          new TextRun({ text: 'Institution & Degree:', bold: true, size: 22, color: '1E293B' }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { before: 60, after: 60 },
                        children: [
                          new TextRun({ text: 'Chandigarh University', bold: true, size: 22, color: '1E3A8A' }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { before: 60, after: 60 },
                        children: [
                          new TextRun({ text: 'Bachelor of Engineering in CSE', size: 20 }),
                        ],
                      }),
                      new Paragraph({
                        spacing: { before: 60, after: 120 },
                        children: [
                          new TextRun({ text: 'Academic Session: 2024 – 2025', size: 20, color: '64748B' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // ================= TABLE OF CONTENTS =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
            children: [new TextRun({ text: 'Table of Contents', bold: true, size: 30, color: '1E3A8A' })],
          }),
          new Paragraph({ children: [new TextRun({ text: '1. Executive Summary', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '2. Project Motivation & Problem Statement', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '3. System Architecture & Technology Stack', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '4. User Role Specifications & Features', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '   4.1 Job Seeker Capabilities', size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: '   4.2 Recruiter & Employer Capabilities', size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: '   4.3 Administrator Moderation Capabilities', size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: '5. Database Schemas & Data Model Design', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '6. RESTful API Endpoints & Architecture', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '7. Security, Authentication & Data Protection', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '8. Advanced Capabilities: ATS Scanner & AI Matching', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '9. Setup, Execution & Testing Guide', size: 22 })] }),
          new Paragraph({ children: [new TextRun({ text: '10. Conclusion & Future Roadmap', size: 22 })] }),

          new Paragraph({ children: [new PageBreak()] }),

          // ================= 1. EXECUTIVE SUMMARY =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '1. Executive Summary', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: 'HireHub is a state-of-the-art, production-grade web application engineered to bridge the gap between talented tech job seekers and top-tier global hiring employers. Developed using the full MERN stack (MongoDB, Express.js, React.js, and Node.js), HireHub incorporates clean MVC architecture, robust role-based access control (RBAC), and premium SaaS user interface design conventions.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: 'Unlike static demo platforms, HireHub is an end-to-end operational portal supporting three discrete user roles: Job Seekers who discover, bookmark, and apply for jobs with ATS resume matching; Recruiters who post vacancies, review candidate pipelines, and coordinate live interviews; and Platform Administrators who oversee platform health, verify company registrations, and moderate reported listings.',
                size: 22,
              }),
            ],
          }),

          // ================= 2. PROBLEM STATEMENT =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '2. Project Motivation & Problem Statement', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: 'Traditional employment boards often suffer from severe user experience bottlenecks: opaque application tracking where candidates are left without status updates, fraudulent or stale job postings, and mismatched skill expectations. Employers struggle to filter thousands of unqualified applications manually.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: 'HireHub resolves these challenges through automated ATS resume keyword scoring, algorithmic skill match percentages (e.g. 95% Fit), full lifecycle application transparency ("Applied" -> "Under Review" -> "Shortlisted" -> "Interview Scheduled" -> "Selected"), and verified employer accreditation.',
                size: 22,
              }),
            ],
          }),

          // ================= 3. ARCHITECTURE & TECH STACK =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '3. System Architecture & Technology Stack', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: 'The platform implements a decoupled client-server architecture with secure RESTful communication, centralized state management, and resilient data models.',
                size: 22,
              }),
            ],
          }),

          new Table({
            alignment: AlignmentType.CENTER,
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: '4F46E5', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Tier / Layer', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    shading: { fill: '4F46E5', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Technologies & Libraries Employed', bold: true, color: 'FFFFFF' })] })],
                  }),
                  new TableCell({
                    shading: { fill: '4F46E5', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Core Responsibilities', bold: true, color: 'FFFFFF' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Frontend UI/UX', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'React 18, Vite, Tailwind CSS, Lucide React, Framer Motion' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Responsive SaaS dashboards, micro-interactions, dark-mode ready' })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'State & Networking', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Redux Toolkit, React Router DOM v6, Axios with Interceptors' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Global session, async thunks, token injection, caching' })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Backend API', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Node.js, Express.js (ESM), Helmet, Cookie-Parser, Multer' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'REST routing, rate limiting, error middleware, file uploads' })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Database & Auth', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'MongoDB, Mongoose ORM, JWT, Bcrypt.js, Memory Server' })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'NoSQL schemas, relational ObjectIds, password hashing' })] })] }),
                ],
              }),
            ],
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // ================= 4. USER ROLE SPECIFICATIONS =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '4. User Role Specifications & Features', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: '4.1 Job Seeker Role', bold: true, size: 24, color: '4F46E5' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Registration & Authentication: Secure signup, profile creation, and avatar upload.\n• Resume & ATS Scanner: Upload PDF/DOC resumes with instant ATS keyword match calculation (0-100%).\n• Job Discovery: Comprehensive faceted search filtering by title, location, workplace (remote/on-site/hybrid), job type (full-time/internship), and salary range.\n• 1-Click Applications: Submit cover letter and resume directly to active vacancies.\n• Lifecycle Tracking: Monitor stages in real-time, view scheduled interview dates and video meeting links.\n• Bookmarks & Alerts: Save favorite listings and configure daily/weekly email notifications.',
                size: 21,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '4.2 Recruiter / Employer Role', bold: true, size: 24, color: '4F46E5' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Company Profile Management: Upload logos, headquarters details, company size, and website links.\n• Vacancy Authoring: Post detailed jobs with responsibilities, qualifications, and required skills.\n• Job Management: Edit existing roles, toggle status between Active, Paused, and Closed.\n• Applicant Pipeline: Review all candidate profiles, view their resumes, examine their AI skill match score, and update statuses ("Shortlisted", "Interview Scheduled", "Selected", "Rejected").\n• Interview Coordination: Set specific interview dates, times, and video room URLs (Google Meet/Zoom) with automated candidate notifications.\n• Recruitment Analytics: Visual Recharts charts illustrating candidate stage funnel and applicant volume.',
                size: 21,
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: '4.3 Platform Administrator Role', bold: true, size: 24, color: '4F46E5' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Platform Analytics: Global metrics including total users, active jobs, applications, and monthly signup velocity.\n• User Moderation: Search and inspect all accounts; activate or suspend accounts violating terms.\n• Company Verification: Review employer legitimacy; grant verified badges or reject bogus employers.\n• Job Moderation: Remove inappropriate, scam, or fake job listings across the ecosystem.\n• Community Reports: Process tickets filed by candidates or recruiters with resolve/dismiss workflows.',
                size: 21,
              }),
            ],
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // ================= 5. DATABASE DESIGN =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '5. Database Schemas & Data Model Design', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'MongoDB is utilized as the primary database with Mongoose schemas enforcing validation, unique constraints, and ObjectId references:',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '1. User Schema: Name, email (unique), password (bcrypt hash), role (jobseeker/recruiter/admin), avatar, bio, skills array, experience array, education array, resume subdocument, profileCompletion virtual.\n2. Company Schema: Name, logo, website, description, industry, location, companySize, user (ref: User), verified boolean, status (pending/approved/rejected).\n3. Job Schema: Title, company (ref: Company), recruiter (ref: User), description, responsibilities, requirements, skills array, jobType, workplaceType, experienceLevel, salaryMin, salaryMax, status (active/paused/closed), views, applicantsCount.\n4. Application Schema: Job (ref: Job), candidate (ref: User), recruiter (ref: User), company (ref: Company), resumeUrl, coverLetter, status, matchScore, statusHistory array, interviewDate, interviewMeetingLink.\n5. SavedJob Schema: Compound index on user and job to guarantee unique bookmarks.\n6. Notification Schema: Recipient, sender, title, message, type, link, isRead.\n7. JobAlert Schema: User, title, location, jobType, frequency, isActive.\n8. Report Schema: Reporter, targetType (job/user/company), targetId, reason, status.',
                size: 21,
              }),
            ],
          }),

          // ================= 6. REST API DOCUMENTATION =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '6. RESTful API Architecture', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• Authentication: POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me, POST /api/auth/forgot-password, PUT /api/auth/reset-password/:token\n• Users: GET /api/users/profile, PUT /api/users/profile, POST /api/users/upload-resume, PUT /api/users/change-password, GET /api/users/saved-jobs, POST /api/users/saved-jobs/:jobId, GET /api/users/job-alerts, GET /api/users/recommended-jobs\n• Jobs: GET /api/jobs (with faceted query parameters: keyword, location, jobType, workplaceType, minSalary, sort, page), GET /api/jobs/:id, POST /api/jobs, PUT /api/jobs/:id, DELETE /api/jobs/:id, GET /api/jobs/recruiter/my-jobs, GET /api/jobs/featured, GET /api/jobs/stats/overview\n• Applications: POST /api/applications/:jobId, GET /api/applications/my-applications, GET /api/applications/job/:jobId, GET /api/applications/recruiter/all, PUT /api/applications/:id/status, DELETE /api/applications/:id\n• Companies: GET /api/companies, GET /api/companies/:id, GET /api/companies/me/profile, POST /api/companies\n• Admin: GET /api/admin/dashboard, GET /api/admin/users, PUT /api/admin/users/:id/status, GET /api/admin/jobs, DELETE /api/admin/jobs/:id, GET /api/admin/companies, PUT /api/admin/companies/:id/status, GET /api/admin/reports, PUT /api/admin/reports/:id\n• Notifications: GET /api/notifications, PUT /api/notifications/:id/read, PUT /api/notifications/read-all',
                size: 20,
              }),
            ],
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // ================= 7. SECURITY & AUTH =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '7. Security Implementation', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'HireHub enforces multi-layered enterprise application security:\n• Password Hashing: Bcrypt with 10 salt rounds ensures passwords are never stored in plaintext.\n• JWT & Cookies: Cryptographic JWT tokens transmitted via HTTP-only, secure, SameSite cookies and Bearer headers.\n• Role-Based Access Control (RBAC): Middleware verifies user roles before allowing access to recruiter or admin operations.\n• Defense in Depth: Helmet security headers, rate limiting (500 requests/15 mins per IP), file type filtering (PDF/DOC for resumes, PNG/JPG for images), and sanitized MongoDB queries preventing NoSQL injection.',
                size: 21,
              }),
            ],
          }),

          // ================= 8. ADVANCED FEATURES =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '8. Advanced Features: ATS Scanner & AI Matching', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '• ATS Resume Score Checker: Simulates Applicant Tracking System algorithms by analyzing technical keywords, contact information completeness, and experience tenure, generating a realistic 0-100 ATS readiness score.\n• Algorithmic Skill Match: Automatically calculates the intersection between job requirements and candidate skills, showing candidates and recruiters a live percentage match score (e.g. 95% Fit).\n• Zero-Configuration In-Memory Database: Ships with integrated MongoDB Memory Server and automatic realistic data seeding, allowing reviewers to test all platform features instantly without configuring local mongod or external databases.',
                size: 21,
              }),
            ],
          }),

          // ================= 9. SETUP & TESTING =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '9. Setup, Execution & Testing Guide', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Prerequisites: Node.js (v18+) and npm.\n\nBackend Setup:\n  cd server\n  npm install\n  node server.js (starts on port 5001)\n\nFrontend Setup:\n  cd client\n  npm install\n  npm run dev (starts on port 5173)\n\nPre-seeded One-Click Credentials:\n• Job Seeker: seeker@hirehub.com / password123\n• Recruiter: recruiter@hirehub.com / password123\n• Administrator: admin@hirehub.com / password123',
                size: 21,
              }),
            ],
          }),

          // ================= 10. CONCLUSION =================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: '10. Conclusion & Future Roadmap', bold: true, size: 28, color: '1E3A8A' })],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: 'HireHub successfully meets all modern full-stack development requirements, providing a visually compelling, secure, and feature-rich job portal platform. Future iterations will incorporate WebRTC live peer-to-peer video interviews directly inside the dashboard, automated AI mock technical interviews, and blockchain-verified credential badges.',
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({
                text: 'Project developed by Mohit Kumar (UID: 24BCS12347, Section: KRG_617_A) at Chandigarh University.',
                bold: true,
                italics: true,
                size: 22,
                color: '1E3A8A',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve('HireHub_Project_Report.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Word report successfully generated at: ${outputPath}`);
}

generateDocxReport().catch((err) => {
  console.error('Failed to generate report:', err);
  process.exit(1);
});

