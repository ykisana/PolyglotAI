import {
	faMessage,
	faBoxArchive,
	faLanguage,
	faBook,
	type IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
	title: string;
	url: string;
	icon: IconDefinition;
}

export const MenuItems: MenuItem[] = [
	{ title: 'Chat', url: '/app', icon: faMessage },
	{ title: 'Conversations', url: '/app/conversations', icon: faBoxArchive },
	{ title: 'Translate', url: '/app/translate', icon: faLanguage },
	{ title: 'Vocabulary', url: '/app/vocab', icon: faBook }
];
