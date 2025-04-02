<script>
	import {page} from "$app/state";
</script>

<main>
	<h1>{page.status}</h1>
	<p>{page.error.message}</p>
</main>
