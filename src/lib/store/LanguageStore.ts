import { languages } from '$lib/util/Languages';
import { persistedStore } from './PersistedStore';

export const selectedLanguage = persistedStore('selectedLanguage', languages[0]);
