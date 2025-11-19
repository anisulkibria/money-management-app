import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/theme';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import OnboardingScreen3 from '../screens/OnboardingScreen3';
import OnboardingScreen4 from '../screens/OnboardingScreen4';
import OnboardingScreen5 from '../screens/OnboardingScreen5';
import SupportScreen from '../screens/SupportScreen';
import AboutScreen from '../screens/AboutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddIncomeScreen from '../screens/AddIncomeScreen';
import AddBudgetScreen from '../screens/AddBudgetScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import BudgetManagementScreen from '../screens/BudgetManagementScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CurrencyScreen from '../screens/CurrencyScreen';
import BottomTabBar from '../components/BottomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main app tabs
const MainTabs = () => {
  return (
    <Tab.Navigator 
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Overview',
        }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{
          tabBarLabel: 'Transactions',
        }}
      />
      <Tab.Screen 
        name="Budgets" 
        component={BudgetManagementScreen}
        options={{
          tabBarLabel: 'Budgets',
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isDark, colors: themeColors } = useTheme();
  
  const screenOptions = {
    headerStyle: {
      backgroundColor: themeColors.background,
    },
    headerTintColor: themeColors.textPrimary,
    headerTitleStyle: {
      color: themeColors.textPrimary,
    },
  };

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
      />
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen}
      />
      <Stack.Screen 
        name="Onboarding1" 
        component={OnboardingScreen1}
      />
      <Stack.Screen 
        name="Onboarding2" 
        component={OnboardingScreen2}
      />
      <Stack.Screen 
        name="Onboarding3" 
        component={OnboardingScreen3}
      />
      <Stack.Screen 
        name="Onboarding4" 
        component={OnboardingScreen4}
      />
      <Stack.Screen 
        name="Onboarding5" 
        component={OnboardingScreen5}
      />
      <Stack.Screen 
        name="Main" 
        component={MainTabs}
      />
      <Stack.Screen 
        name="AddExpense" 
        component={AddExpenseScreen}
        options={{
          headerShown: true,
          title: 'Add Expense',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="AddIncome" 
        component={AddIncomeScreen}
        options={{
          headerShown: true,
          title: 'Add Income',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="AddBudget" 
        component={AddBudgetScreen}
        options={{
          headerShown: true,
          title: 'Add Budget',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="AddTransaction" 
        component={AddTransactionScreen}
        options={{
          headerShown: true,
          title: 'Add Transaction',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="Support" 
        component={SupportScreen}
        options={{
          headerShown: true,
          title: 'Support',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen}
        options={{
          headerShown: true,
          title: 'About',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{
          headerShown: true,
          title: 'Categories',
          ...screenOptions,
        }}
      />
      <Stack.Screen 
        name="Currency" 
        component={CurrencyScreen}
        options={{
          headerShown: true,
          title: 'Currency',
          ...screenOptions,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
