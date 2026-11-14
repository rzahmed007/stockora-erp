import { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowUpRight, Clock, Box, User, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUGGESTIONS = [
  {
    type: 'product',
    label: 'Nashik Red Onion (Grade A)',
    meta: '850 Sacks in Warehouse',
    icon: Box,
    href: '/inventory',
  },
  {
    type: 'customer',
    label: 'Kishan Trading Co. (Udhar: ₹84,500)',
    meta: 'Wholesale Buyer • Nashik',
    icon: User,
    href: '/customers',
  },
  {
    type: 'invoice',
    label: 'Invoice #INV-2024-0891 (₹1,42,000)',
    meta: 'Dispatched Today • Cash Partial',
    icon: FileText,
    href: '/wholesale-sales',
  },
  {
    type: 'product',
    label: 'Agra Potato Jyoti (Cold Storage)',
    meta: '1,200 Sacks available',
    icon: Box,
    href: '/inventory',
  },
];

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global ⌘K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener
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

  return (
    <div ref={containerRef} className="relative w-full max-w-[320px] sm:max-w-[400px]">
      {/* Search Input Container - Full Curved design */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-[#9CA3AF] pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search anything..."
          className="w-full h-10 pl-10 pr-14 rounded-full bg-[#F4F6F8] dark:bg-gray-800/80 border border-[#E5E7EB] dark:border-gray-700/80 text-xs sm:text-sm text-[#1D1B1A] dark:text-white placeholder:text-[#9CA3AF] transition-all duration-200 outline-none hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 focus:border-[#003A41] dark:focus:border-[#58AFB7] focus:ring-2 focus:ring-[#003A41]/10"
        />

        {/* ⌘K Badge */}
        <div className="absolute right-3 hidden sm:flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white dark:bg-gray-700 border border-[#E5E7EB] dark:border-gray-600 text-[10px] font-semibold text-[#6B7280] dark:text-gray-300 pointer-events-none shadow-2xs">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </div>

      {/* Global Search Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-xl p-3 z-50 text-left animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-gray-800 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Quick Navigation & Results
            </span>
            <span className="text-[10px] lowercase">press ESC to exit</span>
          </div>

          <div className="space-y-1">
            {SUGGESTIONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F4F6F8] dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#003A41]/10 dark:bg-[#58AFB7]/10 text-[#003A41] dark:text-[#58AFB7] flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1D1B1A] dark:text-white group-hover:text-[#003A41] dark:group-hover:text-[#58AFB7] leading-tight">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                        {item.meta}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA3AF] group-hover:text-[#1D1B1A] dark:group-hover:text-white transition-colors" />
                </Link>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-[#6B7280] dark:text-gray-400 px-1">
            <span>Quick modules:</span>
            <div className="flex gap-2">
              <Link
                to="/inventory"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#003A41] dark:hover:text-[#58AFB7] font-medium"
              >
                Inventory
              </Link>
              •
              <Link
                to="/wholesale-sales"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#003A41] dark:hover:text-[#58AFB7] font-medium"
              >
                Sales
              </Link>
              •
              <Link
                to="/daily-closing"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#003A41] dark:hover:text-[#58AFB7] font-medium"
              >
                Cash Closing
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
