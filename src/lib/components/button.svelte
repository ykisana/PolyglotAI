<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text: string;

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('buttonClick');
	};
</script>

<button class="button" on:click={handleClick}>
	{text}
</button>

<style lang="scss">
	.button {
		color: grey;
		border: none;
		border-radius: 0.5rem;
		padding: 1rem 2rem;
		font-size: 1.6rem;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			text-decoration: none;
		}
	}
</style>
