'use server';

import { auth } from '@/auth';
import { Banner } from '@/components/banner';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { ExploreEventsButton } from '@/components/home/explore-events-button';
import { Homepage } from '@/components/post/homepage';
import { getUserEvents } from '@/server-actions/events';
import { getAllGenres } from '@/server-actions/genres';
import { getPostsPaginated } from '@/server-actions/posts';

const Page = async () => {
	const session = await auth();
	// this is for the newPost component
	const events = session?.user.id
		? await getUserEvents(session?.user.id)
		: undefined;

	let genres = await getAllGenres();
	console.log(genres);
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
	let initialPosts = await getPostsPaginated(1, 3);
	if (initialPosts === null || initialPosts.length === 0) {
		initialPosts = [];
	}

	const filteredInitialPosts: PostData[] = initialPosts.filter(
		(post): post is PostData => post !== null
	);

	return (
		<>
			<Header />
			<main className="container flex flex-col flex-grow pb-20 mt-10 px-3">
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
			</main>
			<Footer />
		</>
	);
};

export default Page;
