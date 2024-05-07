import { HomepageFilters } from '../../../components/filters/homepage-filters';
import { PostsFeed } from '../../../components/post/posts-feed';

const Page = () => (
	<>
		<HomepageFilters />
		<div className="flex justify-center">
			<PostsFeed />
		</div>
	</>
);

export default Page;
