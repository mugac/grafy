<script>
    import Visualization from "./components/Visualization.svelte";
	import Description from "./components/Description.svelte";
	let content = 'vis';
	let algorithm = 'SHP';
</script>

<main>
	<button
	class="{content === 'desc' ? 'selected' : ''}"
	on:click="{() => content = 'desc'}"
	>Description</button>
	<button
	class="{content === 'vis' ? 'selected' : ''}"
	on:click="{() => content = 'vis'}"
	>Visualization</button>
	<br>
	<button
	class="{algorithm === 'DFS' ? 'selected' : ''}"
	on:click="{() => algorithm = 'DFS'}"
	>DFS</button>
	<button
	class="{algorithm === 'BFS' ? 'selected' : ''}"
	on:click="{() => algorithm = 'BFS'}"
	>BFS</button>
	<button
	class="{algorithm === 'SHP' ? 'selected' : ''}"
	on:click="{() => algorithm = 'SHP'}"
	>Shortest Path</button>
	<button
	class="{algorithm === 'SPT' ? 'selected' : ''}"
	on:click="{() => algorithm = 'SPT'}"
	>Spanning Tree</button>
	<br>

	{#if content == 'desc'}
	    <Description algorithm={algorithm}/>
    {:else}
		<Visualization algorithm={algorithm}/>
    {/if}
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.selected {
		background-color: #ff3e00;
		color: white;
	}
	/* canvas {
		border: 1px solid black;
	} */
</style>