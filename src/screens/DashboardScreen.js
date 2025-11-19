import React, { useMemo, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);
  const isDarkMode = darkMode || systemColorScheme === 'dark';

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

  // Listen for focus to update theme when returning from settings
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (error) {
        console.error('Error loading dark mode preference:', error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const themeColors = useMemo(() => ({
    background: isDarkMode ? '#000000' : colors.backgroundLight,
    surface: isDarkMode ? '#121212' : colors.surfaceLight,
    textPrimary: isDarkMode ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDarkMode ? '#A0A0A0' : colors.textLightSecondary,
    border: isDarkMode ? '#333333' : colors.borderLight,
    cardBackground: isDarkMode ? '#1E1E1E' : colors.surfaceLight,
    progressBackground: isDarkMode ? '#333333' : '#E5E7EB',
  }), [isDarkMode]);
  
  const styles = getStyles(themeColors);
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <Header title="Dashboard" showUserIcon={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View>
              <Text style={styles.balanceLabel}>Your available balance</Text>
              <Text style={styles.balanceAmount}>$1,450.75</Text>
            </View>
            <View style={styles.balanceDetails}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceItemLabel}>Income</Text>
                <Text style={styles.incomeAmount}>$3,200.00</Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceItemLabel}>Expenses</Text>
                <Text style={styles.expenseAmount}>$1,749.25</Text>
              </View>
            </View>
          </View>

          {/* Monthly Budget */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Monthly Budget</Text>
            </View>
            <View style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetLabel}>Spent</Text>
                <Text style={styles.budgetAmount}>
                  $1,250 <Text style={styles.budgetTotal}>/ $2,000</Text>
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '62.5%' }]} />
              </View>
              <Text style={styles.budgetRemaining}>$750 left</Text>
            </View>
          </View>

          {/* Spending Categories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Spending</Text>
              <TouchableOpacity style={styles.periodButton}>
                <Text style={styles.periodText}>This Month</Text>
                <Text style={styles.expandIcon}>▼</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chartCard}>
              <View style={styles.chartContainer}>
                <Image 
                  source={require('../../assets/donut-chart.png')}
                  style={styles.chart}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.transactions}>
              {/* Transaction Item 1 */}
              <View style={styles.transaction}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.iconText}>🛒</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Groceries</Text>
                  <Text style={styles.transactionSubtitle}>Corner Store</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.expenseText}>-$45.50</Text>
                  <Text style={styles.transactionDate}>Today</Text>
                </View>
              </View>

              {/* Transaction Item 2 */}
              <View style={styles.transaction}>
                <View style={[styles.transactionIcon, styles.incomeIcon]}>
                  <Text style={styles.iconText}>💵</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Salary</Text>
                  <Text style={styles.transactionSubtitle}>ACME Corp.</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.incomeText}>+$2,500.00</Text>
                  <Text style={styles.transactionDate}>Yesterday</Text>
                </View>
              </View>

              {/* Transaction Item 3 */}
              <View style={styles.transaction}>
                <View style={[styles.transactionIcon, styles.expenseIcon]}>
                  <Text style={styles.iconText}>🧾</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>Utilities</Text>
                  <Text style={styles.transactionSubtitle}>Internet Bill</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.expenseText}>-$60.00</Text>
                  <Text style={styles.transactionDate}>Oct 28</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Space for bottom nav
  },
  balanceCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: theme.textPrimary,
    letterSpacing: -0.5,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
  balanceItem: {
    flex: 1,
  },
  balanceItemLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  incomeAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.income,
  },
  expenseAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.expense,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: theme.textPrimary,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginRight: 4,
  },
  expandIcon: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  budgetCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: theme.textSecondary,
  },
  budgetAmount: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: theme.textPrimary,
  },
  budgetTotal: {
    color: theme.textSecondary,
  },
  progressBar: {
    height: 12,
    backgroundColor: theme.progressBackground,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  budgetRemaining: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: theme.textSecondary,
    textAlign: 'right',
    marginTop: 8,
  },
  chartCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartContainer: {
    aspectRatio: 1,
    width: '100%',
  },
  chart: {
    width: '100%',
    height: '100%',
  },
  transactions: {
    gap: 8,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeIcon: {
    backgroundColor: `${colors.income}20`,
  },
  expenseIcon: {
    backgroundColor: `${colors.expense}20`,
  },
  iconText: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: theme.textPrimary,
  },
  transactionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: theme.textSecondary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  incomeText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.income,
  },
  expenseText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.expense,
  },
  transactionDate: {
    fontSize: typography.fontSize.sm,
    color: theme.textSecondary,
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

export default DashboardScreen;
