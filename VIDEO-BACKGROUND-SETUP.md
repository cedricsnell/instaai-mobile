# Background Video Setup Guide

## Overview
The VideoBackground component now uses a local video file with automatic fallback to external sources. This ensures reliability and gives you full control over the branding.

## Current Setup

### Local Video (Recommended)
- **Location**: `public/videos/background.mp4`
- **Current file**: Sample video (2.4MB) downloaded for testing
- **Advantages**:
  - No external dependencies
  - Faster loading
  - No CORS issues
  - Full branding control

### Fallback Sources
If the local video fails to load, the component will automatically try these external sources:
1. Google Cloud Storage - ForBiggerBlazes.mp4
2. Google Cloud Storage - ElephantsDream.mp4
3. Blender Foundation - Big Buck Bunny

## Customizing the Background Video

### Option 1: Replace the Local Video (Recommended for Production)
1. Find a professional marketing/business video (recommended sources below)
2. Convert to MP4 format if needed
3. Replace `public/videos/background.mp4` with your video
4. Keep file size under 10MB for optimal loading
5. Recommended specs:
   - Format: MP4 (H.264)
   - Resolution: 1920x1080 or 1280x720
   - Frame rate: 24-30 fps
   - Duration: 10-30 seconds (will loop)

### Option 2: Use a Different External Source
Edit `src/components/VideoBackground.tsx` and update the `videoSources` array:

```typescript
const videoSources = [
  'YOUR_VIDEO_URL_HERE.mp4',
  '/videos/background.mp4', // local fallback
];
```

## Recommended Stock Video Sources

### **IMPORTANT**: For InstaAI Studio, Choose Professional Marketing Videos

Your background video should reflect:
- ✅ **Content creators** filming Instagram content
- ✅ **Entrepreneurs** and business coaches
- ✅ **Social media influencers** at work
- ✅ **Marketing professionals** in creative spaces
- ✅ **Phone/camera** equipment for content creation
- ❌ **NOT**: Movie clips, TV shows, nature scenes

See **`PROFESSIONAL-VIDEO-GUIDE.md`** for detailed recommendations!

### Free Stock Videos
1. **Pexels Videos** - https://www.pexels.com/videos/ 🏆
   - **Search**: "content creator", "social media marketing", "entrepreneur working"
   - **Search**: "instagram influencer", "business coach", "phone recording"
   - Free for commercial use, highest quality

2. **Mixkit** - https://mixkit.co/free-stock-video/
   - **Browse**: Business & Office, Technology categories
   - No attribution required
   - Great professional content

3. **Coverr** - https://coverr.co/
   - **Search**: "digital marketing", "creative workspace"
   - Curated for business/tech themes
   - Perfect for SaaS/marketing apps

4. **Videvo** - https://www.videvo.net/
   - **Search**: "influencer", "social media", "content creation"
   - Free HD stock footage
   - Business and marketing categories

### Premium Stock Videos (For Professional Polish)
1. **Artgrid** - https://artgrid.io/
2. **Envato Elements** - https://elements.envato.com/
3. **Shutterstock** - https://www.shutterstock.com/

## Video Optimization Tips

### Before Adding to Project:
1. **Compress the video** (tools: HandBrake, FFmpeg)
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4
   ```

2. **Optimize for web**:
   - Use H.264 codec (widely supported)
   - Keep bitrate reasonable (2-5 Mbps for 1080p)
   - Remove audio if not needed (saves bandwidth)

3. **Create multiple sizes** for responsive design:
   - Desktop: 1920x1080
   - Tablet: 1280x720
   - Mobile: 960x540 (or use gradient fallback on mobile)

## Current Implementation Features

✅ **Automatic Fallback**: Tries multiple sources if one fails
✅ **Smooth Loading**: Fade-in transition when video loads
✅ **Gradient Fallback**: Professional gradient background if all videos fail
✅ **Responsive**: Works on web and mobile
✅ **Interactive**: All overlays allow click-through to forms
✅ **Optimized Layering**: Proper z-index for overlays and content

## Testing the Video

1. Open http://localhost:8081 in your browser
2. Check browser console for video loading status:
   - "Video loaded successfully!" = Working
   - "Video failed to load from source X" = Trying next fallback
   - "All video sources failed, using gradient fallback" = Using gradient only

3. Test interactivity:
   - Ensure you can click on email/password inputs
   - Verify buttons are clickable
   - Check that video doesn't block UI elements

## Troubleshooting

### Video Not Loading
1. Check file exists: `public/videos/background.mp4`
2. Check file format (must be MP4)
3. Check browser console for errors
4. Try clearing cache (Ctrl+Shift+Delete)

### Performance Issues
1. Compress video further (aim for <5MB)
2. Lower resolution (720p instead of 1080p)
3. Reduce frame rate (24fps instead of 30fps)
4. Consider using gradient fallback on mobile devices

### CORS Errors (External Videos)
- Use local videos instead (recommended)
- Ensure external server allows CORS
- Host on a CDN with proper CORS headers

## Next Steps for Production

1. ✅ Download/purchase professional marketing video
2. ✅ Optimize video for web (compress, resize)
3. ✅ Replace `public/videos/background.mp4`
4. ✅ Test on multiple devices and browsers
5. ✅ Consider creating a video library for different screens
6. ✅ Add analytics to track video loading performance

---

**Note**: The current sample video is just for testing. Replace it with a professional marketing video that aligns with your InstaAI Studio brand for the full r/ga agency-level polish you're aiming for.
