import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserIcon from './UserIcon';
import { colors, typography } from '../constants';

const Header = ({ title, showUserIcon = false, leftComponent = null, rightComponent = null }) => {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);
  const isDark = darkMode || systemColorScheme === 'dark';
  
  // Load saved dark mode preference on component mount
  useEffect(() => {
    const loadDarkModePreference = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.error('Error loading dark mode preference:', error);
      }
    };

    loadDarkModePreference();
  }, []);

  const themeColors = {
    background: isDark ? '#121212' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : colors.textLightPrimary,
    border: isDark ? '#333333' : colors.borderLight,
  };

  return (
    <View style={styles.container(themeColors)}>
      {leftComponent && leftComponent}
      <Text style={styles.title(themeColors)}>{title}</Text>
      {rightComponent || (showUserIcon && <UserIcon showSettingsButton={true} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
  }),
  title: (theme) => ({
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: theme.text,
    flex: 1,
    textAlign: 'center',
  }),
});

export default Header;
