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

<div class="navbar bg-base-100">
	<div class="navbar-start" />
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-xl">PolyglotAI</a>
	</div>
</div>
<main>
	<SideBarView><slot /></SideBarView>
	<MobileView />
</main>
