<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';

	export let message: ChatCompletionRequestMessage;

	//const position = role == 'assistant' ? 'self-start' : 'self-end';
	const position = message.role == 'assistant' ? 'chat-start' : 'chat-end';
</script>

<div class={`chat ${position}`}>
	<div class="chat-bubble">
		{message.content}
	</div>
</div>
