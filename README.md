# Money Management App

A React Native Expo application for tracking expenses and managing budgets.

## Features

- Welcome screen with onboarding
- User authentication (login/signup)
- Dashboard with overview of finances
- Add expenses and income
- Transaction history
- Budget management
- Reports and insights
- Settings and preferences

## Navigation Flow

1. Welcome Screen → Auth Screen → Main App
2. Main App includes bottom navigation with:
   - Overview (Dashboard)
   - Transactions
   - Budgets
   - Reports

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on device/simulator:
   ```bash
   npm run android    # Android
   npm run ios        # iOS
   npm run web        # Web
   ```

## Project Structure

```
src/
├── components/       # Reusable components
├── constants/        # Colors, typography, etc.
├── navigation/       # Navigation configuration
└── screens/          # App screens
```

## Dependencies

- Expo
- React Native
- React Navigation
- React Native Safe Area Context

## Notes

This is a static UI implementation. No data persistence or backend integration has been added yet.
