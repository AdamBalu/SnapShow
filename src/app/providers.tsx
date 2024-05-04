'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { extractRouterConfig } from 'uploadthing/server';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';

import { ourFileRouter } from '@/app/api/uploadthing/core';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
		<SessionProvider>{children}</SessionProvider>
	</QueryClientProvider>
);
