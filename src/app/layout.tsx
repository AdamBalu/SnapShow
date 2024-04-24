import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import React from 'react';

import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

import { Providers } from './providers';

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
		<body className={`h-screen flex flex-col ${poppins.className}`}>
			<Providers>
				<Header />
				<main className="container flex-col flex-grow my-8">{children}</main>
				<Footer />
			</Providers>
			<Toaster position="bottom-right" richColors />
		</body>
	</html>
);

export default RootLayout;
