/**
 * API Client for InstaAI Backend
 */
import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import type {
  AuthResponse,
  User,
  InstagramAccount,
  InsightsResponse,
  GeneratedContent,
} from '../types';

const TOKEN_KEY = '@instaai_token';
const USER_KEY = '@instaai_user';

class APIClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      async (config) => {
        if (!this.token) {
          this.token = await AsyncStorage.getItem(TOKEN_KEY);
        }
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token and user
          await this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // ========================================
  // Authentication
  // ========================================

  async register(
    email: string,
    password: string,
    fullName?: string
  ): Promise<AuthResponse> {
    const response = await this.client.post<AuthResponse>(
      API_ENDPOINTS.register,
      {
        email,
        password,
        full_name: fullName,
      }
    );

    // Save token and user
    await this.saveAuthData(response.data);
    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // FastAPI expects form data for OAuth2PasswordRequestForm
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await this.client.post<AuthResponse>(
      API_ENDPOINTS.login,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Save token and user
    await this.saveAuthData(response.data);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<User>(API_ENDPOINTS.me);
    return response.data;
  }

  async logout(): Promise<void> {
    this.token = null;
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  }

  async getStoredUser(): Promise<User | null> {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  async setToken(token: string): Promise<void> {
    this.token = token;
    await AsyncStorage.setItem(TOKEN_KEY, token);
  }

  private async saveAuthData(authData: AuthResponse): Promise<void> {
    this.token = authData.access_token;
    await AsyncStorage.setItem(TOKEN_KEY, authData.access_token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(authData.user));
  }

  // ========================================
  // Instagram
  // ========================================

  async getInstagramAuthUrl(): Promise<{ authorization_url: string; state?: string }> {
    const response = await this.client.get(API_ENDPOINTS.instagramAuthUrl);
    return response.data;
  }

  async connectInstagram(authorizationCode: string): Promise<InstagramAccount> {
    const response = await this.client.post<InstagramAccount>(
      API_ENDPOINTS.instagramConnect,
      {
        authorization_code: authorizationCode,
      }
    );
    return response.data;
  }

  async getInstagramAccounts(): Promise<InstagramAccount[]> {
    const response = await this.client.get<InstagramAccount[]>(
      API_ENDPOINTS.instagramAccounts
    );
    return response.data;
  }

  async disconnectInstagram(accountId: number): Promise<void> {
    await this.client.delete(`${API_ENDPOINTS.instagramAccounts}/${accountId}`);
  }

  // ========================================
  // Insights
  // ========================================

  async getInsights(
    accountId: number,
    forceRefresh: boolean = false
  ): Promise<InsightsResponse> {
    const response = await this.client.get<InsightsResponse>(
      API_ENDPOINTS.insights(accountId),
      {
        params: { force_refresh: forceRefresh },
      }
    );
    return response.data;
  }

  async analyzeWithGoal(
    accountId: number,
    goal: {
      type: string;
      product_name?: string;
      product_price?: number;
      target_audience?: string;
      budget?: number;
    }
  ): Promise<any> {
    const response = await this.client.post(
      API_ENDPOINTS.analyzeWithGoal(accountId),
      goal
    );
    return response.data;
  }

  // ========================================
  // Content
  // ========================================

  async getContent(status?: string): Promise<GeneratedContent[]> {
    const response = await this.client.get<GeneratedContent[]>(
      API_ENDPOINTS.content,
      {
        params: status ? { status } : undefined,
      }
    );
    return response.data;
  }

  async generateContent(accountId: number): Promise<GeneratedContent> {
    const response = await this.client.post<GeneratedContent>(
      API_ENDPOINTS.generateContent,
      {
        account_id: accountId,
      }
    );
    return response.data;
  }

  async approveContent(contentId: number): Promise<void> {
    await this.client.patch(API_ENDPOINTS.approveContent(contentId));
  }

  async deleteContent(contentId: number): Promise<void> {
    await this.client.delete(`${API_ENDPOINTS.content}/${contentId}`);
  }

  // ========================================
  // Schedule
  // ========================================

  async getScheduledPosts(accountId: number, status?: string): Promise<any[]> {
    const response = await this.client.get(API_ENDPOINTS.schedule, {
      params: {
        account_id: accountId,
        ...(status ? { status } : {}),
      },
    });
    return response.data;
  }

  async schedulePost(
    contentId: number,
    accountId: number,
    scheduledTime: string,
    caption?: string
  ): Promise<any> {
    const response = await this.client.post(API_ENDPOINTS.schedulePost, {
      content_id: contentId,
      account_id: accountId,
      scheduled_time: scheduledTime,
      caption,
    });
    return response.data;
  }

  async cancelScheduledPost(scheduleId: number): Promise<void> {
    await this.client.delete(`${API_ENDPOINTS.schedule}/${scheduleId}`);
  }
}

// Export singleton instance
export const apiClient = new APIClient();
