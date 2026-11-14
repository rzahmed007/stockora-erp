import { useState } from 'react';
import { ChevronRight, MapPin, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const LOCATIONS = [
  { id: 'all', name: 'All Locations' },
  { id: 'shop', name: 'Shop (Mandi Yard)' },
  { id: 'warehouse', name: 'Cold Storage Hub' },
  { id: 'godown', name: 'Central Godown' },
];

export function Breadcrumbs() {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].name);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Dynamic breadcrumb generation based on route
  const pathnames = location.pathname.split('/').filter((x) => x);
  const currentTitle =
    pathnames.length === 0 || pathnames[0] === 'dashboard'
      ? 'Overview'
      : pathnames[0].replace('-', ' ');

  return (
    <div className="flex items-center gap-3 text-left">
      {/* Route Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-medium">
        <Link
          to="/dashboard"
          className="text-[#6B7280] dark:text-gray-400 hover:text-[#003A41] dark:hover:text-[#58AFB7] transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
        <span className="font-semibold text-[#1D1B1A] dark:text-white capitalize">
          {currentTitle}
        </span>
      </div>

      {/* Location Context Selector Pill */}
      <div className="relative hidden xl:block">
        <button
          type="button"
          onClick={() => setIsLocationOpen((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F6F8] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 text-xs font-medium text-[#1D1B1A] dark:text-gray-200 hover:bg-[#E9EEF2] dark:hover:bg-gray-700 transition-colors"
        >
          <MapPin className="h-3 w-3 text-[#003A41] dark:text-[#58AFB7]" />
          <span>{selectedLocation}</span>
        </button>

        {isLocationOpen && (
          <div className="absolute left-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-lg py-1.5 z-50 animate-in fade-in-50 duration-150">
            <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#9CA3AF] tracking-wider">
              Select Operating Yard
            </div>
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => {
                  setSelectedLocation(loc.name);
                  setIsLocationOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between text-[#1D1B1A] dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span>{loc.name}</span>
                {selectedLocation === loc.name && (
                  <Check className="h-3.5 w-3.5 text-[#003A41] dark:text-[#58AFB7]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
