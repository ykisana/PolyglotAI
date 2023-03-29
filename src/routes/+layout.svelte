<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import SideBarView from '$lib/components/DesktopView.svelte';
	import MobileView from '$lib/components/MobileView.svelte';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>PolyglotAI</title>
</svelte:head>

<main>
	<SideBarView><slot /></SideBarView>
	<MobileView />
</main>
