import { useState } from 'react';

import {
	getPostsPaginatedFilterByEvent,
	getPostsPaginatedFilterByUser
} from '@/server-actions/posts';
import { type PostData } from '@/types/post-data';

export const usePostListById = (
	initialPosts: PostData[],
	pageSize: number,
	eventId?: string,
	userId?: string
) => {
	const [postsList, setPostsList] = useState<PostData[]>(initialPosts);
	const [hasMore, setHasMore] = useState(true);
	const [index, setIndex] = useState(2);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async () => {
		if (!loading) {
			setLoading(true);

			let posts: (PostData | null)[] = [];
			if (eventId) {
				posts = await getPostsPaginatedFilterByEvent(index, pageSize, eventId);
			} else if (userId) {
				posts = await getPostsPaginatedFilterByUser(index, pageSize, userId);
			}

			const filteredPosts: PostData[] = posts.filter(
				(post): post is PostData => post !== null
			);

			setHasMore(posts.length === pageSize);
			setPostsList(prevItems => [...prevItems, ...filteredPosts]);
			setIndex(prevIndex => prevIndex + 1);
			setLoading(false);
		}
	};

	return { postsList, hasMore, loading, fetchData };
};
