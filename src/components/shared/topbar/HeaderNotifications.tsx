import { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, Truck, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Low Stock Alert: Nashik Onion',
    desc: 'Main Mandi Shop stock below 100 sacks. Immediate transfer required.',
    time: '12m ago',
    type: 'warning',
    read: false,
    icon: AlertTriangle,
  },
  {
    id: '2',
    title: 'Inward Shipment Arrived',
    desc: 'Truck #MH-15-EG-4402 carrying 400 sacks of Agra Potato at Godown.',
    time: '45m ago',
    type: 'shipment',
    read: false,
    icon: Truck,
  },
  {
    id: '3',
    title: 'Udhar Payment Cleared: ₹85,000',
    desc: 'Shree Ganesh Traders cleared bill #INV-2024-0719 via NEFT.',
    time: '2h ago',
    type: 'payment',
    read: true,
    icon: CheckCircle2,
  },
];

export function HeaderNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Click outside to close
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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative h-10 w-10 rounded-full bg-[#F4F6F8] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 transition-all shadow-2xs"
        aria-label="View notifications"
      >
        <Bell className="h-4.5 w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white dark:ring-gray-900 shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[340px] sm:w-[380px] rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-xl p-4 z-50 text-left animate-in fade-in-50 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-[#1D1B1A] dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#003A41]/10 text-[#003A41] dark:text-[#58AFB7] text-[11px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] text-[#003A41] dark:text-[#58AFB7] hover:underline font-medium flex items-center gap-1"
              >
                <Check className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="py-2 space-y-2 max-h-[300px] overflow-y-auto">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-xl transition-all flex items-start gap-3 ${
                    item.read
                      ? 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40'
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      item.type === 'warning'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        : item.type === 'shipment'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#1D1B1A] dark:text-white truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-[#9CA3AF] shrink-0 ml-1">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-center">
            <Link
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
            >
              <span>View all notifications</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
