import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { SalesTypeSelector } from '../components/SalesTypeSelector';
import { RetailSaleForm } from '../components/RetailSaleForm';
import { WholesaleSaleForm } from '../components/WholesaleSaleForm';
import { InvoiceModal } from '../components/InvoiceModal';
import { SalesType } from '../types/sales.types';

export function NewSalePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as SalesType) || 'retail';
  const [salesType, setSalesType] = useState<SalesType>(
    initialType === 'wholesale' ? 'wholesale' : 'retail'
  );

  // Sync URL query parameter when mode changes
  const handleTypeChange = (type: SalesType) => {
    setSalesType(type);
    setSearchParams({ type });
  };

  useEffect(() => {
    const qType = searchParams.get('type');
    if (qType === 'wholesale' || qType === 'retail') {
      setSalesType(qType);
    }
  }, [searchParams]);

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="New Sale Entry"
        description="Unified sales billing register for counter retail and bulk wholesale mandi dispatches."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/sales"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-semibold text-[#1D1B1A] dark:text-white hover:bg-gray-50 shadow-2xs transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Sales</span>
            </Link>
          </div>
        }
      />

      {/* Top Segmented Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400">
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            Step 1: Choose Sales Channel
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Sparkles className="h-3 w-3 text-[#003A41] dark:text-[#58AFB7]" />
            Unified stock & ledger deduction
          </span>
        </div>

        <SalesTypeSelector selectedType={salesType} onChange={handleTypeChange} />
      </div>

      {/* Unified Form Area based on selected type */}
      <div className="pt-2">
        {salesType === 'retail' ? <RetailSaleForm /> : <WholesaleSaleForm />}
      </div>

      {/* Modal for Invoice Printing / Review */}
      <InvoiceModal />
    </PageContainer>
  );
}
