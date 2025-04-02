<script>
	import {base} from "$app/paths";
	import {default as Grid55555, ext} from "$lib/Grid55555.svelte";

	const imgs = import.meta.glob("$lib/assets/extensions/*", {
		import: "default",
		eager: true,
	});

	const getImage = filename => imgs["/src/lib/assets/extensions/" + filename];
</script>

<svelte:head>
	<title>Scratch Extensions - CST1229</title>
</svelte:head>

<div class="header-container">
	<header>
		<h1 class="header-centered">Scratch Extensions</h1>
	</header>
</div>

<main>
	<p>
		Extensions for Scratch that I made. These can be loaded in <a
			href="https://turbowarp.org/editor"
			target="_blank">TurboWarp</a
		>. Most of these only work when unsandboxed.
	</p>
	<p>
		Image credits for the extensions in TurboWarp's official gallery (the
		first 3 ones) are in <a
			href="https://github.com/TurboWarp/extensions/blob/master/images/README.md"
			target="_blank"
		>
			TurboWarp's repository
		</a>. Other images are by me.
	</p>
	<p>
		Userscripts and other stuff are available on <a href="https://files.cst1229.eu.org/" target="_blank">my files repo</a>.
	</p>
	<Grid55555>
		{@render ext(
			"Text",
			"Manipulate characters and text. Created by CST1229, BludIsAnLemon, and Man-o-Valor.",
			"https://extensions.turbowarp.org/text.js",
			"https://extensions.turbowarp.org/images/text.svg"
		)}
		{@render ext(
			"Zip",
			" Create and edit .zip format files, including .sb3 files.",
			"https://extensions.turbowarp.org/CST1229/zip.js",
			"https://extensions.turbowarp.org/images/CST1229/zip.svg"
		)}
		{@render ext(
			"Images",
			"Some blocks for working with images.\n(I recommend using the Skins extension instead of this.)",
			"https://extensions.turbowarp.org/CST1229/images.js",
			"https://extensions.turbowarp.org/images/CST1229/images.svg"
		)}
		{@render ext(
			"Extendable Blocks",
			`Blocks with inputs that can be added and removed.
<a href="https://github.com/TurboWarp/extensions/pull/1254" target="_blank">GitHub PR</a>.`,
			"https://raw.githubusercontent.com/CST1229/turbowarp-extensions/refs/heads/extendable-blocks/extensions/CST1229/extendableblocks.js",
			getImage("extendableBlocks.svg")
		)}
		{@render ext(
			"Extendable Blocks (Compiled)",
			"Extendable Blocks but the blocks compile natively to JavaScript in the compiler, making it run faster. Otherwise fully compatible.",
			"https://raw.githubusercontent.com/CST1229/turbowarp-extensions/refs/heads/extendable-blocks-compiled/extensions/CST1229/extendableblocks.js",
			getImage("extendableBlocksCompiled.svg")
		)}
		{@render ext(
			"CST 3D",
			"Bring your sprites into the third dimension. Still in alpha, and not being worked on often.",
			"https://raw.githubusercontent.com/CST1229/turbowarp-extensions/3d/extensions/CST1229/3d.js"
		)}
		{@render ext(
			"Multiline Text Input",
			"A block that lets you enter multiline text.",
			base + "/extensions/multilinetext.js",
			getImage("multilineText.png")
		)}
		{@render ext(
			"Extendable Blocks 2",
			"If Extendable Blocks is so good, why isn't there an Extendable Blocks 2?\n(APRIL FOOLS 2025 JOKE)",
			base + "/extensions/extendableblocks2.js",
			getImage("extendableBlocks2.svg")
		)}
		{@render ext(
			"Scratch 2.2",
			"le funni extension which lets you rotate blocks\n(JOKE EXTENSION)",
			base + "/extensions/scratch22.js",
			getImage("scratch22.png")
		)}
	</Grid55555>

	<a href="{base}/extensions/historical">Historical/unimportant extensions...</a>
</main>