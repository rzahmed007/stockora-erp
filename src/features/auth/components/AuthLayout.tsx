import { Outlet } from 'react-router-dom';
import { AuthBrandPanel } from './AuthBrandPanel';

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-5 md:p-8 lg:p-10 selection:bg-[#003A41]/10 selection:text-[#003A41]">
      {/* Centered Split-Screen Master Card (Inspired by reference screenshot) */}
      <div className="w-full max-w-[1240px] bg-white rounded-[24px] sm:rounded-[32px] border border-[#E5E7EB] shadow-[0_20px_60px_-15px_rgba(0,58,65,0.08),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[720px] transition-all">
        {/* Left Visual Branding Panel (approx 50% width on desktop) */}
        <div className="hidden lg:flex lg:col-span-6 p-3 sm:p-4 lg:p-5">
          <AuthBrandPanel />
        </div>

        {/* Right Authentication Form Panel (approx 50% width on desktop) */}
        <div className="col-span-1 lg:col-span-6 p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center items-center bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

