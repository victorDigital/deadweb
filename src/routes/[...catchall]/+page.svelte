<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="prose max-w-full">
	{@html data.content}
</main>
