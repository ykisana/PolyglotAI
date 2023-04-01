<script lang="ts">
	import MobileNav from '$lib/components/MobileNav.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<svelte:head>
	<title>PolyglotAI</title>
</svelte:head>

<div class="h-full w-full flex flex-col">
	<NavBar />
	<div class="flex max-h-full h-full flex-1">
		<SideBar />
		<slot />
	</div>
	<MobileNav />
</div>
