<script lang="ts">
	export let message: string;
	export let role: string;

	//const position = role == 'assistant' ? 'self-start' : 'self-end';
	const position = role == 'assistant' ? 'chat-start' : 'chat-end';
</script>

<div class={`chat ${position}`}>
	<div class="chat-bubble">
		{message}
	</div>
</div>
