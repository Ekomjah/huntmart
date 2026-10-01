# Hunt Mart 🛒

A modern, feature-rich e-commerce web application built with React, Vite, and Firebase. Hunt Mart provides a seamless shopping experience with advanced search capabilities, product recommendations, and secure checkout functionality.

## Features

- **Product Discovery**
  - Intelligent search powered by Algolia
  - Category-based navigation and browsing
  - Product carousel for featured items
  - Detailed product information with reviews and ratings

- **Shopping Cart**
  - Add/remove items with ease
  - Real-time cart updates
  - Persistent cart state management using Zustand

- **User Experience**
  - Responsive design with TailwindCSS
  - Material UI components for polish
  - Toast notifications with Sonner
  - Barcode scanning support

- **Backend Integration**
  - Firebase authentication and database
  - Real-time product data fetching
  - Review and rating system
  - Secure checkout process

- **Performance**
  - Built with Vite for fast development and production builds
  - React Query for efficient data fetching and caching
  - Optimized image loading with AVIF format support

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Material UI** - Component library
- **Zustand** - State management

### Search & Data

- **Algolia** - Product search
- **React InstantSearch** - Algolia integration
- **Axios** - HTTP client
- **React Query** - Data fetching and caching

### Database & Auth

- **Firebase** - Backend, authentication, and database

### Additional Libraries

- **JSBarcode** - Barcode generation
- **Swiper** - Carousel/slider component
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Emotion** - CSS-in-JS styling

### Development

- **ESLint** - Code linting
- **Husky** - Git hooks
- **CommitLint** - Commit message linting
- **Vitest** - Unit testing
- **React Testing Library** - Component testing

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/pnpm

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hunt-basket
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

   Then fill in `.env.local`. This is the step the app cannot start
   without: `initializeApp` throws if its config is incomplete, which
   breaks the `/shop` route entirely.

   Required:

   ```
   VITE_FIREBASE_API_KEY=<your-key>
   VITE_FIREBASE_AUTH_DOMAIN=e-commerce-app-hunt.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://e-commerce-app-hunt-default-rtdb.firebaseio.com
   ```

   Needed only if Firebase Analytics is enabled:

   ```
   VITE_MESSAGING_SENDER_ID=
   VITE_MEASUREMENT_ID=
   VITE_APP_ID=
   ```

   Algolia is **not** required to boot. The search-only credentials are
   currently hardcoded in
   [src/features/searchWithAlgolia/algoliaSearch.jsx](src/features/searchWithAlgolia/algoliaSearch.jsx),
   so `/shop/search` works without any env file. To point it at your own
   index, move those literals to `VITE_ALGOLIA_APP_ID` and
   `VITE_ALGOLIA_SEARCH_KEY` and read them via `import.meta.env`.

   Everything prefixed `VITE_` is inlined into the client bundle. None of
   these are secret. Secure your data with Firebase Security Rules rather
   than by withholding these values.

4. **Firebase project**
   - Enable **Realtime Database** (not Firestore) for project
     `e-commerce-app-hunt`. Products are read from the `products` node.
   - Single-product reads go to the public REST endpoint configured in
     [src/services/firebase/client.js](src/services/firebase/client.js).

5. **Algolia**
   - Create an index named `products`. The search route hardcodes this
     name at `algoliaSearch.jsx:48`.

## 🚀 Development

### Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Run Tests

```bash
pnpm test
```

### Lint Code

```bash
pnpm lint
```

## 📁 Project Structure

```
hunt-basket/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AppBar/       # Navigation header
│   │   ├── bar-code/     # Barcode scanner
│   │   ├── carousel/     # Image carousel
│   │   ├── error/        # Error boundary
│   │   ├── footer/       # Footer component
│   │   └── ratings/      # Rating display
│   ├── features/         # Feature-specific modules
│   │   ├── cart/         # Shopping cart
│   │   ├── checkout-page/# Checkout process
│   │   ├── firebase-fetch/# Firebase data loading
│   │   ├── hunt-categories/# Category browse
│   │   ├── searchWithAlgolia/# Search functionality
│   │   └── category-carousel/# Category display
│   ├── hooks/            # Custom React hooks
│   │   ├── useFetch.js   # Data fetching
│   │   └── useItem.js    # Item management
│   ├── services/         # External service integrations
│   │   └── firebase/     # Firebase configuration
│   ├── stores/           # Zustand state stores
│   │   └── useCartStore.js# Cart state
│   ├── utils/            # Utility functions
│   ├── routes/           # Route definitions
│   ├── Layout/           # Layout components
│   ├── Landing/          # Landing page
│   ├── assets/           # Static assets (images, etc.)
│   ├── app/              # App component & styles
│   ├── api/              # API data files
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── public/               # Static public files
├── tests/                # Test setup
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
├── eslint.config.js      # ESLint configuration
├── commitlint.config.js  # Commit lint configuration
└── package.json          # Dependencies and scripts
```

## 🎯 Key Features Explained

### Shopping Cart (Zustand)

The cart state is managed globally using Zustand, allowing any component to access and modify the cart without prop drilling. See [src/stores/useCartStore.js](src/stores/useCartStore.js).

### Product Search (Algolia)

Advanced search capabilities are powered by Algolia. Users can search products in real-time with faceted filtering. Implementation is in [src/features/searchWithAlgolia/](src/features/searchWithAlgolia/).

### Data Fetching (React Query & Firebase)

Product data is fetched from Firebase and cached efficiently using React Query. Custom hooks in [src/hooks/](src/hooks/) handle the fetching logic.

### Responsive Design

TailwindCSS and Material UI components ensure the application is responsive across all devices. Custom CSS modules are used for component-specific styling.

## 🔐 Security

- Firebase handles authentication and data security
- Environment variables protect sensitive credentials
- Input validation on forms prevents XSS attacks
- Secure checkout process integrates with payment systems

## 📝 Code Quality

- **ESLint** ensures code consistency and catches potential errors
- **Husky** and **CommitLint** enforce conventional commits
- **Vitest** and **React Testing Library** provide comprehensive testing
- Pre-commit hooks prevent bad code from being committed

## 🚢 Deployment

This project can be deployed to:

- **Vercel** - Recommended for optimal Vite support
- **Netlify** - Great alternative with easy Firebase integration
- **GitHub Pages** - For static hosting
- **Firebase Hosting** - Integrated with Firebase backend

Example Vercel deployment:

```bash
pnpm build
vercel deploy
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes and ensure tests pass: `pnpm test`
3. Lint your code: `pnpm lint`
4. Commit with conventional messages: `git commit -m "feat: add amazing feature"`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Happy Shopping! 🎉**
