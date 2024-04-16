import Link from 'next/link';

export const NavLink = ({
	redirectLink,
	label
}: {
	redirectLink: string;
	label: string;
}) => (
	<li className="text-xl text-white uppercase font-bold">
		<Link href={redirectLink}>{label}</Link>
	</li>
);
