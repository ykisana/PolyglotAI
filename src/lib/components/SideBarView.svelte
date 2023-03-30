<script>
	import { page } from '$app/stores';
	import { MenuItems } from '$lib/util/MenuItems';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
</script>

<div class="shadow bg-base-200 drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="flex flex-col items-center justify-end gap-2 drawer-content p-2 lg:pb-0 pb-16">
		<slot />
	</div>

	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<div class="menu p-4 w-80 bg-base-100 text-base-content">
			<ul>
				{#each MenuItems as menuItem}
					<li>
						<a href={menuItem.url} class:active={$page.url.pathname === menuItem.url}
							><FontAwesomeIcon icon={menuItem.icon} />{menuItem.title}</a
						>
					</li>
				{/each}
			</ul>
			<form action="/logout" method="POST" class="mt-auto">
				<button class="btn">Log Out</button>
			</form>
		</div>
	</div>
</div>
