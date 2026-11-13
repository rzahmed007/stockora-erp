import { Routes, Route, Navigate } from 'react-router-dom';
import {
  AuthLayout,
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from '@/features/auth';

export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirects to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication Routes (Split-screen card without ERP sidebar or topbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
