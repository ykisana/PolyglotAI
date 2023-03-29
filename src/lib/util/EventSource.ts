import type { ChatCompletionRequestMessage } from 'openai';
import { SSE } from 'sse.js';

export enum messageType {
	CHAT,
	VOCAB
}

export interface Vocabulary {
	word: String;
	definition: String;
}

export function getEventSource(messages: ChatCompletionRequestMessage[], type: messageType) {
	return new SSE('/api/chat', {
		headers: {
			'Content-Type': 'application/json'
		},
		payload: JSON.stringify({ messages: messages, type }),
		method: 'POST'
	});
}

export async function messagesListener(e: MessageEvent<any>, answer: string) {
	try {
		if (e.data === '[DONE]') {
			return { role: 'assistant', content: answer } as ChatCompletionRequestMessage;
		}

		const completionResponse = JSON.parse(e.data);
		const [{ delta }] = completionResponse.choices;

		if (delta.content) {
			answer = (answer ?? '') + delta.content;
		}
	} catch (err) {
		console.log(err);
	}
}
