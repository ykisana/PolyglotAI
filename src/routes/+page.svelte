<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import type { PageData } from './$types';
	import { SSE } from 'sse.js';
	import { getEventSource, messageType } from '$lib/util/EventSource';

	export let data: PageData;

	interface Vocabulary {
		key: String;
		value: String;
	}

	interface MessageWithVocab {
		message: ChatCompletionRequestMessage;
		vocab: Vocabulary;
	}

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;

	let chatMessages: ChatCompletionRequestMessage[] = [];
	let messagesWithVocab: MessageWithVocab[] = [];

	const submitChat = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];

		const eventSource = getEventSource(chatMessages, messageType.CHAT);
		query = '';
		eventSource.addEventListener('error', handleError);
		eventSource.addEventListener('message', (e) => {
			try {
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					const vocabEventSource = getEventSource(chatMessages, messageType.VOCAB);
					vocabEventSource.addEventListener('error', handleError);
					vocabEventSource.stream();

					answer = '';
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				console.log(err);
			}
		});
		eventSource.stream();
	};

	function handleError<T>(err: T) {
		loading = false;
		query = '';
		answer = '';

		console.log(err);
	}
</script>

<main>
	Active Session from {data.session?.user.email}
	<form action="/logout" method="POST">
		<Button text="Logout" />
	</form>
	{#each chatMessages as message}
		<p>{message.content}</p>
	{/each}

	<form
		on:submit|preventDefault={() => {
			submitChat();
		}}
	>
		<input type="text" bind:value={query} />
		<button type="submit">Send</button>
	</form>
</main>
