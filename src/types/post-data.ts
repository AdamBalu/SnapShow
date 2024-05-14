export type PostData = {
	id: string;
	authorName: string | null | undefined;
	comment: string | null;
	userId: string;
	authorPic: string | null | undefined;
	isDeleted: boolean | null;
	eventId: string;
	datetime: string | null;
	venueAddress: string | null | undefined;
	country: string | null | undefined;
	venueName: string | null | undefined;
	eventName: string | null | undefined;
	reactions: {
		id: string;
		userId: string;
		postId: string;
		userPic: string | null | undefined;
	}[];
	photos: {
		id: string;
		postId: string;
		url: string;
	}[];
};
