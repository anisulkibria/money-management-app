import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Illustration */}
        <View style={styles.heroContainer}>
          <View style={styles.illustrationContainer}>
            <View style={styles.iconWrapper}>
              {/* Main wallet circle */}
              <View style={styles.mainCircle}>
                <View style={styles.walletInner}>
                  <Text style={styles.walletSymbol}>$</Text>
                </View>
              </View>
              
              {/* Decorative circles */}
              <View style={[styles.decorCircle, styles.circle1]} />
              <View style={[styles.decorCircle, styles.circle2]} />
              <View style={[styles.decorCircle, styles.circle3]} />
              <View style={[styles.decorCircle, styles.circle4]} />
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Take Control of Your Finances</Text>
          <Text style={styles.subtitle}>
            Effortlessly track spending, create budgets, and gain insights to achieve your financial goals.
          </Text>
        </View>

        {/* Button Group */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Onboarding1')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  heroContainer: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  walletInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletSymbol: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  decorCircle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  circle1: {
    top: 15,
    right: 25,
    backgroundColor: '#FFD700',
  },
  circle2: {
    bottom: 35,
    left: 10,
    backgroundColor: '#4CAF50',
  },
  circle3: {
    top: 25,
    left: 20,
    backgroundColor: '#FF6B6B',
  },
  circle4: {
    bottom: 20,
    right: 15,
    backgroundColor: '#2196F3',
  },
  textContainer: {
    minHeight: '25%',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: typography.fontFamily.regular,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: colors.textLight,
    textAlign: 'center',
    maxWidth: 340,
    fontFamily: typography.fontFamily.regular,
  },
  buttonContainer: {
    marginTop: 'auto',
    width: '100%',
    maxWidth: 384,
    alignSelf: 'center',
    gap: 12,
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.24,
    fontFamily: typography.fontFamily.regular,
  },
  secondaryButton: {
    backgroundColor: colors.buttonSecondaryLight,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.textLight,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.24,
    fontFamily: typography.fontFamily.regular,
  },
});

export default WelcomeScreen;
