import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserIcon from './UserIcon';
import { colors, typography } from '../constants';

const Header = ({ title, showUserIcon = false, leftComponent = null, rightComponent = null }) => {
  return (
    <View style={styles.container}>
      {leftComponent && leftComponent}
      <Text style={styles.title}>{title}</Text>
      {rightComponent && rightComponent}
      {showUserIcon && <UserIcon showSettingsButton={true} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.backgroundLight,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLightPrimary,
    flex: 1,
  },
});

export default Header;
