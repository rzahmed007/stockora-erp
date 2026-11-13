import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthFormContainer } from '../components/AuthFormContainer';
import { PasswordInput } from '../components/PasswordInput';
import {
  ResetPasswordFormData,
  AuthNotification,
} from '../types/auth.types';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notification, setNotification] = useState<AuthNotification | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ResetPasswordFormData, string>> = {};

    if (!formData.password) {
      newErrors.password = 'New password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your new password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 900);
  };

  return (
    <AuthFormContainer
      title="Reset Your Password"
      description="Enter your new password below to regain access to Stockora ERP."
      notification={notification}
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#003A41] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Login</span>
        </Link>
      }
    >
      {isSuccess ? (
        <div className="space-y-4 text-center animate-in fade-in-50 duration-300">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1D1B1A]">
              Password Reset Successfully
            </h3>
            <p className="mt-1 text-xs text-[#6B7280]">
              Your password has been updated. Redirecting you to login...
            </p>
          </div>
          <Link
            to="/login"
            className="w-full h-11 rounded-xl bg-[#003A41] text-white text-sm font-semibold flex items-center justify-center shadow-sm"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <PasswordInput
            id="password"
            name="password"
            label="New Password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            showStrength
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            required
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              if (errors.confirmPassword)
                setErrors({ ...errors, confirmPassword: undefined });
            }}
            error={errors.confirmPassword}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </form>
      )}
    </AuthFormContainer>
  );
}

