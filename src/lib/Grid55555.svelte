<script>
	import noImage from "$lib/assets/noimage.png";

	let {children} = $props();
</script>
<script module>
	export {gridItem, ext};
</script>

{#snippet gridItem(snippet, args)}
	<div class="ext">
		{@render snippet(args)}
	</div>
{/snippet}
{#snippet _extContent([name, desc, url, imgUrl])}
	<a href={url} target="_blank">
		<img class="ext-img" src={imgUrl} alt={name} />
		<div class="ext-name">{name}</div>
	</a>
	<p class="ext-desc">{@html desc}</p>
{/snippet}
{#snippet ext(name, desc, url, imgUrl = noImage)}
	{@render gridItem(_extContent, [name, desc, url, imgUrl || noImage])}
{/snippet}


<div class="exts-grid">
	{@render children()}
</div>

<style>
	.exts-grid {
		display: grid;
		grid-template-columns: repeat(4, 25%);
		margin-left: -2em;
		margin-right: -2em;
	}

	.ext {
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: 12px;
		font-weight: bold;
		margin-bottom: 1.5em;
	}
	.ext-name {
		font-size: 14px;
		text-decoration: underline;
	}
	.ext-img {
		width: 100%;
		aspect-ratio: 2 / 1;
	}
	.ext-desc {
		margin: 0;
		white-space: pre-wrap;
	}
</style>
