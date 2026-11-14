import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 text-left">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1D1B1A] dark:text-white capitalize">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
