import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography } from '../constants';

const AddBudgetScreen = ({ navigation }) => {
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
  
  // Theme colors
  const themeColors = useMemo(() => ({
    background: isDark ? '#000000' : colors.backgroundLight,
    surface: isDark ? '#121212' : colors.surfaceLight,
    cardBackground: isDark ? '#1E1E1E' : colors.surfaceLight,
    textPrimary: isDark ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDark ? '#B3B3B3' : colors.textLightSecondary,
    border: isDark ? '#333333' : colors.borderLight,
    inputBackground: isDark ? '#1E1E1E' : '#FFFFFF',
    inputText: isDark ? '#FFFFFF' : colors.textLightPrimary,
    placeholderText: isDark ? '#888888' : '#999999',
    shadowColor: isDark ? '#000' : '#000',
    shadowOpacity: isDark ? 0.3 : 0.1,
  }), [isDark]);

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

  const styles = getStyles(themeColors);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Name */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: themeColors.textPrimary }]}>Budget Name</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.border,
                color: themeColors.inputText,
              }
            ]}
            placeholder="e.g., Groceries, Rent, etc."
            placeholderTextColor={themeColors.placeholderText}
            value={budgetName}
            onChangeText={setBudgetName}
          />
        </View>

        {/* Budget Amount */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: themeColors.textPrimary }]}>Budget Amount</Text>
          <View style={[
            styles.amountInputContainer, 
            { 
              backgroundColor: themeColors.inputBackground,
              borderColor: themeColors.border,
            }
          ]}>
            <Text style={[styles.currencySymbol, { color: themeColors.textSecondary }]}>$</Text>
            <TextInput
              style={[
                styles.input, 
                styles.amountInput,
                { color: themeColors.inputText }
              ]}
              placeholder="0.00"
              placeholderTextColor={themeColors.placeholderText}
              keyboardType="decimal-pad"
              value={budgetAmount}
              onChangeText={setBudgetAmount}
            />
          </View>
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: themeColors.textPrimary }]}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    { 
                      backgroundColor: themeColors.cardBackground,
                      borderColor: themeColors.border,
                    },
                    selectedCategory === category && [
                      styles.selectedCategoryChip,
                      { 
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      }
                    ]
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      { color: themeColors.textPrimary },
                      selectedCategory === category && [
                        styles.selectedCategoryText,
                        { color: '#FFFFFF' }
                      ]
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
          <Text style={[styles.label, { color: themeColors.textPrimary }]}>Budget Period</Text>
          <View style={styles.periodContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodChip,
                  { 
                    backgroundColor: themeColors.cardBackground,
                    borderColor: themeColors.border,
                  },
                  budgetPeriod === period.key && [
                    styles.selectedPeriodChip,
                    { backgroundColor: colors.primary }
                  ]
                ]}
                onPress={() => setBudgetPeriod(period.key)}
              >
                <Text 
                  style={[
                    styles.periodText,
                    { color: themeColors.textPrimary },
                    budgetPeriod === period.key && [
                      styles.selectedPeriodText,
                      { color: '#FFFFFF' }
                    ]
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
            <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Budget Details</Text>
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
      
      {/* Bottom Save Button */}
      <TouchableOpacity 
        style={styles.bottomSaveButton} 
        onPress={handleSaveBudget}
      >
        <Text style={styles.bottomSaveButtonText}>Save Budget</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    color: theme.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.inputBackground,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: typography.fontSize.base,
    color: theme.inputText,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
  },
  currencySymbol: {
    fontSize: typography.fontSize.base,
    color: theme.textSecondary,
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
    backgroundColor: theme.cardBackground,
    borderWidth: 1,
    borderColor: theme.border,
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
    color: theme.textPrimary,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  periodContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  periodChip: {
    backgroundColor: theme.cardBackground,
    borderWidth: 1,
    borderColor: theme.border,
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
    color: theme.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  selectedPeriodText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: theme.border,
  },
  summaryTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: theme.textPrimary,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: typography.fontSize.base,
    color: theme.textSecondary,
  },
  summaryValue: {
    fontSize: typography.fontSize.base,
    color: theme.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  bottomSaveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: theme.shadow,
    shadowOpacity: theme.shadowOpacity,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSaveButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
});

export default AddBudgetScreen;
