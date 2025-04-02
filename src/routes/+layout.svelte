<script>
	import {base} from "$app/paths";
	import {page} from '$app/state';

	let {children} = $props();
</script>

<svelte:head>
	<title>CST1229</title>
</svelte:head>

{#snippet navitem(url, name)}
	<li>
		{#if page.url.pathname === url}
			<b>{name}</b>
		{:else}
			<a href="{base}{url}">{name}</a>
		{/if}
	</li>
{/snippet}

<nav>
	<ul class="nav">
		{@render navitem("/", "Home")}
		<!-- {@render navitem("/wip", "WIP")} -->
		{@render navitem("/extensions", "Scratch Extensions")}
		<li>
			<a href="https://github.com/CST1229/cst1229.github.io" target="_blank">Source Code</a>
		</li>
	</ul>
</nav>

{@render children()}

<style>
	.nav {
		text-align: center;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
		padding: 0;
	}
	.nav li {
		list-style: none;
		text-align: center;
	}
	.nav li a, .nav li b {
		/* make links fill the clickable space */
		display: block;

		font-family: serif;
		font-weight: bold;
		text-decoration: underline;
	}

	:global {
		:root {
			--font-color: white;
			--theme: #639bff;
			--background-color: var(--theme);
			--back-background-color: var(--theme-secondary);
			--theme-secondary: #5b6ee1;
			--theme-tertiary: #3037ba;

			--links: #80fffc;
			--links-visited: #d9baff;

			--header-bg: var(--theme-tertiary);
			--header-text: var(--font-color);

			background-color: var(--back-background-color);
			text-align: center;
		}
		:root::before {
			content: "";
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;

			background-image: url("$lib/assets/bg.png");
			background-attachment: fixed;
			background-position: 4px 4px;
		}

		@media (prefers-contrast: more),
			(prefers-color-scheme: dark),
			(forced-colors: active) {
			:root {
				--background-color: Canvas;
				--back-background-color: Canvas;
				--font-color: CanvasText;

				--links: LinkText;
				--links-visited: VisitedText;
			}
			:root::before {
				opacity: 0.5;
			}
		}
		@media (forced-colors: active) {
			:root {
				--header-bg: AccentColor;
				--header-text: AccentColorText;
			}
		}
		@media (prefers-color-scheme: dark) {
			:root {
				color-scheme: dark;
			}
		}
		@media (prefers-color-scheme: dark) and (forced-colors: none) {
			:root {
				--header-bg: var(--theme-secondary);
			}
		}

		body {
			font-family: Arial, Helvetica, sans-serif;
			font-size: 16px;

			background-color: var(--background-color);
			color: var(--font-color);
			border: solid 1px var(--font-color);
			text-align: left;
			margin: 0.5em auto;
			padding-bottom: 2em;

			box-sizing: border-box;
			max-width: 960px;
		}

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

		.header-cst-container {
			flex-shrink: 1;
			flex-basis: 20rem;
			min-width: 5rem;
			min-height: 8em;
			position: relative;
		}
		.header-cst {
			flex-shrink: 1;
			flex-grow: 0;

			display: flex;
			align-items: center;
			justify-content: center;

			transform: scale(2);
			position: absolute;
			bottom: 0.5rem;
			left: 25%;
		}
		.header-text {
			flex-shrink: 1;
			flex-grow: 1;
			text-align: right;
			margin-right: 5%;
			position: relative;
			z-index: 1;
		}
		.header-text h1 {
			margin: 0;
			margin-right: 1rem;
			margin-bottom: 1rem;
			font-size: 3em;
		}

		.header-centered {
			text-align: center;
			width: 100%;
		}

		main {
			padding: 2em;
		}

		a {
			color: var(--links);
			text-decoration: none;
		}
		a:hover,
		a:active {
			text-decoration: underline;
		}
		a:visited {
			color: var(--links-visited);
		}

		.white-outline {
			filter: drop-shadow(white -1px 0px) drop-shadow(white 1px 0px)
				drop-shadow(white 0px -1px) drop-shadow(white 0px 1px)
				drop-shadow(white -1px 0px) drop-shadow(white 1px 0px)
				drop-shadow(white 0px -1px) drop-shadow(white 0px 1px);
		}
	}
</style>
