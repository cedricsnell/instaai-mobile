/**
 * OAuth Configuration for InstaAI Studio
 *
 * IMPORTANT: Before using OAuth in production:
 * 1. Create OAuth apps in Google Cloud Console, Facebook Developer Portal, and Apple Developer
 * 2. Update the CLIENT_IDs below with your actual app credentials
 * 3. Add these to environment variables or secure config
 * 4. Configure redirect URIs in each OAuth provider console
 */

import { Platform } from 'react-native';

// Determine redirect URI based on platform
const getRedirectUri = () => {
  if (Platform.OS === 'web') {
    // For web, use the current origin
    return typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : 'http://localhost:8081/auth/callback';
  } else {
    // For native apps, use deep linking scheme
    return 'instaai://auth/callback';
  }
};

export const OAUTH_CONFIG = {
  // Google OAuth Configuration
  google: {
    clientId: {
      web: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
      ios: 'YOUR_GOOGLE_IOS_CLIENT_ID.apps.googleusercontent.com',
      android: 'YOUR_GOOGLE_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    },
    scopes: ['profile', 'email'],
    // Add Instagram scopes when using Google for Instagram integration (if needed)
    redirectUri: getRedirectUri(),
  },

  // Facebook OAuth Configuration
  facebook: {
    appId: 'YOUR_FACEBOOK_APP_ID',
    scopes: [
      'public_profile',
      'email',
      // Instagram-specific permissions (Meta Business)
      'instagram_basic',
      'instagram_content_publish',
      'pages_show_list',
      'pages_read_engagement',
      'instagram_manage_insights',
    ],
    redirectUri: getRedirectUri(),
  },

  // Apple OAuth Configuration
  apple: {
    clientId: 'com.instaai.studio', // Your bundle identifier
    scopes: ['email', 'name'],
    redirectUri: getRedirectUri(),
  },
};

// OAuth endpoints for each provider
export const OAUTH_ENDPOINTS = {
  google: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    userInfoEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo',
  },
  facebook: {
    authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoEndpoint: 'https://graph.facebook.com/me',
  },
  apple: {
    authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
    tokenEndpoint: 'https://appleid.apple.com/auth/token',
  },
};

// Backend API endpoints for OAuth processing
export const BACKEND_OAUTH_ENDPOINTS = {
  google: '/api/auth/google/callback',
  facebook: '/api/auth/facebook/callback',
  apple: '/api/auth/apple/callback',
};

export const getClientId = (provider: 'google' | 'facebook' | 'apple') => {
  if (provider === 'google') {
    if (Platform.OS === 'ios') return OAUTH_CONFIG.google.clientId.ios;
    if (Platform.OS === 'android') return OAUTH_CONFIG.google.clientId.android;
    return OAUTH_CONFIG.google.clientId.web;
  }
  if (provider === 'facebook') return OAUTH_CONFIG.facebook.appId;
  if (provider === 'apple') return OAUTH_CONFIG.apple.clientId;
  throw new Error(`Unknown provider: ${provider}`);
};
