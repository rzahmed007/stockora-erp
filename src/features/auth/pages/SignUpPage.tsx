import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Phone, Loader2, ArrowRight } from 'lucide-react';
import { AuthFormContainer } from '../components/AuthFormContainer';
import { AuthInput } from '../components/AuthInput';
import { PasswordInput } from '../components/PasswordInput';
import {
  SignUpFormData,
  AuthNotification,
  SocialProvider,
} from '../types/auth.types';

export function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<AuthNotification | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SignUpFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setNotification({
        type: 'success',
        message: 'Account created successfully! Welcome to Stockora ERP.',
      });

      setTimeout(() => {
        navigate('/verify-email');
      }, 1200);
    }, 1000);
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    setNotification({
      type: 'info',
      message: `Sign up with ${provider === 'google' ? 'Google' : 'Microsoft'} initialized (Mock).`,
    });
  };

  return (
    <AuthFormContainer
      title="Create Your Account"
      description="Get started with Stockora ERP."
      notification={notification}
      showSocialLogin
      onSocialLogin={handleSocialLogin}
      footer={
        <p className="text-sm text-[#6B7280]">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#003A41] hover:underline"
          >
            Sign In
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* Full Name & Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AuthInput
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            autoComplete="name"
            leftIcon={<User className="h-4 w-4" />}
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: undefined });
            }}
            error={errors.fullName}
            required
          />

          <AuthInput
            id="businessName"
            name="businessName"
            type="text"
            label="Business Name"
            placeholder="Stockora Wholesale LLC"
            autoComplete="organization"
            leftIcon={<Building2 className="h-4 w-4" />}
            value={formData.businessName}
            onChange={(e) => {
              setFormData({ ...formData, businessName: e.target.value });
              if (errors.businessName)
                setErrors({ ...errors, businessName: undefined });
            }}
            error={errors.businessName}
            required
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Work Email"
            placeholder="john@business.com"
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

          <AuthInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            leftIcon={<Phone className="h-4 w-4" />}
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            error={errors.phone}
            required
          />
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            placeholder="Min. 8 characters"
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
            label="Confirm Password"
            placeholder="Re-enter password"
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
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="pt-1 text-left">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => {
                setFormData({ ...formData, agreeToTerms: e.target.checked });
                if (errors.agreeToTerms)
                  setErrors({ ...errors, agreeToTerms: undefined });
              }}
              className="mt-0.5 h-4 w-4 rounded border-[#D1D5DB] text-[#003A41] focus:ring-[#003A41] accent-[#003A41]"
            />
            <span className="text-xs text-[#6B7280] leading-relaxed">
              I agree to the{' '}
              <span className="text-[#003A41] font-medium hover:underline">
                Terms & Conditions
              </span>{' '}
              and acknowledge the{' '}
              <span className="text-[#003A41] font-medium hover:underline">
                Privacy Policy
              </span>
              .
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-xs font-medium text-red-600">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </AuthFormContainer>
  );
}

