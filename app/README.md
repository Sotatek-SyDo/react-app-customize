# react-app-customize (Core Application)

The `app/` directory is the heart of the project. It contains the **Base Application** logic, which is shared across all white-label versions. Think of this as the "Engine" and the `customize/` directory as the "Skin & Configuration".

---

## 🏗️ Application Structure

Below is the detailed layout of the core application. Developers should adhere to this structure to maintain consistency.

```bash
app/
├── src/
│   ├── assets/             # Tài nguyên tĩnh (Images, Web fonts)
│   ├── components/         # UI Components (Atomic Design)
│   │   ├── atoms/          # Thành phần cơ bản nhất (Button, Input, Icon)
│   │   ├── molecules/      # Kết hợp từ các atoms (FormField, SearchBar)
│   │   ├── organisms/      # Các khối UI lớn (Header, Sidebar, Footer)
│   │   ├── templates/      # Layout framework cho các trang
│   │   └── registry.ts     # Quản lý đăng ký component cho White-label
│   ├── constants/          # Định nghĩa hằng số, Enum, API Endpoints
│   ├── hooks/              # Custom hooks dùng chung cho toàn dự án
│   ├── pages/              # Chứa các trang cơ sở (Base pages)
│   ├── router/             # Cấu hình định tuyến (React Router 6)
│   ├── runtime/            # Xử lý logic runtime và khởi tạo ứng dụng
│   ├── scss/               # Hệ thống stylesheet toàn cục (SASS/SCSS)
│   ├── services/           # Tầng giao tiếp với API backend
│   ├── shared/             # Chia sẻ config (Redux, React Query, Ant Design)
│   ├── store/              # Quản lý Redux slices và middleware
│   ├── types/              # Định nghĩa các kiểu dữ liệu TypeScript
│   ├── utils/              # Các hàm bổ trợ (Format, Validate, Truncate)
│   ├── App.tsx             # Component gốc kết nối @current-client
│   └── main.tsx            # File khởi tạo mount React vào DOM
└── tailwind.config.js      # Cấu hình Tailwind cho app và customize
```

---

## 🔧 Core Workflow: `@current-client`

The application core logic is written to be **injected**. We use the Vite alias `@current-client` to import components that might vary between clients.

### Standard Import Pattern:
```tsx
// Inside app/src/pages/Home.tsx
import { CustomBanner } from '@current-client'; 

const Home = () => (
  <main>
    <CustomBanner /> {/* Logic/UI defined in customize/{client}/ */}
    <StaticContent />
  </main>
);
```

---

## ⚠️ Lưu ý quan trọng (Important Notes)

Khi phát triển tại thư mục `app/`, hãy đặc biệt chú ý các điểm sau:

### 1. Tính trừu tượng & Runtime Resolution
Tuyệt đối không viết logic dựa trên tên client (ví dụ: `if (client === 'hitowa')`). 
- **Cơ chế**: Sử dụng thư mục `runtime/` (ví dụ `resolveComponent.ts`) để quản lý việc tráo đổi component giữa Core và Client.
- **Giải pháp**: Nếu logic thay đổi theo client, hãy đẩy logic đó vào một component hoặc một hook bên trong `@current-client`.

### 2. Cấu hình thư viện (Shared Folder)
Tất cả cấu hình cho Redux, React Query, và Ant Design được tập trung tại `shared/`.
- Khi cần thêm Middleware cho Redux hoặc cấu hình mới cho Query Client, hãy thực hiện tại đây thay vì viết trực tiếp vào `main.tsx`.

### 3. Định nghĩa Props chặt chẽ
Tất cả các thành phần được export từ `@current-client` phải có **TypeScript Interface** đồng nhất. 
- Nếu bạn thêm một prop mới vào một component trong core app mà component đó được override ở client, bạn **BẮT BUỘC** phải cập nhật tất cả các bản override ở các client hiện có để tránh lỗi build.

### 3. Tailwind CSS Scanning
File `app/tailwind.config.js` đã được cấu hình để scan code ở cả `app/src/` và `../customize/`.
- Lưu ý không sử dụng các class name được tạo động (dynamic class names) kiểu `className={`text-${color}-500`}` vì Tailwind sẽ không thể crawl được mã màu đó.

### 4. Đảm bảo Fallback
Mọi component hoặc config được gọi từ `@current-client` nên có một bản implementation mặc định trong `customize/default` để đảm bảo ứng dụng không bị crash khi một client mới chưa kịp override.

### 5. Kiểm tra Build liên phiên bản
Khi thay đổi mã nguồn tại `app/`, hãy thử chạy lệnh dev cho ít nhất 2 client khác nhau để đảm bảo thay đổi của bạn không phá vỡ layout của các client đã tồn tại.
```bash
yarn dev default
yarn dev hitowa
```

---

## 🚀 Optimization & Performance

- **Lazy Loading**: Sử dụng `React.lazy` cho các route trong `router/` để giảm kích thước bundle ban đầu.
- **Ant Design**: Tận dụng hệ thống Token của Ant Design 5 để đồng nhất style giữa Core và Client mà không cần viết quá nhiều CSS đè.
- **Strict Mode**: Luôn giữ `React.StrictMode` bật trong quá trình phát triển để phát hiện sớm các vấn đề về side-effect.

---

**Happy Coding! 🚀**
