type PostTextProps = {
	content: string | null | undefined;
};

export const PostText = (props: PostTextProps) =>
	props.content && <span>{props.content}</span>;
