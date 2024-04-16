import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import React from 'react';

import { Providers } from './providers';
import { Navigation } from '@/components/navigation/navigation';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
	title: 'SnapShow'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body className={poppins.className}>
			<Providers>
				<Navigation />

				<main className="container my-8">{children}</main>
			</Providers>
			<Toaster position="bottom-right" richColors />
		</body>
	</html>
);

export default RootLayout;
