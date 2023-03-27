<script lang="ts">
	export let role: string;
	console.log(role);

	const position = role == 'assistant' ? 'self-start' : 'self-end';
</script>

<div class={`chat ${position}`}>
	<div class="chat-bubble">
		<slot />
	</div>
</div>
