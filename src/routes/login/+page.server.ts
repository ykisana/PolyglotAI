import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const actions: Actions = {
	default: async ({ cookies, request, locals }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		const { data, error } = await locals.supabase.auth.signInWithPassword({
			email: email,
			password: password
		});
		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}
		if (data.session) {
			cookies.set('session', data.session.access_token, {
				// send cookie for every page
				path: '/',
				// server side only cookie so you can't use `document.cookie`
				httpOnly: true,
				// only requests from same site can send cookies
				// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
				sameSite: 'strict',
				// only sent over HTTPS in production
				secure: process.env.NODE_ENV === 'production',
				// set cookie to expire after a month
				maxAge: 60 * 60 * 24 * 30
			});
		}

		throw redirect(303, '/');
	}
};
