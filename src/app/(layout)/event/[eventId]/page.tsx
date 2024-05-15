import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { auth } from '@/auth';
import { EventDetail } from '@/components/event/event-detail';
import { LogoLoader } from '@/components/logo-loader';
import { InfiniteFeedById } from '@/components/post/infinite-feed-by-id';
import { getEvent } from '@/server-actions/events';
import { getPostsPaginatedFilterByEvent } from '@/server-actions/posts';
import { type PostData } from '@/types/post-data';

type EventPageProps = {
	params: {
		eventId: string;
	};
};

export const generateMetadata = async ({
	params
}: EventPageProps): Promise<Metadata> => {
	const event = await getEvent(params.eventId);

	return {
		title: event?.name ?? 'Event Detail',
		openGraph: {
			images: [event?.imageUrl ?? '/static/event-placeholder.png']
		}
	};
};

const EventPage = async ({ params }: EventPageProps) => {
	const event = await getEvent(params.eventId);
	if (!event) {
		notFound();
	}
	const session = await auth();
	const initialPosts = await getPostsPaginatedFilterByEvent(
		1,
		10,
		params.eventId
	);
	const filteredInitialPosts: PostData[] = initialPosts.filter(
		(post): post is PostData => post !== null
	);

	return (
		<div className="flex flex-col items-center">
			<Suspense fallback={<LogoLoader />}>
				<EventDetail event={event} />
				<div className="my-14 text-lg font-bold">━ Posts for this event: ━</div>
				<div>
					<InfiniteFeedById
						initialPosts={filteredInitialPosts}
						session={session}
						eventId={params.eventId}
					/>
				</div>
			</Suspense>
		</div>
	);
};
export default EventPage;
