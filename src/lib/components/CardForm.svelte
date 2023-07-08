<script lang="ts">
	interface Input {
		id: string;
		label: string;
		placeHolder: string;
		type: string;
	}
	export let inputs: Array<Input>;
	export let title: string;
</script>


<div class="card w-96 bg-primary text-primary-content">
	<div class="card-body">
		<h2 class="card-title self-center">{title}</h2>
		<form method="POST" class="flex flex-col gap-2">
			{#each inputs as input}
				<label class="label" for={input.id}>{input.label}</label>
				<input
					class="input input-primary text-neutral"
					type={input.type}
					name={input.id}
					id={input.id}
					placeholder={input.label}
				/>
			{/each}
			<button class="btn btn-secondary mt-3">Submit</button>
		</form>
		<slot />
	</div>
</div>


<style>
	input {
		background-color: white;
	}
</style>
