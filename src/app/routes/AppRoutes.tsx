import { Routes, Route, Navigate } from 'react-router-dom';
import {
  AuthLayout,
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@/features/auth';
import { AppLayout } from '@/app/layouts/AppLayout';
import { DashboardPage } from '@/features/dashboard';
import { ModulePlaceholder } from '@/components/shared/ModulePlaceholder';

export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirects to /dashboard as default route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Authentication Module Routes (Standalone Split-screen Card, No Sidebar/Topbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Main Application Routes (Unified ERP Layout with Sidebar and Floating Header) */}
      <Route element={<AppLayout />}>
        {/* Core Management */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/retail-pos" element={<ModulePlaceholder />} />
        <Route path="/locations/*" element={<ModulePlaceholder />} />
        <Route path="/products/*" element={<ModulePlaceholder />} />

        {/* Operations & Modules */}
        <Route path="/inventory/*" element={<ModulePlaceholder />} />
        <Route path="/purchases/*" element={<ModulePlaceholder />} />
        <Route path="/wholesale-sales/*" element={<ModulePlaceholder />} />
        <Route path="/customers/*" element={<ModulePlaceholder />} />
        <Route path="/transport/*" element={<ModulePlaceholder />} />
        <Route path="/labour/*" element={<ModulePlaceholder />} />
        <Route path="/employees/*" element={<ModulePlaceholder />} />

        {/* Finance & Reporting */}
        <Route path="/customer-credit/*" element={<ModulePlaceholder />} />
        <Route path="/accounting/*" element={<ModulePlaceholder />} />
        <Route path="/daily-closing/*" element={<ModulePlaceholder />} />
        <Route path="/expenses/*" element={<ModulePlaceholder />} />
        <Route path="/reports/*" element={<ModulePlaceholder />} />

        {/* System */}
        <Route path="/notifications/*" element={<ModulePlaceholder />} />
        <Route path="/users/*" element={<ModulePlaceholder />} />
        <Route path="/settings/*" element={<ModulePlaceholder />} />

        {/* Backwards compatibility */}
        <Route path="/suppliers" element={<ModulePlaceholder />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
