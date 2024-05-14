import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const deletePhoto = async (url: string) => {
	const response = await fetch('api/uploadthing', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url
		})
	});

	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.error);
	}
};

export const useDeletePhotoMutation = () =>
	useMutation({
		mutationFn: deletePhoto,
		onError: _ => {
			toast.error(`Error while deleting image.`);
		}
	});
