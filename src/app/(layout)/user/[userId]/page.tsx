import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { auth } from '@/auth';
import { InfiniteFeedById } from '@/components/post/infinite-feed-by-id';
import { Profile } from '@/components/profile/profile';
import { getPostsPaginatedFilterByUser } from '@/server-actions/posts';
import { getUser } from '@/server-actions/user';
import { type PostData } from '@/types/post-data';

type UserPageProps = {
	params: {
		userId: string;
	};
};

export const generateMetadata = async ({
	params
}: UserPageProps): Promise<Metadata> => {
	const user = await getUser(params.userId);

	return {
		title: user?.username ?? 'User Detail'
	};
};

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUser(params.userId);
	const session = await auth();
	const initialPosts = await getPostsPaginatedFilterByUser(
		1,
		10,
		params.userId
	);
	const filteredInitialPosts: PostData[] = initialPosts.filter(
		(post): post is PostData => post !== null
	);

	if (!user) {
		notFound();
	}

	return (
		<>
			<div className="flex flex-col items-center lg:px-32">
				<Profile user={user} />
			</div>
			<div className="flex justify-center">
				<div className="my-14 text-lg font-bold">━ User&apos;s posts: ━</div>
			</div>
			<div className="flex justify-center">
				<InfiniteFeedById
					initialPosts={filteredInitialPosts}
					session={session}
					userId={params.userId}
				/>
			</div>
		</>
	);
};
export default UserPage;
