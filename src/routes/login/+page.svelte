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
		<CardForm title={'Login'} {inputs}>
			<div class="text-xs self-center">
				<span>Don't have an account?</span>
				<a href="/signup">Sign Up Now</a>
			</div>
		</CardForm>
	</div>
</main>
