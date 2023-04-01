<script>
	import CardForm from '$lib/components/CardForm.svelte';

	const inputs = [
		{
			id: 'email',
			label: 'Email',
			type: 'email',
			placeHolder: 'Email'
		},
		{
			id: 'password',
			label: 'Password',
			type: 'password',
			placeHolder: 'Password'
		}
	];
</script>

<main class="h-full w-full">
	<div class="flex h-full justify-center items-center">
		<CardForm title={'Sign Up'} {inputs} />
	</div>
</main>
