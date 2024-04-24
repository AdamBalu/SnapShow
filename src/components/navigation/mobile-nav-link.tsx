'use client';

import Link from 'next/link';
import { type ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { cn } from '@/lib/cn';

type MobileNavLinkProps = ComponentProps<typeof Link> & {
	label: string;
	icon: string;
	selectedIcon: string;
};

export const MobileNavLink = ({
	icon,
	selectedIcon,
	className,
	href,
	...props
}: MobileNavLinkProps) => {
	const pathname = usePathname();

	return (
		<li className="uppercase">
			<Link
				className={cn('btn btn-square btn-ghost', className)}
				href={href}
				{...props}
			>
				{pathname !== href && (
					<Image width="28" height="28" src={icon} alt="icon" />
				)}
				{pathname === href && (
					<Image width="28" height="28" src={selectedIcon} alt="icon" />
				)}
			</Link>
		</li>
	);
};
