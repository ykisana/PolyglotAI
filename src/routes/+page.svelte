<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';
	import { getEventSource, messageType, type Vocabulary } from '$lib/util/EventSource';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import { getVocab } from '$lib/util/GetVocab';

	interface MessageWithVocab {
		message: ChatCompletionRequestMessage;
		vocab?: Vocabulary[];
		isLoadingVocab?: boolean;
	}

	let query: string = '';
	let answer: string = '';
	let loading: boolean = false;

	let chatMessages: ChatCompletionRequestMessage[] = [];
	let messagesWithVocab: MessageWithVocab[] = [];

	const submitChat = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		messagesWithVocab = [
			...messagesWithVocab,
			{ message: chatMessages.at(-1) } as MessageWithVocab
		];

		const eventSource = getEventSource(chatMessages, messageType.CHAT);
		query = '';
		eventSource.addEventListener('error', handleError);
		eventSource.addEventListener('message', async (e) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					messagesWithVocab = [
						...messagesWithVocab,
						{ message: chatMessages.at(-1), isLoadingVocab: true } as MessageWithVocab
					];

					const vocab = (await getVocab([chatMessages.at(-1)], messageType.VOCAB)) as Vocabulary[];
					messagesWithVocab[messagesWithVocab.length - 1].vocab = vocab;
					messagesWithVocab[messagesWithVocab.length - 1].isLoadingVocab = false;
					console.log(messagesWithVocab);
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
	{#each messagesWithVocab as message}
		<ChatBubble
			role={message.message.role}
			message={message.message.content}
			vocab={message.vocab}
			isLoadingVocab={message.isLoadingVocab}
		/>
	{/each}
	{#if answer}
		<ChatBubble role="assistant" message={answer} />
	{/if}
	{#if loading}
		<ChatBubble role="assistant" message="Loading.." />
	{/if}
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
