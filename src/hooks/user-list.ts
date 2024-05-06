import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUsers, getUsersCount } from '@/server-actions/user';

export type UserFilter = {
	method: 'all' | 'friends';
	nameFilter?: string;
};

export const usePagedUserList = (pageSize: number) => {
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState<UserFilter>({
		method: 'all',
		nameFilter: undefined
	});
	const [filterChanged, setFilterChanged] = useState(true);
	const [pageCount, setPageCount] = useState(0);

	const setQueryFilter = (filter: UserFilter) => {
		setFilter(filter);
		setFilterChanged(true);
	};

	const query = useQuery({
		queryKey: ['users', filter, page],
		queryFn: async () => {
			if (filterChanged) {
				// Check for filter change, so we don't fetch count on every page change
				const userCount = await getUsersCount(filter.method, filter.nameFilter);
				setPageCount(Math.ceil(userCount / pageSize));
				setFilterChanged(false);
				setPage(1);
			}

			return await getUsers(page, pageSize, filter.method, filter.nameFilter);
		}
	});

	return {
		page,
		setPage,
		pageCount,
		queryFilter: filter,
		setQueryFilter,
		...query
	};
};
