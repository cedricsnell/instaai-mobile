import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface IconProps {
  type: 'rocket' | 'phone' | 'lock' | 'chart' | 'sparkle' | 'refresh' | 'calendar' | 'trending' | 'check';
  color: string;
  size?: number;
}

export function OnboardingIcon({ type, color, size = 80 }: IconProps) {
  const renderIcon = () => {
    switch (type) {
      case 'rocket':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.rocketBody, { borderColor: color }]} />
            <View style={[styles.rocketWindow, { backgroundColor: color }]} />
            <View style={[styles.rocketFlame1, { backgroundColor: color }]} />
            <View style={[styles.rocketFlame2, { backgroundColor: color, opacity: 0.7 }]} />
          </View>
        );

      case 'phone':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.phoneBody, { borderColor: color }]}>
              <View style={[styles.phoneScreen, { backgroundColor: color, opacity: 0.2 }]} />
              <View style={[styles.phoneCameraCircle1, { borderColor: color }]} />
              <View style={[styles.phoneCameraCircle2, { borderColor: color }]} />
              <View style={[styles.phoneButton, { backgroundColor: color }]} />
            </View>
          </View>
        );

      case 'lock':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.lockShackle, { borderColor: color }]} />
            <View style={[styles.lockBody, { backgroundColor: color }]}>
              <View style={styles.lockKeyhole} />
            </View>
          </View>
        );

      case 'chart':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.chartBar1, { backgroundColor: color, opacity: 0.5 }]} />
            <View style={[styles.chartBar2, { backgroundColor: color, opacity: 0.7 }]} />
            <View style={[styles.chartBar3, { backgroundColor: color }]} />
            <View style={[styles.chartBar4, { backgroundColor: color, opacity: 0.8 }]} />
          </View>
        );

      case 'sparkle':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.sparkle1, { backgroundColor: color }]} />
            <View style={[styles.sparkle2, { backgroundColor: color }]} />
            <View style={[styles.sparkleCircle, { backgroundColor: color, opacity: 0.3 }]} />
          </View>
        );

      case 'refresh':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.refreshCircle, { borderColor: color }]}>
              <View style={[styles.refreshArrow1, { backgroundColor: color }]} />
              <View style={[styles.refreshArrow2, { backgroundColor: color }]} />
            </View>
          </View>
        );

      case 'calendar':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.calendarTop, { backgroundColor: color }]} />
            <View style={[styles.calendarBody, { borderColor: color }]}>
              <View style={[styles.calendarDot, { backgroundColor: color }]} />
            </View>
          </View>
        );

      case 'trending':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.trendLine, { backgroundColor: color }]} />
            <View style={[styles.trendArrow, { borderColor: color }]} />
          </View>
        );

      case 'check':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.checkCircle, { borderColor: color }]}>
              <View style={[styles.checkMark, { borderColor: color }]} />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Rocket
  rocketBody: {
    width: 40,
    height: 50,
    borderWidth: 3,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  rocketWindow: {
    position: 'absolute',
    top: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  rocketFlame1: {
    position: 'absolute',
    bottom: -15,
    width: 12,
    height: 20,
    borderRadius: 6,
  },
  rocketFlame2: {
    position: 'absolute',
    bottom: -25,
    width: 8,
    height: 15,
    borderRadius: 4,
  },

  // Phone
  phoneBody: {
    width: 45,
    height: 70,
    borderWidth: 3,
    borderRadius: 8,
    padding: 4,
  },
  phoneScreen: {
    flex: 1,
    borderRadius: 4,
  },
  phoneCameraCircle1: {
    position: 'absolute',
    top: -10,
    left: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 2,
  },
  phoneCameraCircle2: {
    position: 'absolute',
    top: -10,
    left: 22,
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 2,
  },
  phoneButton: {
    position: 'absolute',
    bottom: -12,
    left: '50%',
    marginLeft: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Lock
  lockShackle: {
    position: 'absolute',
    top: 0,
    width: 35,
    height: 35,
    borderWidth: 4,
    borderRadius: 18,
    borderBottomWidth: 0,
  },
  lockBody: {
    position: 'absolute',
    bottom: 0,
    width: 45,
    height: 35,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockKeyhole: {
    width: 8,
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },

  // Chart
  chartBar1: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    width: 12,
    height: 25,
    borderRadius: 6,
  },
  chartBar2: {
    position: 'absolute',
    bottom: 10,
    left: 22,
    width: 12,
    height: 40,
    borderRadius: 6,
  },
  chartBar3: {
    position: 'absolute',
    bottom: 10,
    left: 39,
    width: 12,
    height: 55,
    borderRadius: 6,
  },
  chartBar4: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 12,
    height: 45,
    borderRadius: 6,
  },

  // Sparkle
  sparkle1: {
    position: 'absolute',
    width: 4,
    height: 50,
    borderRadius: 2,
  },
  sparkle2: {
    position: 'absolute',
    width: 50,
    height: 4,
    borderRadius: 2,
  },
  sparkleCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  // Refresh
  refreshCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  refreshArrow1: {
    position: 'absolute',
    top: -8,
    right: -2,
    width: 12,
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  refreshArrow2: {
    position: 'absolute',
    top: -2,
    right: -8,
    width: 12,
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: '-45deg' }],
  },

  // Calendar
  calendarTop: {
    position: 'absolute',
    top: 0,
    width: 50,
    height: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  calendarBody: {
    position: 'absolute',
    top: 10,
    width: 50,
    height: 55,
    borderWidth: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },

  // Trending
  trendLine: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    width: 60,
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: '25deg' }],
  },
  trendArrow: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },

  // Check
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    width: 20,
    height: 35,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    transform: [{ rotate: '45deg' }], marginBottom: 8,
    marginLeft: -4,
  },
});
