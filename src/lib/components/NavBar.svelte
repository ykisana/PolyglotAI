<script lang="ts">
	import { languages } from '$lib/util/Languages';
	import { selectedLanguage } from '$lib/store/LanguageStore';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<select bind:value={$selectedLanguage} class="select select-xs max-w-xs">
			{#each languages as language}
				<option value={language}>{language.language}</option>
			{/each}
		</select>
	</div>
	<a href="/app" class="btn btn-ghost normal-case text-l">PolyglotAI</a>
	<div class="navbar-end"><a class="btn btn-xs btn-outline" href="/logout">Log Out</a></div>
</div>
