import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import VideoBackground from '../components/VideoBackground';
import GradientText from '../components/GradientText';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  onLoginSuccess: () => void;
}

const { width, height } = Dimensions.get('window');

const PHRASES = [
  'Transform Your Instagram',
  'Leverage AI and Analytics',
  'To create engaging content',
  'And Monetize your Instagram\nPresence Like never before',
];

export default function LoginScreen({ navigation, onLoginSuccess }: Props) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showBrand, setShowBrand] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Sequential phrase animations
  const phraseOpacity = useRef(new Animated.Value(0)).current;
  const phraseTranslateY = useRef(new Animated.Value(30)).current;

  // Brand name animation
  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandScale = useRef(new Animated.Value(0.9)).current;

  // Features animation
  const featuresOpacity = useRef(new Animated.Value(0)).current;
  const featuresTranslateY = useRef(new Animated.Value(30)).current;

  // CTA animation
  const ctaOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the sequential animation
    animatePhrase(0);
  }, []);

  const animatePhrase = (index: number) => {
    if (index < PHRASES.length) {
      setCurrentPhraseIndex(index);

      // Fade in
      Animated.parallel([
        Animated.timing(phraseOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(phraseTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start(() => {
        // Hold for 2 seconds, then fade out
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(phraseOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: Platform.OS !== 'web',
            }),
            Animated.timing(phraseTranslateY, {
              toValue: -30,
              duration: 500,
              useNativeDriver: Platform.OS !== 'web',
            }),
          ]).start(() => {
            // Reset position for next phrase
            phraseTranslateY.setValue(30);
            animatePhrase(index + 1);
          });
        }, 2000);
      });
    } else {
      // All phrases done, show brand and features
      setTimeout(() => {
        setShowBrand(true);

        Animated.parallel([
          Animated.timing(brandOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(brandScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]).start(() => {
          // Show features after brand appears
          setTimeout(() => {
            setShowFeatures(true);

            Animated.parallel([
              Animated.timing(featuresOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: Platform.OS !== 'web',
              }),
              Animated.timing(featuresTranslateY, {
                toValue: 0,
                duration: 800,
                useNativeDriver: Platform.OS !== 'web',
              }),
            ]).start();

            // Show CTA
            Animated.timing(ctaOpacity, {
              toValue: 1,
              duration: 800,
              delay: 200,
              useNativeDriver: Platform.OS !== 'web',
            }).start();
          }, 500);
        });
      }, 500);
    }
  };

  const handleEnterApp = () => {
    // Navigate to actual login form or next screen
    navigation.navigate('Register'); // Or show login form
  };

  return (
    <VideoBackground>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={handleEnterApp}
      >
        {/* Sequential Phrases */}
        {!showBrand && (
          <Animated.View
            style={[
              styles.phraseContainer,
              {
                opacity: phraseOpacity,
                transform: [{ translateY: phraseTranslateY }],
              },
            ]}
          >
            <Text style={styles.phraseText}>{PHRASES[currentPhraseIndex]}</Text>
          </Animated.View>
        )}

        {/* Brand Name */}
        {showBrand && (
          <Animated.View
            style={[
              styles.brandContainer,
              {
                opacity: brandOpacity,
                transform: [{ scale: brandScale }],
              },
            ]}
          >
            {Platform.OS === 'web' ? (
              <GradientText style={styles.brandText}>INSTA AI STUDIO</GradientText>
            ) : (
              <LinearGradient
                colors={['#667eea', '#f093fb', '#4facfe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.brandGradient}
              >
                <Text style={styles.brandText}>INSTA AI STUDIO</Text>
              </LinearGradient>
            )}
          </Animated.View>
        )}

        {/* Feature Cards */}
        {showFeatures && (
          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: featuresOpacity,
                transform: [{ translateY: featuresTranslateY }],
              },
            ]}
          >
            <View style={styles.feature}>
              <LinearGradient
                colors={['#667eea', '#f093fb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.featureDot}
              />
              <Text style={styles.featureText}>AI Content Generation</Text>
            </View>

            <View style={styles.feature}>
              <LinearGradient
                colors={['#f093fb', '#4facfe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.featureDot}
              />
              <Text style={styles.featureText}>Smart Analytics</Text>
            </View>

            <View style={styles.feature}>
              <LinearGradient
                colors={['#4facfe', '#667eea']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.featureDot}
              />
              <Text style={styles.featureText}>Revenue Optimization</Text>
            </View>
          </Animated.View>
        )}

        {/* Click to Enter CTA */}
        {showFeatures && (
          <Animated.View
            style={[
              styles.ctaContainer,
              {
                opacity: ctaOpacity,
              },
            ]}
          >
            <Text style={styles.ctaText}>Click anywhere to enter</Text>
            <Text style={styles.ctaArrow}>↓</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </VideoBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  phraseContainer: {
    alignItems: 'center',
  },
  phraseText: {
    fontSize: 96,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -3,
    lineHeight: 100,
    ...(Platform.OS === 'web'
      ? {
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      : {}
    ),
  },
  brandContainer: {
    marginBottom: 80,
  },
  brandGradient: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
  },
  brandText: {
    fontSize: 120,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    ...(Platform.OS === 'web'
      ? {
          fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif',
        }
      : {}
    ),
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: 40,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 60,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(10px)' }
      : {}
    ),
  },
  featureDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  featureText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
    ...(Platform.OS === 'web'
      ? { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }
      : {}
    ),
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  ctaArrow: {
    fontSize: 24,
    color: '#667eea',
  },
});
