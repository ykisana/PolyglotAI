import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals }) => {
	await locals.supabase.auth.signOut();
	// eat the cookie
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0)
	});
	throw redirect(303, '/');
};
