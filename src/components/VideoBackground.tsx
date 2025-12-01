import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  videoSource?: string;
  children?: React.ReactNode;
  showBlur?: boolean;
}

export default function VideoBackground({ videoSource, children, showBlur = false }: Props) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Multiple fallback video sources for reliability
  // To use a custom video: replace /videos/background.mp4 in the public folder
  const videoSources = [
    // Local video (recommended for production)
    '/videos/background.mp4',

    // External fallback sources (in case local video fails)
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://download.blender.org/demo/movies/BBB/bbb_sunflower_1080p_30fps_normal.mp4',
  ];

  const videoUrl = videoSource || videoSources[currentVideoIndex];

  // Create video player for mobile with new expo-video API
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  // Handle video error - try next source in the list
  const handleVideoError = () => {
    console.log(`Video failed to load from source ${currentVideoIndex}`);
    if (currentVideoIndex < videoSources.length - 1) {
      console.log(`Trying next video source...`);
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      console.log('All video sources failed, using gradient fallback');
      setVideoLoaded(false);
    }
  };

  const handleVideoLoaded = () => {
    console.log('Video loaded successfully!');
    setVideoLoaded(true);
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {/* Fallback gradient background (always visible) */}
        <LinearGradient
          colors={['#0a0a1a', '#1a0f2e', '#0f0a1f']}
          style={styles.fallbackGradient}
        />

        {/* Animated gradient orbs */}
        <View style={styles.backgroundElements}>
          <View style={[styles.gradientOrb, styles.orb1]}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.15)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.orbGradient}
            />
          </View>
          <View style={[styles.gradientOrb, styles.orb2]}>
            <LinearGradient
              colors={['rgba(240, 147, 251, 0.12)', 'rgba(245, 87, 108, 0.12)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.orbGradient}
            />
          </View>
          <View style={[styles.gradientOrb, styles.orb3]}>
            <LinearGradient
              colors={['rgba(79, 172, 254, 0.12)', 'rgba(0, 242, 254, 0.12)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.orbGradient}
            />
          </View>
        </View>

        {/* HTML5 Video - professional background */}
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: videoLoaded ? (showBlur ? 0.3 : 1) : 0,
            filter: showBlur ? 'blur(20px)' : 'none',
            transition: 'opacity 1s ease-in-out, filter 0.8s ease-in-out',
          }}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Dark overlay for text contrast */}
        <View
          style={[
            styles.videoOverlay,
            showBlur && { backgroundColor: 'rgba(0, 0, 0, 0.75)' }
          ]}
          pointerEvents="none"
        />

        {/* Gradient overlay for depth */}
        <LinearGradient
          colors={
            showBlur
              ? ['rgba(10,10,26,0.8)', 'rgba(15,10,31,0.7)', 'rgba(10,10,26,0.85)']
              : ['rgba(10,10,26,0.5)', 'rgba(15,10,31,0.3)', 'rgba(10,10,26,0.6)']
          }
          style={styles.gradientOverlay}
          pointerEvents="none"
        />

        {/* Content wrapper with high z-index */}
        <View style={styles.contentWrapper} pointerEvents="box-none">
          {children}
        </View>
      </View>
    );
  }

  // For mobile: Use new Expo Video API
  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={false}
        contentFit="cover"
      />

      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Gradient overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
        style={styles.gradientOverlay}
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  fallbackGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orb1: {
    width: 500,
    height: 500,
    top: -150,
    right: -150,
  },
  orb2: {
    width: 400,
    height: 400,
    bottom: -100,
    left: -100,
  },
  orb3: {
    width: 350,
    height: 350,
    top: '40%',
    right: -120,
  },
  orbGradient: {
    flex: 1,
    borderRadius: 9999,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
  },
});

// Fallback gradient orbs component (previous design)
export function GradientOrbsBackground({ children }: { children?: React.ReactNode }) {
  return (
    <LinearGradient
      colors={['#000000', '#0a0a0a', '#1a0a1a']}
      style={styles.container}
    >
      {/* Animated background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.gradientOrb, styles.orb1]}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.orbGradient}
          />
        </View>

        <View style={[styles.gradientOrb, styles.orb2]}>
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.orbGradient}
          />
        </View>

        <View style={[styles.gradientOrb, styles.orb3]}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.orbGradient}
          />
        </View>
      </View>
      {children}
    </LinearGradient>
  );
}

const backgroundStyles = StyleSheet.create({
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.15,
  },
  orb1: {
    width: 400,
    height: 400,
    top: -100,
    right: -100,
  },
  orb2: {
    width: 300,
    height: 300,
    bottom: -50,
    left: -50,
  },
  orb3: {
    width: 250,
    height: 250,
    top: '40%',
    right: -80,
  },
  orbGradient: {
    flex: 1,
    borderRadius: 9999,
  },
});
