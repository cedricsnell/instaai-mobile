# OAuth Implementation Guide - InstaAI Studio

## Overview

OAuth authentication has been successfully implemented for Google, Facebook, and Apple Sign In. This provides secure, streamlined authentication and enables Instagram Business API integration through Facebook.

## Implementation Status

✅ **Frontend**: OAuth buttons and flows fully implemented
✅ **Backend**: OAuth callback endpoints created
✅ **Database**: User model updated with OAuth fields
✅ **Services**: OAuth utilities and configuration ready

## What's Been Implemented

### Frontend (Mobile App)
- **Location**: `src/services/auth/`
- **OAuth Buttons**: Added to Login and Register screens
- **Providers**: Google, Facebook, Apple
- **Features**:
  - Automatic token exchange
  - Error handling
  - Loading states
  - Seamless user experience

### Backend (FastAPI)
- **Location**: `src/api/routes/oauth.py`
- **Endpoints**:
  - `/api/auth/google/callback`
  - `/api/auth/facebook/callback`
  - `/api/auth/apple/callback`
- **Features**:
  - Authorization code exchange
  - User creation/login
  - JWT token generation
  - OAuth provider tracking

### Database Updates
- **New Fields** in User model:
  - `oauth_provider` (google, facebook, apple)
  - `oauth_id` (provider-specific user ID)

## Production Setup Required

To enable OAuth in production, you need to configure each OAuth provider. Here's the step-by-step guide:

---

## 1. Google OAuth Setup

### Create OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**

### Configure OAuth Consent Screen

1. Select **External** user type
2. Fill in app information:
   - **App name**: InstaAI Studio
   - **User support email**: your-email@domain.com
   - **Developer contact**: your-email@domain.com
3. Add scopes: `email`, `profile`
4. Add test users (during development)

### Create OAuth Client IDs

Create separate clients for each platform:

**Web Client**:
- Application type: Web application
- Authorized JavaScript origins:
  - `http://localhost:8081` (development)
  - `https://yourdomain.com` (production)
- Authorized redirect URIs:
  - `http://localhost:8081/auth/callback`
  - `https://yourdomain.com/auth/callback`

**iOS Client**:
- Application type: iOS
- Bundle ID: `com.instaai.studio`

**Android Client**:
- Application type: Android
- Package name: `com.instaai.studio`
- SHA-1 certificate fingerprint: (generate with `keytool`)

### Update Configuration

Edit `src/services/auth/oauthConfig.ts`:

```typescript
google: {
  clientId: {
    web: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    ios: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    android: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  },
  // ... rest of config
},
```

Edit `src/api/routes/oauth.py`:

```python
GOOGLE_CLIENT_ID = "YOUR_WEB_CLIENT_ID"
GOOGLE_CLIENT_SECRET = "YOUR_CLIENT_SECRET"
```

---

## 2. Facebook OAuth Setup

### Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** > **Create App**
3. Select **Consumer** or **Business** app type
4. Fill in app details:
   - **App Name**: InstaAI Studio
   - **Contact Email**: your-email@domain.com

### Configure Facebook Login

1. In app dashboard, add **Facebook Login** product
2. Configure settings:
   - **Valid OAuth Redirect URIs**:
     - `http://localhost:8081/auth/callback`
     - `https://yourdomain.com/auth/callback`
   - **Deauthorize Callback URL**: `https://yourdomain.com/auth/deauthorize`
   - **Data Deletion Request URL**: `https://yourdomain.com/auth/delete`

### Add Instagram Product

1. Add **Instagram Basic Display** product
2. Add **Instagram Graph API** (for business features)
3. Configure permissions:
   - `instagram_basic`
   - `instagram_content_publish`
   - `instagram_manage_insights`
   - `pages_show_list`
   - `pages_read_engagement`

### App Review

For Instagram permissions, submit for App Review:
1. Provide app screenshots
2. Explain use case for each permission
3. Create demo video showing the feature
4. Add privacy policy URL

### Update Configuration

Edit `src/services/auth/oauthConfig.ts`:

```typescript
facebook: {
  appId: 'YOUR_FACEBOOK_APP_ID',
  // ... rest of config
},
```

Edit `src/api/routes/oauth.py`:

```python
FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID"
FACEBOOK_APP_SECRET = "YOUR_APP_SECRET"
```

---

## 3. Apple Sign In Setup

### Requirements

- **Apple Developer Account** ($99/year)
- **App ID** registered in Apple Developer Portal

### Configure Sign in with Apple

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** > select your App ID
4. Enable **Sign in with Apple** capability

### Create Service ID

1. Click **Identifiers** > **+** > **Services IDs**
2. Fill in details:
   - **Description**: InstaAI Studio Web
   - **Identifier**: `com.instaai.studio.web`
3. Enable **Sign in with Apple**
4. Configure domains and redirect URLs:
   - **Domains**: `yourdomain.com`
   - **Return URLs**: `https://yourdomain.com/auth/callback`

### Create Private Key

1. Click **Keys** > **+**
2. Select **Sign in with Apple**
3. Download the `.p8` private key file
4. Note the **Key ID**

### Update Configuration

Edit `src/services/auth/oauthConfig.ts`:

```typescript
apple: {
  clientId: 'com.instaai.studio',  // Your bundle identifier
  // ... rest of config
},
```

Edit `src/api/routes/oauth.py`:

```python
APPLE_CLIENT_ID = "com.instaai.studio"
APPLE_TEAM_ID = "YOUR_TEAM_ID"
APPLE_KEY_ID = "YOUR_KEY_ID"
# Store the .p8 file contents securely
```

---

## Environment Variables

For production, move all OAuth credentials to environment variables:

### Mobile App (.env)

```env
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id
GOOGLE_ANDROID_CLIENT_ID=your_google_android_client_id
FACEBOOK_APP_ID=your_facebook_app_id
APPLE_CLIENT_ID=com.instaai.studio
```

### Backend (.env)

```env
GOOGLE_CLIENT_ID=your_google_web_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_app_secret
APPLE_CLIENT_ID=com.instaai.studio
APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
APPLE_PRIVATE_KEY_PATH=/path/to/AuthKey_XXXXX.p8
```

---

## Testing OAuth Flows

### Test on Web (Development)

1. Start the mobile app: `npm run web`
2. Start the backend API: `py -m src.api.main`
3. Open http://localhost:8081
4. Click an OAuth provider button
5. Complete the OAuth flow
6. Verify successful login

### Test on Mobile (iOS/Android)

1. Build development client:
   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```
2. Test OAuth flow on device/simulator
3. Verify deep linking works correctly

### Common Issues

**"Redirect URI mismatch"**
- Ensure redirect URIs match exactly in provider console
- Check for trailing slashes
- Verify protocol (http vs https)

**"Invalid client"**
- Double-check client ID and secret
- Ensure credentials are for correct environment

**"Permission denied"**
- For Facebook: request permissions in App Review
- For Google: add test users in OAuth consent screen

---

## Instagram Integration via Facebook

Once Facebook OAuth is working, users can connect Instagram Business accounts:

1. User signs in with Facebook
2. Request Instagram permissions
3. User selects Instagram Business account
4. Store Instagram access token
5. Access Instagram Graph API

### Required Setup

1. Convert Instagram account to Business account
2. Connect to a Facebook Page
3. Request business permissions in Facebook App Review

---

## Security Recommendations

### Production Checklist

- [ ] Move all credentials to environment variables
- [ ] Use HTTPS for all redirect URIs
- [ ] Implement CSRF protection (state parameter)
- [ ] Add rate limiting to OAuth endpoints
- [ ] Implement token refresh mechanism
- [ ] Add OAuth revocation handlers
- [ ] Monitor failed authentication attempts
- [ ] Add logging for OAuth events

### Token Storage

- Access tokens stored in AsyncStorage (mobile)
- Refresh tokens encrypted at rest
- Backend validates all incoming tokens
- Implement token rotation policy

---

## Next Steps

1. ✅ **Configure OAuth providers** (follow guides above)
2. ✅ **Test each OAuth flow** thoroughly
3. ✅ **Submit for app reviews** (Facebook, Google if needed)
4. ✅ **Deploy backend** with OAuth endpoints
5. ✅ **Build and publish** mobile apps
6. ✅ **Enable Instagram integration** via Facebook OAuth

---

## Support & Documentation

- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **Facebook Login**: https://developers.facebook.com/docs/facebook-login
- **Instagram API**: https://developers.facebook.com/docs/instagram-api
- **Apple Sign In**: https://developer.apple.com/sign-in-with-apple

---

## Current Status

All OAuth infrastructure is in place and ready for production configuration. The buttons are live on the login and register screens with the new "Create. Analyze. Monetize." tagline.

**To activate OAuth**:
1. Complete provider setup (above)
2. Update configuration files with real credentials
3. Test each flow
4. Deploy!
