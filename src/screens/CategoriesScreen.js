import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/theme';
import { typography, colors } from '../constants';

const CategoriesScreen = ({ navigation }) => {
  const theme = useTheme();
  const { isDark, colors: themeColors } = theme;
  const [categories, setCategories] = useState([
    { id: 1, name: 'Groceries', icon: '🛒', color: '#FF6B6B', type: 'expense' },
    { id: 2, name: 'Transport', icon: '🚗', color: '#4ECDC4', type: 'expense' },
    { id: 3, name: 'Bills', icon: '🧾', color: '#45B7D1', type: 'expense' },
    { id: 4, name: 'Entertainment', icon: '🎮', color: '#96CEB4', type: 'expense' },
    { id: 5, name: 'Food', icon: '🍔', color: '#FFEAA7', type: 'expense' },
    { id: 6, name: 'Healthcare', icon: '🏥', color: '#DDA0DD', type: 'expense' },
    { id: 7, name: 'Shopping', icon: '🛍️', color: '#98D8C8', type: 'expense' },
    { id: 8, name: 'Education', icon: '📚', color: '#F7DC6F', type: 'expense' },
    { id: 9, name: 'Salary', icon: '💰', color: '#4CAF50', type: 'income' },
    { id: 10, name: 'Freelance', icon: '💻', color: '#2196F3', type: 'income' },
    { id: 11, name: 'Investment', icon: '📈', color: '#FF9800', type: 'income' },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '📦',
    color: '#6366F1',
    type: 'expense'
  });

  const icons = ['🛒', '🚗', '🧾', '🎮', '🍔', '🏥', '🛍️', '📚', '💰', '💻', '📈', '🏠', '✈️', '🎯', '🎨', '🏃', '🍕', '☕', '🎬', '🎵', '🍷', '🍳', '🚿', '🧴', '💊', '🦷', '👕', '👟', '🎁', '🌱', '🚇', '🚌', '⛽', '🏋️', '🧘', '📱', '💡', '🔧', '🔑', '📄', '📝', '🗂️', '📌', '📎', '🖊️', '📐', '🔬', '🔭', '🎪', '🎭', '🖼️', '🎲', '🎸', '🎹', '🥁', '🎺', '🎷', '🎻', '🎤', '🎧', '📻', '📺', '📷', '📸', '🎥', '📼', '💾', '💿', '📀', '🖥️', '⌨️', '🖱️', '🖨️', '📠', '📞', '⌚', '🔋', '🔌', '🔦', '🕯️', '🪔', '🧯', '🛢️', '', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💎', '💍', '👑'];
  const iconColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#4CAF50', '#2196F3', '#FF9800', '#6366F1'];

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', icon: '📦', color: '#6366F1', type: 'expense' });
    setModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color,
      type: category.type
    });
    setModalVisible(true);
  };

  const handleSaveCategory = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...formData
      };
      setCategories([...categories, newCategory]);
    }

    setModalVisible(false);
  };

  const handleDeleteCategory = (category) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCategories(categories.filter(cat => cat.id !== category.id));
          }
        }
      ]
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
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    categoryCard: {
      width: '48%',
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      padding: 12,
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: themeColors.shadowOpacity,
      shadowRadius: 2,
      elevation: 2,
      position: 'relative',
    },
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    categoryIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    categoryIconText: {
      fontSize: 16,
    },
    categoryTextContainer: {
      flex: 1,
    },
    categoryName: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      color: themeColors.textPrimary,
      marginBottom: 2,
    },
    categoryType: {
      marginBottom: 6,
    },
    typeText: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
    },
    deleteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.expense,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: typography.fontWeight.bold,
    },
    fab: {
      position: 'absolute',
      bottom: 96,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: themeColors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: themeColors.shadowOpacity,
      shadowRadius: 4,
      elevation: 4,
    },
    fabText: {
      fontSize: 24,
      color: 'white',
      fontWeight: typography.fontWeight.bold,
    },
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: themeColors.surface,
      borderRadius: 16,
      padding: 16,
      width: '90%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: themeColors.textPrimary,
      marginBottom: 16,
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: themeColors.textPrimary,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: typography.fontSize.sm,
      color: themeColors.textPrimary,
      backgroundColor: themeColors.background,
    },
    typeSelector: {
      flexDirection: 'row',
      backgroundColor: themeColors.border,
      borderRadius: 8,
      padding: 4,
    },
    typeOption: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 6,
    },
    typeOptionActive: {
      backgroundColor: themeColors.surface,
    },
    typeOptionText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: themeColors.textSecondary,
    },
    typeOptionTextActive: {
      color: themeColors.textPrimary,
    },
    iconSelector: {
      flexDirection: 'row',
      gap: 6,
    },
    iconOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: themeColors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconOptionActive: {
      backgroundColor: colors.primary,
    },
    iconOptionText: {
      fontSize: 16,
    },
    colorSelector: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    colorOption: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorOptionActive: {
      borderWidth: 2,
      borderColor: themeColors.textPrimary,
    },
    colorOptionCheck: {
      color: 'white',
      fontSize: 12,
      fontWeight: typography.fontWeight.bold,
    },
    modalActions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 16,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: themeColors.border,
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: themeColors.textPrimary,
    },
    saveButton: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.primary,
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      color: 'white',
    },
  });

  const styles = getStyles(themeColors);

  return (
    <View
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
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
              onPress={() => handleEditCategory(category)}
            >
              <View style={styles.categoryContent}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <View style={styles.categoryTextContainer}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={[styles.typeText, { 
                    color: category.type === 'income' ? colors.income : colors.expense 
                  }]}>
                    {category.type === 'income' ? 'Income' : 'Expense'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteCategory(category)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleAddCategory}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Add/Edit Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter category name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeOption,
                    formData.type === 'expense' && styles.typeOptionActive
                  ]}
                  onPress={() => setFormData({ ...formData, type: 'expense' })}
                >
                  <Text style={[
                    styles.typeOptionText,
                    formData.type === 'expense' && styles.typeOptionTextActive
                  ]}>
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeOption,
                    formData.type === 'income' && styles.typeOptionActive
                  ]}
                  onPress={() => setFormData({ ...formData, type: 'income' })}
                >
                  <Text style={[
                    styles.typeOptionText,
                    formData.type === 'income' && styles.typeOptionTextActive
                  ]}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Icon</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.iconSelector}>
                  {icons.map((icon, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.iconOption,
                        formData.icon === icon && styles.iconOptionActive
                      ]}
                      onPress={() => setFormData({ ...formData, icon })}
                    >
                      <Text style={styles.iconOptionText}>{icon}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Color</Text>
              <View style={styles.colorSelector}>
                {iconColors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      formData.color === color && styles.colorOptionActive
                    ]}
                    onPress={() => setFormData({ ...formData, color })}
                  >
                    {formData.color === color && (
                      <Text style={styles.colorOptionCheck}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveCategory}
              >
                <Text style={styles.saveButtonText}>
                  {editingCategory ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoriesScreen;
