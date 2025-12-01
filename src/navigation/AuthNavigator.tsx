import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface Props {
  onAuthSuccess: () => void;
}

export default function AuthNavigator({ onAuthSuccess }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'web' ? 'fade' : 'default',
        animationDuration: 3000,
      }}
    >
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLoginSuccess={onAuthSuccess} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        options={{
          animation: Platform.OS === 'web' ? 'fade' : 'slide_from_right',
          animationDuration: 3000,
        }}
      >
        {(props) => <RegisterScreen {...props} onRegisterSuccess={onAuthSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
