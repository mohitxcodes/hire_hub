import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import SavedJob from '../models/SavedJob.js';
import Notification from '../models/Notification.js';
import JobAlert from '../models/JobAlert.js';
import Report from '../models/Report.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hirehub';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Company.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();
    await SavedJob.deleteMany();
    await Notification.deleteMany();
    await JobAlert.deleteMany();
    await Report.deleteMany();

    console.log('Cleared existing database records.');

    // Password hash
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create Admin
    const adminUser = await User.create({
      name: 'Mohit Kumar (Admin)',
      email: 'admin@hirehub.com',
      password: hashedPassword,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      title: 'Platform Administrator',
      location: 'Chandigarh, India',
    });

    // 2. Create Recruiters
    const recruiterUser = await User.create({
      name: 'Sarah Jenkins',
      email: 'recruiter@hirehub.com',
      password: hashedPassword,
      role: 'recruiter',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      title: 'Senior Talent Acquisition Partner',
      phone: '+1 555-0199',
      location: 'San Francisco, CA',
    });

    const recruiter2 = await User.create({
      name: 'Alex Rivera',
      email: 'alex@stripe.com',
      password: hashedPassword,
      role: 'recruiter',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      title: 'Head of Global Talent',
      phone: '+1 555-0188',
      location: 'New York, NY',
    });

    // 3. Create Companies
    const googleCompany = await Company.create({
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      website: 'https://careers.google.com',
      description: 'Our mission is to organize the world’s information and make it universally accessible and useful.',
      industry: 'Technology',
      location: 'Mountain View, CA',
      companySize: '1000+',
      foundedYear: 1998,
      user: recruiterUser._id,
      verified: true,
      rating: 4.9,
      reviewsCount: 342,
    });

    const stripeCompany = await Company.create({
      name: 'Stripe',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      website: 'https://stripe.com/jobs',
      description: 'Financial infrastructure for the internet. Millions of companies use Stripe to accept payments and grow.',
      industry: 'Fintech',
      location: 'San Francisco, CA',
      companySize: '1000+',
      foundedYear: 2010,
      user: recruiter2._id,
      verified: true,
      rating: 4.8,
      reviewsCount: 156,
    });

    const netflixCompany = await Company.create({
      name: 'Netflix',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=200&q=80',
      website: 'https://jobs.netflix.com',
      description: 'At Netflix, we want to entertain the world. Whatever your taste, we give you access to best-in-class TV series and films.',
      industry: 'Entertainment',
      location: 'Los Gatos, CA',
      companySize: '1000+',
      foundedYear: 1997,
      user: recruiterUser._id,
      verified: true,
      rating: 4.7,
      reviewsCount: 98,
    });

    const airbnbCompany = await Company.create({
      name: 'Airbnb',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
      website: 'https://careers.airbnb.com',
      description: 'Airbnb was born in 2007 when two hosts welcomed three guests to their San Francisco home.',
      industry: 'Travel & Hospitality',
      location: 'San Francisco, CA',
      companySize: '501-1000',
      foundedYear: 2008,
      user: recruiter2._id,
      verified: true,
      rating: 4.8,
      reviewsCount: 84,
    });

    // Link company to recruiter
    recruiterUser.company = googleCompany._id;
    await recruiterUser.save();
    recruiter2.company = stripeCompany._id;
    await recruiter2.save();

    // 4. Create Jobseekers
    const seekerUser = await User.create({
      name: 'Mohit Kumar',
      email: 'seeker@hirehub.com',
      password: hashedPassword,
      role: 'jobseeker',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      phone: '+91 9876543210',
      title: 'Full Stack Software Engineer (MERN)',
      bio: 'Passionate software engineer skilled in building scalable full-stack web applications with React, Node.js, and cloud systems.',
      location: 'Chandigarh, India',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux', 'Docker', 'REST APIs'],
      experience: [
        {
          title: 'Software Developer Intern',
          company: 'Tech Solutions Inc',
          location: 'Remote',
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-12-31'),
          isCurrent: false,
          description: 'Developed responsive user interfaces with React and built RESTful endpoints using Node and Express.',
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
        url: '/uploads/sample-resume.pdf',
        filename: 'Mohit_Kumar_Software_Engineer_Resume.pdf',
        uploadedAt: new Date(),
        atsScore: 92,
      },
    });

    const seeker2 = await User.create({
      name: 'Emily Watson',
      email: 'emily@example.com',
      password: hashedPassword,
      role: 'jobseeker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      title: 'Senior UI/UX Designer',
      bio: 'Creating human-centric digital experiences with Figma and design systems.',
      location: 'Austin, TX',
      skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping', 'Tailwind CSS'],
      resume: {
        url: '/uploads/sample-resume-designer.pdf',
        filename: 'Emily_Watson_UX_Resume.pdf',
        uploadedAt: new Date(),
        atsScore: 88,
      },
    });

    // 5. Create Job Postings
    const jobs = await Job.create([
      {
        title: 'Senior Full Stack MERN Developer',
        company: googleCompany._id,
        recruiter: recruiterUser._id,
        description: 'We are looking for an experienced Senior Full Stack Developer to build our next generation cloud application platforms. You will work across modern React frontends and scalable Node/MongoDB backends.',
        responsibilities: [
          'Architect and build high-performance, fault-tolerant web applications',
          'Design clean RESTful APIs and microservices',
          'Collaborate with product managers and UX designers to refine requirements',
          'Mentor junior team members and conduct code reviews',
        ],
        requirements: [
          '4+ years of professional full-stack development experience',
          'Proficiency with React, Node.js, Express, MongoDB, and TypeScript',
          'Hands-on experience with state management (Redux Toolkit) and Tailwind CSS',
          'Familiarity with CI/CD and containerization (Docker, Kubernetes)',
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
      },
      {
        title: 'Lead Frontend Engineer (React / Next.js)',
        company: stripeCompany._id,
        recruiter: recruiter2._id,
        description: 'Stripe is looking for a Lead Frontend Engineer to build world-class financial interfaces. You will create delightful, bulletproof user experiences used by millions worldwide.',
        responsibilities: [
          'Drive the technical roadmap for frontend architecture across multiple squads',
          'Ensure exceptional web performance, accessibility, and pixel-perfect design',
          'Develop reusable component libraries and design system standards',
        ],
        requirements: [
          '5+ years building modern client-side web apps',
          'Expert-level mastery of React, JavaScript/TypeScript, and modern CSS',
          'Deep understanding of browser rendering and performance optimization',
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
      },
      {
        title: 'Backend Node.js API Engineer',
        company: netflixCompany._id,
        recruiter: recruiterUser._id,
        description: 'Join our Streaming Infrastructure team to design high-throughput backend services and APIs that deliver entertainment to over 200 million subscribers.',
        responsibilities: [
          'Develop low-latency REST and GraphQL APIs using Node.js and Express',
          'Optimize database queries and schema performance in MongoDB / Redis',
          'Implement robust security, authorization, and rate-limiting protocols',
        ],
        requirements: [
          '3+ years of backend development with Node.js and distributed databases',
          'Strong grasp of async programming, event loops, and API security',
          'Experience with caching and message queuing systems',
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
      },
      {
        title: 'Product Designer (UI / UX)',
        company: airbnbCompany._id,
        recruiter: recruiter2._id,
        description: 'Help shape the future of travel and hospitality by designing beautiful, intuitive, and cohesive user journeys on web and mobile.',
        responsibilities: [
          'Execute end-to-end design from wireframes and prototypes to final production assets',
          'Conduct user research and usability testing',
          'Collaborate closely with engineers and product leaders',
        ],
        requirements: [
          'Portfolio showing strong UI/UX problem-solving and aesthetic sense',
          '3+ years of experience with Figma, design systems, and mobile-first design',
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
      },
      {
        title: 'Junior Software Engineer (React / Node)',
        company: googleCompany._id,
        recruiter: recruiterUser._id,
        description: 'Exciting opportunity for recent graduates and early-career developers to grow in an engineering culture focused on excellence and innovation.',
        responsibilities: [
          'Implement UI components according to Figma design specs',
          'Write clean unit tests and maintain high code quality',
          'Fix bugs and optimize front-end responsiveness',
        ],
        requirements: [
          'B.Tech / B.S. in Computer Science or related engineering field',
          'Fundamental knowledge of Data Structures, Algorithms, JavaScript, and React',
          'Eagerness to learn and strong problem-solving mindset',
        ],
        skills: ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git'],
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
      },
      {
        title: 'Full Stack Web Developer Intern',
        company: stripeCompany._id,
        recruiter: recruiter2._id,
        description: 'Join our summer engineering internship program to work alongside industry veterans on real-world financial software projects.',
        responsibilities: [
          'Build customer-facing dashboard widgets',
          'Assist with backend API documentation and testing',
        ],
        requirements: [
          'Currently pursuing a degree in Computer Science or equivalent',
          'Knowledge of modern web stacks (MERN or similar)',
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
      },
    ]);

    // 6. Create Applications
    await Application.create([
      {
        job: jobs[0]._id,
        candidate: seekerUser._id,
        recruiter: recruiterUser._id,
        company: googleCompany._id,
        resumeUrl: '/uploads/sample-resume.pdf',
        coverLetter: 'Dear Hiring Team, I am thrilled to apply for the Senior Full Stack MERN Developer role. With extensive hands-on experience in React, Node, Express, and MongoDB, I am confident in my ability to deliver immediate impact.',
        status: 'Shortlisted',
        matchScore: 95,
        statusHistory: [
          { status: 'Applied', note: 'Application received', updatedBy: seekerUser._id, updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
          { status: 'Under Review', note: 'Resume screened by hiring manager', updatedBy: recruiterUser._id, updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
          { status: 'Shortlisted', note: 'Top candidate match based on skills', updatedBy: recruiterUser._id, updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        ],
      },
      {
        job: jobs[1]._id,
        candidate: seekerUser._id,
        recruiter: recruiter2._id,
        company: stripeCompany._id,
        resumeUrl: '/uploads/sample-resume.pdf',
        coverLetter: 'I am excited about Stripe’s mission of building economic infrastructure for the internet. My skills in React and Tailwind align perfectly with your technical expectations.',
        status: 'Interview Scheduled',
        matchScore: 88,
        interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        interviewMeetingLink: 'https://meet.google.com/xyz-hire-hub',
        statusHistory: [
          { status: 'Applied', note: 'Submitted application', updatedBy: seekerUser._id, updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
          { status: 'Shortlisted', note: 'Profile matched requirements', updatedBy: recruiter2._id, updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          { status: 'Interview Scheduled', note: 'Technical Round 1 scheduled', updatedBy: recruiter2._id, updatedAt: new Date() },
        ],
      },
      {
        job: jobs[3]._id,
        candidate: seeker2._id,
        recruiter: recruiter2._id,
        company: airbnbCompany._id,
        resumeUrl: '/uploads/sample-resume-designer.pdf',
        coverLetter: 'Hello! I love Airbnb’s design aesthetic and would relish the chance to design delightful hospitality flows.',
        status: 'Selected',
        matchScore: 96,
        statusHistory: [
          { status: 'Applied', note: 'Applied', updatedBy: seeker2._id, updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
          { status: 'Selected', note: 'Offer extended and accepted!', updatedBy: recruiter2._id, updatedAt: new Date() },
        ],
      },
    ]);

    // 7. Saved Jobs
    await SavedJob.create({
      user: seekerUser._id,
      job: jobs[2]._id,
    });

    // 8. Job Alert
    await JobAlert.create({
      user: seekerUser._id,
      title: 'Full Stack Engineer',
      location: 'Remote',
      jobType: 'full-time',
      minSalary: 120000,
      frequency: 'daily',
    });

    // 9. Notifications
    await Notification.create([
      {
        recipient: seekerUser._id,
        title: 'Application Shortlisted! 🎉',
        message: 'Google has shortlisted your application for Senior Full Stack MERN Developer.',
        type: 'status_change',
        link: '/seeker/applications',
        isRead: false,
      },
      {
        recipient: seekerUser._id,
        title: 'Interview Scheduled 🗓️',
        message: 'Stripe scheduled an interview for Lead Frontend Engineer on your calendar.',
        type: 'status_change',
        link: '/seeker/applications',
        isRead: false,
      },
      {
        recipient: recruiterUser._id,
        title: 'New Applicant',
        message: 'Mohit Kumar applied for Senior Full Stack MERN Developer with a 95% skill match score.',
        type: 'application',
        link: '/recruiter/applicants',
        isRead: false,
      },
    ]);

    // 10. Sample Report for Admin
    await Report.create({
      reporter: seeker2._id,
      targetType: 'job',
      targetId: jobs[4]._id,
      targetTitle: 'Suspicious Job Listing Review',
      reason: 'Verify recruiter details',
      description: 'Requesting verification of the junior software developer salary bracket.',
      status: 'pending',
    });

    console.log('✅ Database seeded successfully with realistic data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedData();

