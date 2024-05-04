import React from 'react';

const SignInLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<main className="container h-screen flex justify-center items-center">
		{children}
	</main>
);

export default SignInLayout;
