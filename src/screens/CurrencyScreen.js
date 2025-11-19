import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Alert, StatusBar, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/theme';
import { typography, colors } from '../constants';

const CurrencyScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { isDark, colors: themeColors } = theme;
  const [selectedCurrency, setSelectedCurrency] = useState(route.params?.currentCurrency || 'USD');
  const [searchQuery, setSearchQuery] = useState('');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States' },
    { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union' },
    { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', country: 'Switzerland' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia' },
    { code: 'PLN', symbol: 'zł', name: 'Polish Złoty', country: 'Poland' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines' },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam' },
    { code: 'EGP', symbol: '£', name: 'Egyptian Pound', country: 'Egypt' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya' },
    { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', country: 'Ghana' },
    { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', country: 'Israel' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'United Arab Emirates' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', country: 'Saudi Arabia' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan' },
    { code: 'LKR', symbol: 'රු', name: 'Sri Lankan Rupee', country: 'Sri Lanka' },
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh' },
    { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee', country: 'Nepal' },
    { code: 'CLP', symbol: '$', name: 'Chilean Peso', country: 'Chile' },
    { code: 'COP', symbol: '$', name: 'Colombian Peso', country: 'Colombia' },
    { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', country: 'Peru' },
    { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', country: 'Uruguay' },
    { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar', country: 'Taiwan' },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', country: 'Czech Republic' },
    { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', country: 'Hungary' },
    { code: 'RON', symbol: 'lei', name: 'Romanian Leu', country: 'Romania' },
    { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', country: 'Bulgaria' },
    { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', country: 'Croatia' },
    { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', country: 'Iceland' },
  ];

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
  };

  const handleSave = () => {
    Alert.alert(
      'Currency Updated',
      `Currency changed to ${selectedCurrency}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const renderCurrencyItem = (currency) => {
    const isSelected = selectedCurrency === currency.code;
    const styles = getStyles(themeColors);
    
    return (
      <TouchableOpacity
        key={currency.code}
        style={[styles.currencyItem, isSelected && styles.currencyItemSelected]}
        onPress={() => handleCurrencySelect(currency)}
      >
        <View style={styles.currencyLeft}>
          <View style={styles.currencySymbol}>
            <Text style={styles.currencySymbolText}>{currency.symbol}</Text>
          </View>
          <View style={styles.currencyInfo}>
            <Text style={styles.currencyCode}>{currency.code}</Text>
            <Text style={styles.currencyName}>{currency.name}</Text>
          </View>
        </View>
        <View style={styles.currencyRight}>
          {isSelected && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const getStyles = (themeColors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    headerSection: {
      marginBottom: 24,
    },
    searchContainer: {
      marginBottom: 20,
    },
    searchInput: {
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      padding: 16,
      fontSize: typography.fontSize.base,
      color: themeColors.textPrimary,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    headerTitle: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.bold,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: typography.fontSize.base,
      color: themeColors.textSecondary,
      lineHeight: 20,
    },
    currenciesList: {
      marginBottom: 24,
    },
    currencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: themeColors.shadowOpacity,
      shadowRadius: 2,
      elevation: 1,
    },
    currencyItemSelected: {
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}10`,
    },
    currencyLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    currencySymbol: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: themeColors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    currencySymbolText: {
      fontSize: 20,
      fontWeight: typography.fontWeight.bold,
      color: themeColors.textPrimary,
    },
    currencyInfo: {
      flex: 1,
    },
    currencyCode: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: themeColors.textPrimary,
      marginBottom: 2,
    },
    currencyName: {
      fontSize: typography.fontSize.base,
      color: themeColors.textPrimary,
      marginBottom: 2,
    },
    currencyCountry: {
      fontSize: typography.fontSize.sm,
      color: themeColors.textSecondary,
    },
    currencyRight: {
      alignItems: 'center',
    },
    checkmark: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmarkText: {
      color: 'white',
      fontSize: 14,
      fontWeight: typography.fontWeight.bold,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 24,
    },
    saveButtonText: {
      color: 'white',
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
  });

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: themeColors.background,
      }}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
        translucent={false}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Select Currency</Text>
          <Text style={styles.headerSubtitle}>
            Choose your preferred currency for transactions and reports
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search currency..."
            placeholderTextColor={themeColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.currenciesList}>
          {filteredCurrencies.map(renderCurrencyItem)}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Currency</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrencyScreen;
