import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/context';
import { SalesProvider } from '@/features/sales';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SalesProvider>{children}</SalesProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
