import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Banner } from '@/components/banner';
import { auth } from '@/auth';

const Page = async () => {
	const session = await auth();

	if (session?.user) {
		redirect('/home');
	}

	return (
		<main className="container px-5 w-screen h-screen flex justify-center items-center">
			<div className="flex flex-col gap-10 md:gap-36 md:flex-row">
				<Banner />
				<Link
					href="/signin"
					className="flex flex-col justify-center md:justify-start"
				>
					<Button className="justify-center">Sign In</Button>
				</Link>
			</div>
		</main>
	);
};

export default Page;
