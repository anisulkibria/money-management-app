import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../constants';

const UserIcon = ({ showSettingsButton = false }) => {
  const navigation = useNavigation();

  const handleUserIconPress = () => {
    if (showSettingsButton) {
      navigation.navigate('Settings');
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handleUserIconPress}
      disabled={!showSettingsButton}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>JD</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  avatarText: {
    color: 'white',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
});

export default UserIcon;
