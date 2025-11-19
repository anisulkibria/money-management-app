import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../constants';
import { useTheme } from '../../theme/theme';

const MonthlyOverviewReport = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Mock data for November 2024
  const monthlyData = {
    totalIncome: 3500.00,
    totalExpenses: 2145.80,
    netSavings: 1354.20,
    transactions: 28,
    topCategory: 'Groceries',
    topCategoryAmount: 456.50,
    dailyAverage: 71.53
  };

  const weeklyBreakdown = [
    { week: 'Week 1', income: 0, expenses: 523.40 },
    { week: 'Week 2', income: 3500.00, expenses: 687.20 },
    { week: 'Week 3', income: 0, expenses: 445.10 },
    { week: 'Week 4', income: 0, expenses: 490.10 },
  ];

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Monthly Overview</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>November 2024</Text>
        </View>

        {/* Enhanced Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.success}15` }]}>
              <Text style={styles.iconText}>💰</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>${monthlyData.totalIncome.toFixed(2)}</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.trendText, { color: colors.success }]}>+12% vs last month</Text>
            </View>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.expense}15` }]}>
              <Text style={styles.iconText}>💸</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Expenses</Text>
            <Text style={[styles.summaryValue, { color: colors.expense }]}>${monthlyData.totalExpenses.toFixed(2)}</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.trendText, { color: colors.expense }]}>+8% vs last month</Text>
            </View>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
              <Text style={styles.iconText}>🎯</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Net Savings</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>${monthlyData.netSavings.toFixed(2)}</Text>
            <View style={styles.trendContainer}>
              <Text style={[styles.trendText, { color: colors.success }]}>+18% vs last month</Text>
            </View>
          </View>
        </View>

        {/* Enhanced Key Metrics */}
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Key Metrics</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricIcon}>📊</Text>
                <Text style={[styles.metricLabel, { color: themeColors.textSecondary }]}>Transactions</Text>
              </View>
              <Text style={[styles.metricValue, { color: themeColors.textPrimary }]}>{monthlyData.transactions}</Text>
              <Text style={[styles.metricSubtext, { color: themeColors.textSecondary }]}>This month</Text>
            </View>
            
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricIcon}>📅</Text>
                <Text style={[styles.metricLabel, { color: themeColors.textSecondary }]}>Daily Average</Text>
              </View>
              <Text style={[styles.metricValue, { color: themeColors.textPrimary }]}>${monthlyData.dailyAverage.toFixed(2)}</Text>
              <Text style={[styles.metricSubtext, { color: themeColors.textSecondary }]}>Per day</Text>
            </View>
            
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricIcon}>🏷️</Text>
                <Text style={[styles.metricLabel, { color: themeColors.textSecondary }]}>Top Category</Text>
              </View>
              <Text style={[styles.metricValue, { color: themeColors.textPrimary }]}>{monthlyData.topCategory}</Text>
              <Text style={[styles.metricSubtext, { color: themeColors.textSecondary }]}>${monthlyData.topCategoryAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Enhanced Weekly Breakdown */}
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Weekly Breakdown</Text>
          
          {weeklyBreakdown.map((week, index) => (
            <View key={index} style={styles.weekCard}>
              <View style={styles.weekHeader}>
                <Text style={[styles.weekName, { color: themeColors.textPrimary }]}>{week.week}</Text>
                <View style={styles.weekSummary}>
                  <Text style={[styles.weekNet, { color: week.income - week.expenses >= 0 ? colors.success : colors.expense }]}>
                    ${(week.income - week.expenses).toFixed(2)}
                  </Text>
                  <Text style={[styles.weekNetLabel, { color: themeColors.textSecondary }]}>Net</Text>
                </View>
              </View>
              
              <View style={styles.weekAmounts}>
                <View style={styles.weekAmountItem}>
                  <View style={[styles.weekIndicator, { backgroundColor: colors.success }]} />
                  <Text style={[styles.weekAmountLabel, { color: themeColors.textSecondary }]}>Income</Text>
                  <Text style={[styles.weekAmountValue, { color: colors.success }]}>
                    ${week.income.toFixed(2)}
                  </Text>
                </View>
                
                <View style={styles.weekAmountItem}>
                  <View style={[styles.weekIndicator, { backgroundColor: colors.expense }]} />
                  <Text style={[styles.weekAmountLabel, { color: themeColors.textSecondary }]}>Expenses</Text>
                  <Text style={[styles.weekAmountValue, { color: colors.expense }]}>
                    ${week.expenses.toFixed(2)}
                  </Text>
                </View>
              </View>
              
              {/* Weekly Progress Bar */}
              <View style={styles.weekProgress}>
                <Text style={[styles.progressLabel, { color: themeColors.textSecondary }]}>Cash Flow</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressBackground}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          width: week.income > 0 ? '70%' : '30%',
                          backgroundColor: week.income > 0 ? colors.success : colors.expense
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.progressPercentage, { color: themeColors.textSecondary }]}>
                    {week.income > 0 ? 'Positive' : 'Outflow'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Enhanced Insights */}
        <View style={[styles.insightsSection, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Monthly Insights</Text>
          
          <View style={styles.insightsGrid}>
            <View style={[styles.insightCard, { backgroundColor: `${colors.success}10`, borderLeftColor: colors.success }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.success}20` }]}>
                <Text style={styles.insightIcon}>💡</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Great Savings Rate</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  You saved {((monthlyData.netSavings / monthlyData.totalIncome) * 100).toFixed(1)}% of your income this month
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.warning}10`, borderLeftColor: colors.warning }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.warning}20` }]}>
                <Text style={styles.insightIcon}>�</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Spending Trend</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  Spending increased by 12% compared to last month
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.primary}10`, borderLeftColor: colors.primary }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={styles.insightIcon}>🎯</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Budget Performance</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  You're on track to meet your monthly savings goal
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
    padding: 20,
    paddingBottom: 80,
  },

  // Header Section
  headerSection: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: typography.fontWeight.normal,
  },

  // Enhanced Summary Cards
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 20,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 12,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 4,
  },
  trendContainer: {
    marginTop: 4,
  },
  trendText: {
    fontSize: 11,
    fontFamily: typography.fontWeight.medium,
  },

  // Section Styles
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 20,
  },

  // Enhanced Metrics Grid
  metricsGrid: {
    gap: 16,
  },
  metricCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: themeColors.background,
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 16,
  },
  metricLabel: {
    fontSize: 13,
    fontFamily: typography.fontWeight.medium,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 4,
  },
  metricSubtext: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
  },

  // Enhanced Weekly Cards
  weekCard: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weekName: {
    fontSize: 18,
    fontFamily: typography.fontWeight.semibold,
  },
  weekSummary: {
    alignItems: 'center',
    gap: 2,
  },
  weekNet: {
    fontSize: 16,
    fontFamily: typography.fontWeight.bold,
  },
  weekNetLabel: {
    fontSize: 11,
    fontFamily: typography.fontWeight.normal,
  },
  weekAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  weekAmountItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  weekIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  weekAmountLabel: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
  },
  weekAmountValue: {
    fontSize: 16,
    fontFamily: typography.fontWeight.semibold,
  },

  // Weekly Progress
  weekProgress: {
    gap: 12,
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: typography.fontWeight.medium,
  },
  progressBar: {
    gap: 8,
  },
  progressBackground: {
    height: 8,
    backgroundColor: themeColors.progressBackground,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 12,
    fontFamily: typography.fontWeight.medium,
    textAlign: 'center',
  },

  // Enhanced Insights
  insightsSection: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
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
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    gap: 12,
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightIcon: {
    fontSize: 16,
  },
  insightContent: {
    flex: 1,
    gap: 2,
  },
  insightTitle: {
    fontSize: 14,
    fontFamily: typography.fontWeight.semibold,
  },
  insightText: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
    lineHeight: 16,
  },
});

export default MonthlyOverviewReport;
