'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		<SessionProvider>{children}</SessionProvider>
	</QueryClientProvider>
);
