import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const TransactionsScreen = () => {
  const navigation = useNavigation();
  
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
    <SafeAreaView style={styles.container}>
      <Header 
        title="Transactions" 
        showUserIcon={true}
        rightComponent={
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🔍</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Income</Text>
            <Text style={styles.incomeAmount}>+$3,000.00</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.expenseAmount}>-$131.30</Text>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>All Transactions</Text>
          {transactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={styles.transaction}
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
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.amountText,
                  transaction.type === 'income' ? styles.incomeText : styles.expenseText
                ]}>
                  {transaction.amount}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
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
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
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
    color: colors.textLightPrimary,
    marginBottom: 16,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
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
    color: colors.textLightPrimary,
  },
  transactionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
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
    color: colors.textLightSecondary,
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

export default TransactionsScreen;
