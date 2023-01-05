<script>
    import Dfs from "./algoDesc/DFS.svelte";
    import Bfs from "./algoDesc/BFS.svelte";
    export let algorithm = 'DFS';
</script>
<main>
    {#if algorithm == 'DFS'}
	    <Dfs/>
    {:else if algorithm == 'BFS'}
	    <Bfs/>
    {/if}
</main>