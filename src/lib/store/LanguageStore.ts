import { languages, type Language } from '$lib/util/Languages';
import { writable } from 'svelte/store';

export const selectedLanguage = writable<Language>(languages[0]);

//TODO: STORE VALUE TO LOCAL
