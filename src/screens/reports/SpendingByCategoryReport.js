import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../../constants';
import { useTheme } from '../../theme/theme';

const SpendingByCategoryReport = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Mock data for spending by category
  const categoryData = [
    { 
      category: 'Groceries', 
      amount: 456.50, 
      percentage: 21.3, 
      transactions: 8,
      icon: '🛒',
      color: colors.primary
    },
    { 
      category: 'Dining Out', 
      amount: 324.80, 
      percentage: 15.1, 
      transactions: 12,
      icon: '🍽️',
      color: colors.warning
    },
    { 
      category: 'Transportation', 
      amount: 289.00, 
      percentage: 13.5, 
      transactions: 15,
      icon: '🚗',
      color: colors.info
    },
    { 
      category: 'Entertainment', 
      amount: 234.20, 
      percentage: 10.9, 
      transactions: 6,
      icon: '🎮',
      color: colors.success
    },
    { 
      category: 'Utilities', 
      amount: 198.00, 
      percentage: 9.2, 
      transactions: 4,
      icon: '💡',
      color: '#8B5CF6'
    },
    { 
      category: 'Shopping', 
      amount: 187.30, 
      percentage: 8.7, 
      transactions: 5,
      icon: '🛍️',
      color: '#EC4899'
    },
    { 
      category: 'Healthcare', 
      amount: 156.00, 
      percentage: 7.3, 
      transactions: 3,
      icon: '🏥',
      color: '#14B8A6'
    },
    { 
      category: 'Other', 
      amount: 300.00, 
      percentage: 14.0, 
      transactions: 11,
      icon: '📦',
      color: '#6B7280'
    },
  ];

  const totalSpending = categoryData.reduce((sum, cat) => sum + cat.amount, 0);

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>Spending by Category</Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>November 2024</Text>
        </View>

        {/* Enhanced Total Spending Card */}
        <View style={[styles.totalCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <View style={[styles.iconContainer, { backgroundColor: `${colors.expense}15` }]}>
            <Text style={styles.iconText}>💳</Text>
          </View>
          <Text style={[styles.totalLabel, { color: themeColors.textSecondary }]}>Total Spending (Last 30 days)</Text>
          <Text style={[styles.totalAmount, { color: colors.expense }]}>${totalSpending.toFixed(2)}</Text>
          <Text style={[styles.totalPeriod, { color: themeColors.textSecondary }]}>Nov 1 - Nov 30, 2024</Text>
          <View style={styles.trendContainer}>
            <Text style={[styles.trendText, { color: colors.expense }]}>+15% vs last month</Text>
          </View>
        </View>

        {/* Enhanced Category List */}
        <View style={styles.categoryList}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Category Breakdown</Text>
          
          {categoryData.map((category, index) => (
            <View key={index} style={[styles.categoryCard, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}15` }]}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.categoryDetails}>
                    <Text style={[styles.categoryName, { color: themeColors.textPrimary }]}>
                      {category.category}
                    </Text>
                    <Text style={[styles.categoryTransactions, { color: themeColors.textSecondary }]}>
                      {category.transactions} transactions
                    </Text>
                  </View>
                </View>
                <View style={styles.categoryAmount}>
                  <Text style={[styles.amountValue, { color: themeColors.textPrimary }]}>
                    ${category.amount.toFixed(2)}
                  </Text>
                  <Text style={[styles.amountPercentage, { color: themeColors.textSecondary }]}>
                    {category.percentage}%
                  </Text>
                </View>
              </View>
              
              {/* Enhanced Progress Bar */}
              <View style={styles.progressContainer}>
                <Text style={[styles.progressLabel, { color: themeColors.textSecondary }]}>Share of Total Spending</Text>
                <View style={styles.progressBar}>
                  <View style={styles.progressBackground}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${category.percentage}%`,
                          backgroundColor: category.color
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.progressPercentage, { color: themeColors.textSecondary }]}>
                    {category.percentage}%
                  </Text>
                </View>
              </View>

              {/* Category Stats */}
              <View style={styles.categoryStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Avg per Transaction</Text>
                  <Text style={[styles.statValue, { color: themeColors.textPrimary }]}>
                    ${(category.amount / category.transactions).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Daily Average</Text>
                  <Text style={[styles.statValue, { color: themeColors.textPrimary }]}>
                    ${(category.amount / 30).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Enhanced Insights */}
        <View style={[styles.insightsSection, { backgroundColor: themeColors.cardBackground, shadowColor: themeColors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Spending Insights</Text>
          
          <View style={styles.insightsGrid}>
            <View style={[styles.insightCard, { backgroundColor: `${colors.warning}10`, borderLeftColor: colors.warning }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.warning}20` }]}>
                <Text style={styles.insightIcon}>🏆</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Top Category</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  Groceries is your top spending category this month
                </Text>
              </View>
            </View>
            
            <View style={[styles.insightCard, { backgroundColor: `${colors.primary}10`, borderLeftColor: colors.primary }]}>
              <View style={[styles.insightIconContainer, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={styles.insightIcon}>📊</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: themeColors.textPrimary }]}>Concentration</Text>
                <Text style={[styles.insightText, { color: themeColors.textSecondary }]}>
                  Top 3 categories account for {((categoryData[0].percentage + categoryData[1].percentage + categoryData[2].percentage)).toFixed(1)}% of your spending
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
                  Consider setting a budget for Dining Out to reduce discretionary spending
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

  // Enhanced Total Spending Card
  totalCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
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
  totalLabel: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 12,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 4,
  },
  totalPeriod: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
  },
  trendContainer: {
    marginTop: 8,
  },
  trendText: {
    fontSize: 11,
    fontFamily: typography.fontWeight.medium,
  },

  // Section Styles
  sectionTitle: {
    fontSize: 20,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 20,
  },

  // Enhanced Category List
  categoryList: {
    marginBottom: 20,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: typography.fontWeight.semibold,
    marginBottom: 2,
  },
  categoryTransactions: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
  },
  categoryAmount: {
    alignItems: 'flex-end',
  },
  amountValue: {
    fontSize: 12,
    fontFamily: typography.fontWeight.bold,
    marginBottom: 2,
  },
  amountPercentage: {
    fontSize: 12,
    fontFamily: typography.fontWeight.normal,
  },

  // Enhanced Progress Bar
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: typography.fontWeight.medium,
    marginBottom: 8,
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
    textAlign: 'right',
  },

  // Category Stats
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: themeColors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: typography.fontWeight.normal,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    fontFamily: typography.fontWeight.semibold,
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

export default SpendingByCategoryReport;
