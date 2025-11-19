import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserIcon from './UserIcon';
import { colors, typography } from '../constants';
import { useTheme } from '../theme/theme';

const Header = ({ title, showUserIcon = false, leftComponent = null, rightComponent = null }) => {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.container(themeColors)}>
      {leftComponent && leftComponent}
      <Text style={styles.title(themeColors)}>{title}</Text>
      {rightComponent || (showUserIcon && <UserIcon showSettingsButton={true} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.background,
  }),
  title: (theme) => ({
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: theme.textPrimary,
    flex: 1,
    textAlign: 'center',
  }),
});

export default Header;
