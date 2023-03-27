<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';
	import type { PageData } from './$types';
	import { getEventSource, messageType } from '$lib/util/EventSource';
	import ChatBubble from '$lib/components/ChatBubble.svelte';

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

Active Session from {data.session?.user.email}
<form action="/logout" method="POST">
	<button class="btn">Log Out</button>
</form>
<div class="flex flex-col">
	{#each chatMessages as message}
		<ChatBubble role={message.role}>{message.content}</ChatBubble>
	{/each}
</div>

<form
	on:submit|preventDefault={() => {
		submitChat();
	}}
>
	<input
		type="text"
		placeholder="Type here"
		bind:value={query}
		class="input input-bordered input-primary w-full max-w-x"
	/>
	<button type="submit" class="btn">Send</button>
</form>
