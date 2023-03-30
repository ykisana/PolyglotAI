<script lang="ts">
	import { createEventSource } from '$lib/util/EventSource';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	import { ChatManager, messageType } from '$lib/store/ChatManager';

	const chatManager = new ChatManager();
	const { messagesWithVocab } = chatManager;
	const submitChat = async () => {
		chatManager.loading = true;
		chatManager.addUserMessage();

		const eventSource = createEventSource(chatManager.chatMessages, messageType.CHAT);

		eventSource.addEventListener('error', chatManager.handleError);
		eventSource.addEventListener('message', async (e) => {
			try {
				chatManager.loading = false;
				if (e.data === '[DONE]') {
					chatManager.addAssistantMessage();
					await chatManager.addVocab();
					console.log(chatManager.messagesWithVocab);
					return;
				}

				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;

				if (delta.content) {
					chatManager.answer = (chatManager.answer ?? '') + delta.content;
				}
			} catch (err) {
				chatManager.handleVocabError(err);
			}
		});
		eventSource.stream();
	};
</script>

<div class="flex flex-col w-full overflow-scroll">
	{#each $messagesWithVocab as message}
		<ChatBubble
			role={message.message.role}
			message={message.message.content}
			vocab={message.vocab}
			isLoadingVocab={message.isLoadingVocab}
		/>
	{/each}
	{#if chatManager.answer}
		<ChatBubble role="assistant" message={chatManager.answer} />
	{/if}
	{#if chatManager.loading}
		<ChatBubble role="assistant" message="Loading..." />
	{/if}
</div>

<form
	class="flex gap-2 w-full max-w-x pb-2"
	on:submit|preventDefault={() => {
		submitChat();
	}}
>
	<input
		type="text"
		placeholder="Type here"
		bind:value={chatManager.query}
		class="input input-bordered input-primary w-full"
	/>
	<button type="submit" class="btn">Send</button>
</form>
