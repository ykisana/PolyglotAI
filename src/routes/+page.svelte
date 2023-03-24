<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;
	if (!data.session) {
		goto('login', { replaceState: false });
	}
</script>

{#if data.session}
	<main>Active Session from {data.session?.user.email}</main>
	<form action="/logout" method="POST">
		<Button text="Logout" />
	</form>
{/if}
