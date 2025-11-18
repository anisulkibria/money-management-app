import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';

const SupportScreen = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:a@anisul.com');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://anisul.com');
  };

  const handleFAQPress = () => {
    Linking.openURL('https://anisul.com/faq');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Support</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Support Options */}
          <View style={styles.supportContainer}>
            <Text style={styles.sectionTitle}>How can we help you?</Text>
            
            <TouchableOpacity style={styles.supportOption} onPress={handleFAQPress}>
              <View style={styles.optionIcon}>
                <Text style={styles.iconText}>❓</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Frequently Asked Questions</Text>
                <Text style={styles.optionDescription}>
                  Find quick answers to common questions about using the app
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportOption} onPress={handleEmailPress}>
              <View style={styles.optionIcon}>
                <Text style={styles.iconText}>✉️</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Email Support</Text>
                <Text style={styles.optionDescription}>
                  Get help from our support team via email
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportOption} onPress={handleWebsitePress}>
              <View style={styles.optionIcon}>
                <Text style={styles.iconText}>🌐</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Visit Help Center</Text>
                <Text style={styles.optionDescription}>
                  Browse our comprehensive help documentation
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Information */}
          <View style={styles.contactContainer}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.contactValue}>a@anisul.com</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Website:</Text>
              <TouchableOpacity onPress={handleWebsitePress}>
                <Text style={styles.contactValue}>www.anisul.com</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Response Time:</Text>
              <Text style={styles.contactValue}>Usually within 24 hours</Text>
            </View>
          </View>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Money Management App v1.0.0</Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.regular,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
    fontFamily: typography.fontFamily.regular,
  },
  placeholder: {
    width: 60,
  },
  supportContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
    marginBottom: 20,
    fontFamily: typography.fontFamily.regular,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLight,
    marginBottom: 4,
    fontFamily: typography.fontFamily.regular,
  },
  optionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    fontFamily: typography.fontFamily.regular,
  },
  arrow: {
    fontSize: typography.fontSize.lg,
    color: colors.textLightSecondary,
  },
  contactContainer: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  contactLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLight,
    fontFamily: typography.fontFamily.regular,
  },
  contactValue: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    textDecorationLine: 'underline',
    fontFamily: typography.fontFamily.regular,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  versionText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    fontFamily: typography.fontFamily.regular,
  },
});

export default SupportScreen;
