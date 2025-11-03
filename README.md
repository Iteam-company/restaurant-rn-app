# Restaurant Training App 📱

A React Native mobile application built with Expo for restaurant staff training and knowledge assessment. This app provides a comprehensive platform for waiters to learn about menu items, test their knowledge through quizzes, and track their progress, while allowing admins and owners to manage content and monitor performance.

## 🚀 Key Features

### For Waiters:

- **Interactive Quizzes**: Test knowledge about dishes, prices, and restaurant info
- **Progress Tracking**: Monitor quiz performance and learning progress
- **Timer-based Tests**: Timed quizzes for realistic training scenarios

### For Admins & Owners:

- **Content Management**: Create and manage quizzes and questions
- **User Management**: Oversee waiter accounts and permissions
- **Performance Analytics**: Track staff training progress and quiz results
- **Restaurant Management**: Full restaurant administration and settings

## 🛠️ Tech Stack

**Framework:** React Native with Expo  
**Language:** TypeScript  
**State Management:** Redux Toolkit + RTK Query  
**Navigation:** Expo Router (File-based routing)  
**UI Library:** React Native Paper  
**Form Handling:** Formik + Yup validation  
**Animations:** React Native Reanimated  
**Icons:** Expo Vector Icons  
**Storage:** Redux Persist + Expo Secure Store  
**File Handling:** Expo Document Picker, Image Picker

## 📁 Project Structure

```
app/                          # Expo Router file-based routing
├── auth/                     # Authentication screens
├── dashboard/                # Admin/Owner dashboard
├── restaurant/               # Restaurant-specific features
│   └── [id]/                # Dynamic restaurant routes
│       └── (quiz)/          # Quiz-related screens
│           ├── [quizId]/    # Individual quiz screens
│           └── (questions)/ # Question management
└── user-dashboard/          # Waiter dashboard

modules/                     # Feature-based modules
├── auth/                   # Authentication logic
│   └── redux/             # Auth API & state
├── common/                # Shared utilities
│   ├── components/        # Reusable components
│   ├── redux/            # Global store & APIs
│   └── types/            # TypeScript definitions
├── quiz/                  # Quiz system
└── restaurant/           # Restaurant management
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Studio (for emulators)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd restaurant-rn-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_API_URL=your_backend_api_url
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

### Running on Different Platforms

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Web Browser
npx expo start --web
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## 👥 User Roles

### Waiter

- Take quizzes and tests
- View personal progress
- Update profile information

### Admin & Owner

- Full restaurant management
- Create/delete restaurants
- Manage restaurant workers
- Create and edit quizzes
- View all quiz results
- Access analytics and reports
- User permission management

## 🎯 Core Features

### Quiz System

- **Multiple Choice Questions**: Support for single and multiple correct answers
- **Difficulty Levels**: Easy, Medium, Hard quiz categorization
- **Time Limits**: Configurable quiz time constraints
- **Progress Tracking**: Real-time progress monitoring
- **Results Analytics**: Detailed performance metrics

### Real-time Features

- Live quiz updates
- Instant result notifications
- Progress synchronization across devices

## 🔧 Development Features

### File-based Routing

This app uses Expo Router for navigation with file-based routing system:

- `app/` directory structure maps directly to app screens
- Dynamic routes: `[id].tsx` for parameterized routes
- Route groups: `(quiz)` for organizing related screens

### State Management

- **Redux Toolkit**: Centralized state management
- **RTK Query**: Efficient API data fetching and caching
- **Redux Persist**: Automatic state persistence

### Type Safety

- Full TypeScript implementation
- Strict type checking for API responses
- Shared type definitions across modules

### Form Handling

- **Formik**: Form state management
- **Yup**: Schema validation
- Custom form components with React Native Paper

## 🌐 API Integration

The app integrates with a NestJS backend API for:

### Endpoints Used:

- **Authentication**: `/auth/login`, `/auth/signup`, `/auth/me`
- **Restaurant Management**: `/restaurant/*`
- **Quiz System**: `/quiz/*`, `/quiz-results/*`
- **User Management**: `/user/*`

### API Features:

- JWT Authentication
- Automatic token refresh
- Request/Response caching with RTK Query
- Optimistic updates
- Error handling and retry logic

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

### Code Quality

- ESLint configuration for React Native
- TypeScript strict mode
- Consistent code formatting
- Component testing with Jest

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use React Native Paper components
- Implement proper error boundaries
- Write unit tests for new features
- Follow the established folder structure

## 📖 Additional Resources

- [Expo Documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides)
- [React Native Paper](https://reactnativepaper.com/): Material Design components for React Native
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview): Efficient data fetching and caching
- [Expo Router](https://expo.github.io/router/): File-based routing for Expo apps
- [React Native](https://reactnative.dev/): Learn about React Native development
- [TypeScript](https://www.typescriptlang.org/): TypeScript documentation and guides

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
