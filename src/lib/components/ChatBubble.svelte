<script lang="ts">
	import type { Vocabulary } from '$lib/store/ChatManager';

	export let message: string;
	export let role: string;
	export let vocab: Vocabulary[] | undefined = undefined;
	export let isLoadingVocab: boolean = false;

	//const position = role == 'assistant' ? 'self-start' : 'self-end';
	const position = role == 'assistant' ? 'chat-start' : 'chat-end';
</script>

<div class={`chat ${position}`}>
	<div class="chat-bubble">
		{message}
		{#if role == 'assistant'}
			<div>
				{#if isLoadingVocab}
					Vocabulary: Loading...
				{:else if vocab && vocab.length}
					{#each vocab as v}
						<span class="mt-1 mr-1 tooltip tooltip-secondary" data-tip={v.definition}>
							<button class="btn btn-secondary btn-xs">{v.word}</button>
						</span>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>
