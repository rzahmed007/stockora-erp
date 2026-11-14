import { Link, useLocation } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { PageContainer } from './PageContainer';

export function ModulePlaceholder() {
  const location = useLocation();
  const moduleName = location.pathname
    .replace('/', '')
    .replace('-', ' ')
    .toUpperCase();

  return (
    <PageContainer>
      <PageHeader
        title={moduleName || 'Module'}
        description={`Stockora ERP ${moduleName} module setup.`}
      />

      <div className="py-16 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs">
        <div className="h-14 w-14 rounded-2xl bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] flex items-center justify-center mb-4">
          <Construction className="h-7 w-7" />
        </div>

        <h3 className="text-lg font-bold text-[#1D1B1A] dark:text-white">
          {moduleName} Module
        </h3>
        <p className="max-w-md text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-2">
          This module is part of the next development phase. The main application layout, sidebar navigation, topbar controls, and Dashboard overview are fully operational.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003A41] text-white text-xs font-semibold hover:bg-[#002d33] shadow-sm transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </PageContainer>
  );
}

