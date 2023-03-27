<main>
	<h1>Login</h1>
	<form action="?/login" method="POST" class="register-form">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
		<button class="btn">Submit</button>
	</form>
	<div>
		<span>Don't have an account?</span>
		<a href="/register">Sign Up Now</a>
	</div>
</main>

<style lang="scss">
	.login-form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 400px;
		min-width: 400px;
		margin: 0 auto;

		label {
			text-align: left;
			padding-bottom: 0.2rem;
			font-size: 1.6rem;
		}
	}
</style>
