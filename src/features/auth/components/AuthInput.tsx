import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-[#1D1B1A] tracking-wide"
          >
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#6B7280]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full h-11 rounded-xl border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#1D1B1A] placeholder:text-[#9CA3AF] transition-all duration-200 outline-none',
              'hover:border-[#D1D5DB]',
              'focus:border-[#003A41] focus:ring-2 focus:ring-[#003A41]/10',
              'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-11',
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500/10 text-red-900',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs font-medium text-red-600 animate-in fade-in-50 duration-150">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#6B7280]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';

