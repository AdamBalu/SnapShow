import React from 'react';

import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<>
		<Header />
		<main className="container h-screen flex-col flex-grow my-8 pb-20">
			{children}
		</main>
		<Footer />
	</>
);

export default RootLayout;
