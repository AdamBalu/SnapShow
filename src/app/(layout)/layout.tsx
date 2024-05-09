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
		<main className="container flex flex-col flex-grow pb-20 mt-10 px-3">
			{children}
		</main>
		<Footer />
	</>
);

export default RootLayout;
