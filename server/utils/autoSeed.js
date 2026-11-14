import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import SavedJob from '../models/SavedJob.js';
import Notification from '../models/Notification.js';
import JobAlert from '../models/JobAlert.js';
import Report from '../models/Report.js';

export const autoSeed = async () => {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount > 0) {
      console.log(`ℹ️ Database already has ${jobCount} jobs. Skipping auto-seeding.`);
      return;
    }

    console.log('🌱 Empty database detected. Auto-seeding initial data...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create Admin
    const adminUser = await User.create({
      name: 'Mohit Kumar',
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
      description: 'Financial infrastructure for the internet. Millions of companies use Stripe to accept payments and scale online.',
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
      description: 'At Netflix, we want to entertain the world with best-in-class TV series, documentaries, and films.',
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
      description: 'Airbnb creates meaningful connections and enables hosts to share their homes with travelers globally.',
      industry: 'Travel & Hospitality',
      location: 'San Francisco, CA',
      companySize: '501-1000',
      foundedYear: 2008,
      user: recruiter2._id,
      verified: true,
      rating: 4.8,
      reviewsCount: 84,
    });

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
      bio: 'Passionate software engineer building resilient modern web applications with React, Node.js, Express, and MongoDB.',
      location: 'Chandigarh, India',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux', 'Docker', 'REST APIs'],
      experience: [
        {
          title: 'Full Stack Developer Intern',
          company: 'Cloud Innovations Ltd',
          location: 'Remote',
          startDate: new Date('2023-01-01'),
          endDate: new Date('2023-12-31'),
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
      title: 'Senior Product Designer',
      bio: 'Designing human-centric web applications and scalable design systems.',
      location: 'Austin, TX',
      skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Tailwind CSS'],
      resume: {
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        filename: 'Emily_Watson_Design_Resume.pdf',
        uploadedAt: new Date(),
        atsScore: 88,
      },
    });

    // 5. Create Jobs
    const jobs = await Job.create([
      {
        title: 'Senior Full Stack MERN Developer',
        company: googleCompany._id,
        recruiter: recruiterUser._id,
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
      },
      {
        title: 'Lead Frontend Engineer (React / Next.js)',
        company: stripeCompany._id,
        recruiter: recruiter2._id,
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
      },
      {
        title: 'Backend Node.js API Engineer',
        company: netflixCompany._id,
        recruiter: recruiterUser._id,
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
      },
      {
        title: 'Product Designer (UI / UX)',
        company: airbnbCompany._id,
        recruiter: recruiter2._id,
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
      },
      {
        title: 'Junior Software Engineer (React / Node)',
        company: googleCompany._id,
        recruiter: recruiterUser._id,
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
      },
      {
        title: 'Full Stack Web Developer Intern',
        company: stripeCompany._id,
        recruiter: recruiter2._id,
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
      },
    ]);

    // 6. Create Applications
    await Application.create([
      {
        job: jobs[0]._id,
        candidate: seekerUser._id,
        recruiter: recruiterUser._id,
        company: googleCompany._id,
        resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        coverLetter: 'Dear Hiring Team, I am thrilled to apply for the Senior Full Stack MERN Developer role. With strong proficiency in React, Node, Express, and MongoDB, I am confident I can contribute directly to your team goals.',
        status: 'Shortlisted',
        matchScore: 95,
        statusHistory: [
          { status: 'Applied', note: 'Application received', updatedBy: seekerUser._id, updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
          { status: 'Under Review', note: 'Resume screened by hiring manager', updatedBy: recruiterUser._id, updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
          { status: 'Shortlisted', note: 'Top candidate match based on skills', updatedBy: recruiterUser._id, updatedAt: new Date() },
        ],
      },
      {
        job: jobs[1]._id,
        candidate: seekerUser._id,
        recruiter: recruiter2._id,
        company: stripeCompany._id,
        resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        coverLetter: 'Excited to apply for Lead Frontend Engineer at Stripe. My expertise in React and Tailwind CSS aligns directly with your technical stack.',
        status: 'Interview Scheduled',
        matchScore: 90,
        interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        interviewMeetingLink: 'https://meet.google.com/xyz-hire-hub',
        statusHistory: [
          { status: 'Applied', note: 'Application submitted', updatedBy: seekerUser._id, updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
          { status: 'Shortlisted', note: 'Selected for interview', updatedBy: recruiter2._id, updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
          { status: 'Interview Scheduled', note: 'Technical Round 1', updatedBy: recruiter2._id, updatedAt: new Date() },
        ],
      },
      {
        job: jobs[3]._id,
        candidate: seeker2._id,
        recruiter: recruiter2._id,
        company: airbnbCompany._id,
        resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        coverLetter: 'Hello! I love Airbnb’s design aesthetic and would relish the chance to design delightful hospitality flows.',
        status: 'Selected',
        matchScore: 96,
        statusHistory: [
          { status: 'Applied', note: 'Applied', updatedBy: seeker2._id, updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          { status: 'Selected', note: 'Offer accepted!', updatedBy: recruiter2._id, updatedAt: new Date() },
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
      targetTitle: 'Salary bracket query',
      reason: 'Information verification',
      description: 'Requesting verification of the junior developer role compensation tier.',
      status: 'pending',
    });

    console.log('✅ Auto-seeded database with rich, realistic data successfully!');
  } catch (error) {
    console.error('⚠️ Auto-seeding error:', error.message);
  }
};

