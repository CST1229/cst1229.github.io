<script>
	import {base} from "$app/paths";
	import {default as Grid55555, ext} from "$lib/Grid55555.svelte";

	const imgs = import.meta.glob("$lib/assets/extensions/*", {
		import: "default",
		eager: true,
	});

	const getImage = filename => imgs["/src/lib/assets/extensions/" + filename];

	const oneOff = "(One-off)\n";
	const historical = "(Historical)\n";
	const useless = "(Useless)\n";
</script>

<svelte:head>
	<title>Historical/Unimportant Extensions - CST1229</title>
</svelte:head>

<div class="header-container">
	<header>
		<h1 class="header-centered">Historical/Unimportant Extensions</h1>
	</header>
</div>

<main>
	<p>
		Mostly very old/outdated extensions and one-offs posted in the TurboWarp
		Discord server.
	</p>
	<p>
		Most of the extensions here should not be used in actual projects.
	</p>
	<p>
		<a href="{base}/extensions">Standard extensions...</a>
	</p>

	<Grid55555>
		<!-- Usable -->
		{@render ext(
			"Extendable Blocks 2 (Beta Mix)",
			"Extendable Blocks 2 but with the original concept of having palette buttons to extend/retract blocks, making it a bit more usable.\nAlt title: Poor Man's Extendable Blocks",
			base + "/extensions/extendableblocks2Buttons.js",
			getImage("extendableBlocks2.svg")
		)}
		{@render ext(
			"Snapshot Stage Now",
			"The snapshot stage block from Looks Plus, but it captures the current state of the stage instead of the one from last frame.",
			base + "/extensions/unimportant/snapshotStageNow.js",
		)}
		{@render ext(
			"Zip (Totally Normal Version)",
			"(JOKE EXTENSION)",
			base + "/extensions/unimportant/ziproll.js",
			"https://extensions.turbowarp.org/images/CST1229/zip.svg"
		)}

		<!-- Old but still usable -->
		{@render ext(
			"Inline Blocks Next",
			"Basically, custom reporters before custom reporters existed.",
			base + "/extensions/historical/inlineBlocksNext.js",
			getImage("inlineBlocks.png")
		)}

		
		<!-- One-offs -->
		{@render ext(
			"Chomp",
			oneOff + "A block that enables dragged C blocks wrapping around blocks.\nIs essentially a prototype for a Scratch Addons addon.",
			base + "/extensions/unimportant/chomp.js",
			getImage("chomp.png")
		)}
		{@render ext(
			"Disable Sprites",
			oneOff + "Disable or enable specific sprites running scripts.",
			base + "/extensions/unimportant/disablesprites.js"
		)}
		{@render ext(
			"Camera Sensing Toggle",
			oneOff + "Toggle the touching blocks being able to sense the camera feed (normally disabled for privacy reasons).",
			base + "/extensions/unimportant/CameraSensingToggle.js"
		)}

		<!-- Really really old and not recommended -->
		{@render ext(
			"Inline Blocks v3",
			historical + "An older version of Inline Blocks.",
			base + "/extensions/historical/inlineBlocksv3.js",
			getImage("inlineBlocksv3.png")
		)}
		{@render ext(
			"Images v1",
			historical + "The old version of Images. Also sometimes called Unsandboxed Images.",
			base + "/extensions/historical/unsandboxed-images.js",
			getImage("imagesGoofyWarp.png")
		)}
		{@render ext(
			"Join Blocks",
			historical + "An extension of join blocks, inspired by a concept for kccuber's MeowBlocks mod.\nSo old that it existed before unsandboxed extensions.\nFixed so that it actually works.",
			base + "/extensions/historical/extensionOfJoinBlocks.js",
			getImage("joinBlocks.png")
		)}
		{@render ext(
			"TurboWarp Blocks (E羊icques)",
			historical + `TurboWarp Blocks but as <a href="https://sheeptester.github.io/scratch-gui?load_plugin=https://cst1229.eu.org/extensions/historical/tw-ext-userscript.js" target="_blank">a userscript that could be loaded in E羊icques</a> (pre-unsandboxed extensions).\nThumbnail also from E羊icques.`,
			base + "/extensions/historical/tw-ext-userscript.js",
			getImage("eYCustomExtension.png")
		)}
		
		{@render ext(
			"ADM Test",
			useless + "A test for argument-dependent menus (ADMs). No practical use.",
			base + "/extensions/unimportant/ADMTest.js",
			getImage("ADMTest.png")
		)}
		{@render ext(
			"C Block Example",
			useless + "An example on how to make custom extension C blocks, posted in the TurboWarp Discord.",
			base + "/extensions/unimportant/cblockexampleext.js"
		)}
	</Grid55555>
</main>
