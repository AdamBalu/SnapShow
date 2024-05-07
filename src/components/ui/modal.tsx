import {
	type HTMLProps,
	type PropsWithChildren,
	useCallback,
	useEffect
} from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/cn';

type ModalProps = HTMLProps<HTMLDivElement> &
	PropsWithChildren & {
		title: string;
		modalId: string;
		open: boolean;
		close: () => void;
	};

const Modal = ({
	title,
	modalId,
	children,
	open,
	close,
	className,
	...props
}: ModalProps) => {
	const escFunction = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				close();
			}
		},
		[close]
	);

	useEffect(() => {
		if (open && document) {
			(document.getElementById(modalId) as HTMLFormElement).showModal();
		} else if (document) {
			(document.getElementById(modalId) as HTMLFormElement).close();
		}
	}, [open, modalId]);

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [escFunction]);

	return (
		<dialog id={modalId} className="modal">
			<div
				{...props}
				className={cn(
					'modal-box flex flex-col justify-start border border-solid border-primary rounded-3xl bg-zinc-900',
					className
				)}
			>
				<div className="flex justify-between align-middle">
					<p className="text-center pb-4">{title}</p>
					<button
						onClick={close}
						className="btn btn-sm btn-circle btn-ghost -mt-1"
					>
						<X color="#08d9d6" />
					</button>
				</div>
				{children}
			</div>
		</dialog>
	);
};

export default Modal;
