import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';

const OnboardingScreen5 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.completedDot]} />
            <View style={[styles.progressDot, styles.completedDot]} />
            <View style={[styles.progressDot, styles.completedDot]} />
            <View style={[styles.progressDot, styles.completedDot]} />
            <View style={[styles.progressDot, styles.activeDot]} />
          </View>

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>Question 5 of 5</Text>
            <Text style={styles.question}>
              How do you prefer to receive financial insights?
            </Text>
          </View>

          {/* Answer Options */}
          <View style={styles.answersContainer}>
            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Auth')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>📱</Text>
              </View>
              <View style={styles.answerContent}>
                <Text style={styles.answerText}>Daily notifications</Text>
                <Text style={styles.answerSubtext}>Quick tips and spending alerts</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Auth')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>📧</Text>
              </View>
              <View style={styles.answerContent}>
                <Text style={styles.answerText}>Weekly summaries</Text>
                <Text style={styles.answerSubtext}>Detailed reports every Monday</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Auth')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>📊</Text>
              </View>
              <View style={styles.answerContent}>
                <Text style={styles.answerText}>Monthly reports</Text>
                <Text style={styles.answerSubtext}>Comprehensive financial overview</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Auth')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>🔕</Text>
              </View>
              <View style={styles.answerContent}>
                <Text style={styles.answerText}>No notifications</Text>
                <Text style={styles.answerSubtext}>I'll check the app myself</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Completion Message */}
          <View style={styles.completionContainer}>
            <Text style={styles.completionText}>
              🎉 Great! You're all set to start your financial journey.
            </Text>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.finishButton}
              onPress={() => navigation.navigate('Auth')}
            >
              <Text style={styles.finishButtonText}>Finish Setup</Text>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  completedDot: {
    backgroundColor: colors.primary,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  questionNumber: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    marginBottom: 8,
    fontFamily: typography.fontFamily.regular,
  },
  question: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
    textAlign: 'center',
    fontFamily: typography.fontFamily.regular,
    lineHeight: 32,
  },
  answersContainer: {
    flex: 1,
    gap: 16,
    marginBottom: 20,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  answerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  answerContent: {
    flex: 1,
  },
  answerText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLight,
    fontFamily: typography.fontFamily.regular,
  },
  answerSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    marginTop: 4,
    fontFamily: typography.fontFamily.regular,
  },
  iconText: {
    fontSize: 24,
  },
  completionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  completionText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: typography.fontFamily.regular,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.regular,
  },
  finishButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  finishButtonText: {
    fontSize: typography.fontSize.base,
    color: 'white',
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.regular,
  },
});

export default OnboardingScreen5;
