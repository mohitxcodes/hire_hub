// ============================================================
// HireHub — Axios Mock Interceptor (Frontend-only, No Backend)
// Intercepts ALL API calls and returns dummy data from mockData.js
// ============================================================

import {
  USERS,
  ALL_USERS,
  COMPANIES,
  JOBS,
  APPLICATIONS,
  SAVED_JOBS,
  JOB_ALERTS,
  NOTIFICATIONS,
  REPORTS,
  ADMIN_STATS,
  JOB_STATS,
} from './mockData';

const FAKE_TOKEN = 'mock_jwt_token_hirehub_demo_2024';

// ── In-memory mutable state (persists within session) ──────
let savedJobIds = new Set(SAVED_JOBS.map((j) => j._id));
let jobAlerts = [...JOB_ALERTS];
let applications = [...APPLICATIONS];
let jobs = [...JOBS];
let companies = [...COMPANIES];
let users = [...ALL_USERS];
let reports = [...REPORTS];
let notifications = {
  seeker: [...NOTIFICATIONS.seeker],
  recruiter: [...NOTIFICATIONS.recruiter],
  admin: [...NOTIFICATIONS.admin],
};

// ── Helpers ────────────────────────────────────────────────
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));
const fakeId = () => '64f' + Math.random().toString(36).slice(2, 23).padEnd(21, '0');

function getCurrentUser() {
  const token = localStorage.getItem('hirehub_token');
  const role = localStorage.getItem('hirehub_mock_role');
  if (!token) return null;
  if (role === 'admin') return USERS.admin;
  if (role === 'recruiter') return USERS.recruiter;
  return USERS.seeker;
}

function getUserNotifications(user) {
  if (!user) return [];
  if (user.role === 'admin') return notifications.admin;
  if (user.role === 'recruiter') return notifications.recruiter;
  return notifications.seeker;
}

function matchRoute(method, url) {
  // Normalize: strip baseURL prefix, query string
  let path = url.replace(/^https?:\/\/[^/]+/, '').replace(/\/api/, '').split('?')[0];
  if (!path.startsWith('/')) path = '/' + path;
  return { method: method.toLowerCase(), path };
}

// ── Route handler ──────────────────────────────────────────
function handleRequest(config) {
  const { method, path } = matchRoute(config.method, config.url);
  const body = config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : {};
  const params = config.params || {};
  const user = getCurrentUser();

  // ─── AUTH ─────────────────────────────────────────────
  // POST /auth/login
  if (method === 'post' && path === '/auth/login') {
    const email = body.email;
    const found = ALL_USERS.find((u) => u.email === email);
    if (!found) {
      throw new Error('Invalid email or password. Use demo buttons or register a new user.');
    }
    localStorage.setItem('hirehub_mock_role', found.role);
    return { success: true, token: FAKE_TOKEN, user: found };
  }

  // POST /auth/register
  if (method === 'post' && path === '/auth/register') {
    const newUser = {
      _id: fakeId(),
      name: body.name || 'New User',
      email: body.email,
      role: body.role || 'jobseeker',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      title: '',
      location: '',
      skills: [],
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    users.push(newUser);
    localStorage.setItem('hirehub_mock_role', newUser.role);
    return { success: true, token: FAKE_TOKEN, user: newUser };
  }

  // GET /auth/me
  if (method === 'get' && path === '/auth/me') {
    if (!user) throw new Error('Not authenticated');
    return { success: true, user };
  }

  // POST /auth/logout
  if (method === 'post' && path === '/auth/logout') {
    localStorage.removeItem('hirehub_mock_role');
    return { success: true };
  }

  // POST /auth/forgot-password
  if (method === 'post' && path === '/auth/forgot-password') {
    return { success: true, message: 'Password reset email sent (demo mode)' };
  }

  // PUT /auth/reset-password/:token
  if (method === 'put' && path.match(/^\/auth\/reset-password\//)) {
    return { success: true, message: 'Password reset successful (demo mode)' };
  }

  // ─── USERS ────────────────────────────────────────────
  // PUT /users/profile
  if (method === 'put' && path === '/users/profile') {
    const updated = { ...user, ...body };
    return { success: true, user: updated };
  }

  // PUT /users/change-password
  if (method === 'put' && path === '/users/change-password') {
    return { success: true, message: 'Password changed successfully (demo mode)' };
  }

  // POST /users/upload-resume
  if (method === 'post' && path === '/users/upload-resume') {
    return {
      success: true,
      resume: {
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        filename: 'uploaded_resume.pdf',
        uploadedAt: new Date().toISOString(),
        atsScore: Math.floor(Math.random() * 20) + 80,
      },
    };
  }

  // GET /users/recommended-jobs
  if (method === 'get' && path === '/users/recommended-jobs') {
    return { success: true, jobs: jobs.slice(0, 4) };
  }

  // GET /users/saved-jobs
  if (method === 'get' && path === '/users/saved-jobs') {
    const saved = jobs.filter((j) => savedJobIds.has(j._id));
    return { success: true, jobs: saved };
  }

  // POST /users/saved-jobs/:jobId
  const savedMatch = path.match(/^\/users\/saved-jobs\/(.+)$/);
  if (method === 'post' && savedMatch) {
    const jobId = savedMatch[1];
    const isSaved = !savedJobIds.has(jobId);
    if (isSaved) savedJobIds.add(jobId);
    else savedJobIds.delete(jobId);
    return { success: true, isSaved };
  }

  // GET /users/job-alerts
  if (method === 'get' && path === '/users/job-alerts') {
    return { success: true, alerts: jobAlerts };
  }

  // POST /users/job-alerts
  if (method === 'post' && path === '/users/job-alerts') {
    const newAlert = { _id: fakeId(), user: user?._id, ...body, createdAt: new Date().toISOString() };
    jobAlerts.push(newAlert);
    return { success: true, alert: newAlert };
  }

  // DELETE /users/job-alerts/:id
  const alertDelMatch = path.match(/^\/users\/job-alerts\/(.+)$/);
  if (method === 'delete' && alertDelMatch) {
    jobAlerts = jobAlerts.filter((a) => a._id !== alertDelMatch[1]);
    return { success: true };
  }

  // ─── JOBS ─────────────────────────────────────────────
  // GET /jobs/featured
  if (method === 'get' && path === '/jobs/featured') {
    return { success: true, jobs: jobs.filter((j) => j.featured) };
  }

  // GET /jobs/stats/overview
  if (method === 'get' && path === '/jobs/stats/overview') {
    return { success: true, ...JOB_STATS };
  }

  // GET /jobs/recruiter/my-jobs
  if (method === 'get' && path === '/jobs/recruiter/my-jobs') {
    const mine = user ? jobs.filter((j) => j.recruiter?._id === user._id || j.recruiter === user._id) : [];
    return { success: true, jobs: mine };
  }

  // GET /jobs/:id
  const jobIdMatch = path.match(/^\/jobs\/([a-f0-9]+)$/);
  if (method === 'get' && jobIdMatch) {
    const job = jobs.find((j) => j._id === jobIdMatch[1]);
    if (!job) return { success: false, message: 'Job not found' };
    const related = jobs.filter((j) => j._id !== job._id && j.industry === job.industry).slice(0, 3);
    return { success: true, job, relatedJobs: related };
  }

  // GET /jobs  (listing with pagination/filters)
  if (method === 'get' && path === '/jobs') {
    let filtered = [...jobs];
    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((j) => j.title.toLowerCase().includes(s) || j.description.toLowerCase().includes(s));
    }
    if (params.location) {
      const loc = params.location.toLowerCase();
      filtered = filtered.filter((j) => j.location.toLowerCase().includes(loc));
    }
    if (params.jobType) filtered = filtered.filter((j) => j.jobType === params.jobType);
    if (params.industry) filtered = filtered.filter((j) => j.industry === params.industry);
    if (params.experienceLevel) filtered = filtered.filter((j) => j.experienceLevel === params.experienceLevel);

    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return {
      success: true,
      jobs: paged,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      currentPage: page,
    };
  }

  // POST /jobs
  if (method === 'post' && path === '/jobs') {
    const comp = user ? companies.find((c) => c.user === user._id) : COMPANIES[0];
    const newJob = {
      _id: fakeId(),
      ...body,
      company: comp || COMPANIES[0],
      recruiter: user || USERS.recruiter,
      views: 0,
      applicantsCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    jobs.unshift(newJob);
    return { success: true, job: newJob };
  }

  // PUT /jobs/:id
  const jobUpdateMatch = path.match(/^\/jobs\/([a-f0-9]+)$/);
  if (method === 'put' && jobUpdateMatch) {
    const idx = jobs.findIndex((j) => j._id === jobUpdateMatch[1]);
    if (idx !== -1) jobs[idx] = { ...jobs[idx], ...body };
    return { success: true, job: jobs[idx] || {} };
  }

  // DELETE /jobs/:id
  const jobDeleteMatch = path.match(/^\/jobs\/([a-f0-9]+)$/);
  if (method === 'delete' && jobDeleteMatch) {
    jobs = jobs.filter((j) => j._id !== jobDeleteMatch[1]);
    return { success: true };
  }

  // ─── APPLICATIONS ────────────────────────────────────
  // POST /applications/:jobId
  const applyMatch = path.match(/^\/applications\/([a-f0-9]+)$/);
  if (method === 'post' && applyMatch) {
    const job = jobs.find((j) => j._id === applyMatch[1]);
    const newApp = {
      _id: fakeId(),
      job: job || { _id: applyMatch[1], title: 'Unknown Job' },
      candidate: user || USERS.seeker,
      recruiter: job?.recruiter || USERS.recruiter,
      company: job?.company || COMPANIES[0],
      resumeUrl: body.resumeUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      coverLetter: body.coverLetter || '',
      status: 'Applied',
      matchScore: Math.floor(Math.random() * 20) + 80,
      statusHistory: [{ status: 'Applied', note: 'Application received', updatedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };
    applications.unshift(newApp);
    return { success: true, application: newApp };
  }

  // GET /applications/my-applications
  if (method === 'get' && path === '/applications/my-applications') {
    const mine = user ? applications.filter((a) => a.candidate?._id === user._id) : applications.slice(0, 2);
    return { success: true, applications: mine };
  }

  // GET /applications/recruiter/all
  if (method === 'get' && path === '/applications/recruiter/all') {
    const mine = user ? applications.filter((a) => a.recruiter?._id === user._id) : applications;
    return { success: true, applications: mine };
  }

  // GET /applications/job/:jobId
  const appJobMatch = path.match(/^\/applications\/job\/(.+)$/);
  if (method === 'get' && appJobMatch) {
    const jobApps = applications.filter((a) => (a.job?._id || a.job) === appJobMatch[1]);
    return { success: true, applications: jobApps };
  }

  // PUT /applications/:id/status
  const appStatusMatch = path.match(/^\/applications\/([a-f0-9]+)\/status$/);
  if (method === 'put' && appStatusMatch) {
    const idx = applications.findIndex((a) => a._id === appStatusMatch[1]);
    if (idx !== -1) {
      applications[idx] = {
        ...applications[idx],
        status: body.status,
        interviewDate: body.interviewDate || applications[idx].interviewDate,
        interviewMeetingLink: body.interviewMeetingLink || applications[idx].interviewMeetingLink,
        statusHistory: [
          ...(applications[idx].statusHistory || []),
          { status: body.status, note: body.note || '', updatedAt: new Date().toISOString() },
        ],
      };
    }
    return { success: true, application: applications[idx] || {} };
  }

  // DELETE /applications/:id (withdraw)
  const appDeleteMatch = path.match(/^\/applications\/([a-f0-9]+)$/);
  if (method === 'delete' && appDeleteMatch) {
    applications = applications.filter((a) => a._id !== appDeleteMatch[1]);
    return { success: true };
  }

  // ─── COMPANIES ────────────────────────────────────────
  // GET /companies/me/profile
  if (method === 'get' && path === '/companies/me/profile') {
    const comp = user ? companies.find((c) => c.user === user._id) : COMPANIES[0];
    return { success: true, company: comp || null };
  }

  // GET /companies/:id
  const compIdMatch = path.match(/^\/companies\/([a-f0-9]+)$/);
  if (method === 'get' && compIdMatch) {
    const comp = companies.find((c) => c._id === compIdMatch[1]);
    const compJobs = jobs.filter((j) => (j.company?._id || j.company) === compIdMatch[1]);
    return { success: true, company: comp || null, jobs: compJobs };
  }

  // GET /companies
  if (method === 'get' && path === '/companies') {
    let filtered = [...companies];
    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(s));
    }
    if (params.industry) filtered = filtered.filter((c) => c.industry === params.industry);
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    const start = (page - 1) * limit;
    return {
      success: true,
      companies: filtered.slice(start, start + limit),
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      currentPage: page,
    };
  }

  // POST /companies (create/update)
  if (method === 'post' && path === '/companies') {
    const existing = user ? companies.find((c) => c.user === user._id) : null;
    if (existing) {
      Object.assign(existing, body);
      return { success: true, company: existing };
    }
    const newComp = { _id: fakeId(), user: user?._id, verified: false, rating: 0, reviewsCount: 0, status: 'active', ...body, createdAt: new Date().toISOString() };
    companies.push(newComp);
    return { success: true, company: newComp };
  }

  // ─── NOTIFICATIONS ───────────────────────────────────
  // GET /notifications
  if (method === 'get' && path === '/notifications') {
    const list = getUserNotifications(user);
    return { success: true, notifications: list, unreadCount: list.filter((n) => !n.isRead).length };
  }

  // PUT /notifications/:id/read
  const notifReadMatch = path.match(/^\/notifications\/([a-f0-9]+)\/read$/);
  if (method === 'put' && notifReadMatch) {
    // mark in all lists
    Object.values(notifications).forEach((list) => {
      const n = list.find((x) => x._id === notifReadMatch[1]);
      if (n) n.isRead = true;
    });
    return { success: true };
  }

  // PUT /notifications/read-all
  if (method === 'put' && path === '/notifications/read-all') {
    Object.values(notifications).forEach((list) => list.forEach((n) => { n.isRead = true; }));
    return { success: true };
  }

  // ─── ADMIN ────────────────────────────────────────────
  // GET /admin/dashboard
  if (method === 'get' && path === '/admin/dashboard') {
    return { success: true, ...ADMIN_STATS };
  }

  // GET /admin/users
  if (method === 'get' && path === '/admin/users') {
    let filtered = [...users];
    if (params.role) filtered = filtered.filter((u) => u.role === params.role);
    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
    }
    return { success: true, users: filtered, total: filtered.length };
  }

  // PUT /admin/users/:id/status
  const adminUserMatch = path.match(/^\/admin\/users\/([a-f0-9]+)\/status$/);
  if (method === 'put' && adminUserMatch) {
    const u = users.find((x) => x._id === adminUserMatch[1]);
    if (u) u.status = body.status;
    return { success: true, user: u || {} };
  }

  // GET /admin/jobs
  if (method === 'get' && path === '/admin/jobs') {
    return { success: true, jobs, total: jobs.length };
  }

  // DELETE /admin/jobs/:id
  const adminJobDelMatch = path.match(/^\/admin\/jobs\/([a-f0-9]+)$/);
  if (method === 'delete' && adminJobDelMatch) {
    jobs = jobs.filter((j) => j._id !== adminJobDelMatch[1]);
    return { success: true };
  }

  // GET /admin/companies
  if (method === 'get' && path === '/admin/companies') {
    return { success: true, companies };
  }

  // PUT /admin/companies/:id/status
  const adminCompMatch = path.match(/^\/admin\/companies\/([a-f0-9]+)\/status$/);
  if (method === 'put' && adminCompMatch) {
    const c = companies.find((x) => x._id === adminCompMatch[1]);
    if (c) {
      if (body.status !== undefined) c.status = body.status;
      if (body.verified !== undefined) c.verified = body.verified;
    }
    return { success: true, company: c || {} };
  }

  // GET /admin/reports
  if (method === 'get' && path === '/admin/reports') {
    return { success: true, reports };
  }

  // PUT /admin/reports/:id
  const adminReportMatch = path.match(/^\/admin\/reports\/([a-f0-9]+)$/);
  if (method === 'put' && adminReportMatch) {
    const r = reports.find((x) => x._id === adminReportMatch[1]);
    if (r && body.status) r.status = body.status;
    return { success: true, report: r || {} };
  }

  // ─── FALLBACK ─────────────────────────────────────────
  console.warn(`[MockAPI] Unhandled: ${method.toUpperCase()} ${path}`);
  return { success: true, message: 'Mock: endpoint not specifically handled' };
}

// ── Install mock interceptor on an Axios instance ──────────
export function installMockApi(axiosInstance) {
  // Override the adapter so requests never reach the network
  axiosInstance.defaults.adapter = async (config) => {
    await delay(150 + Math.random() * 250); // Simulate network latency

    try {
      const data = handleRequest(config);
      return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    } catch (err) {
      return Promise.reject({
        response: {
          data: { success: false, message: err.message },
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config,
        },
      });
    }
  };

  console.log('🎭 HireHub Mock API activated — running with static demo data (no backend needed)');
}
