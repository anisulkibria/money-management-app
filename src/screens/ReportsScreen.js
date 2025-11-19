import React, { useState, useMemo, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const ReportsScreen = ({ navigation }) => {
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
    cardBackground: isDark ? '#1E1E1E' : colors.surfaceLight,
    textPrimary: isDark ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDark ? '#B3B3B3' : colors.textLightSecondary,
    border: isDark ? '#333333' : colors.borderLight,
    shadow: isDark ? '#000' : '#000',
    shadowOpacity: isDark ? 0.3 : 0.1,
  }), [isDark]);
  
  const styles = getStyles(themeColors);
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
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top', 'right', 'left']}>
      <Header 
        title="Reports & Insights" 
        showUserIcon={true}
      />

      <ScrollView style={[styles.content, { backgroundColor: themeColors.background }]} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Quick Insights</Text>
          {insights.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { 
              backgroundColor: themeColors.cardBackground,
              shadowColor: themeColors.shadow,
              shadowOpacity: themeColors.shadowOpacity,
            }]}>
              <Text style={[styles.insightTitle, { color: themeColors.textSecondary }]}>{insight.title}</Text>
              <View style={styles.insightValue}>
                <Text style={[styles.insightAmount, { color: themeColors.textPrimary }]}>{insight.value}</Text>
                <View style={styles.insightChange}>
                  <Text style={[styles.changeText, { color: themeColors.textSecondary }]}>{insight.change}</Text>
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
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Available Reports</Text>
          {reports.map((report, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.reportCard, { 
                backgroundColor: themeColors.cardBackground,
                shadowColor: themeColors.shadow,
                shadowOpacity: themeColors.shadowOpacity,
              }]}
              onPress={() => {
                // Navigate to the appropriate report screen based on type
                switch(report.type) {
                  case 'overview':
                    navigation.navigate('MonthlyOverviewReport');
                    break;
                  case 'chart':
                    navigation.navigate('SpendingByCategoryReport');
                    break;
                  case 'trend':
                    navigation.navigate('IncomeVsExpensesReport');
                    break;
                  case 'budget':
                    navigation.navigate('BudgetPerformanceReport');
                    break;
                  default:
                    break;
                }
              }}
            >
              <View style={[styles.reportIcon, { backgroundColor: `${colors.primary}${isDark ? '33' : '20'}` }]}>
                <Text style={styles.reportIconText}>{report.icon}</Text>
              </View>
              <View style={styles.reportInfo}>
                <Text style={[styles.reportTitle, { color: themeColors.textPrimary }]}>{report.title}</Text>
                <Text style={[styles.reportPeriod, { color: themeColors.textSecondary }]}>{report.period}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => {
                  // Navigate to the appropriate report screen based on type
                  switch(report.type) {
                    case 'overview':
                      navigation.navigate('MonthlyOverviewReport');
                      break;
                    case 'chart':
                      navigation.navigate('SpendingByCategoryReport');
                      break;
                    case 'trend':
                      navigation.navigate('IncomeVsExpensesReport');
                      break;
                    case 'budget':
                      navigation.navigate('BudgetPerformanceReport');
                      break;
                    default:
                      break;
                  }
                }}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Export Options */}
        <View style={styles.exportSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Export Options</Text>
          <View style={styles.exportOptions}>
            <TouchableOpacity 
              style={styles.exportOption}
              onPress={() => Alert.alert('Coming Soon', 'PDF Report export will be available in a future update.')}
            >
              <Text style={[styles.exportOptionText, { color: themeColors.textPrimary }]}>📄 PDF Report</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.exportOption}
              onPress={() => Alert.alert('Coming Soon', 'Excel Data export will be available in a future update.')}
            >
              <Text style={[styles.exportOptionText, { color: themeColors.textPrimary }]}>📊 Excel Data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.exportOption}
              onPress={() => Alert.alert('Coming Soon', 'Share Summary will be available in a future update.')}
            >
              <Text style={[styles.exportOptionText, { color: themeColors.textPrimary }]}>📱 Share Summary</Text>
            </TouchableOpacity>
          </View>
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
    color: theme.textPrimary,
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 32,
  },
  insightCard: {
    backgroundColor: theme.cardBackground,
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
    color: theme.textSecondary,
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
    color: theme.textPrimary,
  },
  insightChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: typography.fontSize.sm,
    color: theme.textSecondary,
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
    backgroundColor: theme.cardBackground,
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
    color: theme.textPrimary,
    marginBottom: 4,
  },
  reportPeriod: {
    fontSize: typography.fontSize.sm,
    color: theme.textSecondary,
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
    backgroundColor: theme.cardBackground,
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
    color: theme.textPrimary,
  },
});

export default ReportsScreen;
