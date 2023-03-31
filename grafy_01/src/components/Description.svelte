<script>
    import Dfs from "./algoDesc/DFS.svelte";
    import Bfs from "./algoDesc/BFS.svelte";
    import Shortestpath from "./algoDesc/Shortest path.svelte";
    export let algorithm = 'DFS';
</script>

    {#if algorithm == 'DFS'}
	    <Dfs/>
    {:else if algorithm == 'BFS'}
	    <Bfs/>
    {:else if algorithm == 'SHP'}
	    <Shortestpath/>
    {/if}
