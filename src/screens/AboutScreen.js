import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/theme';
import { typography, colors } from '../constants';

const AboutScreen = ({ navigation }) => {
  const theme = useTheme();
  const { isDark, colors: themeColors } = theme;

  const handleWebsitePress = () => {
    Linking.openURL('https://anisul.com');
  };

  const handlePrivacyPress = () => {
    Linking.openURL('https://anisul.com/privacy');
  };

  const handleTermsPress = () => {
    Linking.openURL('https://anisul.com/terms');
  };

  const getStyles = (themeColors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
    },
    content: {
      flex: 1,
    },
    appInfoContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    logo: {
      fontSize: 40,
    },
    appName: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: themeColors.textPrimary,
      marginBottom: 4,
      fontFamily: typography.fontFamily.regular,
    },
    appVersion: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
      marginBottom: 8,
      fontFamily: typography.fontFamily.regular,
    },
    tagline: {
      fontSize: typography.fontSize.base,
      color: themeColors.textSecondary,
      fontStyle: 'italic',
      fontFamily: typography.fontFamily.regular,
    },
    descriptionContainer: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: themeColors.textPrimary,
      marginBottom: 16,
      fontFamily: typography.fontFamily.regular,
    },
    description: {
      fontSize: typography.fontSize.base,
      lineHeight: 24,
      color: themeColors.textPrimary,
      fontFamily: typography.fontFamily.regular,
    },
    featuresContainer: {
      marginBottom: 32,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    featureText: {
      fontSize: typography.fontSize.base,
      color: themeColors.textPrimary,
      fontFamily: typography.fontFamily.regular,
    },
    linksContainer: {
      marginBottom: 32,
    },
    linkItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    linkText: {
      fontSize: typography.fontSize.base,
      color: colors.primary,
      textDecorationLine: 'underline',
      fontFamily: typography.fontFamily.regular,
    },
    arrow: {
      fontSize: typography.fontSize.lg,
      color: themeColors.textSecondary,
    },
    developerContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    developerName: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      color: themeColors.textPrimary,
      marginBottom: 4,
      fontFamily: typography.fontFamily.regular,
    },
    developerYear: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
      marginBottom: 4,
      fontFamily: typography.fontFamily.regular,
    },
    developerRights: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
      fontFamily: typography.fontFamily.regular,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: themeColors.surface,
      padding: 20,
      borderRadius: 12,
      shadowColor: themeColors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: themeColors.shadowOpacity,
      shadowRadius: 2,
      elevation: 2,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.primary,
      marginBottom: 4,
      fontFamily: typography.fontFamily.regular,
    },
    statLabel: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
      fontFamily: typography.fontFamily.regular,
    },
  });

  const styles = getStyles(themeColors);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.background,
      }}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
        translucent={false}
      />
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* App Logo and Name */}
          <View style={styles.appInfoContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>💰</Text>
            </View>
            <Text style={styles.appName}>Money Management</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.tagline}>Your personal finance companion</Text>
          </View>

          {/* About Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About the App</Text>
            <Text style={styles.description}>
              Money Management is a comprehensive personal finance app designed to help you take control of your financial life. Track expenses, manage budgets, set financial goals, and gain insights into your spending habits - all in one beautifully designed application.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Expense tracking and categorization</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💳</Text>
              <Text style={styles.featureText}>Budget management and alerts</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📈</Text>
              <Text style={styles.featureText}>Financial reports and insights</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Goal setting and tracking</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureText}>Secure data protection</Text>
            </View>
          </View>

          {/* Links */}
          <View style={styles.linksContainer}>
            <Text style={styles.sectionTitle}>Legal & Links</Text>
            
            <TouchableOpacity style={styles.linkItem} onPress={handlePrivacyPress}>
              <Text style={styles.linkText}>Privacy Policy</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkItem} onPress={handleTermsPress}>
              <Text style={styles.linkText}>Terms of Service</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkItem} onPress={handleWebsitePress}>
              <Text style={styles.linkText}>Visit Our Website</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Developer Info */}
          <View style={styles.developerContainer}>
            <Text style={styles.sectionTitle}>Developer</Text>
            <Text style={styles.developerName}>Anisul Kibria</Text>
            <Text style={styles.developerYear}>© 2024 Anisul.com</Text>
            <Text style={styles.developerRights}>All rights reserved</Text>
          </View>

          {/* App Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8★</Text>
              <Text style={styles.statLabel}>App Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
