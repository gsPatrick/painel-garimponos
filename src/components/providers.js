'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/react-query';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster position="top-right" richColors />
        </QueryClientProvider>
    );
}
