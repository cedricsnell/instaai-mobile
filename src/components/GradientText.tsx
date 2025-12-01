import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';

interface GradientTextProps {
  children: string;
  style?: any;
}

export default function GradientText({ children, style }: GradientTextProps) {
  if (Platform.OS === 'web') {
    // For web, use a span with inline CSS
    return (
      <div
        style={{
          fontSize: 120,
          fontWeight: 400,
          textAlign: 'center',
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #f093fb 50%, #4facfe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
          transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  // For native platforms, return regular text (gradient will be handled by parent LinearGradient)
  return <Text style={style}>{children}</Text>;
}
