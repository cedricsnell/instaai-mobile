import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiClient } from '../services/api';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import GradientText from '../components/GradientText';
import { signInWithOAuth, type OAuthProvider } from '../services/auth';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
  onRegisterSuccess: () => void;
}

export default function RegisterScreen({ navigation, onRegisterSuccess }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();

    const createFloatAnimation = (animValue: Animated.Value, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      );
    };

    createFloatAnimation(float1, 3000).start();
    createFloatAnimation(float2, 4000).start();
    createFloatAnimation(float3, 3500).start();
  }, []);

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      await apiClient.register(email, password, fullName);
      Alert.alert(
        'Success',
        'Account created successfully!',
        [{ text: 'OK', onPress: onRegisterSuccess }]
      );
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.response?.data?.detail || 'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: OAuthProvider) => {
    setLoading(true);
    try {
      const result = await signInWithOAuth(provider);

      if (result.success && result.accessToken) {
        // Store the token (apiClient will handle this)
        await apiClient.setToken(result.accessToken);
        onRegisterSuccess();
      } else {
        Alert.alert(
          'Sign Up Failed',
          result.error || `Failed to sign up with ${provider}`
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Sign Up Failed',
        error.message || `An error occurred during ${provider} sign up`
      );
    } finally {
      setLoading(false);
    }
  };

  const float1Interpolate = float1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const float2Interpolate = float2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const float3Interpolate = float3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  return (
    <View style={styles.container}>
      {/* Vertical Brand Text */}
      <View style={styles.verticalBrandContainer}>
        {Platform.OS === 'web' ? (
          <div
            style={{
              position: 'fixed',
              left: 60,
              top: '50%',
              transform: 'translateY(-50%) translateX(-50%) rotate(-90deg)',
              transformOrigin: 'center',
              fontSize: 120,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif',
              background: 'linear-gradient(135deg, #667eea 0%, #f093fb 50%, #4facfe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              zIndex: 1,
              transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            INSTA AI STUDIO
          </div>
        ) : (
          <View style={styles.verticalTextWrapper}>
            <LinearGradient
              colors={['#667eea', '#f093fb', '#4facfe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.verticalGradient}
            >
              <Text style={styles.verticalBrandText}>INSTA AI STUDIO</Text>
            </LinearGradient>
          </View>
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.heroSection}>
              <View style={styles.tagline}>
                <LinearGradient
                  colors={['#667eea', '#f093fb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.taglineGradient}
                >
                  <Text style={styles.taglineText}>START FREE TRIAL</Text>
                </LinearGradient>
              </View>

              <Text style={styles.heroTitle}>
                Join the Future{'\n'}of Instagram{'\n'}Marketing
              </Text>

              <Text style={styles.heroSubtitle}>
                Get instant access to AI-powered insights, automated content creation,
                and data-driven strategies used by top marketing agencies.
              </Text>
            </View>

            <View style={styles.registerCard}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor="#555"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#555"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password (min 8 characters)"
                  placeholderTextColor="#555"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#555"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                <LinearGradient
                  colors={loading ? ['#333', '#444'] : ['#667eea', '#f093fb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Create Account →</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Social Login Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* OAuth Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={[styles.socialButton, styles.googleButton]}
                  disabled={loading}
                  onPress={() => handleOAuthSignup('google')}
                >
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.socialButton, styles.facebookButton]}
                  disabled={loading}
                  onPress={() => handleOAuthSignup('facebook')}
                >
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.socialButton, styles.appleButton]}
                  disabled={loading}
                  onPress={() => handleOAuthSignup('apple')}
                >
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
                style={styles.signinLink}
              >
                <Text style={styles.signinText}>
                  Already have an account?{' '}
                  <Text style={styles.signinTextBold}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>No credit card required</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Cancel anytime</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Full access to all features</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    ...(Platform.OS === 'web'
      ? {
          background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)',
        }
      : {}
    ),
  },
  verticalBrandContainer: {
    position: 'absolute',
    left: 60,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  verticalTextWrapper: {
    transform: [{ rotate: '-90deg' }],
  },
  verticalGradient: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  verticalBrandText: {
    fontSize: 120,
    fontWeight: '400',
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  content: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  heroSection: {
    marginBottom: 48,
  },
  tagline: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  taglineGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  taglineText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20,
    lineHeight: 56,
    letterSpacing: -2,
  },
  heroSubtitle: {
    fontSize: 17,
    color: '#888',
    lineHeight: 28,
    maxWidth: 500,
  },
  registerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 10px 20px rgba(102, 126, 234, 0.4)' }
      : { elevation: 10 }
    ),
  },
  buttonGradient: {
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signinLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  signinText: {
    color: '#666',
    fontSize: 15,
  },
  signinTextBold: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  features: {
    marginTop: 40,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 18,
    color: '#667eea',
  },
  featureText: {
    fontSize: 15,
    color: '#888',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: '#666',
    fontSize: 13,
    paddingHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  googleButton: {
    // Google brand colors can be added later
  },
  facebookButton: {
    // Facebook brand colors can be added later
  },
  appleButton: {
    // Apple brand colors can be added later
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
