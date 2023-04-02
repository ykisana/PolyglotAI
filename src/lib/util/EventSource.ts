import type { ChatCompletionRequestMessage } from 'openai';
import { SSE } from 'sse.js';
import type { messageType } from '$lib/store/ChatManager';
import { selectedLanguage } from '$lib/store/LanguageStore';
import { get } from 'svelte/store';

export function createEventSource(messages: ChatCompletionRequestMessage[], type: messageType) {
	return new SSE('/api/chat', {
		headers: {
			'Content-Type': 'application/json'
		},
		payload: JSON.stringify({ messages: messages, type, language: get(selectedLanguage).language }),
		method: 'POST'
	});
}
