<main>
	<h1>Register</h1>
	<form method="POST" class="register-form">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
		<button class="btn">Submit</button>
	</form>
</main>

<style lang="scss">
	.register-form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 400px;
		min-width: 400px;
		margin: 0 auto;

		label {
			text-align: left;
			padding-bottom: 2px;
			font-size: 16px;
		}
	}
</style>
