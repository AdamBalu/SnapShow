import { useQuery } from '@tanstack/react-query';

import { getCommentsCount } from '@/server-actions/comments';

export const useCommentsList = (postId: string) =>
	useQuery({
		queryKey: ['comments', postId],
		queryFn: async () => await getCommentsCount(postId),
		refetchOnWindowFocus: false,
		enabled: true
	});
