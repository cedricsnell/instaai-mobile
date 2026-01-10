import { Alert, Platform } from 'react-native';

export interface NotificationButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

/**
 * Cross-platform notification utility that works on both web and mobile
 */
export const showNotification = (
  title: string,
  message: string,
  buttons?: NotificationButton[]
) => {
  if (Platform.OS === 'web') {
    // Web implementation using custom alert styling
    const buttonHandlers = buttons || [{ text: 'OK' }];
    const confirmMessage = `${title}\n\n${message}`;

    // For simple OK button
    if (buttonHandlers.length === 1) {
      window.alert(confirmMessage);
      if (buttonHandlers[0].onPress) {
        buttonHandlers[0].onPress();
      }
      return;
    }

    // For confirm/cancel scenarios
    const confirmed = window.confirm(confirmMessage);
    if (confirmed && buttonHandlers[0]?.onPress) {
      buttonHandlers[0].onPress();
    } else if (!confirmed && buttonHandlers[1]?.onPress) {
      buttonHandlers[1].onPress();
    }
  } else {
    // Mobile implementation using React Native Alert
    Alert.alert(title, message, buttons);
  }
};

/**
 * Show a success notification
 */
export const showSuccess = (message: string, onDismiss?: () => void) => {
  showNotification('Success', message, [
    { text: 'OK', onPress: onDismiss }
  ]);
};

/**
 * Show an error notification
 */
export const showError = (message: string, onDismiss?: () => void) => {
  showNotification('Error', message, [
    { text: 'OK', onPress: onDismiss }
  ]);
};
