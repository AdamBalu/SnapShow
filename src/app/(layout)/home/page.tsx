import { Banner } from '@/components/banner';
import { ExploreEventsButton } from '@/components/home/explore-events-button';
import { HomepageFilters } from '@/components/filters/homepage-filters';
import { PostsFeed } from '@/components/post/posts-feed';

const Page = async () => (
	<div>
		<div className="flex flex-col lg:mx-24 md:justify-around gap-10 md:flex-row h-screen mt-[15%]">
			<Banner />
			<ExploreEventsButton />
		</div>

		<div id="homepage-main-content" className="pt-4">
			<HomepageFilters />
			<div className="flex justify-center">
				<PostsFeed />
			</div>
		</div>
	</div>
);

export default Page;
