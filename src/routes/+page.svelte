<script lang="ts">
	import { goto } from '$app/navigation';

	const handleGoToApp = () => {
		goto('/app');
	};
</script>

<button class="btn" on:click={handleGoToApp}>Go to App</button>
