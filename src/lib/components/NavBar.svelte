<script lang="ts">
	import { languages } from '$lib/util/Languages';
	import { selectedLanguage } from '$lib/store/LanguageStore';
	console.log($selectedLanguage);
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div>
			<label class="label label-text text-xs p-1" for="select">Language:</label>
			<select
				id="select"
				bind:value={$selectedLanguage}
				class="select select-primary select-xs max-w-xs"
			>
				{#each languages as language}
					<option value={language}>{language.language}</option>
				{/each}
			</select>
		</div>
	</div>
	<a href="/app" class="btn btn-ghost normal-case text-l">PolyglotAI</a>
	<div class="navbar-end"><a class="btn btn-xs btn-outline" href="/logout">Log Out</a></div>
</div>
