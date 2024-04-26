'use client';

import Link from 'next/link';
import { type ComponentProps } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';

type NavLinkProps = ComponentProps<typeof Link> & {
	label: string;
};

export const NavLink = ({ className, href, label, ...props }: NavLinkProps) => {
	const pathname = usePathname();

	return (
		<li className="uppercase">
			<Link
				className={cn(
					'btn btn-ghost font-extrabold text-xl',
					`${pathname === href && 'bg-neutral-700'}`,
					className
				)}
				href={href}
				{...props}
			>
				{label}
			</Link>
		</li>
	);
};
