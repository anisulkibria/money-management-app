import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';

const AddIncomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Income</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={colors.textLightSecondary}
            keyboardType="decimal-pad"
          />
        </View>

        {/* Income Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income Source</Text>
          <View style={styles.sourceGrid}>
            {[
              { icon: '💼', name: 'Salary' },
              { icon: '🏪', name: 'Business' },
              { icon: '💰', name: 'Investment' },
              { icon: '🎁', name: 'Gift' },
              { icon: '💸', name: 'Freelance' },
              { icon: '📈', name: 'Other' },
            ].map((source, index) => (
              <TouchableOpacity key={index} style={styles.sourceItem}>
                <Text style={styles.sourceIcon}>{source.icon}</Text>
                <Text style={styles.sourceName}>{source.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Add a note..."
            placeholderTextColor={colors.textLightSecondary}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Text style={styles.dateText}>Today</Text>
            <Text style={styles.dateIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Income</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  currencySymbol: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.income,
    marginRight: 8,
  },
  amountInput: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
    minWidth: 150,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
    marginBottom: 16,
  },
  sourceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sourceItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
  },
  sourceIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  sourceName: {
    fontSize: typography.fontSize.sm,
    color: colors.textLightPrimary,
    textAlign: 'center',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    padding: 16,
    fontSize: typography.fontSize.base,
    color: colors.textLightPrimary,
    backgroundColor: colors.surfaceLight,
    height: 80,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surfaceLight,
  },
  dateText: {
    fontSize: typography.fontSize.base,
    color: colors.textLightPrimary,
  },
  dateIcon: {
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: colors.income,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  saveButtonText: {
    color: 'white',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
});

export default AddIncomeScreen;
