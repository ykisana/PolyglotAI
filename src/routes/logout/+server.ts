import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	console.log('logoutClicked');
	throw redirect(300, '/');
};
