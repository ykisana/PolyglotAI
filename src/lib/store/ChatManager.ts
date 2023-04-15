import type { ChatCompletionRequestMessage } from 'openai';
import { getVocab } from '$lib/util/GetVocab';
import { writable } from 'svelte/store';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

export interface MessageWithVocab {
	message: ChatCompletionRequestMessage;
	vocab?: Vocabulary[];
	isLoadingVocab?: boolean;
}

export enum messageType {
	CHAT,
	VOCAB
}

export interface Vocabulary {
	word: String;
	definition: String;
}

export class ChatManager {
	chatMessages: ChatCompletionRequestMessage[] = [];
	messagesWithVocab = writable<MessageWithVocab[]>([]);

	supbase: SupabaseClient<Database>;

	query: string = '';
	answer: string = '';
	loading: boolean = false;

	constructor(supabase: SupabaseClient<Database>) {
		this.supbase = supabase;
	}

	addUserMessage = async () => {
		this.chatMessages = [...this.chatMessages, { role: 'user', content: this.query }];
		this.messagesWithVocab.update((messages) => [
			...messages,
			{ message: this.chatMessages.at(-1) } as MessageWithVocab
		]);

		const { error } = await this.supbase
			.from('messages')
			.insert({ message: JSON.stringify(this.chatMessages.at(-1)) });

		this.query = '';
	};

	addAssistantMessage = () => {
		this.chatMessages = [...this.chatMessages, { role: 'assistant', content: this.answer }];
		this.answer = '';
		this.messagesWithVocab.update((messages) => [
			...messages,
			{ message: this.chatMessages.at(-1), isLoadingVocab: true } as MessageWithVocab
		]);
	};

	addVocab = async () => {
		const vocab = (await getVocab([this.chatMessages.at(-1)], messageType.VOCAB)) as Vocabulary[];
		this.messagesWithVocab.update((messages) => {
			messages[messages.length - 1].vocab = vocab;
			messages[messages.length - 1].isLoadingVocab = false;
			return messages;
		});
	};

	handleError = (err: any) => {
		this.loading = false;
		this.query = '';
		this.answer = '';

		console.log(err);
	};

	handleVocabError = (err: any) => {
		console.log(err);
		this.messagesWithVocab.update((messages) => {
			messages[messages.length - 1].isLoadingVocab = false;
			return messages;
		});
	};
}
