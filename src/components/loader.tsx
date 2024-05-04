import { cn } from '@/lib/cn';

export const Loader = ({ className = '' }) => (
	<span
		className={cn('loading loading-spinner loading-lg bg-primary', className)}
	/>
);
