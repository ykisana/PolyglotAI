<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import SideBarView from '$lib/components/SideBarView.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';

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

<main class="relative">
	<div class="navbar bg-base-100 fixed">
		<div class="navbar-start" />
		<div class="navbar-center">
			<a class="btn btn-ghost normal-case text-xl">PolyglotAI</a>
		</div>
		<div class="navbar-end" />
	</div>
	<SideBarView><slot /></SideBarView>
	<MobileNav />
</main>
