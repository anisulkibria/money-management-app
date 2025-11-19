import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, typography } from '../constants';

const EditBudgetScreen = ({ navigation }) => {
  const route = useRoute();
  const { budgetId } = route.params || {};
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);
  const isDark = darkMode || systemColorScheme === 'dark';
  
  // Form state
  const [category, setCategory] = useState('');
  const [budgetedAmount, setBudgetedAmount] = useState('');
  const [period, setPeriod] = useState('monthly');
  
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

  // Load budget data if editing
  useEffect(() => {
    if (budgetId) {
      // In a real app, you would load the budget data from storage/API
      // For now, we'll use mock data
      const mockBudget = {
        category: 'Groceries',
        budgetedAmount: '500.00',
        period: 'monthly'
      };
      setCategory(mockBudget.category);
      setBudgetedAmount(mockBudget.budgetedAmount);
      setPeriod(mockBudget.period);
    }
  }, [budgetId]);

  // Theme colors
  const themeColors = {
    background: isDark ? '#000000' : colors.backgroundLight,
    surface: isDark ? '#121212' : colors.surfaceLight,
    cardBackground: isDark ? '#1E1E1E' : colors.surfaceLight,
    textPrimary: isDark ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDark ? '#B3B3B3' : colors.textLightSecondary,
    border: isDark ? '#333333' : colors.borderLight,
    inputBackground: isDark ? '#2A2A2A' : '#FFFFFF',
  };

  const styles = getStyles(themeColors);

  const handleSave = () => {
    if (!category.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }
    
    if (!budgetedAmount.trim() || parseFloat(budgetedAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }

    // In a real app, you would save the budget to storage/API
    Alert.alert(
      'Success',
      'Budget updated successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Budget',
      'Are you sure you want to delete this budget?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, you would delete the budget from storage/API
            Alert.alert(
              'Success',
              'Budget deleted successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack()
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Category Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: themeColors.textPrimary }]}>Category</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }]}
              placeholder="Enter category name"
              placeholderTextColor={themeColors.textSecondary}
              value={category}
              onChangeText={setCategory}
            />
          </View>

          {/* Budget Amount Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: themeColors.textPrimary }]}>Budget Amount</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: themeColors.inputBackground,
                borderColor: themeColors.border,
                color: themeColors.textPrimary
              }]}
              placeholder="Enter budget amount"
              placeholderTextColor={themeColors.textSecondary}
              value={budgetedAmount}
              onChangeText={setBudgetedAmount}
              keyboardType="numeric"
            />
          </View>

          {/* Period Selection */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: themeColors.textPrimary }]}>Period</Text>
            <View style={styles.periodOptions}>
              {['weekly', 'monthly', 'yearly'].map((periodOption) => (
                <TouchableOpacity
                  key={periodOption}
                  style={[
                    styles.periodOption,
                    {
                      backgroundColor: period === periodOption ? colors.primary : themeColors.inputBackground,
                      borderColor: themeColors.border
                    }
                  ]}
                  onPress={() => setPeriod(periodOption)}
                >
                  <Text style={[
                    styles.periodOptionText,
                    {
                      color: period === periodOption ? '#FFFFFF' : themeColors.textPrimary
                    }
                  ]}>
                    {periodOption.charAt(0).toUpperCase() + periodOption.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton, { backgroundColor: colors.expense }]}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Delete Budget</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: theme.textPrimary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: typography.fontSize.base,
    backgroundColor: theme.inputBackground,
  },
  periodOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  periodOption: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
  },
  periodOptionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  buttonGroup: {
    gap: 16,
    marginTop: 24,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
});

export default EditBudgetScreen;
