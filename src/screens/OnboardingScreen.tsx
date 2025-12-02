import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  instructions: string[];
  icon: string;
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to INSTA AI STUDIO',
    subtitle: 'Your AI-Powered Instagram Marketing Assistant',
    description: 'Automate your Instagram content creation, scheduling, and analytics with the power of AI.',
    instructions: [
      'Generate 10x high-performing content ideas automatically',
      'Repurpose your best posts into viral reels',
      'Schedule posts with drag-and-drop calendar',
      'Track analytics and optimize performance',
    ],
    icon: '🚀',
    color: '#667eea',
  },
  {
    id: 2,
    title: 'Connect Your Instagram Account',
    subtitle: 'Step 1: Facebook Business Setup',
    description: 'To use InstaAI Studio, you need a Facebook Business account connected to your Instagram.',
    instructions: [
      '1. Go to business.facebook.com',
      '2. Create or log into your Business account',
      '3. Go to Business Settings > Accounts > Instagram Accounts',
      '4. Click "Add" and connect your Instagram Professional account',
      '5. Make sure your Instagram account is set to Business or Creator',
    ],
    icon: '📱',
    color: '#f093fb',
  },
  {
    id: 3,
    title: 'Grant Access Permissions',
    subtitle: 'Step 2: Authorize InstaAI Studio',
    description: 'Click "Connect Instagram" on the next screen to authorize access.',
    instructions: [
      '1. Click the "Connect Instagram" button',
      '2. Log in to your Facebook account',
      '3. Select your Facebook Business Page',
      '4. Grant permissions for:',
      '   • Read Instagram analytics',
      '   • Publish content',
      '   • Manage comments',
      '5. Click "Continue" to complete authorization',
    ],
    icon: '🔐',
    color: '#4facfe',
  },
  {
    id: 4,
    title: 'Sync Your Content Library',
    subtitle: 'Step 3: Import Your Posts',
    description: 'InstaAI will analyze your existing posts to understand what content performs best.',
    instructions: [
      '1. On the Dashboard, click "Sync Media Library"',
      '2. Wait 30-60 seconds for sync to complete',
      '3. Your posts, reels, and engagement metrics will appear',
      '4. InstaAI analyzes your top-performing content',
      '5. You\'ll see insights on what resonates with your audience',
    ],
    icon: '📊',
    color: '#667eea',
  },
  {
    id: 5,
    title: 'Generate AI Content Ideas',
    subtitle: 'Step 4: Create 10x Content Automatically',
    description: 'Let AI analyze your best posts and generate fresh content ideas.',
    instructions: [
      '1. Go to the "Content" tab',
      '2. Click "Generate Reel Ideas"',
      '3. AI analyzes your top-performing posts',
      '4. Get 10 custom reel concepts with:',
      '   • Hook and script',
      '   • Visual plan',
      '   • Caption and hashtags',
      '5. Edit or approve each idea',
    ],
    icon: '🎬',
    color: '#f093fb',
  },
  {
    id: 6,
    title: 'Repurpose Your Best Content',
    subtitle: 'Step 5: Turn Posts into Reels',
    description: 'Transform your highest-engagement posts into viral short-form video content.',
    instructions: [
      '1. InstaAI identifies your top posts',
      '2. Click "Repurpose to Reel" on any post',
      '3. AI creates a video concept using your existing media',
      '4. Download clips automatically',
      '5. Generate reel with transitions and text overlays',
      '6. Preview and edit before publishing',
    ],
    icon: '♻️',
    color: '#4facfe',
  },
  {
    id: 7,
    title: 'Schedule Posts',
    subtitle: 'Step 6: Plan Your Content Calendar',
    description: 'Drag and drop posts onto your calendar for automated publishing.',
    instructions: [
      '1. Go to the "Schedule" tab',
      '2. See your generated content in the queue',
      '3. Drag posts to calendar dates/times',
      '4. Calendar shows thumbnails and local time',
      '5. Posts publish automatically at scheduled time',
      '6. Track which posts are scheduled, published, or failed',
    ],
    icon: '📅',
    color: '#667eea',
  },
  {
    id: 8,
    title: 'Monitor & Optimize',
    subtitle: 'Step 7: Track Performance',
    description: 'See which content drives the most engagement and optimize your strategy.',
    instructions: [
      '1. Dashboard shows key metrics:',
      '   • Engagement rate',
      '   • Reach and impressions',
      '   • Follower growth',
      '   • Top-performing content',
      '2. Compare content performance side-by-side',
      '3. AI suggests improvements based on data',
      '4. Test different posting times',
      '5. Refine your content strategy',
    ],
    icon: '📈',
    color: '#f093fb',
  },
  {
    id: 9,
    title: 'You\'re All Set!',
    subtitle: 'Start Creating Amazing Content',
    description: 'Everything is ready. Let\'s grow your Instagram presence with AI.',
    instructions: [
      '✅ Instagram account connected',
      '✅ Content library synced',
      '✅ AI content generator ready',
      '✅ Scheduling system active',
      '✅ Analytics dashboard live',
      '',
      'Click "Get Started" to access your dashboard!',
    ],
    icon: '🎉',
    color: '#4facfe',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = onboardingSteps[currentStep];

  return (
    <LinearGradient
      colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>
          Step {currentStep + 1} of {onboardingSteps.length}
        </Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[step.color, step.color + '80']}
            style={styles.iconGradient}
          >
            <Text style={styles.icon}>{step.icon}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.subtitle}>{step.subtitle}</Text>
        <Text style={styles.description}>{step.description}</Text>

        <View style={styles.instructionsContainer}>
          {step.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionRow}>
              {instruction.trim() !== '' && !instruction.startsWith('✅') && (
                <View style={styles.bullet}>
                  <View style={styles.bulletDot} />
                </View>
              )}
              <Text
                style={[
                  styles.instructionText,
                  instruction.startsWith('✅') && styles.checkmarkText,
                ]}
              >
                {instruction}
              </Text>
            </View>
          ))}
        </View>

        {currentStep === 2 && (
          <View style={styles.proTipContainer}>
            <Text style={styles.proTipTitle}>💡 Pro Tip:</Text>
            <Text style={styles.proTipText}>
              If you don't have a Facebook Business account yet, it takes about 5 minutes to set up. Visit business.facebook.com to get started.
            </Text>
          </View>
        )}

        {currentStep === 4 && (
          <View style={styles.proTipContainer}>
            <Text style={styles.proTipTitle}>⚡ AI Power:</Text>
            <Text style={styles.proTipText}>
              Our AI uses Claude 3.5 Sonnet to analyze your content themes, successful formats, and engagement patterns to generate ideas that match your style.
            </Text>
          </View>
        )}

        {currentStep === 6 && (
          <View style={styles.proTipContainer}>
            <Text style={styles.proTipTitle}>⏰ Best Practice:</Text>
            <Text style={styles.proTipText}>
              Schedule posts during your audience's peak activity times. The AI will suggest optimal posting times based on your engagement data.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
                index < currentStep && styles.progressDotCompleted,
              ]}
            />
          ))}
        </View>

        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
            >
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.nextButton,
              currentStep === 0 && styles.nextButtonFull,
            ]}
            onPress={handleNext}
          >
            <LinearGradient
              colors={['#667eea', '#f093fb', '#4facfe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === onboardingSteps.length - 1
                  ? 'Get Started'
                  : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 24 : 60,
    paddingBottom: 16,
  },
  stepIndicator: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  skipButton: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    marginRight: 12,
    marginTop: 6,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#667eea',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: '#ddd',
    lineHeight: 22,
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ade80',
  },
  proTipContainer: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#667eea',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  proTipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
  },
  proTipText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'web' ? 24 : 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressDotActive: {
    backgroundColor: '#667eea',
    width: 24,
  },
  progressDotCompleted: {
    backgroundColor: '#4ade80',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  previousButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  nextButton: {
    flex: 2,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
