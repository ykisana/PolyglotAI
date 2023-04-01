<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	const handleGoToApp = () => {
		goto('/app');
	};
</script>

<button class="btn" on:click={handleGoToApp}>Go to App</button>
