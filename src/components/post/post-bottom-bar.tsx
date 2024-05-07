import { LucideMessageCircle, LucideThumbsUp } from 'lucide-react';

import { PostButton } from './post-button';

export const PostBottomBar = () => (
	<div className="flex justify-evenly">
		<PostButton icon={<LucideThumbsUp />} text="Like" />
		<PostButton icon={<LucideMessageCircle />} text="Comment" />
	</div>
);
