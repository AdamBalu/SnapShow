'use client';

import React from 'react';

import { UserCard } from '@/components/user/user-card';
import { UserSearch } from '@/components/community/user-search';
import { Pagination } from '@/components/ui/pagination';
import { usePagedUserList } from '@/hooks/user-list';
import { Loader } from '@/components/loader';

export const UserList = () => {
	const {
		data,
		page,
		setPage,
		pageCount,
		isPending,
		setQueryFilter,
		queryFilter
	} = usePagedUserList(10);

	return (
		<div className="lg:w-2/3 flex flex-col gap-4">
			<div className="flex w-full justify-between">
				<h1 className="font-sarpanch text-xl md:text-3xl text-white font-extrabold btn:is(input[type='radio']:checked:bg-red-500)">
					Search users
				</h1>
				<div className="join">
					{['all', 'friends'].map(option => (
						<input
							key={option}
							onChange={() =>
								setQueryFilter({
									...queryFilter,
									method: option === 'all' ? 'all' : 'friends'
								})
							}
							className="font-sarpanch join-item btn btn-sm w-16 border hover:border-primary border-primary border-solid bg-zinc-900 bg-opacity-70"
							type="radio"
							name="options"
							aria-label={option === 'all' ? 'All' : 'Friends'}
							checked={queryFilter.method === option}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-3 w-full items-center">
				<UserSearch
					setNameFilter={(nameFilter: string) =>
						setQueryFilter({ ...queryFilter, nameFilter })
					}
				/>

				{isPending && <Loader />}

				{data && (
					<>
						<ul className="flex flex-col gap-3 w-full">
							{data.map(user => (
								<li key={user.id} className="">
									<UserCard
										username={user.username}
										image={user.image}
										userId={user.id}
										friendsStatus={user.friendStatus}
									/>
								</li>
							))}
						</ul>
						<Pagination
							pageCount={pageCount}
							setPage={setPage}
							currentPage={page}
						/>
					</>
				)}
			</div>
		</div>
	);
};
