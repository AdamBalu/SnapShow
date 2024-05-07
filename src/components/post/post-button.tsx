import React from 'react';

type PostButtonType = {
	text?: string;
	icon: React.ReactNode;
};

export const PostButton = (props: PostButtonType) => (
	<button className="flex align-middle items-center">
		<div className="p-2">{props.icon}</div>
		<div className="p-2 pt-3">{props.text}</div>
	</button>
);
