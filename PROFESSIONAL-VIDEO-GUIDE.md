# Professional Background Video Guide

## Finding the Perfect Video for InstaAI Studio

Your app deserves a background video that reflects **business coaching**, **entrepreneurship**, **influencer marketing**, and **Instagram content creation**. Here's how to get it:

---

## Recommended Video Themes

Look for videos featuring:
- ✅ **Content creators** filming Instagram Reels/Stories
- ✅ **Entrepreneurs** working on laptops in modern spaces
- ✅ **Business professionals** in creative meetings
- ✅ **Social media influencers** creating content
- ✅ **Modern workspaces** with phones/cameras/lighting
- ✅ **Marketing agencies** in action
- ✅ **Phone screens** showing Instagram UI
- ✅ **Creative studios** with ring lights/equipment

❌ Avoid: Movie clips, TV shows, nature scenes, animations

---

## Best Free Stock Video Sites

### 1. **Pexels Videos** (Recommended) 🏆
**URL**: https://www.pexels.com/videos/

**Search Terms to Use**:
- "content creator"
- "social media marketing"
- "instagram influencer"
- "entrepreneur working"
- "business coach"
- "digital marketing"
- "phone recording video"
- "instagram stories"
- "marketing agency"

**How to Download**:
1. Search for your ideal video
2. Click on the video
3. Click **"Free Download"** button
4. Select **"HD"** or **"4K"** quality (smaller file is better for web)
5. Download the `.mp4` file

**Recommended Videos**:
- Search: "content creator filming" → Modern, relatable
- Search: "social media influencer" → Perfect for your audience
- Search: "entrepreneur laptop" → Professional, focused

### 2. **Mixkit**
**URL**: https://mixkit.co/free-stock-video/

**Categories to Browse**:
- Business & Office
- Technology
- People & Lifestyle

**Recommended Picks**:
- "Businesswoman using smartphone" (Category: Business)
- "Person scrolling social media" (Category: Technology)
- "Content creator at desk" (Category: People)

### 3. **Coverr**
**URL**: https://coverr.co/

**Best Collections**:
- "Business" category
- "People" category
- "Technology" category

### 4. **Videvo**
**URL**: https://www.videvo.net/

**Search Terms**:
- "influencer"
- "social media"
- "content creation"
- "marketing"

### 5. **Pixabay Videos**
**URL**: https://pixabay.com/videos/

**Search Terms**:
- "entrepreneur"
- "business coaching"
- "social media"
- "content creator"

---

## Premium Stock Video (If Budget Allows)

### **Artgrid** - $24/month
**URL**: https://artgrid.io/
- Highest quality
- Exclusive content
- Perfect for premium branding
- Search: "influencer", "content creator", "business"

### **Envato Elements** - $16.50/month
**URL**: https://elements.envato.com/
- Unlimited downloads
- Great business/tech selection
- Search: "instagram marketing", "social media agency"

### **Storyblocks** - $30/month
**URL**: https://www.storyblocks.com/
- Unlimited downloads
- Good for business content

---

## Video Specifications

### Ideal Specs for Web Performance:
- **Resolution**: 1920x1080 (1080p) or 1280x720 (720p)
- **File Size**: Under 5MB (compress if larger)
- **Duration**: 10-30 seconds (will loop)
- **Format**: MP4 (H.264 codec)
- **Frame Rate**: 24-30 fps
- **Aspect Ratio**: 16:9 (landscape)

### If Your Video is Too Large:

Use **HandBrake** (free) to compress:
1. Download: https://handbrake.fr/
2. Open your video in HandBrake
3. Select **"Web"** preset
4. Set quality to **22-28** (lower = better quality but bigger file)
5. Click **"Start Encode"**

Or use **FFmpeg** command line:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1280:720 -c:a aac -b:a 128k output.mp4
```

---

## How to Add Your Video

### Step 1: Download Your Video
1. Find the perfect video using the sites above
2. Download in MP4 format
3. Compress if larger than 5MB

### Step 2: Replace the Background Video
1. Navigate to: `instaai-mobile/public/videos/`
2. Replace `background.mp4` with your downloaded video
3. Keep the filename as `background.mp4`

### Step 3: Test
1. Refresh your browser at http://localhost:8081
2. The new video should load automatically
3. Verify it loops smoothly

---

## Curated Recommendations

Based on InstaAI Studio's focus on Instagram marketing, here are specific video searches that will work perfectly:

### **Perfect Match Videos** 🎯

**Pexels**:
1. Search: **"woman using phone social media"**
   - Modern, relatable, shows actual Instagram use

2. Search: **"content creator filming"**
   - Shows the creation process your users do

3. Search: **"entrepreneur working laptop"**
   - Professional, focused, business-oriented

**Mixkit**:
1. Browse: **"Business & Office" → "Young professional on laptop"**
   - Clean, professional look

2. Browse: **"Technology" → "Person scrolling smartphone"**
   - Shows social media interaction

**Coverr**:
1. Search: **"digital marketing"**
   - Exactly on-brand for your app

2. Search: **"creative workspace"**
   - Shows modern entrepreneurship

---

## Alternative: Use Your Own Brand Video

### Option: Create Custom Video

If you have the resources, consider creating a custom brand video:

**What to Film**:
- Screen recording of someone using Instagram
- Person creating content with professional lighting
- Your workspace/office (if you have one)
- Stock footage montage edited together

**Apps to Create**:
- **CapCut** (free, mobile/desktop)
- **iMovie** (free, Mac)
- **DaVinci Resolve** (free, professional)
- **Canva Pro** (subscription, easy templates)

---

## Quick Win: Recommended Download Now

**Immediate Solution** (Free, High Quality, On-Brand):

1. Go to: https://www.pexels.com/videos/
2. Search: **"entrepreneur working"**
3. Click on first video with modern workspace
4. Download **"HD"** version
5. Save to `instaai-mobile/public/videos/background.mp4`
6. Refresh browser ✅

---

## Current Video Status

**Currently Using**: Test video (Google sample)
**Needs**: Professional business/influencer marketing video
**Location**: `instaai-mobile/public/videos/background.mp4`
**Size**: 2.4MB (good reference size)

---

## Need Help?

If you need assistance:
1. Finding the right video
2. Compressing a large file
3. Creating a custom montage

Just let me know what specific vibe you're going for:
- Modern tech startup?
- Luxury coaching business?
- Energetic influencer marketing?
- Professional business consulting?

I can provide more specific recommendations based on your brand identity!

---

**Pro Tip**: The video should be **subtle** and **professional** - not distracting from the UI. Lower opacity overlays will ensure text remains readable while the video adds premium polish.
