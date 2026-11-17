// ============================================================
// HireHub — Complete Frontend Mock Data (No Backend Required)
// ============================================================

// ── Fake Mongo-style IDs ───────────────────────────────────
const id = (n) => `64f${String(n).padStart(21, '0')}`;

// ── Users ──────────────────────────────────────────────────
export const USERS = {
  admin: {
    _id: id(1),
    name: 'Mohit Kumar',
    email: 'admin@hirehub.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    title: 'Platform Administrator',
    location: 'Chandigarh, India',
    createdAt: '2024-01-01T00:00:00Z',
    status: 'active',
  },
  recruiter: {
    _id: id(2),
    name: 'Sarah Jenkins',
    email: 'recruiter@hirehub.com',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    title: 'Senior Talent Acquisition Partner',
    phone: '+1 555-0199',
    location: 'San Francisco, CA',
    company: id(10), // google
    createdAt: '2024-01-15T00:00:00Z',
    status: 'active',
  },
  recruiter2: {
    _id: id(3),
    name: 'Alex Rivera',
    email: 'alex@stripe.com',
    role: 'recruiter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    title: 'Head of Global Talent',
    phone: '+1 555-0188',
    location: 'New York, NY',
    company: id(11), // stripe
    createdAt: '2024-02-01T00:00:00Z',
    status: 'active',
  },
  seeker: {
    _id: id(4),
    name: 'Mohit Kumar',
    email: 'seeker@hirehub.com',
    role: 'jobseeker',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    phone: '+91 9876543210',
    title: 'Full Stack Software Engineer (MERN)',
    bio: 'Passionate software engineer building resilient modern web applications with React, Node.js, Express, and MongoDB.',
    location: 'Chandigarh, India',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux', 'Docker', 'REST APIs'],
    experience: [
      {
        title: 'Full Stack Developer Intern',
        company: 'Cloud Innovations Ltd',
        location: 'Remote',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        isCurrent: false,
        description: 'Built high performance React interfaces and REST endpoints using Node.js and Express.',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Engineering in Computer Science',
        institution: 'Chandigarh University',
        fieldOfStudy: 'Computer Science and Engineering',
        startYear: 2021,
        endYear: 2025,
        grade: '9.2 CGPA',
      },
    ],
    resume: {
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      filename: 'Mohit_Kumar_MERN_Resume.pdf',
      uploadedAt: new Date().toISOString(),
      atsScore: 92,
    },
    createdAt: '2024-03-01T00:00:00Z',
    status: 'active',
  },
  seeker2: {
    _id: id(5),
    name: 'Emily Watson',
    email: 'emily@example.com',
    role: 'jobseeker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    title: 'Senior Product Designer',
    bio: 'Designing human-centric web applications and scalable design systems.',
    location: 'Austin, TX',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Tailwind CSS'],
    resume: {
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      filename: 'Emily_Watson_Design_Resume.pdf',
      uploadedAt: new Date().toISOString(),
      atsScore: 88,
    },
    createdAt: '2024-03-15T00:00:00Z',
    status: 'active',
  },
};

export const ALL_USERS = Object.values(USERS);

// ── Companies ──────────────────────────────────────────────
export const COMPANIES = [
  {
    _id: id(10),
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    website: 'https://careers.google.com',
    description: "Our mission is to organize the world's information and make it universally accessible and useful.",
    industry: 'Technology',
    location: 'Mountain View, CA',
    companySize: '1000+',
    foundedYear: 1998,
    user: id(2),
    verified: true,
    rating: 4.9,
    reviewsCount: 342,
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    _id: id(11),
    name: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    website: 'https://stripe.com/jobs',
    description: 'Financial infrastructure for the internet. Millions of companies use Stripe to accept payments and scale online.',
    industry: 'Fintech',
    location: 'San Francisco, CA',
    companySize: '1000+',
    foundedYear: 2010,
    user: id(3),
    verified: true,
    rating: 4.8,
    reviewsCount: 156,
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    _id: id(12),
    name: 'Netflix',
    logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=200&q=80',
    website: 'https://jobs.netflix.com',
    description: 'At Netflix, we want to entertain the world with best-in-class TV series, documentaries, and films.',
    industry: 'Entertainment',
    location: 'Los Gatos, CA',
    companySize: '1000+',
    foundedYear: 1997,
    user: id(2),
    verified: true,
    rating: 4.7,
    reviewsCount: 98,
    status: 'active',
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    _id: id(13),
    name: 'Airbnb',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
    website: 'https://careers.airbnb.com',
    description: 'Airbnb creates meaningful connections and enables hosts to share their homes with travelers globally.',
    industry: 'Travel & Hospitality',
    location: 'San Francisco, CA',
    companySize: '501-1000',
    foundedYear: 2008,
    user: id(3),
    verified: true,
    rating: 4.8,
    reviewsCount: 84,
    status: 'active',
    createdAt: '2024-02-15T00:00:00Z',
  },
];

// ── Jobs ───────────────────────────────────────────────────
export const JOBS = [
  {
    _id: id(20),
    title: 'Senior Full Stack MERN Developer',
    company: COMPANIES[0],      // Google
    recruiter: USERS.recruiter,
    description: 'We are seeking an outstanding Senior Full Stack Developer to build next-generation cloud services and developer tooling. You will architect robust web applications with modern React frontends and Node.js microservices.',
    responsibilities: [
      'Architect and deliver production-ready full-stack applications',
      'Design clean RESTful APIs with Express and MongoDB',
      'Maintain high coding standards, test coverage, and code reviews',
      'Optimize user experience and client-side performance',
    ],
    requirements: [
      '4+ years of professional full-stack development experience',
      'Deep expertise in React, Node.js, Express, MongoDB, and Tailwind CSS',
      'Solid understanding of authentication, state management (Redux Toolkit), and caching',
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Redux', 'Tailwind CSS'],
    jobType: 'full-time',
    workplaceType: 'remote',
    experienceLevel: 'senior',
    industry: 'Technology',
    location: 'Remote / Mountain View, CA',
    salaryMin: 140000,
    salaryMax: 185000,
    salaryCurrency: 'USD',
    isSalaryNegotiable: true,
    featured: true,
    views: 1420,
    applicantsCount: 18,
    status: 'active',
    createdAt: '2024-10-01T00:00:00Z',
  },
  {
    _id: id(21),
    title: 'Lead Frontend Engineer (React / Next.js)',
    company: COMPANIES[1],      // Stripe
    recruiter: USERS.recruiter2,
    description: 'Stripe is looking for a Lead Frontend Engineer to build world-class dashboard interfaces for millions of businesses worldwide.',
    responsibilities: [
      'Drive frontend architecture and design system best practices',
      'Ensure exceptional performance, responsiveness, and accessibility',
      'Partner with product and design leaders to ship delightful interfaces',
    ],
    requirements: [
      '5+ years building modern web applications',
      'Mastery of React, JavaScript, modern CSS/Tailwind, and state management',
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'JavaScript'],
    jobType: 'full-time',
    workplaceType: 'remote',
    experienceLevel: 'lead',
    industry: 'Fintech',
    location: 'San Francisco, CA / Remote',
    salaryMin: 165000,
    salaryMax: 215000,
    salaryCurrency: 'USD',
    featured: true,
    views: 2100,
    applicantsCount: 24,
    status: 'active',
    createdAt: '2024-10-05T00:00:00Z',
  },
  {
    _id: id(22),
    title: 'Backend Node.js API Engineer',
    company: COMPANIES[2],      // Netflix
    recruiter: USERS.recruiter,
    description: 'Join our Streaming Infrastructure team to design resilient APIs and streaming control planes.',
    responsibilities: [
      'Develop high-throughput RESTful endpoints using Node.js and Express',
      'Optimize MongoDB queries and indexing strategies',
      'Implement rate limiting, JWT authentication, and security monitoring',
    ],
    requirements: [
      '3+ years backend development experience with Node.js and NoSQL databases',
      'Experience building scalable distributed microservices',
    ],
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Docker'],
    jobType: 'full-time',
    workplaceType: 'hybrid',
    experienceLevel: 'mid',
    industry: 'Entertainment',
    location: 'Los Gatos, CA',
    salaryMin: 125000,
    salaryMax: 160000,
    salaryCurrency: 'USD',
    featured: true,
    views: 980,
    applicantsCount: 12,
    status: 'active',
    createdAt: '2024-10-10T00:00:00Z',
  },
  {
    _id: id(23),
    title: 'Product Designer (UI / UX)',
    company: COMPANIES[3],      // Airbnb
    recruiter: USERS.recruiter2,
    description: 'Shape the future of global travel experiences by designing seamless booking and discovery flows.',
    responsibilities: [
      'Create user journey maps, wireframes, and interactive prototypes',
      'Contribute to our core design system and component guidelines',
    ],
    requirements: [
      'Portfolio showing strong product and visual design craftsmanship',
      '3+ years using Figma and modern design tools',
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research'],
    jobType: 'full-time',
    workplaceType: 'remote',
    experienceLevel: 'mid',
    industry: 'Travel & Hospitality',
    location: 'San Francisco, CA',
    salaryMin: 110000,
    salaryMax: 145000,
    salaryCurrency: 'USD',
    featured: false,
    views: 750,
    applicantsCount: 9,
    status: 'active',
    createdAt: '2024-10-12T00:00:00Z',
  },
  {
    _id: id(24),
    title: 'Junior Software Engineer (React / Node)',
    company: COMPANIES[0],      // Google
    recruiter: USERS.recruiter,
    description: 'Opportunity for early-career developers to grow in an engineering culture focused on excellence and innovation.',
    responsibilities: [
      'Implement clean UI components using Tailwind CSS and React',
      'Write automated tests and collaborate in code reviews',
    ],
    requirements: [
      'Degree in Computer Science or equivalent software engineering background',
      'Strong understanding of JavaScript, React, and REST APIs',
    ],
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Git'],
    jobType: 'full-time',
    workplaceType: 'hybrid',
    experienceLevel: 'entry',
    industry: 'Technology',
    location: 'Mountain View, CA',
    salaryMin: 85000,
    salaryMax: 115000,
    salaryCurrency: 'USD',
    featured: false,
    views: 3100,
    applicantsCount: 45,
    status: 'active',
    createdAt: '2024-10-15T00:00:00Z',
  },
  {
    _id: id(25),
    title: 'Full Stack Web Developer Intern',
    company: COMPANIES[1],      // Stripe
    recruiter: USERS.recruiter2,
    description: 'Join our internship program to work alongside seasoned engineers building global internet commerce tools.',
    responsibilities: [
      'Build customer dashboard components and feature toggles',
      'Assist with backend API documentation and testing',
    ],
    requirements: [
      'Pursuing degree in Computer Science, Software Engineering or related discipline',
      'Familiarity with the MERN stack',
    ],
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    jobType: 'internship',
    workplaceType: 'remote',
    experienceLevel: 'entry',
    industry: 'Fintech',
    location: 'Remote',
    salaryMin: 50000,
    salaryMax: 70000,
    salaryCurrency: 'USD',
    featured: false,
    views: 1800,
    applicantsCount: 30,
    status: 'active',
    createdAt: '2024-10-20T00:00:00Z',
  },
];

// ── Applications ───────────────────────────────────────────
export const APPLICATIONS = [
  {
    _id: id(30),
    job: JOBS[0],
    candidate: USERS.seeker,
    recruiter: USERS.recruiter,
    company: COMPANIES[0],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverLetter: 'Dear Hiring Team, I am thrilled to apply for the Senior Full Stack MERN Developer role. With strong proficiency in React, Node, Express, and MongoDB, I am confident I can contribute directly to your team goals.',
    status: 'Shortlisted',
    matchScore: 95,
    statusHistory: [
      { status: 'Applied', note: 'Application received', updatedAt: '2024-10-02T00:00:00Z' },
      { status: 'Under Review', note: 'Resume screened by hiring manager', updatedAt: '2024-10-04T00:00:00Z' },
      { status: 'Shortlisted', note: 'Top candidate match based on skills', updatedAt: '2024-10-06T00:00:00Z' },
    ],
    createdAt: '2024-10-02T00:00:00Z',
  },
  {
    _id: id(31),
    job: JOBS[1],
    candidate: USERS.seeker,
    recruiter: USERS.recruiter2,
    company: COMPANIES[1],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverLetter: 'Excited to apply for Lead Frontend Engineer at Stripe. My expertise in React and Tailwind CSS aligns directly with your technical stack.',
    status: 'Interview Scheduled',
    matchScore: 90,
    interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    interviewMeetingLink: 'https://meet.google.com/xyz-hire-hub',
    statusHistory: [
      { status: 'Applied', note: 'Application submitted', updatedAt: '2024-10-03T00:00:00Z' },
      { status: 'Shortlisted', note: 'Selected for interview', updatedAt: '2024-10-07T00:00:00Z' },
      { status: 'Interview Scheduled', note: 'Technical Round 1', updatedAt: '2024-10-08T00:00:00Z' },
    ],
    createdAt: '2024-10-03T00:00:00Z',
  },
  {
    _id: id(32),
    job: JOBS[3],
    candidate: USERS.seeker2,
    recruiter: USERS.recruiter2,
    company: COMPANIES[3],
    resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    coverLetter: "Hello! I love Airbnb's design aesthetic and would relish the chance to design delightful hospitality flows.",
    status: 'Selected',
    matchScore: 96,
    statusHistory: [
      { status: 'Applied', note: 'Applied', updatedAt: '2024-10-01T00:00:00Z' },
      { status: 'Selected', note: 'Offer accepted!', updatedAt: '2024-10-10T00:00:00Z' },
    ],
    createdAt: '2024-10-01T00:00:00Z',
  },
];

// ── Saved Jobs ─────────────────────────────────────────────
export const SAVED_JOBS = [JOBS[2]]; // Netflix Backend role saved by seeker

// ── Job Alerts ─────────────────────────────────────────────
export const JOB_ALERTS = [
  {
    _id: id(40),
    user: id(4),
    title: 'Full Stack Engineer',
    location: 'Remote',
    jobType: 'full-time',
    minSalary: 120000,
    frequency: 'daily',
    createdAt: '2024-10-01T00:00:00Z',
  },
];

// ── Notifications ──────────────────────────────────────────
export const NOTIFICATIONS = {
  seeker: [
    {
      _id: id(50),
      recipient: id(4),
      title: 'Application Shortlisted! 🎉',
      message: 'Google has shortlisted your application for Senior Full Stack MERN Developer.',
      type: 'status_change',
      link: '/seeker/applications',
      isRead: false,
      createdAt: '2024-10-06T10:00:00Z',
    },
    {
      _id: id(51),
      recipient: id(4),
      title: 'Interview Scheduled 🗓️',
      message: 'Stripe scheduled an interview for Lead Frontend Engineer on your calendar.',
      type: 'status_change',
      link: '/seeker/applications',
      isRead: false,
      createdAt: '2024-10-08T14:00:00Z',
    },
  ],
  recruiter: [
    {
      _id: id(52),
      recipient: id(2),
      title: 'New Applicant',
      message: 'Mohit Kumar applied for Senior Full Stack MERN Developer with a 95% skill match score.',
      type: 'application',
      link: '/recruiter/applicants',
      isRead: false,
      createdAt: '2024-10-02T09:00:00Z',
    },
  ],
  admin: [],
};

// ── Reports (Admin) ────────────────────────────────────────
export const REPORTS = [
  {
    _id: id(60),
    reporter: USERS.seeker2,
    targetType: 'job',
    targetId: id(24),
    targetTitle: 'Salary bracket query',
    reason: 'Information verification',
    description: 'Requesting verification of the junior developer role compensation tier.',
    status: 'pending',
    createdAt: '2024-10-15T00:00:00Z',
  },
];

// ── Admin Dashboard Stats ──────────────────────────────────
export const ADMIN_STATS = {
  stats: {
    totalUsers: 5,
    totalJobs: 6,
    totalApplications: 3,
    totalCompanies: 4,
    activeUsers: 5,
    activeJobs: 6,
  },
  monthlyStats: [
    { month: 'Jul', users: 2, jobs: 1, applications: 0 },
    { month: 'Aug', users: 3, jobs: 2, applications: 1 },
    { month: 'Sep', users: 4, jobs: 3, applications: 1 },
    { month: 'Oct', users: 5, jobs: 6, applications: 3 },
    { month: 'Nov', users: 5, jobs: 6, applications: 3 },
  ],
  applicationStatusCounts: [
    { _id: 'Shortlisted', count: 1 },
    { _id: 'Interview Scheduled', count: 1 },
    { _id: 'Selected', count: 1 },
  ],
};

// ── Job Stats / Categories ─────────────────────────────────
export const JOB_STATS = {
  stats: {
    totalJobs: 6,
    totalCompanies: 4,
    totalApplications: 3,
    remoteJobs: 4,
  },
  categories: [
    { _id: 'Technology', count: 3 },
    { _id: 'Fintech', count: 2 },
    { _id: 'Entertainment', count: 1 },
    { _id: 'Travel & Hospitality', count: 1 },
  ],
};
