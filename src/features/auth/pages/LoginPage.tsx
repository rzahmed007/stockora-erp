import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { AuthFormContainer } from '../components/AuthFormContainer';
import { AuthInput } from '../components/AuthInput';
import { PasswordInput } from '../components/PasswordInput';
import {
  LoginFormData,
  AuthNotification,
  SocialProvider,
} from '../types/auth.types';

export function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<AuthNotification | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!validate()) return;

    setIsLoading(true);

    // Simulate authentication API call
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'success',
        message: 'Welcome back! Authentication successful.',
      });

      // In real scenario, redirect to dashboard or requested page
      setTimeout(() => {
        // Mock successful sign-in
      }, 800);
    }, 900);
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    setNotification({
      type: 'info',
      message: `Connecting with ${provider === 'google' ? 'Google' : 'Microsoft'}... (Mock)`,
    });
  };

  return (
    <AuthFormContainer
      title="Welcome Back"
      description="Sign in to continue to Stockora ERP."
      notification={notification}
      showSocialLogin
      onSocialLogin={handleSocialLogin}
      footer={
        <p className="text-sm text-[#6B7280]">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-[#003A41] hover:underline"
          >
            Create Account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Field */}
        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@business.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          error={errors.email}
          required
        />

        {/* Password Field */}
        <div className="space-y-1">
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            required
          />
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              className="h-4 w-4 rounded border-[#D1D5DB] text-[#003A41] focus:ring-[#003A41] accent-[#003A41]"
            />
            <span className="text-xs font-medium text-[#6B7280]">
              Remember me
            </span>
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-[#003A41] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Primary Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </AuthFormContainer>
  );
}
