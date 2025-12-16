/**
 * API Configuration for InstaAI Mobile App
 */

// Backend API base URL
// Change this to your deployed backend URL in production
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8000/api'  // Local development
  : 'https://instaai-studio.onrender.com/api';  // Production - Render backend

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  register: '/auth/register',
  login: '/auth/login',
  me: '/auth/me',

  // Instagram
  instagramAuthUrl: '/instagram/auth-url',
  instagramConnect: '/instagram/connect',
  instagramAccounts: '/instagram/accounts',

  // Insights
  insights: (accountId: number) => `/insights/${accountId}`,
  analyzeWithGoal: (accountId: number) => `/insights/${accountId}/analyze`,

  // Content
  content: '/content',
  generateContent: '/content/generate',
  approveContent: (contentId: number) => `/content/${contentId}/approve`,

  // Schedule
  schedule: '/schedule',
  schedulePost: '/schedule',

  // Teams & Collaboration
  teams: '/teams',
  createTeam: '/teams',
  team: (teamId: number) => `/teams/${teamId}`,
  teamInvite: (teamId: number) => `/teams/${teamId}/invite`,
  teamMembers: (teamId: number) => `/teams/${teamId}/members`,
  teamInvites: (teamId: number) => `/teams/${teamId}/invites`,
  acceptInvite: (token: string) => `/teams/invites/${token}/accept`,
  declineInvite: (token: string) => `/teams/invites/${token}/decline`,
  removeTeamMember: (teamId: number, userId: number) => `/teams/${teamId}/members/${userId}`,
};
