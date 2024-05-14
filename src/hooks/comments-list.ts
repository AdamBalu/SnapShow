import { useQuery } from '@tanstack/react-query';

import {
	getCommentsCount,
	getCommentsPaginated
} from '@/server-actions/comments';

export const useCommentsCount = (postId: string) =>
	useQuery({
		queryKey: ['comments', postId],
		queryFn: async () => await getCommentsCount(postId),
		refetchOnWindowFocus: false,
		enabled: true
	});

export const useCommentsListPaginated = (
	postId: string,
	page: number,
	pageSize: number
) =>
	useQuery({
		queryKey: ['comments', postId],
		queryFn: async () => await getCommentsPaginated(postId, page, pageSize),
		refetchOnWindowFocus: false,
		enabled: true
	});
