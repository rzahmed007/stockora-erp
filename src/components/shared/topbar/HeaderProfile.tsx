import { useState, useRef, useEffect } from 'react';
import { User, Settings, Sliders, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function HeaderProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Profile Trigger Button with Subtle Glassmorphism as requested */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-[#E5E7EB] dark:border-gray-700/80 shadow-2xs hover:bg-white dark:hover:bg-gray-800 transition-all select-none group"
        aria-label="User account menu"
      >
        {/* User Avatar with deep teal brand tone */}
        <div className="h-8 w-8 rounded-full bg-[#003A41] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs ring-2 ring-white dark:ring-gray-800">
          AR
        </div>

        {/* User Info (hidden on mobile) */}
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-[#1D1B1A] dark:text-white leading-tight">
            Ahmed Raza
          </span>
          <span className="text-[10px] text-[#6B7280] dark:text-gray-400 font-medium">
            Owner & Admin
          </span>
        </div>

        <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF] group-hover:text-[#1D1B1A] dark:group-hover:text-white transition-transform duration-200 hidden sm:block" />
      </button>

      {/* Glassmorphic Profile Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/80 dark:border-gray-800 shadow-2xl p-2 z-50 text-left animate-in fade-in-50 duration-150">
          {/* Header inside popup */}
          <div className="px-3 py-2.5 mb-1 border-b border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold text-[#1D1B1A] dark:text-white">
              Ahmed Raza
            </p>
            <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5 truncate">
              ahmed@stockora.com
            </p>
            <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]">
              Mandi License: NSK-4820
            </span>
          </div>

          <div className="space-y-0.5">
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D1B1A] dark:text-gray-200 hover:bg-[#F4F6F8] dark:hover:bg-gray-800 transition-colors"
            >
              <User className="h-3.5 w-3.5 text-[#6B7280] dark:text-gray-400" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D1B1A] dark:text-gray-200 hover:bg-[#F4F6F8] dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-[#6B7280] dark:text-gray-400" />
              <span>Account Settings</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D1B1A] dark:text-gray-200 hover:bg-[#F4F6F8] dark:hover:bg-gray-800 transition-colors"
            >
              <Sliders className="h-3.5 w-3.5 text-[#6B7280] dark:text-gray-400" />
              <span>Preferences</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1D1B1A] dark:text-gray-200 hover:bg-[#F4F6F8] dark:hover:bg-gray-800 transition-colors"
            >
              <HelpCircle className="h-3.5 w-3.5 text-[#6B7280] dark:text-gray-400" />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="pt-1 mt-1 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
