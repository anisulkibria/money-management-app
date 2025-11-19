import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography } from '../constants';

const ViewBudgetScreen = ({ navigation }) => {
  const route = useRoute();
  const { budgetId } = route.params || {};
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

  // Mock budget data - in a real app, you would load this from storage/API
  const budgetData = {
    category: 'Groceries',
    budgetedAmount: 500.00,
    spentAmount: 345.67,
    period: 'monthly',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    remainingAmount: 154.33,
    percentageUsed: 69.13
  };

  // Theme colors
  const themeColors = {
    background: isDark ? '#000000' : colors.backgroundLight,
    surface: isDark ? '#121212' : colors.surfaceLight,
    cardBackground: isDark ? '#1E1E1E' : colors.surfaceLight,
    textPrimary: isDark ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDark ? '#B3B3B3' : colors.textLightSecondary,
    border: isDark ? '#333333' : colors.borderLight,
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const styles = getStyles(themeColors);

  const getProgressColor = () => {
    if (budgetData.percentageUsed <= 50) return themeColors.success;
    if (budgetData.percentageUsed <= 80) return themeColors.warning;
    return themeColors.danger;
  };

  const getStatusText = () => {
    if (budgetData.percentageUsed <= 50) return 'On Track';
    if (budgetData.percentageUsed <= 80) return 'Warning';
    return 'Over Budget';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Overview Card */}
        <View style={[styles.overviewCard, { backgroundColor: themeColors.cardBackground }]}>
          <View style={styles.categoryHeader}>
            <Text style={[styles.categoryName, { color: themeColors.textPrimary }]}>
              {budgetData.category}
            </Text>
            <Text style={[styles.period, { color: themeColors.textSecondary }]}>
              {budgetData.period.charAt(0).toUpperCase() + budgetData.period.slice(1)}
            </Text>
          </View>
          
          <View style={styles.amountRow}>
            <Text style={[styles.amountLabel, { color: themeColors.textSecondary }]}>Budget</Text>
            <Text style={[styles.budgetedAmount, { color: colors.primary }]}>
              ${budgetData.budgetedAmount.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.amountRow}>
            <Text style={[styles.amountLabel, { color: themeColors.textSecondary }]}>Spent</Text>
            <Text style={[styles.spentAmount, { color: themeColors.danger }]}>
              ${budgetData.spentAmount.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.amountRow}>
            <Text style={[styles.amountLabel, { color: themeColors.textSecondary }]}>Remaining</Text>
            <Text style={[styles.remainingAmount, { color: budgetData.remainingAmount >= 0 ? themeColors.success : themeColors.danger }]}>
              ${Math.abs(budgetData.remainingAmount).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.progressTitle, { color: themeColors.textPrimary }]}>Budget Progress</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill,
                  { 
                    width: `${Math.min(budgetData.percentageUsed, 100)}%`,
                    backgroundColor: getProgressColor()
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressPercentage, { color: themeColors.textPrimary }]}>
              {budgetData.percentageUsed.toFixed(1)}%
            </Text>
          </View>
          
          <Text style={[styles.statusText, { color: getProgressColor() }]}>
            {getStatusText()}
          </Text>
        </View>

        {/* Period Details */}
        <View style={[styles.detailsCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.detailsTitle, { color: themeColors.textPrimary }]}>Period Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>Start Date</Text>
            <Text style={[styles.detailValue, { color: themeColors.textPrimary }]}>
              {new Date(budgetData.startDate).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>End Date</Text>
            <Text style={[styles.detailValue, { color: themeColors.textPrimary }]}>
              {new Date(budgetData.endDate).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>Days Remaining</Text>
            <Text style={[styles.detailValue, { color: themeColors.textPrimary }]}>
              {Math.max(0, Math.ceil((new Date(budgetData.endDate) - new Date()) / (1000 * 60 * 60 * 24)))}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('EditBudget', { budgetId })}
          >
            <Text style={styles.actionButtonText}>Edit Budget</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  overviewCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  period: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  budgetedAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  spentAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  remainingAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  progressCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 16,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: theme.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  detailsCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default ViewBudgetScreen;
