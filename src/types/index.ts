/**
 * TypeScript types for InstaAI Mobile App
 */

export interface User {
  id: number;
  email: string;
  full_name?: string;
  subscription_tier: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface InstagramAccount {
  id: number;
  instagram_user_id: string;
  username: string;
  account_type: string;
  followers_count: number;
  is_active: boolean;
  last_synced_at?: string;
  profile_picture_url?: string;
}

export interface AdFormatRecommendation {
  format: 'REELS' | 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  score: number;
  reasoning: string;
}

export interface TargetingRecommendation {
  age_ranges: string[];
  genders: string[];
  locations: string[];
  interests: string[];
  lookalike: boolean;
  reasoning: string;
}

export interface BudgetAllocation {
  instagram: number;
  facebook: number;
  google?: number;
  reasoning: string;
}

export interface PostingSchedule {
  best_days: string[];
  best_times: string[];
  frequency: string;
  reasoning: string;
}

export interface ContentStrategy {
  tone: string;
  topics: string[];
  hashtags: string[];
  call_to_action: string;
  reasoning: string;
}

export interface ROIProjection {
  estimated_reach: number;
  estimated_clicks: number;
  estimated_conversions: number;
  estimated_revenue: number;
  confidence: string;
  assumptions: string;
}

export interface AIRecommendations {
  summary: string;
  ad_formats: AdFormatRecommendation[];
  targeting: TargetingRecommendation;
  budget_allocation: BudgetAllocation;
  posting_schedule: PostingSchedule;
  content_strategy: ContentStrategy;
  roi_projection: ROIProjection;
  generated_at: string;
}

export interface InsightsResponse {
  account_insights: any;
  ai_recommendations: AIRecommendations;
  cached_at: string;
  expires_at: string;
}

export interface GeneratedContent {
  id: number;
  content_type: string;
  title?: string;
  status: 'pending' | 'processing' | 'ready' | 'approved' | 'published' | 'failed';
  file_url?: string;
  thumbnail_url?: string;
  suggested_caption?: string;
  predicted_engagement_rate?: number;
  created_at: string;
}

// Team & Collaboration Types
export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';
export type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface Team {
  id: number;
  name: string;
  description?: string;
  owner_id: number;
  is_active: boolean;
  max_members: number;
  subscription_tier: string;
  created_at: string;
  member_count: number;
}

export interface TeamMember {
  id: number;
  user_id: number;
  email: string;
  full_name: string;
  role: TeamRole;
  can_manage_content: boolean;
  can_manage_instagram: boolean;
  can_view_analytics: boolean;
  can_invite_members: boolean;
  joined_at: string;
}

export interface TeamInvite {
  id: number;
  team_id: number;
  team_name: string;
  email: string;
  role: TeamRole;
  status: InviteStatus;
  invited_by_email: string;
  created_at: string;
  expires_at: string;
  token?: string;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
  max_members?: number;
}

export interface SendInviteRequest {
  email: string;
  role: TeamRole;
  can_manage_content?: boolean;
  can_manage_instagram?: boolean;
  can_view_analytics?: boolean;
}
