import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';
import Header from '../components/Header';

const AddBudgetScreen = ({ navigation }) => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetPeriod, setBudgetPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Savings',
    'Other'
  ];

  const periods = [
    { key: 'weekly', label: 'Weekly' },
    { key: 'biweekly', label: 'Bi-weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' }
  ];

  const handleSaveBudget = () => {
    if (!budgetName.trim()) {
      Alert.alert('Error', 'Please enter a budget name');
      return;
    }
    if (!budgetAmount.trim() || isNaN(parseFloat(budgetAmount))) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    // Here you would typically save to your backend/state management
    Alert.alert(
      'Budget Created',
      `Budget "${budgetName}" has been created successfully!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Add Budget" 
        showUserIcon={true}
        rightComponent={
          <TouchableOpacity onPress={handleSaveBudget}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget Name</Text>
          <TextInput
            style={styles.input}
            value={budgetName}
            onChangeText={setBudgetName}
            placeholder="e.g., Monthly Grocery Budget"
            placeholderTextColor={colors.textLightSecondary}
          />
        </View>

        {/* Budget Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={[styles.input, styles.amountInput]}
              value={budgetAmount}
              onChangeText={setBudgetAmount}
              placeholder="0.00"
              placeholderTextColor={colors.textLightSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.selectedCategoryChip
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.selectedCategoryText
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Budget Period */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget Period</Text>
          <View style={styles.periodContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodChip,
                  budgetPeriod === period.key && styles.selectedPeriodChip
                ]}
                onPress={() => setBudgetPeriod(period.key)}
              >
                <Text
                  style={[
                    styles.periodText,
                    budgetPeriod === period.key && styles.selectedPeriodText
                  ]}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary Card */}
        {(budgetName || budgetAmount || selectedCategory) && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Budget Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Name:</Text>
              <Text style={styles.summaryValue}>{budgetName || 'Not set'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount:</Text>
              <Text style={styles.summaryValue}>
                ${budgetAmount || '0.00'}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Category:</Text>
              <Text style={styles.summaryValue}>
                {selectedCategory || 'Not selected'}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Period:</Text>
              <Text style={styles.summaryValue}>
                {periods.find(p => p.key === budgetPeriod)?.label || 'Monthly'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  saveButton: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLightPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: typography.fontSize.base,
    color: colors.textLightPrimary,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
  },
  currencySymbol: {
    fontSize: typography.fontSize.base,
    color: colors.textLightSecondary,
    paddingHorizontal: 16,
  },
  amountInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedCategoryChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
  },
  selectedCategoryText: {
    color: 'white',
  },
  periodContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  periodChip: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  selectedPeriodChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  selectedPeriodText: {
    color: 'white',
  },
  summaryCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textLightSecondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.base,
    color: colors.textLightPrimary,
    fontWeight: typography.fontWeight.medium,
  },
});

export default AddBudgetScreen;
