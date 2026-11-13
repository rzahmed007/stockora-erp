export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailFormData {
  code: string[];
}

export interface AuthNotification {
  type: 'success' | 'error' | 'info';
  message: string;
}

export type SocialProvider = 'google' | 'microsoft';

