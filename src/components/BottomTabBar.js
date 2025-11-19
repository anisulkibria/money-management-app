import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { useTheme } from '../theme/theme';

const BottomTabBar = ({ state, descriptors, navigation }) => {
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
  const themeColors = {
    background: isDarkMode ? '#000000' : colors.backgroundLight,
    surface: isDarkMode ? '#121212' : colors.surfaceLight,
    textPrimary: isDarkMode ? '#FFFFFF' : colors.textLightPrimary,
    textSecondary: isDarkMode ? '#A0A0A0' : colors.textLightSecondary,
    border: isDarkMode ? '#333333' : colors.borderLight,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.surface }]} edges={['bottom']}>
      <View style={[styles.tabBar, { backgroundColor: themeColors.surface, borderTopColor: themeColors.border }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const getIcon = (routeName) => {
            switch (routeName) {
              case 'Dashboard':
                return '🏠';
              case 'Transactions':
                return '💳';
              case 'Budgets':
                return '📊';
              case 'Reports':
                return '📈';
              default:
                return '�';
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tab,
                isFocused && styles.tabFocused,
                isFocused && { backgroundColor: isDarkMode ? '#2A2A2A' : '#F0F0F0' }
              ]}
            >
              <View style={styles.tabContent}>
                <Text style={[
                  styles.tabIcon, 
                  isFocused ? styles.activeIcon : { color: isDarkMode ? '#FFFFFF' : colors.textLightSecondary }
                ]}>
                  {getIcon(route.name)}
                </Text>
                <Text style={[
                  styles.tabLabel, 
                  isFocused ? styles.activeLabel : { color: isDarkMode ? '#FFFFFF' : colors.textLightSecondary }
                ]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // Border removed from container since tabBar already has the proper border
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 4,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  tabFocused: {
    paddingVertical: 8,
    paddingInline: 6,
  },
  tabContent: {
    alignItems: 'center',
    gap: 4,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeIcon: {
    color: colors.primary,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: typography.fontWeight.medium,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});

export default BottomTabBar;
