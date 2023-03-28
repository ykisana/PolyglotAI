<div class="rounded-lg shadow bg-base-200 drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="flex flex-col items-center justify-end gap-2 drawer-content p-2">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<div class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<form action="/logout" method="POST">
				<button class="btn">Log Out</button>
			</form>
		</div>
	</div>
</div>
