import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const TransactionsScreen = () => {
  const navigation = useNavigation();
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
  
  const transactions = [
    { 
      id: 1,
      title: 'Groceries', 
      subtitle: 'Corner Store', 
      amount: '-$45.50', 
      date: 'Today',
      type: 'expense',
      icon: '🛒'
    },
    { 
      id: 2,
      title: 'Salary', 
      subtitle: 'ACME Corp.', 
      amount: '+$2,500.00', 
      date: 'Yesterday',
      type: 'income',
      icon: '💵'
    },
    { 
      id: 3,
      title: 'Utilities', 
      subtitle: 'Internet Bill', 
      amount: '-$60.00', 
      date: 'Oct 28',
      type: 'expense',
      icon: '🧾'
    },
    { 
      id: 4,
      title: 'Restaurant', 
      subtitle: 'Pizza Place', 
      amount: '-$25.80', 
      date: 'Oct 27',
      type: 'expense',
      icon: '🍕'
    },
    { 
      id: 5,
      title: 'Freelance', 
      subtitle: 'Web Design', 
      amount: '+$500.00', 
      date: 'Oct 26',
      type: 'income',
      icon: '💻'
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top', 'right', 'left']}>
      <Header 
        title="Transactions" 
        showUserIcon={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={[styles.summaryCard, { 
            backgroundColor: themeColors.cardBackground,
            shadowColor: themeColors.shadow,
            shadowOpacity: themeColors.shadowOpacity,
          }]}>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Income</Text>
            <Text style={styles.incomeAmount}>+$3,000.00</Text>
          </View>
          <View style={[styles.summaryCard, { 
            backgroundColor: themeColors.cardBackground,
            shadowColor: themeColors.shadow,
            shadowOpacity: themeColors.shadowOpacity,
          }]}>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>Total Expenses</Text>
            <Text style={styles.expenseAmount}>-$131.30</Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>All Transactions</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={[styles.transaction, { 
                backgroundColor: themeColors.cardBackground,
                shadowColor: themeColors.shadow,
                shadowOpacity: themeColors.shadowOpacity,
              }]}
              onPress={() => {
                // Navigate to transaction details (placeholder)
                console.log('Transaction pressed:', transaction.title);
              }}
            >
              <View style={[
                styles.transactionIcon, 
                transaction.type === 'income' ? styles.incomeIcon : styles.expenseIcon
              ]}>
                <Text style={styles.iconText}>{transaction.icon}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={[styles.transactionTitle, { color: themeColors.textPrimary }]}>{transaction.title}</Text>
                <Text style={[styles.transactionSubtitle, { color: themeColors.textSecondary }]}>{transaction.subtitle}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.amountText,
                  transaction.type === 'income' ? styles.incomeText : styles.expenseText
                ]}>
                  {transaction.amount}
                </Text>
                <Text style={[styles.transactionDate, { color: themeColors.textSecondary }]}>{transaction.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  summarySection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: theme.shadow,
    shadowOpacity: theme.shadowOpacity,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
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
  transactionsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: theme.textPrimary,
    marginBottom: 16,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: theme.shadow,
    shadowOpacity: theme.shadowOpacity,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}${theme.background === '#000000' ? '33' : '20'}`,
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
  },
  transactionSubtitle: {
    fontSize: typography.fontSize.sm,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  incomeText: {
    color: colors.income,
  },
  expenseText: {
    color: colors.expense,
  },
  transactionDate: {
    fontSize: typography.fontSize.sm,
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
    shadowColor: theme.shadow,
    shadowOpacity: theme.shadowOpacity,
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

export default TransactionsScreen;
