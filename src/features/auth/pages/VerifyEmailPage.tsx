import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { AuthFormContainer } from '../components/AuthFormContainer';
import { AuthNotification } from '../types/auth.types';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notification, setNotification] = useState<AuthNotification | null>(null);
  const [resendTimer, setResendTimer] = useState(45);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);
    if (error) setError(undefined);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedData[i] || '';
      }
      setCode(newCode);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Please enter the complete 6-digit verification code');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 900);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(60);
    setNotification({
      type: 'info',
      message: 'A new 6-digit code has been sent to your inbox.',
    });
  };

  return (
    <AuthFormContainer
      title="Verify Your Email"
      description="We sent a 6-digit confirmation code to your email. Enter it below to activate your account."
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
              Email Verified Successfully!
            </h3>
            <p className="mt-1 text-xs text-[#6B7280]">
              Your Stockora ERP account is now fully active. Redirecting to login...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* 6 Digit OTP Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 sm:gap-2.5">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl font-bold text-[#1D1B1A] rounded-xl border border-[#E5E7EB] bg-white transition-all outline-none focus:border-[#003A41] focus:ring-2 focus:ring-[#003A41]/10 hover:border-[#D1D5DB]"
                />
              ))}
            </div>

            {error && (
              <p className="text-xs font-medium text-red-600 text-center pt-1">
                {error}
              </p>
            )}
          </div>

          {/* Resend Code Section */}
          <div className="text-center text-xs text-[#6B7280]">
            Didn&apos;t receive the code?{' '}
            {resendTimer > 0 ? (
              <span className="font-medium text-[#1D1B1A]">
                Resend in {resendTimer}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-[#003A41] hover:underline inline-flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Resend code
              </button>
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
                <span>Verifying Code...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </form>
      )}
    </AuthFormContainer>
  );
}

