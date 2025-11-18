import { colors } from '../constants';

export const getThemeColors = (isDark) => ({
  // Background colors
  background: isDark ? '#000000' : colors.backgroundLight,
  surface: isDark ? '#121212' : colors.surfaceLight,
  cardBackground: isDark ? '#1E1E1E' : colors.surfaceLight,
  
  // Text colors
  textPrimary: isDark ? '#FFFFFF' : colors.textLightPrimary,
  textSecondary: isDark ? '#B3B3B3' : colors.textLightSecondary,
  
  // UI Elements
  border: isDark ? '#333333' : colors.borderLight,
  shadow: isDark ? '#000' : '#000',
  shadowOpacity: isDark ? 0.3 : 0.1,
  progressBackground: isDark ? '#333333' : '#E5E7EB',
  inputBackground: isDark ? '#1E1E1E' : '#FFFFFF',
  inputText: isDark ? '#FFFFFF' : colors.textLightPrimary,
  placeholderText: isDark ? '#888888' : '#999999',
  
  // Status colors
  income: colors.income,
  expense: colors.expense,
  warning: '#f59e0b',
  success: colors.income,
  error: colors.expense,
});

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);
  const isDark = darkMode || systemColorScheme === 'dark';

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

  return {
    isDark,
    colors: getThemeColors(isDark),
    toggleDarkMode: async (value) => {
      try {
        await AsyncStorage.setItem('darkMode', JSON.stringify(value));
        setDarkMode(value);
      } catch (error) {
        console.error('Error saving dark mode preference:', error);
      }
    }
  };
};
