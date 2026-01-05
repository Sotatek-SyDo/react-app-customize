# react-app-customize

`react-app-customize` is a high-performance, enterprise-ready React source base designed for **build-time customization**. It allows engineering teams to maintain multiple client-specific applications from a single codebase without leaking client-specific logic or code into other builds.

---

## 🌟 Key Philosophy

The core idea is **Zero Runtime Switching**. Instead of using environment variables or runtime checks (`if (client === 'A')`), this source base uses **Vite Aliases** to swap implementations at build time. This results in:
- **Smaller Bundles**: Only the code for the target client is included in the production build.
- **Better Security**: Client-specific business logic or secrets are never exposed to other clients.
- **Cleaner Core**: The base application remains generic and easy to maintain.

---

## 🚀 Quick Start

### 1. Installation
Install all dependencies using Yarn:
```bash
yarn install
```

### 2. Development Mode
Run the development server for a specific client (defaults to `default` if no client is specified):
```bash
yarn dev                # Runs 'default' client
yarn dev hitowa         # Runs 'hitowa' customization
yarn dev medix          # Runs 'medix' customization
```

### 3. Production Build
Build the application for a specific client. The output will be located in `dist/{client-name}/`:
```bash
yarn build hitowa
```

---

## 🏗️ Architecture & Project Structure

The repository is structured to separate core application logic from client-specific overrides.

```bash
react-app-customize/
├── app/                        # 🏠 Base Application
│   ├── src/                    # Core source code (Generic)
│   │   ├── components/         # Shared UI components
│   │   ├── pages/              # Base page implementations
│   │   ├── hooks/              # Reusable React hooks
│   │   ├── store/              # Global state management
│   │   └── App.tsx             # Root component using @current-client
│   ├── tsconfig.json           # App-specific TS config
│   └── tailwind.config.js      # Tailwind scanning base + customize
├── customize/                  # 🎨 Client Customizations
│   ├── default/                # Fallback implementation
│   ├── hitowa/                 # Customization for Hitowa
│   │   ├── src/                # Custom components/pages
│   │   │   ├── components/
│   │   │   └── pages/
│   │   └── index.ts            # Entry point exporting overrides
│   └── medix/                  # Customization for Medix
├── scripts/                    # 🛠️ Build & Dev Scripts
│   ├── dev.mjs                 # Handles dynamic aliasing for dev
│   └── build.mjs               # Handles dynamic aliasing for build
├── vite.config.ts              # Core Vite configuration
└── package.json                # Project dependencies and scripts
```

---

## 🎨 Path Aliasing (The Secret Sauce)

This project relies on path aliases defined in `vite.config.ts` and `tsconfig.json`.

- **`@/`**: Directly points to `app/src/`. Used for all internal core imports.
- **`@current-client`**: This is a dynamic alias. When you run `yarn dev hitowa`, this alias points to `customize/hitowa/index.ts`.

### How to use in `app/src`:
```tsx
// Inside app/src/App.tsx
import { CustomHeader } from '@current-client';

function App() {
  return (
    <div>
      <CustomHeader /> {/* Injected at build time */}
      <MainContent />
    </div>
  );
}
```

---

## 🛠️ Technology Stack

- **React 18**: Latest concurrent features.
- **Vite 5**: Ultra-fast build tool using SWC.
- **TypeScript 5**: Strict type checking for both core and client code.
- **Ant Design 5**: CSS-in-JS component library for easy theming.
- **Tailwind CSS 4**: Utility-first styling with scanning for `customize/` folder.
- **Redux Toolkit**: Efficient state management.
- **TanStack Query**: Powerful server state and caching.

---

## � Customization Workflow

Creating a new white-label version is straightforward:

1. **Create Directory**: `mkdir -p customize/new-client/src/components`.
2. **Define Overrides**: Create `customize/new-client/src/components/CustomHeader.tsx`.
3. **Export Components**: In `customize/new-client/index.ts`, export your custom component:
   ```typescript
   export { default as CustomHeader } from './src/components/CustomHeader';
   ```
4. **Run**: Execute `yarn dev new-client`.

---

## 📚 Best Practices

- **Generic Core**: Keep components in `app/src` as generic as possible. If logic varies by client, move that logic into the `customize/` directory.
- **Naming Conventions**: Prefix client-specific components with `Custom` (e.g., `CustomButton`) to quickly distinguish them from core components.
- **Theming**: Use Ant Design tokens for theming. Each client can have its own theme file in its `customize` folder.

---

**Built with ❤️ for scalable, clean, and customizable React applications.**
