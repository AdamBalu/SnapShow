import { auth } from '@/auth';
import { Banner } from '@/components/banner';
import { HomepageFilters } from '@/components/filters/homepage-filters';
import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { ExploreEventsButton } from '@/components/home/explore-events-button';
import { NewPost } from '@/components/post/new-post-form/new-post';
import { PostsFeed } from '@/components/post/posts-feed';
import { getUserEvents } from '@/server-actions/events';

const Page = async () => {
	const session = await auth();
	const events = session?.user.id
		? await getUserEvents(session?.user.id)
		: undefined;

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

				<div id="homepage-main-content">
					<div className="flex justify-between h-20 mb-10">
						<HomepageFilters />
						{session?.user && events && (
							<NewPost
								userId={session.user.id}
								profilePicture={session.user.image}
								events={events}
							/>
						)}
					</div>
					<div className="flex justify-center">
						<PostsFeed />
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Page;
