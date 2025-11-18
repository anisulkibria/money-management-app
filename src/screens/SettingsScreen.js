import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

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
    } else {
      Alert.alert(label, `${label} feature coming soon!`);
    }
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Profile Settings', type: 'navigation' },
        { icon: '🔐', label: 'Change Password', type: 'navigation' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: '🏷️', label: 'Categories', type: 'navigation' },
        { icon: '🔔', label: 'Push Notifications', type: 'toggle', value: notifications, onToggle: setNotifications },
        { icon: '🌙', label: 'Dark Mode', type: 'toggle', value: darkMode, onToggle: setDarkMode },
        { icon: '💱', label: 'Currency', type: 'navigation', value: 'USD' },
        { icon: '📅', label: 'Date Format', type: 'navigation', value: 'MM/DD/YYYY' },
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
        { icon: '❓', label: 'Help Center', type: 'navigation' },
        { icon: '📧', label: 'Contact Support', type: 'navigation' },
        { icon: '⭐', label: 'Rate App', type: 'navigation' },
        { icon: '📋', label: 'Terms of Service', type: 'navigation' },
      ]
    },
    {
      title: 'About',
      items: [
        { icon: 'ℹ️', label: 'App Version', type: 'info', value: '1.0.0' },
        { icon: '🏢', label: 'About Us', type: 'navigation' },
      ]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" showUserIcon={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex} 
                  style={styles.settingItem}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceLight,
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
    color: colors.textLightPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
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
    color: colors.textLightSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: colors.surfaceLight,
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
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    color: colors.textLightPrimary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: colors.textLightSecondary,
  },
  signOutButton: {
    backgroundColor: colors.expense,
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
    color: colors.textLightSecondary,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: typography.fontSize.xs,
    color: colors.textLightSecondary,
    opacity: 0.7,
  },
});

export default SettingsScreen;
