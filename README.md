# Stockora ERP

A scalable business management ERP solution tailored for trading, wholesale, retail, inventory, and warehouse operations.

---

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **UI Components:** shadcn/ui architecture patterns
- **Icons:** Lucide React
- **Routing:** React Router DOM (v6)

---

## Brand Design Tokens

| Token | Value | Description |
| :--- | :--- | :--- |
| **Brand Primary** | `#003A41` | Deep teal core brand color |
| **Heading** | `#1D1B1A` | Dark neutral for high-emphasis typography |
| **Secondary Text** | `#6B7280` | Subdued slate for descriptions & metadata |
| **Background** | `#F8FAFC` | Clean canvas background |
| **Card Background** | `#FFFFFF` | Elevated card & panel surface |
| **Border** | `#E5E7EB` | Subtle divider and component borders |
| **Typography** | Inter | Primary sans-serif typeface |

---

## Directory Architecture

```text
stockora-erp/
│
├── public/
│   ├── logo.svg
│   ├── favicon.svg
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── layouts/
│   │   │   └── AppLayout.tsx
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   └── providers/
│   │       └── AppProviders.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   │       ├── sidebar/
│   │       │   ├── AppSidebar.tsx
│   │       │   ├── SidebarHeader.tsx
│   │       │   ├── SidebarNavigation.tsx
│   │       │   ├── SidebarMenuItem.tsx
│   │       │   ├── SidebarFooter.tsx
│   │       │   └── sidebar.config.ts
│   │       │
│   │       ├── topbar/
│   │       │   ├── AppHeader.tsx
│   │       │   ├── HeaderSearch.tsx
│   │       │   ├── HeaderNotifications.tsx
│   │       │   ├── HeaderProfile.tsx
│   │       │   └── Breadcrumbs.tsx
│   │       │
│   │       ├── PageHeader.tsx
│   │       ├── PageContainer.tsx
│   │       ├── DataTable.tsx
│   │       ├── SearchInput.tsx
│   │       ├── FilterToolbar.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── EmptyState.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   ├── locations/
│   │   ├── products/
│   │   ├── purchases/
│   │   ├── inventory/
│   │   ├── retail-pos/
│   │   ├── wholesale-sales/
│   │   ├── customers/
│   │   ├── customer-credit/
│   │   ├── suppliers/
│   │   ├── transport/
│   │   ├── labour/
│   │   ├── employees/
│   │   ├── accounting/
│   │   ├── daily-closing/
│   │   ├── expenses/
│   │   ├── reports/
│   │   ├── notifications/
│   │   └── settings/
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   ├── services/
│   │   └── api/
│   │
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── mocks/
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

### 3. Production Build & Type Checking

```bash
npm run build
```

### 4. Code Linting

```bash
npm run lint
```

