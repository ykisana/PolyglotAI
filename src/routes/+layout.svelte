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

<main class="relative grid grid-rows-layout">
	<div class="navbar bg-base-100 absolute w-full z-10">
		<div class="navbar-start" />
		<div class="navbar-center">
			<a class="btn btn-ghost normal-case text-xl">PolyglotAI</a>
		</div>
		<div class="navbar-end" />
	</div>
	<div class="row-start-1">
		<SideBarView><slot /></SideBarView>
		<MobileNav />
	</div>
</main>

<style>
	.grid-rows-layout {
		grid-template-rows: auto 1fr;
	}
</style>
