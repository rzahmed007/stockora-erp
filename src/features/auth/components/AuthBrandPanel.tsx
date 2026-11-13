import { Link } from 'react-router-dom';
import { AuthProductPreview } from './AuthProductPreview';

export function AuthBrandPanel() {
  return (
    <div className="relative flex flex-col justify-between h-full w-full rounded-[20px] lg:rounded-[26px] bg-[#F2F5F7] border border-[#E5EAEF] p-6 lg:p-9 overflow-hidden">
      {/* Elegant Halftone / Dot Grid Background (Inspired by reference screenshot) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #003A41 1.2px, transparent 1.2px)`,
          backgroundSize: '18px 18px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 45%, black 40%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 45%, black 40%, transparent 85%)',
        }}
      />

      {/* Subtle organic light accent behind preview */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/70 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 flex items-center justify-between">
        <Link to="/login" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-[#003A41] text-white flex items-center justify-center font-bold text-lg shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="w-5 h-5"
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
          <div>
            <span className="text-lg font-bold tracking-tight text-[#1D1B1A]">
              STOCK<span className="text-[#003A41]">ORA</span>
            </span>
            <span className="ml-1.5 text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#003A41]/10 text-[#003A41]">
              ERP
            </span>
          </div>
        </Link>

        <span className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#6B7280] font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E5EAEF]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Enterprise v1.0
        </span>
      </div>

      {/* Center Visual: Floating ERP Product Preview */}
      <div className="relative z-10 py-8 lg:py-10 flex items-center justify-center">
        <AuthProductPreview />
      </div>

      {/* Bottom Promotional Typography */}
      <div className="relative z-10 pt-4 max-w-[460px] mx-auto text-left">
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-[#1D1B1A] leading-tight font-sans">
          Manage Your Business.
          <br />
          <span className="text-[#003A41]">Grow With Confidence.</span>
        </h2>
        <p className="mt-2.5 text-xs lg:text-sm text-[#6B7280] leading-relaxed">
          Everything you need to manage inventory, sales, purchases, customers
          and business operations in one powerful ERP platform.
        </p>

        <div className="mt-4 flex items-center gap-3 text-[11px] text-[#6B7280] font-medium">
          <span className="flex items-center gap-1">
            <span className="text-[#003A41]">✓</span> Wholesale & Retail
          </span>
          <span className="text-[#D1D5DB]">•</span>
          <span className="flex items-center gap-1">
            <span className="text-[#003A41]">✓</span> Multi-Warehouse
          </span>
          <span className="text-[#D1D5DB]">•</span>
          <span className="flex items-center gap-1">
            <span className="text-[#003A41]">✓</span> Financial Closing
          </span>
        </div>
      </div>
    </div>
  );
}

