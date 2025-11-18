import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.activeDot]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>Question 1 of 5</Text>
            <Text style={styles.question}>
              What's your main financial goal right now?
            </Text>
          </View>

          {/* Answer Options */}
          <View style={styles.answersContainer}>
            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Onboarding2')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>🎯</Text>
              </View>
              <Text style={styles.answerText}>Save for a specific goal</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Onboarding2')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>📊</Text>
              </View>
              <Text style={styles.answerText}>Track spending habits</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Onboarding2')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>💰</Text>
              </View>
              <Text style={styles.answerText}>Build emergency fund</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.answerOption}
              onPress={() => navigation.navigate('Onboarding2')}
            >
              <View style={styles.answerIcon}>
                <Text style={styles.iconText}>🏠</Text>
              </View>
              <Text style={styles.answerText}>Manage household budget</Text>
            </TouchableOpacity>
          </View>

          {/* Skip Button */}
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.skipText}>Skip onboarding</Text>
          </TouchableOpacity>
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
    padding: 16,
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
    gap: 6,
    marginTop: 8,
    marginBottom: 24,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 20,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  questionNumber: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    marginBottom: 8,
    fontFamily: typography.fontFamily.regular,
  },
  question: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
    textAlign: 'center',
    fontFamily: typography.fontFamily.regular,
    lineHeight: 28,
  },
  answersContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 24,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  answerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  answerText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLight,
    fontFamily: typography.fontFamily.regular,
    flex: 1,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 24,
  },
  skipText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    textDecorationLine: 'underline',
    fontFamily: typography.fontFamily.regular,
  },
});

export default OnboardingScreen1;
