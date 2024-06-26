import { useState } from 'react';

import { getPostsPaginated } from '@/server-actions/posts';
import { type PostData } from '@/types/post-data';

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

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const posts: any = await getPostsPaginated(
				filterIndex ?? index,
				pageSize,
				genreFilter
			);

			const filteredPosts: PostData[] = posts.filter(
				(post: PostData) => post !== null
			);

			setHasMore(posts.length === pageSize);
			setPostsList(prevItems =>
				clearData ? filteredPosts : [...prevItems, ...filteredPosts]
			);
			setIndex(prevIndex => (filterIndex ? filterIndex + 1 : prevIndex + 1));
			setLoading(false);
		}
	};

	return { postsList, hasMore, loading, fetchData };
};
