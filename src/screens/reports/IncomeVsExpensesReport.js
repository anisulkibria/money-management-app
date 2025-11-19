import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../constants';
import { useTheme } from '../../theme/theme';

const IncomeVsExpensesReport = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Mock data for last 6 months
  const monthlyData = [
    { 
      month: 'June', 
      income: 3500.00, 
      expenses: 2100.50,
      savings: 1399.50,
      savingsRate: 40.0
    },
    { 
      month: 'July', 
      income: 3500.00, 
      expenses: 2345.80,
      savings: 1154.20,
      savingsRate: 33.0
    },
    { 
      month: 'August', 
      income: 4200.00, 
      expenses: 2567.30,
      savings: 1632.70,
      savingsRate: 38.9
    },
    { 
      month: 'September', 
      income: 3500.00, 
      expenses: 1987.60,
      savings: 1512.40,
      savingsRate: 43.2
    },
    { 
      month: 'October', 
      income: 3500.00, 
      expenses: 2234.90,
      savings: 1265.10,
      savingsRate: 36.1
    },
    { 
      month: 'November', 
      income: 3500.00, 
      expenses: 2145.80,
      savings: 1354.20,
      savingsRate: 38.7
    },
  ];

  const totals = monthlyData.reduce(
    (acc, month) => ({
      totalIncome: acc.totalIncome + month.income,
      totalExpenses: acc.totalExpenses + month.expenses,
      totalSavings: acc.totalSavings + month.savings,
    }),
    { totalIncome: 0, totalExpenses: 0, totalSavings: 0 }
  );

  const averageSavingsRate = (totals.totalSavings / totals.totalIncome) * 100;

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>
            Income vs Expenses
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Last 6 months overview
          </Text>
        </View>

        {/* Enhanced Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.success}20` }]}>
              <Text style={styles.iconText}>💰</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Income</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>${totals.totalIncome.toFixed(2)}</Text>
            <Text style={[styles.trendText, { color: colors.success }]}>+12.5%</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.expense}20` }]}>
              <Text style={styles.iconText}>💸</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Expenses</Text>
            <Text style={[styles.summaryValue, { color: colors.expense }]}>${totals.totalExpenses.toFixed(2)}</Text>
            <Text style={[styles.trendText, { color: colors.expense }]}>+8.3%</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
              <Text style={styles.iconText}>🎯</Text>
            </View>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Savings</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>${totals.totalSavings.toFixed(2)}</Text>
            <Text style={[styles.trendText, { color: colors.primary }]}>+18.2%</Text>
          </View>
        </View>

        {/* Enhanced Average Savings Rate Card */}
        <View style={[styles.averageCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <View style={styles.averageHeader}>
            <Text style={[styles.averageLabel, { color: themeColors.textSecondary }]}>Average Savings Rate</Text>
            <View style={[styles.percentageBadge, { backgroundColor: `${colors.primary}20` }]}>
              <Text style={[styles.percentageText, { color: colors.primary }]}>Excellent</Text>
            </View>
          </View>
          <Text style={[styles.averageValue, { color: colors.primary }]}>
            {averageSavingsRate.toFixed(1)}%
          </Text>
          <View style={styles.averageProgress}>
            <View style={[styles.progressBar, { backgroundColor: themeColors.progressBackground }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(averageSavingsRate, 100)}%`,
                    backgroundColor: colors.primary
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressLabel, { color: themeColors.textSecondary }]}>
              Recommended: 20%
            </Text>
          </View>
        </View>

        {/* Enhanced Monthly Breakdown */}
        <View style={[styles.section, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Monthly Breakdown</Text>
          
          {monthlyData.map((month, index) => (
            <View key={index} style={[styles.monthCard, index === monthlyData.length - 1 && styles.lastMonthCard]}>
              {/* Month Header with Enhanced Layout */}
              <View style={styles.monthHeader}>
                <View style={styles.monthInfo}>
                  <Text style={[styles.monthName, { color: themeColors.textPrimary }]}>
                    {month.month}
                  </Text>
                  <Text style={[styles.monthYear, { color: themeColors.textSecondary }]}>2024</Text>
                </View>
                <View style={styles.monthSummary}>
                  <Text style={[styles.netAmount, { color: month.savings >= 0 ? colors.success : colors.expense }]}>
                    {month.savings >= 0 ? '+' : ''}${month.savings.toFixed(2)}
                  </Text>
                  <Text style={[styles.netLabel, { color: themeColors.textSecondary }]}>Net</Text>
                </View>
                <View style={[styles.savingsBadge, { backgroundColor: `${colors.primary}15` }]}>
                  <Text style={[styles.savingsRate, { color: colors.primary }]}>
                    {month.savingsRate.toFixed(1)}%
                  </Text>
                </View>
              </View>
              
              {/* Enhanced Amount Row with Better Visual Hierarchy */}
              <View style={styles.amountContainer}>
                <View style={styles.amountSection}>
                  <View style={styles.amountItem}>
                    <View style={[styles.amountIndicator, { backgroundColor: colors.success }]} />
                    <Text style={[styles.amountLabel, { color: themeColors.textSecondary }]}>Income</Text>
                    <Text style={[styles.amountValue, { color: colors.success }]}>
                      ${month.income.toFixed(2)}
                    </Text>
                  </View>
                  
                  <View style={styles.amountItem}>
                    <View style={[styles.amountIndicator, { backgroundColor: colors.expense }]} />
                    <Text style={[styles.amountLabel, { color: themeColors.textSecondary }]}>Expenses</Text>
                    <Text style={[styles.amountValue, { color: colors.expense }]}>
                      ${month.expenses.toFixed(2)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.savingsSection}>
                  <View style={[styles.savingsItem, { backgroundColor: `${colors.primary}10` }]}>
                    <Text style={[styles.savingsItemLabel, { color: themeColors.textSecondary }]}>Savings</Text>
                    <Text style={[styles.savingsItemValue, { color: colors.primary }]}>
                      ${month.savings.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              
              {/* Enhanced Visual Chart */}
              <View style={styles.visualSection}>
                <Text style={[styles.visualTitle, { color: themeColors.textSecondary }]}>Cash Flow Overview</Text>
                <View style={styles.visualChart}>
                  <View style={styles.chartBackground}>
                    <View style={styles.chartTrack}>
                      <View 
                        style={[
                          styles.incomeSegment, 
                          { 
                            width: '60%',
                            backgroundColor: colors.success
                          }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.expenseSegment, 
                          { 
                            width: '40%',
                            backgroundColor: colors.expense
                          }
                        ]} 
                      />
                    </View>
                  </View>
                  <View style={styles.chartStats}>
                    <View style={styles.chartStatItem}>
                      <Text style={[styles.chartStatValue, { color: colors.success }]}>
                        {((month.income / (month.income + month.expenses)) * 100).toFixed(0)}%
                      </Text>
                      <Text style={[styles.chartStatLabel, { color: themeColors.textSecondary }]}>Income</Text>
                    </View>
                    <View style={styles.chartStatItem}>
                      <Text style={[styles.chartStatValue, { color: colors.expense }]}>
                        {((month.expenses / (month.income + month.expenses)) * 100).toFixed(0)}%
                      </Text>
                      <Text style={[styles.chartStatLabel, { color: themeColors.textSecondary }]}>Expenses</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Enhanced Insights Section */}
        <View style={[styles.insightsSection, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Financial Insights</Text>
          
          <View style={styles.insightsGrid}>
            <View style={[styles.insightCard, { backgroundColor: `${colors.success}10`, borderLeftColor: colors.success }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.success}20` }]}>
                <Text style={styles.insightIcon}>📈</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Great Savings Rate</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  Your average savings rate of {averageSavingsRate.toFixed(1)}% is above the recommended 20%
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.primary}10`, borderLeftColor: colors.primary }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={styles.insightIcon}>💰</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Best Performance</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  August was your best month with ${monthlyData[2].savings.toFixed(2)} in savings
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.warning}10`, borderLeftColor: colors.warning }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.warning}20` }]}>
                <Text style={styles.insightIcon}>🎯</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Total Achievement</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  You've saved a total of ${totals.totalSavings.toFixed(2)} over the last 6 months
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
  trendText: {
    fontSize: 11,
    fontFamily: typography.fontWeight.medium,
  },

  // Enhanced Average Card
  averageCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  averageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  averageLabel: {
    fontSize: 14,
    fontFamily: typography.fontWeight.normal,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 11,
    fontFamily: typography.fontWeight.medium,
  },
  averageValue: {
    fontSize: 40,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 16,
  },
  averageProgress: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
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

  // Enhanced Monthly Cards
  monthCard: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  lastMonthCard: {
    borderBottomWidth: 0,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthInfo: {
    gap: 2,
  },
  monthName: {
    fontSize: 18,
    fontFamily: typography.fontWeight.semibold,
  },
  monthYear: {
    fontSize: 13,
    fontFamily: typography.fontWeight.normal,
  },
  monthSummary: {
    alignItems: 'center',
    gap: 2,
  },
  netAmount: {
    fontSize: 16,
    fontFamily: typography.fontWeight.bold,
  },
  netLabel: {
    fontSize: 11,
    fontFamily: typography.fontWeight.normal,
  },
  savingsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  savingsRate: {
    fontSize: 13,
    fontFamily: typography.fontWeight.bold,
  },

  // Enhanced Amount Container
  amountContainer: {
    gap: 16,
    marginBottom: 20,
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  amountItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  amountIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  amountLabel: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
  },
  amountValue: {
    fontSize: 16,
    fontFamily: typography.fontWeight.semibold,
  },
  savingsSection: {
    alignSelf: 'center',
  },
  savingsItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    gap: 2,
  },
  savingsItemLabel: {
    fontSize: 11,
    fontFamily: typography.fontWeight.normal,
  },
  savingsItemValue: {
    fontSize: 16,
    fontFamily: typography.fontWeight.bold,
  },

  // Enhanced Visual Section
  visualSection: {
    gap: 12,
  },
  visualTitle: {
    fontSize: 13,
    fontFamily: typography.fontWeight.medium,
  },
  visualChart: {
    gap: 12,
  },
  chartBackground: {
    height: 8,
    backgroundColor: themeColors.progressBackground,
    borderRadius: 4,
  },
  chartTrack: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  incomeSegment: {
    height: '100%',
    borderRadius: 4,
  },
  expenseSegment: {
    height: '100%',
    borderRadius: 4,
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chartStatItem: {
    alignItems: 'center',
    gap: 2,
  },
  chartStatValue: {
    fontSize: 14,
    fontFamily: typography.fontWeight.bold,
  },
  chartStatLabel: {
    fontSize: 11,
    fontFamily: typography.fontWeight.normal,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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

export default IncomeVsExpensesReport;
