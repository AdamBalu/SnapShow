import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
	pageCount: number;
	currentPage: number;
	setPage: (page: number) => void;
};

export const Pagination = ({
	pageCount,
	setPage,
	currentPage
}: PaginationProps) => (
	<div className="join">
		<button
			onClick={() => setPage(currentPage - 1)}
			disabled={currentPage === 1}
			className="btn w-12 bg-opacity-70 join-item bg-zinc-900 hover:bg-zinc-900 text-primary border-zinc-900 border-none disabled:bg-zinc-900 disabled:opacity-70 disabled:text-gray-500"
		>
			<ChevronLeft />
		</button>
		<button
			disabled
			className="btn w-12 font-sarpanch join-item bg-zinc-900 bg-opacity-70 text-primary hover:bg-zinc-900 disabled:bg-zinc-900 disabled:text-primary disabled:opacity-70"
		>
			{currentPage}
		</button>
		<button
			onClick={() => setPage(currentPage + 1)}
			disabled={currentPage === pageCount}
			className="btn w-12 bg-opacity-70 join-item bg-zinc-900 hover:bg-zinc-900 text-primary border-zinc-900 border-none disabled:bg-zinc-900  disabled:opacity-70 disabled:text-gray-500"
		>
			<ChevronRight />
		</button>
	</div>
);
