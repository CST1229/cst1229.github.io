<script>
	import Header from "$lib/Header.svelte";
	
	const projects = [
		{name: "Finished(-ish) products", items: [
			{
				name: "CST Stone Simulator",
				desc: "Simple game I made in like, a few days.",
				href: "https://cst1229.eu.org/StoneSimulator",
			},
			{
				name: "New Super Mario Forever 2012: Slightly-Fixed Edition",
				desc: "Mod of an old infamous fangame to make it closable and some other things.",
				href: "https://github.com/CST1229/NSMF2012SlightlyFixed?tab=readme-ov-file",
			},
		]},
	];
</script>

<svelte:head>
	<title>Projects - CST1229</title>
</svelte:head>

<Header title="Projects" />

<main>
	<p>Stuff that I made.</p>

	{#each projects as category}
		<h2>{category.name}</h2>
		<ul>
			{#each category.items as item}
				<li>
					<a href={item.href} target="blank">
						{item.name}
					</a> - {item.desc}
				</li>
			{/each}
		</ul>
	{/each}
</main>