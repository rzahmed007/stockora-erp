import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/app/layouts/AppLayout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center p-6">
              <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                  S
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Stockora ERP Foundation
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Project foundation setup initialized successfully. Ready for component and module implementation.
                  </p>
                </div>
                <div className="pt-2 text-xs text-muted-foreground border-t border-border">
                  Trading • Wholesale • Retail • Inventory • Warehouse
                </div>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

