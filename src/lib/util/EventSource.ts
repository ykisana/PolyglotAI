import type { ChatCompletionRequestMessage } from 'openai';
import { SSE } from 'sse.js';
import type { messageType } from '$lib/store/ChatManager';

export function createEventSource(messages: ChatCompletionRequestMessage[], type: messageType) {
	return new SSE('/api/chat', {
		headers: {
			'Content-Type': 'application/json'
		},
		payload: JSON.stringify({ messages: messages, type }),
		method: 'POST'
	});
}
