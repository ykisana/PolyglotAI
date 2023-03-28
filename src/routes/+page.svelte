<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';
	import { getEventSource, messageType } from '$lib/util/EventSource';
	import ChatBubble from '$lib/components/ChatBubble.svelte';

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

<div class="flex flex-col w-full overflow-scroll">
	{#each chatMessages as message}
		<ChatBubble {message} />
	{/each}
</div>

<form
	class="flex gap-2 w-full max-w-x"
	on:submit|preventDefault={() => {
		submitChat();
	}}
>
	<input
		type="text"
		placeholder="Type here"
		bind:value={query}
		class="input input-bordered input-primary w-full"
	/>
	<button type="submit" class="btn">Send</button>
</form>
