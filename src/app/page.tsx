import { Banner } from '@/components/banner';
import { ExploreEventsButton } from '@/components/home/explore-events-button';
import { HomepageFilters } from '@/components/filters/homepage-filters';
import { PostsFeed } from '@/components/post/posts-feed';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import { auth } from '@/auth';

const Page = async () => {
	const session = await auth();
	return (
		<>
			<Header />
			<main className="container flex flex-col flex-grow pb-20 mt-10 px-3">
				{session === null && (
					<div className="flex flex-col lg:mx-24 md:justify-around gap-10 md:flex-row h-screen mt-[15%]">
						<Banner />
						<ExploreEventsButton />
					</div>
				)}

				<div id="homepage-main-content" className="pt-4">
					<HomepageFilters />
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
