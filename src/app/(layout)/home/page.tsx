import { HomepageFilters } from '../../../components/filters/homepage-filters';
import { PostsFeed } from '../../../components/post/posts-feed';

import { db } from '@/db';
import { genres } from '@/db/schema/genre';
import { Banner } from '@/components/banner';
import { ExploreEventsButton } from '@/components/home/explore-events-button';

const Page = async () => {
	const genreList = await db.select().from(genres);
	return (
		<div>
			<div className="flex flex-col lg:mx-24 md:justify-around gap-10 md:flex-row h-screen mt-60">
				<Banner />
				<ExploreEventsButton />
			</div>

			<div id="main-page-start">
				{genreList.map(genre => (
					<div key={genre.id}>{genre.name}</div>
				))}
			</div>
		</div>
	</>
);

export default Page;
