<script lang="ts">
	import { goto } from '$app/navigation';
	let path = $state('');

	function navigate() {
		if (path.trim()) {
			goto(`/${encodeURIComponent(path.trim())}`);
		}
	}
</script>

<h1>Welcome to DeadWeb</h1>
<p>Explore a generated website, just for you!</p>
<input
	type="text"
	placeholder="go to..."
	bind:value={path}
	onkeydown={(e) => e.key === 'Enter' && navigate()}
/>
<button onclick={navigate}>Go</button>
