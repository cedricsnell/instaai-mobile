/**
 * OAuth Service for InstaAI Studio
 * Handles authentication flows for Google, Facebook, and Apple Sign In
 */

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import {
  OAUTH_CONFIG,
  OAUTH_ENDPOINTS,
  getClientId,
} from './oauthConfig';
import { apiClient } from '../api';

// Required for web-based OAuth
WebBrowser.maybeCompleteAuthSession();

export type OAuthProvider = 'google' | 'facebook' | 'apple';

export interface OAuthResult {
  success: boolean;
  provider: OAuthProvider;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  };
  error?: string;
}

/**
 * Google OAuth Sign In
 */
export const signInWithGoogle = async (): Promise<OAuthResult> => {
  try {
    const clientId = getClientId('google');
    const redirectUri = OAUTH_CONFIG.google.redirectUri;

    // Create the authorization request
    const request = new AuthSession.AuthRequest({
      clientId,
      scopes: OAUTH_CONFIG.google.scopes,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
      extraParams: {
        access_type: 'offline', // Request refresh token
        prompt: 'consent', // Force consent screen to get refresh token
      },
    });

    // Prompt for authentication
    const result = await request.promptAsync({
      authorizationEndpoint: OAUTH_ENDPOINTS.google.authorizationEndpoint,
    });

    if (result.type === 'success') {
      const { code } = result.params;

      // Exchange code for tokens via backend
      const response = await apiClient.post('/auth/google/callback', {
        code,
        redirectUri,
        codeVerifier: request.codeVerifier,
      });

      return {
        success: true,
        provider: 'google',
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        user: response.data.user,
      };
    }

    return {
      success: false,
      provider: 'google',
      error: result.type === 'error' ? result.error?.message : 'Authentication cancelled',
    };
  } catch (error: any) {
    console.error('Google OAuth error:', error);
    return {
      success: false,
      provider: 'google',
      error: error.message || 'Failed to authenticate with Google',
    };
  }
};

/**
 * Facebook OAuth Sign In
 */
export const signInWithFacebook = async (): Promise<OAuthResult> => {
  try {
    const clientId = getClientId('facebook');
    const redirectUri = OAUTH_CONFIG.facebook.redirectUri;

    // Create the authorization request
    const request = new AuthSession.AuthRequest({
      clientId,
      scopes: OAUTH_CONFIG.facebook.scopes,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
    });

    // Prompt for authentication
    const result = await request.promptAsync({
      authorizationEndpoint: OAUTH_ENDPOINTS.facebook.authorizationEndpoint,
    });

    if (result.type === 'success') {
      const { code } = result.params;

      // Exchange code for tokens via backend
      const response = await apiClient.post('/auth/facebook/callback', {
        code,
        redirectUri,
      });

      return {
        success: true,
        provider: 'facebook',
        accessToken: response.data.access_token,
        user: response.data.user,
      };
    }

    return {
      success: false,
      provider: 'facebook',
      error: result.type === 'error' ? result.error?.message : 'Authentication cancelled',
    };
  } catch (error: any) {
    console.error('Facebook OAuth error:', error);
    return {
      success: false,
      provider: 'facebook',
      error: error.message || 'Failed to authenticate with Facebook',
    };
  }
};

/**
 * Apple Sign In
 * Uses web-based OAuth for all platforms (iOS native can be added later)
 */
export const signInWithApple = async (): Promise<OAuthResult> => {
  try {
    // Use web-based Apple Sign In for all platforms
    const clientId = getClientId('apple');
    const redirectUri = OAUTH_CONFIG.apple.redirectUri;

    const request = new AuthSession.AuthRequest({
      clientId,
      scopes: OAUTH_CONFIG.apple.scopes,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: false,
    });

    const result = await request.promptAsync({
      authorizationEndpoint: OAUTH_ENDPOINTS.apple.authorizationEndpoint,
    });

    if (result.type === 'success') {
      const { code, id_token } = result.params;

      const response = await apiClient.post('/auth/apple/callback', {
        code,
        idToken: id_token,
        redirectUri,
      });

      return {
        success: true,
        provider: 'apple',
        idToken: id_token,
        user: response.data.user,
      };
    }

    return {
      success: false,
      provider: 'apple',
      error: result.type === 'error' ? result.error?.message : 'Authentication cancelled',
    };
  } catch (error: any) {
    console.error('Apple OAuth error:', error);
    return {
      success: false,
      provider: 'apple',
      error: error.message || 'Failed to authenticate with Apple',
    };
  }
};

/**
 * Generic OAuth sign in - routes to the appropriate provider
 */
export const signInWithOAuth = async (provider: OAuthProvider): Promise<OAuthResult> => {
  switch (provider) {
    case 'google':
      return signInWithGoogle();
    case 'facebook':
      return signInWithFacebook();
    case 'apple':
      return signInWithApple();
    default:
      return {
        success: false,
        provider,
        error: `Unknown provider: ${provider}`,
      };
  }
};
