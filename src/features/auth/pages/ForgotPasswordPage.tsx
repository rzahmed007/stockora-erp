import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { AuthFormContainer } from '../components/AuthFormContainer';
import { AuthInput } from '../components/AuthInput';
import {
  ForgotPasswordFormData,
  AuthNotification,
} from '../types/auth.types';

export function ForgotPasswordPage() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState<AuthNotification | null>(null);

  const validate = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'info',
        message: 'A fresh reset link has been dispatched to your email.',
      });
    }, 700);
  };

  return (
    <AuthFormContainer
      title="Forgot Password?"
      description="Enter your email address and we will send you instructions to reset your password."
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
      {isSubmitted ? (
        <div className="space-y-5 animate-in fade-in-50 duration-300">
          {/* Professional Privacy-Preserving Success State */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left space-y-3">
            <div className="flex items-center gap-3 text-emerald-800 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Instructions Dispatched</span>
            </div>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              Password reset instructions have been sent if the account exists for{' '}
              <strong className="text-emerald-950 font-semibold">
                {formData.email}
              </strong>
              .
            </p>
            <p className="text-[11px] text-emerald-700/90 leading-normal">
              Please check your inbox as well as your spam folder. For security
              reasons, the link expires in 30 minutes.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="w-full h-11 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#1D1B1A] hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#003A41]" />
              ) : (
                <RotateCcw className="h-4 w-4 text-[#6B7280]" />
              )}
              <span>Resend Reset Email</span>
            </button>

            <Link
              to="/login"
              className="w-full h-11 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-sm font-semibold flex items-center justify-center transition-all shadow-sm"
            >
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              setFormData({ email: e.target.value });
              if (error) setError(undefined);
            }}
            error={error}
            helperText="We will never share your email with anyone."
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
                <span>Sending Instructions...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>
      )}
    </AuthFormContainer>
  );
}

