import { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { AuthInput, AuthInputProps } from './AuthInput';

export interface PasswordInputProps extends Omit<AuthInputProps, 'type' | 'rightIcon'> {
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength = false, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Calculate password strength if required
    const passwordStr = typeof value === 'string' ? value : '';
    const getStrength = (val: string) => {
      if (!val) return 0;
      let score = 0;
      if (val.length >= 8) score += 1;
      if (/[A-Z]/.test(val)) score += 1;
      if (/[0-9]/.test(val)) score += 1;
      if (/[^A-Za-z0-9]/.test(val)) score += 1;
      return score;
    };

    const strength = getStrength(passwordStr);
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-600'];

    return (
      <div className="space-y-1.5">
        <AuthInput
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1 rounded-lg text-[#6B7280] hover:text-[#1D1B1A] hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-1 focus:ring-[#003A41]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          value={value}
          {...props}
        />

        {showStrength && passwordStr.length > 0 && (
          <div className="space-y-1 pt-1">
            <div className="flex gap-1 h-1.5 w-full">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-full flex-1 rounded-full transition-all duration-300 ${
                    index < strength ? strengthColors[strength - 1] : 'bg-[#E5E7EB]'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#6B7280]">
              <span>Password strength</span>
              <span className="font-medium text-[#1D1B1A]">
                {strength > 0 ? strengthLabels[strength - 1] : 'Too short'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
