import { type Metadata } from 'next';

import { auth } from '@/auth';
import { Banner } from '@/components/banner';
import { ExploreEventsButton } from '@/components/home/explore-events-button';
import { Homepage } from '@/components/post/homepage';
import { getUserEvents } from '@/server-actions/events';
import { getAllGenres } from '@/server-actions/genres';
import { getPostsPaginated } from '@/server-actions/posts';
import { type PostData } from '@/types/post-data';

export const metadata: Metadata = {
	title: 'Home'
};

const Page = async () => {
	const session = await auth();
	// this is for the newPost component
	const events = session?.user.id
		? await getUserEvents(session?.user.id)
		: undefined;

	let genres = await getAllGenres();
	const allGenres = {
		id: 'allgenres',
		name: 'all genres',
		isDeleted: false,
		icon: ''
	};
	genres = [allGenres, ...genres];

	// TODO: change this for partial fetching
	// const initialPosts = await db.query.posts.findMany({
	// 	with: { reactions: true, photos: true },
	// 	orderBy: [desc(posts.datetime)]
	// });
	let initialPosts = await getPostsPaginated(1, 10, null);
	if (initialPosts === null || initialPosts.length === 0) {
		initialPosts = [];
	}

	const filteredInitialPosts: PostData[] = initialPosts.filter(
		(post): post is PostData => post !== null
	);

	return (
		<>
			{!session && (
				<div className="flex flex-col lg:mx-24 md:justify-around gap-10 md:flex-row h-screen mt-[15%]">
					<Banner />
					<ExploreEventsButton />
				</div>
			)}
			<Homepage
				initialPosts={filteredInitialPosts}
				events={events}
				session={session}
				genres={genres}
			/>
		</>
	);
};

export default Page;
