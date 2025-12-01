import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ContentScreen from '../screens/ContentScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type AppTabParamList = {
  Home: undefined;
  Content: undefined;
  Schedule: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

interface Props {
  onLogout: () => void;
}

export default function AppNavigator({ onLogout }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Content"
        component={ContentScreen}
        options={{
          tabBarLabel: 'Content',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="grid" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <Tab.Screen name="Settings" options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="settings" color={color} />
        ),
      }}>
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Simple icon component (you can replace with react-native-vector-icons later)
function TabBarIcon({ name, color }: { name: string; color: string }) {
  const icons: { [key: string]: string } = {
    home: '🏠',
    grid: '📱',
    calendar: '📅',
    settings: '⚙️',
  };

  return (
    <Text style={{ fontSize: 24, color }}>
      {icons[name] || '•'}
    </Text>
  );
}
