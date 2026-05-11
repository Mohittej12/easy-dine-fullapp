# Easy Dine 🍽️

A modern, comprehensive food management and ordering system built with React, Vite, and TypeScript. This application provides a seamless experience for employees to order meals, vendors to manage their menus/orders, and administrators to oversee the entire platform.

## 🚀 Tech Stack

- **Frontend:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Radix UI (Shadcn/UI components)
- **Routing:** Wouter
- **State Management & Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## ✨ Features

### 👨‍💻 Employee Dashboard
- **Meal Ordering:** Browse menus and place orders with ease.
- **Meal Pass:** Digital meal authorization and pass management.
- **Order History:** View and track your current and past orders.
- **Favorites:** Save your favorite food items for quick access.
- **Profile Management:** Manage personal details and preferences.

### 🏢 Vendor Portal
- **Dashboard:** Real-time overview of orders and performance.
- **Menu Management:** Add, edit, and remove food items dynamically.
- **Order Processing:** Manage incoming orders and update statuses.
- **Reports:** Access sales and ticket data reports.

### 🛡️ Admin Dashboard
- **Platform Overview:** High-level metrics and system health.
- **Vendor Management:** Monitor vendor performance and manage vendor accounts.
- **Menu Oversight:** Oversee menu management across the platform.
- **Data Management:** Upload and manage ticket data.

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (Recommended) or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohittej12/easy-dine-fullapp.git
   cd easy-dine-fullapp
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Running the Application

To start the development server:
```bash
pnpm --filter @workspace/easy-dine dev
```
The app will be available at `http://localhost:5173/`.

### Building for Production
```bash
pnpm --filter @workspace/easy-dine build
```

## 📂 Project Structure

- `artifacts/easy-dine/src/pages`: Contains the page components organized by role (Auth, Employee, Vendor, Admin).
- `artifacts/easy-dine/src/components`: Reusable UI components and layouts.
- `artifacts/easy-dine/src/hooks`: Custom React hooks for application state and logic.
- `lib`: Shared workspace libraries and API clients.

---
Built with ❤️ for a better dining experience.
