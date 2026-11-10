<script>
	let {children, title = ""} = $props();
</script>

<div class="header-container">
	<header>
		{#if title}
			<h1 class="header-centered">{title}</h1>
		{/if}
		{@render children?.()}
	</header>
</div>

<style>
	.header-container {
		padding-top: 2em;
		overflow: hidden;
		border-bottom: solid 2px var(--header-bg);
		color: var(--header-text);
	}
	header {
		background-color: var(--header-bg);
		padding: 1em 0;
		gap: 2em;
		display: flex;
	}
	.header-centered {
		text-align: center;
		width: 100%;
	}
</style>