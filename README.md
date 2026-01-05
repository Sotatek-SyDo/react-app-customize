# React Base White-Label Application

A white-label React application with Vite, TypeScript, and Ant Design. Build multiple client-specific applications from a single codebase.

## 🌟 Key Features

- ✅ **White-label architecture** - Multiple clients from one codebase
- ✅ **Build-time injection** - Client code injected at build time via Vite aliases
- ✅ **Zero client exposure** - Only selected client's code is bundled
- ✅ **Type-safe** - Full TypeScript support for base and custom code
- ✅ **Modern stack** - React 18, Vite 5, TypeScript 5, Ant Design 5

## 🏗️ Architecture

```
Base Application (app/src)
         ↓
   @current-client alias
         ↓
Client Customizations (customize/{client}/)
```

**How it works:**
1. `app/` - Contains shared code
2. `customize/{client}/` - Override components/pages for each client
3. `@current-client` - Vite alias points to selected client at build time
4. `dist/{client}/` - Contains only the built client's code

## 🚀 Usage

### Installation
```bash
yarn install
```

### Development
```bash
yarn dev              # Default client
yarn dev hitowa       # Hitowa client
yarn dev medix        # Medix client
```

### Production Build
```bash
yarn build            # Default client
yarn build hitowa     # Hitowa client
yarn build medix      # Medix client
```

## 📁 Project Structure

```
base-react-v2/
├── app/                    # Base application
│   ├── src/
│   │   ├── components/     # Shared components
│   │   ├── pages/          # Base pages
│   │   ├── router/         # Routing
│   │   └── store/          # Redux store
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── customize/              # Client customizations
│   ├── default/
│   ├── hitowa/
│   │   ├── src/
│   │   │   ├── components/ # Custom components
│   │   │   └── pages/      # Custom pages
│   │   └── index.ts        # Export custom modules
│   └── medix/
│
├── scripts/
│   ├── dev.mjs            # Dev script
│   └── build.mjs          # Build script
│
├── vite.config.ts         # Vite config
└── tsconfig.json          # Root TypeScript config
```

## 🔧 Configuration

### Path Aliases (Vite & TypeScript)
- `@/` → `app/src/`
- `@components/` → `app/src/components/`
- `@customize/` → `customize/`
- `@current-client` → `customize/{client}/index.ts`

### Tailwind Config
Scans both base and client files:
```javascript
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  '../customize/**/*.{js,ts,jsx,tsx}'
]
```

## 📝 Creating a New Client

### 1. Create directory
```bash
mkdir -p customize/new-client/src/components
```

### 2. Create entry point: `customize/new-client/index.ts`
```typescript
export { default as CustomHeader } from './src/components/CustomHeader';
export { default as CustomDashboard } from './src/pages/Dashboard';
```

### 3. Create component: `customize/new-client/src/components/CustomHeader.tsx`
```tsx
import { AppButton } from '@/components/atoms/AppButton';
import { Avatar, Button, Flex } from 'antd';

const CustomHeader = () => {
  return (
    <header style={{ background: '#brand-color' }}>
      <Flex justify='space-between'>
        <Button type='link'>Logo</Button>
        <Flex gap={16}>
          <AppButton>Dashboard</AppButton>
          <Avatar />
        </Flex>
      </Flex>
    </header>
  );
};

export default CustomHeader;
```

### 4. Use in base app: `app/src/App.tsx`
```tsx
import { CustomHeader } from '@current-client';

function App() {
  return (
    <div>
      <CustomHeader />
      {/* Rest of app */}
    </div>
  );
}
```

### 5. Run client
```bash
yarn dev new-client
```

## 🎨 Import Aliases

```tsx
// Base app
import { AppButton } from '@/components/atoms/AppButton';
import { useAuth } from '@/hooks/useAuth';

// Client customizations (build-time injection)
import { CustomHeader } from '@current-client';

// Direct client access
import { theme } from '@customize/hitowa/src/theme';
```

## 🛠️ Tech Stack

- React 18, TypeScript 5, Vite 5 (SWC)
- Ant Design 5, Tailwind CSS 4
- React Router 6, Redux Toolkit, TanStack Query
- ESLint, Prettier, Husky, Commitlint

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `yarn dev [client]` | Dev server |
| `yarn build [client]` | Production build |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | TypeScript check |

## 🔒 Security & Performance

**Security:**
- Code isolation - Only bundles selected client's code
- No client exposure - Other clients' code never exposed to browser
- Build-time injection - No runtime client switching

**Performance:**
- Automatic code splitting (React, Ant Design, vendors)
- Tree shaking
- Pre-bundled dependencies
- SWC compiler (faster than Babel)

## 📚 Best Practices

### 1. Keep Base App Generic
❌ Don't:
```tsx
const Header = () => {
  const isHitowa = client === 'hitowa'; // ❌ Client-specific logic
  return <div>{isHitowa ? 'Hitowa' : 'Other'}</div>;
};
```

✅ Do:
```tsx
import { CustomHeader } from '@current-client';
const App = () => <CustomHeader />; // ✅ Client provides implementation
```

### 2. Follow Naming Conventions
- Prefix `Custom` for custom components (`CustomHeader`, `CustomButton`)
- Use clear client names (`hitowa`, `medix`)
- Keep consistent file structure across clients

### 3. Reuse Base Components
```tsx
import { AppButton } from '@/components/atoms/AppButton';

const CustomButton = () => (
  <AppButton style={{ background: '#brand-color' }}>
    Custom Text
  </AppButton>
);
```

### 4. Test All Clients
```bash
yarn dev default && yarn dev hitowa && yarn dev medix
yarn build default && yarn build hitowa && yarn build medix
```

## 🐛 Troubleshooting

**TypeScript Error: Cannot find '@current-client'**
```bash
yarn dev hitowa  # Must run with client name, not just 'yarn vite'
```

**Vite Error: Failed to resolve import**
```bash
ls customize/hitowa/index.ts  # Check if index.ts file exists
```

**Tailwind classes not working**
```javascript
// tailwind.config.js must include customize/
content: ['./src/**/*.{js,ts,jsx,tsx}', '../customize/**/*.{js,ts,jsx,tsx}']
```

**TypeScript path aliases not working**
```json
// tsconfig.json paths must match vite.config.ts
{
  "compilerOptions": {
    "paths": {
      "@/*": ["app/src/*"],
      "@components/*": ["app/src/components/*"],
      "@customize/*": ["customize/*"]
    }
  }
}
```

## 📖 Additional Documentation

- [App README](./app/README.md) - Detailed app documentation
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Ant Design Docs](https://ant.design/)

---

**Built with ❤️ using React + Vite + TypeScript**
