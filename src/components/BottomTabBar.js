import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../constants';

const BottomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.tabBar}>
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
                return '📊';
              case 'Transactions':
                return '⇄';
              case 'Budgets':
                return '🥧';
              case 'Reports':
                return '📈';
              default:
                return '📄';
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
              style={styles.tab}
            >
              <View style={styles.tabContent}>
                <Text style={[styles.icon, isFocused && styles.activeIcon]}>
                  {getIcon(route.name)}
                </Text>
                <Text style={[styles.label, isFocused && styles.activeLabel]}>
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
    backgroundColor: colors.surfaceLight,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: `${colors.surfaceLight}CC`,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 24,
    color: colors.textLightSecondary,
  },
  activeIcon: {
    color: colors.primary,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLightSecondary,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});

export default BottomTabBar;
