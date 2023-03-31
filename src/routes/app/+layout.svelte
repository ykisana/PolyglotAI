<script lang="ts">
	import SideBarView from '$lib/components/SideBarView.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
</script>

<svelte:head>
	<title>PolyglotAI</title>
</svelte:head>

<main class="relative grid grid-rows-layout">
	<div class="navbar bg-base-100 absolute w-full z-10">
		<div class="navbar-start" />
		<div class="navbar-center">
			<a class="btn btn-ghost normal-case text-xl" href="/app">PolyglotAI</a>
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
