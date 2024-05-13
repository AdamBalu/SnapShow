import { useState } from 'react';

import { getPostsPaginated } from '@/server-actions/posts';

export const usePostList = (initialPosts: PostData[], pageSize: number) => {
	const [postsList, setPostsList] = useState<PostData[]>(initialPosts);
	const [hasMore, setHasMore] = useState(true);
	const [index, setIndex] = useState(2);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async (
		clearData: boolean,
		genreFilter: string | null,
		filterIndex?: number
	) => {
		if (!loading) {
			setLoading(true);

			const posts: any = await getPostsPaginated(index, pageSize, genreFilter);

			setHasMore(posts.length === pageSize);
			setPostsList(prevItems => (clearData ? posts : [...prevItems, ...posts]));
			setIndex(prevIndex => (filterIndex ? filterIndex + 1 : prevIndex + 1));
			setLoading(false);
		}
	};

	return { postsList, hasMore, loading, fetchData };
};
