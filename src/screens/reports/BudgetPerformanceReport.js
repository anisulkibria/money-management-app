import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../constants';
import { useTheme } from '../../theme/theme';

const BudgetPerformanceReport = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Mock budget data for this month
  const budgetCategories = [
    { 
      category: 'Groceries', 
      budgeted: 500.00, 
      spent: 456.50,
      icon: '🛒',
      color: colors.primary
    },
    { 
      category: 'Dining Out', 
      budgeted: 300.00, 
      spent: 324.80,
      icon: '🍽️',
      color: colors.warning
    },
    { 
      category: 'Transportation', 
      budgeted: 350.00, 
      spent: 289.00,
      icon: '🚗',
      color: colors.info
    },
    { 
      category: 'Entertainment', 
      budgeted: 200.00, 
      spent: 234.20,
      icon: '🎮',
      color: colors.success
    },
    { 
      category: 'Utilities', 
      budgeted: 200.00, 
      spent: 198.00,
      icon: '💡',
      color: '#8B5CF6'
    },
    { 
      category: 'Shopping', 
      budgeted: 250.00, 
      spent: 187.30,
      icon: '🛍️',
      color: '#EC4899'
    },
    { 
      category: 'Healthcare', 
      budgeted: 150.00, 
      spent: 156.00,
      icon: '🏥',
      color: '#14B8A6'
    },
  ];

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const overBudgetCategories = budgetCategories.filter(cat => cat.spent > cat.budgeted);
  const underBudgetCategories = budgetCategories.filter(cat => cat.spent <= cat.budgeted);

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Budget Performance</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>November 2024</Text>
        </View>

        {/* Enhanced Budget Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
              <Text style={styles.iconText}>💰</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Budget</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>
              ${totalBudgeted.toFixed(2)}
            </Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.trendText, { color: colors.primary }]}>Monthly allocation</Text>
            </View>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.expense}15` }]}>
              <Text style={styles.iconText}>💳</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Spent</Text>
            <Text style={[styles.summaryValue, { color: colors.expense }]}>
              ${totalSpent.toFixed(2)}
            </Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.trendText, { color: colors.expense }]}>
                {((totalSpent / totalBudgeted) * 100).toFixed(1)}% used
              </Text>
            </View>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${totalRemaining >= 0 ? colors.success : colors.expense}15` }]}>
              <Text style={styles.iconText}>{totalRemaining >= 0 ? '✅' : '⚠️'}</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Remaining</Text>
            <Text style={[styles.summaryValue, { color: totalRemaining >= 0 ? colors.success : colors.expense }]}>
              ${Math.abs(totalRemaining).toFixed(2)}
            </Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.trendText, { color: totalRemaining >= 0 ? colors.success : colors.expense }]}>
                {totalRemaining >= 0 ? 'On track' : 'Over budget'}
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Budget Status */}
        <View style={styles.statusSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Budget Status</Text>
          <View style={styles.statusGrid}>
            <View style={[styles.statusCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
              <View style={[styles.statusIconContainer, { backgroundColor: `${colors.success}20` }]}>
                <Text style={styles.statusIcon}>✅</Text>
              </View>
              <Text style={[styles.statusNumber, { color: colors.success }]}>
                {underBudgetCategories.length}
              </Text>
              <Text style={[styles.statusLabel, { color: themeColors.textSecondary }]}>
                On Budget
              </Text>
            </View>
            
            <View style={[styles.statusCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
              <View style={[styles.statusIconContainer, { backgroundColor: `${colors.warning}20` }]}>
                <Text style={styles.statusIcon}>⚠️</Text>
              </View>
              <Text style={[styles.statusNumber, { color: colors.warning }]}>
                {overBudgetCategories.length}
              </Text>
              <Text style={[styles.statusLabel, { color: themeColors.textSecondary }]}>
                Over Budget
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Category Breakdown */}
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Category Breakdown</Text>
          
          {budgetCategories.map((category, index) => {
            const percentageUsed = (category.spent / category.budgeted) * 100;
            const isOverBudget = category.spent > category.budgeted;
            const remaining = category.budgeted - category.spent;
            
            return (
              <View key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}15` }]}>
                      <Text style={styles.categoryIcon}>{category.icon}</Text>
                    </View>
                    <View style={styles.categoryDetails}>
                      <Text style={[styles.categoryName, { color: themeColors.textPrimary }]}>
                        {category.category}
                      </Text>
                      <Text style={[styles.categoryAmount, { color: themeColors.textSecondary }]}>
                        ${category.spent.toFixed(2)} / ${category.budgeted.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.categoryStatus}>
                    <Text style={[
                      styles.percentageText,
                      { color: isOverBudget ? colors.expense : colors.success }
                    ]}>
                      {percentageUsed.toFixed(1)}%
                    </Text>
                    <Text style={[
                      styles.statusText,
                      { color: isOverBudget ? colors.expense : colors.success }
                    ]}>
                      {isOverBudget ? 'Over' : 'Good'}
                    </Text>
                  </View>
                </View>
                
                {/* Enhanced Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={styles.progressBackground}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${Math.min(percentageUsed, 100)}%`,
                            backgroundColor: isOverBudget ? colors.expense : colors.success
                          }
                        ]} 
                      />
                      {isOverBudget && (
                        <View 
                          style={[
                            styles.overBudgetFill,
                            { 
                              width: `${Math.min(percentageUsed - 100, 100)}%`,
                              backgroundColor: colors.warning
                            }
                          ]} 
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.progressLabels}>
                    <Text style={[styles.progressLabel, { color: themeColors.textSecondary }]}>
                      Spent: ${category.spent.toFixed(2)}
                    </Text>
                    <Text style={[styles.progressLabel, { color: themeColors.textSecondary }]}>
                      {remaining >= 0 ? `Remaining: $${remaining.toFixed(2)}` : `Over: $${Math.abs(remaining).toFixed(2)}`}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Enhanced Insights */}
        <View style={[styles.insightsSection, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Budget Insights</Text>
          
          <View style={styles.insightsGrid}>
            <View style={[styles.insightCard, { backgroundColor: `${colors.warning}10`, borderLeftColor: colors.warning }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.warning}20` }]}>
                <Text style={styles.insightIcon}>🎯</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Budget Alert</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  {overBudgetCategories.length > 0 ? `${overBudgetCategories.length} categories over budget. Consider adjusting spending limits.` : 'All categories within budget!'}
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.primary}10`, borderLeftColor: colors.primary }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={styles.insightIcon}>📊</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Budget Health</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  {totalRemaining >= 0 ? `You have $${totalRemaining.toFixed(2)} remaining for the month` : `You're $${Math.abs(totalRemaining).toFixed(2)} over budget`}
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.success}10`, borderLeftColor: colors.success }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.success}20` }]}>
                <Text style={styles.insightIcon}>💡</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Optimization</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  {overBudgetCategories.length > 0 ? `Focus on ${overBudgetCategories[0].category} to get back on track` : 'Great job managing your budget!'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (themeColors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: typography.bold,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: typography.regular,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 20,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: typography.regular,
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 12,
    fontFamily: typography.bold,
    marginBottom: 4,
  },
  trendContainer: {
    marginTop: 4,
  },
  trendText: {
    fontSize: 10,
    fontFamily: typography.medium,
  },
  statusSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: typography.bold,
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statusCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statusIcon: {
    fontSize: 24,
  },
  statusNumber: {
    fontSize: 32,
    fontFamily: typography.bold,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: typography.regular,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryCard: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: typography.bold,
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 12,
    fontFamily: typography.regular,
  },
  categoryStatus: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontSize: 14,
    fontFamily: typography.bold,
    marginBottom: 2,
  },
  statusText: {
    fontSize: 11,
    fontFamily: typography.regular,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressBackground: {
    height: '100%',
    backgroundColor: themeColors.border,
    borderRadius: 4,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overBudgetFill: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 10,
    fontFamily: typography.regular,
  },
  insightsSection: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  insightsGrid: {
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  insightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightIcon: {
    fontSize: 18,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontFamily: typography.bold,
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    fontFamily: typography.regular,
    lineHeight: 16,
  },
});

export default BudgetPerformanceReport;
