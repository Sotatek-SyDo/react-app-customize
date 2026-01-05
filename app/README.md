# React Base White-Label Application

A scalable white-label React application built with Vite, TypeScript, and Ant Design. This architecture allows you to build multiple client-specific applications from a single codebase with build-time customization.

## 🏗️ Architecture Overview

This project uses a **white-label architecture** where:
- **Base application** (`app/`) contains the core functionality and shared components
- **Client customizations** (`customize/`) contain client-specific overrides and branding
- **Build-time injection** uses Vite aliases to inject client-specific code at build time
- **Zero client exposure** - only the selected client's code is bundled, ensuring security

### Project Structure

```
base-react-v2/
├── app/                          # Base application
│   ├── src/                      # Core source code
│   │   ├── components/           # Shared components
│   │   ├── pages/                # Base pages
│   │   ├── router/               # Routing configuration
│   │   └── ...
│   ├── tsconfig.json             # App-specific TypeScript config
│   └── tailwind.config.js        # Tailwind configuration
├── customize/                    # Client customizations
│   ├── default/                  # Default/fallback client
│   ├── hitowa/                   # Hitowa client
│   │   ├── src/
│   │   │   ├── components/       # Custom components
│   │   │   └── pages/            # Custom pages
│   │   └── index.ts              # Client entry point
│   └── medix/                    # Medix client
├── scripts/                      # Build and dev scripts
│   ├── dev.mjs                   # Development script
│   └── build.mjs                 # Production build script
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # Root TypeScript config
└── package.json
```

## 🚀 Getting Started

### Installation

```bash
yarn install
```

### Development

Run the development server for a specific client:

```bash
# Run default client
yarn dev

# Run specific client (e.g., hitowa)
yarn dev hitowa

# Run specific client (e.g., medix)
yarn dev medix
```

### Production Build

Build for a specific client:

```bash
# Build default client
yarn build

# Build specific client
yarn build hitowa
yarn build medix
```

Output will be in `dist/{client-name}/`

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` includes:

- **Dynamic client resolution** - Automatically resolves client based on `VITE_CLIENT` environment variable
- **Path aliases** for clean imports:
  - `@/` → `app/src/`
  - `@components/` → `app/src/components/`
  - `@customize/` → `customize/`
  - `@current-client` → Current client's entry point
- **Optimized dependencies** - Pre-bundled common dependencies for faster dev server
- **File system access** - Configured to allow access to both `app/` and `customize/` directories
- **Code splitting** - Automatic chunking for React, Ant Design, and vendor libraries

### TypeScript Configuration

#### Root `tsconfig.json`
- Shared configuration for the entire project
- Defines path aliases matching Vite configuration
- Includes both `app/src` and `customize/` directories

#### App `tsconfig.json`
- Extends root configuration
- App-specific overrides if needed

### Tailwind Configuration

The `app/tailwind.config.js` is configured to scan:
- `app/src/**/*.{js,ts,jsx,tsx}` - Base application files
- `customize/**/*.{js,ts,jsx,tsx}` - All client customization files

This ensures Tailwind classes from both base and client-specific code are included.

## 📝 Creating Client Customizations

### 1. Create Client Directory

```bash
mkdir -p customize/{client-name}/src
```

### 2. Create Entry Point

Create `customize/{client-name}/index.ts`:

```typescript
// Export custom components
export { default as CustomHeader } from './src/components/CustomHeader';
export { default as CustomButton } from './src/components/CustomButton';

// Export custom pages
export { default as CustomDashboard } from './src/pages/Dashboard';
```

### 3. Create Custom Components

Example: `customize/{client-name}/src/components/CustomHeader.tsx`

```tsx
import { AppButton } from '@/components/atoms/AppButton';
import { Avatar, Button, Flex, Row } from 'antd';

const CustomHeader = () => {
  return (
    <div id='header' style={{ background: '#custom-color' }}>
      <div className='container'>
        <Flex justify='between' className='header-wrap'>
          <Row className='nav'>
            <Button href='#' type='link' className='logo'>
              Custom Logo
            </Button>
          </Row>
        </Flex>
      </div>
    </div>
  );
};

export default CustomHeader;
```

### 4. Use Custom Components in Base App

In your base application, import from `@current-client`:

```tsx
import { CustomHeader } from '@current-client';

function App() {
  return (
    <div>
      <CustomHeader />
      {/* Rest of your app */}
    </div>
  );
}
```

## 🎨 Import Aliases

Use these aliases for clean imports:

```tsx
// Base app components
import { AppButton } from '@/components/atoms/AppButton';
import { Header } from '@components/organisms/Header';

// Client customizations
import { CustomHeader } from '@current-client';
import { CustomTheme } from '@customize/hitowa/src/theme';
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool and dev server
- **Ant Design 5** - UI component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 6** - Routing
- **Redux Toolkit** - State management
- **TanStack Query** - Server state management
- **SWC** - Fast TypeScript/JSX compilation

## 📦 Available Scripts

- `yarn dev [client]` - Start development server
- `yarn build [client]` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn typecheck` - Run TypeScript type checking

## 🔒 Security Benefits

- **Code isolation** - Only the selected client's code is bundled
- **No client exposure** - Other clients' code is never exposed to the browser
- **Build-time injection** - Client selection happens at build time, not runtime
- **Type safety** - Full TypeScript support across base and custom code

## 📚 Best Practices

1. **Keep base app generic** - Don't include client-specific logic in `app/`
2. **Use TypeScript** - Leverage type safety for better developer experience
3. **Follow naming conventions** - Prefix custom components with `Custom` for clarity
4. **Reuse base components** - Import and extend base components when possible
5. **Test each client** - Run `yarn dev {client}` to verify customizations
6. **Document customizations** - Add comments explaining client-specific logic

## 🐛 Troubleshooting

### TypeScript errors about missing modules

Make sure your `tsconfig.json` includes the correct paths and the `customize/` directory is in the `include` array.

### Vite can't resolve `@current-client`

Ensure you're running the dev/build script with a valid client name that has an `index.ts` file in `customize/{client}/`.

### Tailwind classes not working

Check that `tailwind.config.js` includes the correct content paths for both `app/` and `customize/` directories.
