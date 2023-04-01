<script>
	import { page } from '$app/stores';
	import { MenuItems } from '$lib/util/MenuItems';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
</script>

<div class="menu h-100 p-4 w-80 bg-base-100 text-base-content hidden md:block">
	<ul>
		{#each MenuItems as menuItem}
			<li>
				<a href={menuItem.url} class:active={$page.url.pathname === menuItem.url}
					><div>
						<FontAwesomeIcon icon={menuItem.icon} />
					</div>
					{menuItem.title}</a
				>
			</li>
		{/each}
	</ul>
</div>
