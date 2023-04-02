import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const persistedStore = (key: string, initial: any) => {
	const storedData = browser ? localStorage.getItem(key) : null;
	const data = storedData ? JSON.parse(storedData) : initial;

	const store: Writable<any> = writable(data);
	store.subscribe((val) => browser && localStorage.setItem(key, JSON.stringify(val)));
	return store;
};
