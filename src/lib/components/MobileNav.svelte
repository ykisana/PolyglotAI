<script>
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { MenuItems } from '$lib/util/MenuItems';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<div class="btm-nav lg:hidden">
	{#each MenuItems as menuItem}
		<button
			class:active={$page.url.pathname === menuItem.url}
			on:click={() => {
				goto(menuItem.url);
			}}
		>
			<div>
				<FontAwesomeIcon icon={menuItem.icon} />
			</div>
		</button>
	{/each}
</div>
