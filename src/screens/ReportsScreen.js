import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const ReportsScreen = ({ navigation }) => {
  const reports = [
    { 
      title: 'Monthly Overview', 
      period: 'November 2024',
      icon: '📊',
      type: 'overview'
    },
    { 
      title: 'Spending by Category', 
      period: 'Last 30 days',
      icon: '🥧',
      type: 'chart'
    },
    { 
      title: 'Income vs Expenses', 
      period: 'Last 6 months',
      icon: '📈',
      type: 'trend'
    },
    { 
      title: 'Budget Performance', 
      period: 'This month',
      icon: '🎯',
      type: 'budget'
    },
  ];

  const insights = [
    { 
      title: 'Top Spending Category',
      value: 'Groceries',
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Average Daily Spending',
      value: '$41.67',
      change: '-5%',
      trend: 'down'
    },
    { 
      title: 'Budget Utilization',
      value: '62.5%',
      change: '+8%',
      trend: 'up'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Reports & Insights" 
        showUserIcon={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Quick Insights</Text>
          {insights.map((insight, index) => (
            <View key={index} style={styles.insightCard}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={styles.insightValue}>
                <Text style={styles.insightAmount}>{insight.value}</Text>
                <View style={styles.insightChange}>
                  <Text style={styles.changeText}>{insight.change}</Text>
                  <Text style={styles.trendIcon}>
                    {insight.trend === 'up' ? '↑' : '↓'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Available Reports */}
        <View style={styles.reportsContainer}>
          <Text style={styles.sectionTitle}>Available Reports</Text>
          {reports.map((report, index) => (
            <TouchableOpacity key={index} style={styles.reportCard}>
              <View style={styles.reportIcon}>
                <Text style={styles.reportIconText}>{report.icon}</Text>
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportPeriod}>{report.period}</Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Export Options */}
        <View style={styles.exportSection}>
          <Text style={styles.sectionTitle}>Export Options</Text>
          <View style={styles.exportOptions}>
            <TouchableOpacity style={styles.exportOption}>
              <Text style={styles.exportOptionText}>📄 PDF Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportOption}>
              <Text style={styles.exportOptionText}>📊 Excel Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportOption}>
              <Text style={styles.exportOptionText}>📱 Share Summary</Text>
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
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 32,
  },
  insightCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  insightTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    marginBottom: 8,
  },
  insightValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLightPrimary,
  },
  insightChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
  },
  trendIcon: {
    fontSize: typography.fontSize.sm,
    color: colors.income,
  },
  reportsContainer: {
    marginBottom: 32,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reportIconText: {
    fontSize: 24,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLightPrimary,
    marginBottom: 4,
  },
  reportPeriod: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  viewButtonText: {
    color: 'white',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  exportSection: {
    marginBottom: 32,
  },
  exportOptions: {
    gap: 12,
  },
  exportOption: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exportOptionText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLightPrimary,
  },
});

export default ReportsScreen;
