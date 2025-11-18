import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const systemColorScheme = useColorScheme();
  const isDarkMode = darkMode || systemColorScheme === 'dark';

  // Theme colors based on dark mode
  const themeColors = useMemo(() => ({
    background: isDarkMode ? '#000000' : colors.backgroundLight, // Pure black for dark mode
    backgroundAlt: isDarkMode ? '#111111' : colors.backgroundLightAlt, // Slightly lighter black for alt
    surface: isDarkMode ? '#1A1A1A' : colors.surfaceLight, // Dark gray for surfaces
    text: isDarkMode ? '#FFFFFF' : colors.textLight, // White text for dark mode
    textPrimary: isDarkMode ? '#FFFFFF' : colors.textLightPrimary, // White for primary text
    textSecondary: isDarkMode ? '#B3B3B3' : colors.textLightSecondary, // Light gray for secondary text
    border: isDarkMode ? '#333333' : colors.borderLight, // Dark gray for borders
  }), [isDarkMode]);

  // Toggle dark mode and save preference
  const toggleDarkMode = async (value) => {
    try {
      setDarkMode(value);
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  // Load saved dark mode preference on component mount
  React.useEffect(() => {
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

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            // Here you would typically clear user session and navigate to login
            navigation.navigate('Auth');
          },
        },
      ]
    );
  };

  const handleSettingPress = (label) => {
    if (label === 'Help Center' || label === 'Contact Support') {
      navigation.navigate('Support');
    } else if (label === 'Terms of Service' || label === 'Privacy Policy' || label === 'About Us') {
      navigation.navigate('About');
    } else if (label === 'Categories') {
      navigation.navigate('Categories');
    } else if (label === 'Currency') {
      navigation.navigate('Currency', { currentCurrency: 'USD' });
    } else if (label === 'App Version') {
      Alert.alert('App Version', 'Current version: 1.0.0');
    } else {
      Alert.alert(label, `${label} feature coming soon!`);
    }
  };

  const settingsSections = [
    {
      items: [
        { icon: '🏷️', label: 'Categories', type: 'navigation' },
        { icon: '🌙', label: 'Dark Mode', type: 'toggle', value: isDarkMode, onToggle: toggleDarkMode },
        { icon: '💱', label: 'Currency', type: 'navigation', value: 'USD' },
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        { icon: '☁️', label: 'Backup & Sync', type: 'navigation' },
        { icon: '📊', label: 'Export Data', type: 'navigation' },
        { icon: '🗑️', label: 'Clear Cache', type: 'navigation' },
        { icon: '🔒', label: 'Privacy Policy', type: 'navigation' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: '📧', label: 'Contact Support', type: 'navigation' },
        { icon: '⭐', label: 'Rate App', type: 'navigation' },
        { icon: '📋', label: 'Terms of Service', type: 'navigation' },
      ]
    },
    {
      title: 'About',
      items: [
        { icon: 'ℹ️', label: 'App Version', type: 'navigation', value: '1.0.0' },
        { icon: '🏢', label: 'About Us', type: 'navigation' },
      ]
    },
  ];

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
    profileSection: {
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    profileAvatarText: {
      color: 'white',
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
    },
    profileDetails: {
      flex: 1,
    },
    profileName: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
    },
    editProfileButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.primary,
    },
    editProfileText: {
      color: 'white',
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      color: themeColors.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    sectionContent: {
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    settingItemWithBorder: {
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    settingLabel: {
      fontSize: typography.fontSize.base,
      color: themeColors.textPrimary,
    },
    settingRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingValue: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
      marginRight: 8,
    },
    chevron: {
      fontSize: 20,
      color: themeColors.textSecondary,
    },
    signOutButton: {
      backgroundColor: colors.error,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 32,
    },
    signOutText: {
      color: 'white',
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.bold,
    },
    footer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    footerText: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
      marginBottom: 4,
    },
    footerSubtext: {
      fontSize: typography.fontSize.xs,
      color: themeColors.textSecondary,
      opacity: 0.7,
    },
  });

  const styles = getStyles(themeColors);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <ScrollView 
        style={[styles.content, { backgroundColor: themeColors.background }]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>JD</Text>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            {section.title && (
              <Text style={styles.sectionTitle}>
                {section.title}
              </Text>
            )}
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && styles.settingItemWithBorder
                  ]}
                  onPress={() => item.type === 'navigation' ? handleSettingPress(item.label) : null}
                  disabled={item.type !== 'navigation'}
                >
                  <View style={styles.settingLeft}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  
                  {item.type === 'toggle' && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#e5e7eb', true: colors.primary }}
                      thumbColor={item.value ? 'white' : '#f3f4f6'}
                    />
                  )}
                  
                  {item.type === 'navigation' && (
                    <View style={styles.settingRight}>
                      {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                      <Text style={styles.chevron}>›</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Money Management App</Text>
          <Text style={styles.footerSubtext}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default SettingsScreen;
