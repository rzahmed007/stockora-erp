import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { AuthNotification, SocialProvider } from '../types/auth.types';

export interface AuthFormContainerProps {
  title: string;
  description: string;
  notification?: AuthNotification | null;
  onSocialLogin?: (provider: SocialProvider) => void;
  showSocialLogin?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthFormContainer({
  title,
  description,
  notification,
  onSocialLogin,
  showSocialLogin = false,
  children,
  footer,
}: AuthFormContainerProps) {
  return (
    <div className="w-full max-w-[430px] mx-auto flex flex-col justify-center">
      {/* Mobile Branding (Visible only on mobile/tablet when left panel is hidden) */}
      <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
        <Link to="/login" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#003A41] text-white flex items-center justify-center font-bold text-base shadow-sm">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7H14V10H4V7ZM4 12H20V15H4V12ZM4 17H16V20H4V17Z"
                fill="currentColor"
              />
              <circle cx="18" cy="8.5" r="2.5" fill="#58AFB7" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1D1B1A]">
            STOCK<span className="text-[#003A41]">ORA</span>
          </span>
          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#003A41]/10 text-[#003A41]">
            ERP
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-left space-y-1.5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1B1A]">
          {title}
        </h1>
        <p className="text-sm text-[#6B7280]">{description}</p>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          role="alert"
          className={`mb-5 p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed animate-in fade-in-50 duration-200 ${
            notification.type === 'error'
              ? 'bg-red-50/80 border-red-200 text-red-800'
              : notification.type === 'success'
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
              : 'bg-blue-50/80 border-blue-200 text-blue-800'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Form Slot */}
      <div className="space-y-4">{children}</div>

      {/* Social Logins (Matching reference design) */}
      {showSocialLogin && (
        <div className="mt-6 space-y-3.5">
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#E5E7EB]" />
            <span className="bg-white px-3 text-xs text-[#9CA3AF] uppercase tracking-wider relative font-medium">
              or
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={() => onSocialLogin?.('google')}
              className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#1D1B1A] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all flex items-center justify-center gap-3 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => onSocialLogin?.('microsoft')}
              className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#1D1B1A] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all flex items-center justify-center gap-3 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              <span>Continue with Microsoft</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer link */}
      {footer && <div className="mt-8 text-center text-sm">{footer}</div>}
    </div>
  );
}

