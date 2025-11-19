import React, { useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const BudgetManagementScreen = ({ navigation }) => {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);
  const isDark = darkMode || systemColorScheme === 'dark';
  
  // Load saved dark mode preference on component mount and listen for changes
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

    // Add listener for dark mode changes
    const unsubscribe = navigation.addListener('focus', loadDarkModePreference);
    
    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  
  // Theme colors
  const themeColors = useMemo(() => ({
    background: isDark ? '#000000' : colors.backgroundLight,
    surface: isDark ? '#121212' : colors.surfaceLight,
    textPrimary: isDark ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDark ? '#B3B3B3' : colors.textLightSecondary,
    border: isDark ? '#333333' : colors.borderLight,
    cardBackground: isDark ? '#1E1E1E' : colors.surfaceLight,
    progressBackground: isDark ? '#333333' : '#E5E7EB',
  }), [isDark]);
  
  const styles = getStyles(themeColors);
  const budgets = [
    { 
      category: 'Monthly Budget', 
      total: '$2,000', 
      spent: '$1,250', 
      remaining: '$750',
      percentage: 62.5,
      status: 'on-track'
    },
    { 
      category: 'Groceries', 
      total: '$500', 
      spent: '$320', 
      remaining: '$180',
      percentage: 64,
      status: 'on-track'
    },
    { 
      category: 'Transport', 
      total: '$300', 
      spent: '$280', 
      remaining: '$20',
      percentage: 93,
      status: 'warning'
    },
    { 
      category: 'Entertainment', 
      total: '$200', 
      spent: '$220', 
      remaining: '-$20',
      percentage: 110,
      status: 'over'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return colors.income;
      case 'warning': return '#f59e0b';
      case 'over': return colors.expense;
      default: return colors.textLightSecondary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top', 'right', 'left']}>
      <Header 
        title="Budget Management" 
        showUserIcon={true}
      />

      <ScrollView style={[styles.content, { backgroundColor: themeColors.background }]} showsVerticalScrollIndicator={false}>
        {/* Overview Card */}
        <View style={[styles.overviewCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.overviewTitle, { color: themeColors.textPrimary }]}>Total Monthly Budget</Text>
          <Text style={[styles.overviewAmount, { color: themeColors.textPrimary }]}>$2,000</Text>
          <View style={styles.overviewStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Spent</Text>
              <Text style={[styles.statValue, { color: themeColors.textPrimary }]}>$1,250</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Remaining</Text>
              <Text style={[styles.statValue, { color: colors.income }]}>$750</Text>
            </View>
          </View>
        </View>

        {/* Budget List */}
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Budget Categories</Text>
        {budgets.map((budget, index) => (
          <View key={index} style={[styles.budgetCard, { 
            backgroundColor: themeColors.cardBackground,
            shadowColor: isDark ? '#000' : '#000',
            shadowOpacity: isDark ? 0.3 : 0.1
          }]}>
            <View style={styles.budgetHeader}>
              <Text style={[styles.budgetCategory, { color: themeColors.textPrimary }]}>{budget.category}</Text>
              <Text style={[styles.budgetStatus, { color: getStatusColor(budget.status) }]}>
                {budget.status === 'over' ? 'Over Budget' : budget.status === 'warning' ? 'Warning' : 'On Track'}
              </Text>
            </View>
            
            <View style={styles.budgetAmounts}>
              <Text style={[styles.budgetSpent, { color: themeColors.textPrimary }]}>{budget.spent} / {budget.total}</Text>
              <Text style={[styles.budgetRemaining, { color: themeColors.textSecondary }]}>{budget.remaining} left</Text>
            </View>

            <View style={[styles.progressBar, { backgroundColor: themeColors.progressBackground }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(budget.percentage, 100)}%`,
                    backgroundColor: getStatusColor(budget.status)
                  }
                ]} 
              />
            </View>

            <View style={styles.budgetActions}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={[styles.actionText, { color: colors.primary }]}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5' }]}>
                <Text style={[styles.actionText, { color: isDark ? '#FFFFFF' : colors.textLightPrimary }]}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddBudget')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  overviewCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  overviewTitle: {
    fontSize: typography.fontSize.base,
    color: 'white',
    opacity: 0.8,
    marginBottom: 4,
  },
  overviewAmount: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: 'white',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: 'white',
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: 'white',
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: theme.textPrimary,
    marginBottom: 16,
  },
  budgetCard: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetCategory: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: theme.textPrimary,
  },
  budgetStatus: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  budgetAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetSpent: {
    fontSize: typography.fontSize.base,
    color: theme.textPrimary,
  },
  budgetRemaining: {
    fontSize: typography.fontSize.sm,
    color: theme.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.progressBackground,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  fab: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: typography.fontWeight.bold,
  },
});

export default BudgetManagementScreen;
