import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		console.log('login-clicked');
	}
};
