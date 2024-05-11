import { createRouteHandler } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';

import { ourFileRouter } from './core';

export const { GET, POST } = createRouteHandler({
	router: ourFileRouter
});

export const DELETE = async (request: Request) => {
	const data = await request.json();
	const newUrl = data.url.substring(data.url.lastIndexOf('/') + 1);
	const utapi = new UTApi();
	await utapi.deleteFiles(newUrl);

	return Response.json({ message: 'ok' });
};
