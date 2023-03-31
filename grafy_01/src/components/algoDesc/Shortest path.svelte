<svelte:head>
  <link href="prismXokai.css" rel="stylesheet" />
</svelte:head>
<script>
    import Prism from "./prism/PrismJS.svelte"
    let code = `using System;

    class GFG {
    static int V = 9; // Number of vertices in the graph

// This function finds the vertex with the minimum distance value,
// from the set of vertices not yet included in shortest path tree.
int minDistance(int[] dist, bool[] sptSet)
{
    int min = int.MaxValue, min_index = -1;

    // Loop through all vertices
    for (int v = 0; v < V; v++)
        // Check if vertex v is not in sptSet and if its distance
        // from source is less than the current minimum distance
        if (sptSet[v] == false && dist[v] <= min) {
            // Update the minimum distance and the index of the vertex
            min = dist[v];
            min_index = v;
        }

    // Return the index of the vertex with the minimum distance
    return min_index;
}

// This function prints the distance of all vertices from the source
void printSolution(int[] dist)
{
    Console.Write("Vertex \t\t Distance "
                  + "from Source\n");
    for (int i = 0; i < V; i++)
        Console.Write(i + " \t\t " + dist[i] + "\n");
}

// This function implements Dijkstra's algorithm to find the shortest
// path from a source node to all other nodes in a weighted graph.
void dijkstra(int[, ] graph, int src)
{
    int[] dist= new int[V]; // Array to store the shortest distance from the source to each vertex

    bool[] sptSet = new bool[V]; // Array to store whether a vertex is included in the shortest path tree or not

    // Initialize all distances to infinity and sptSet to false
    for (int i = 0; i < V; i++) {
        dist[i] = int.MaxValue;
        sptSet[i] = false;
    }

    dist[src] = 0; // Set the distance of the source node to 0

    // Loop through all vertices except the source
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet); // Find the vertex with the minimum distance from the source

        sptSet[u] = true; // Add the vertex to the shortest path tree

        // Update the distance of all adjacent vertices if the new path through
        // the current vertex is shorter than the previously known path
        for (int v = 0; v < V; v++){
            if (!sptSet[v] && graph[u, v] != 0
                && dist[u] != int.MaxValue
                && dist[u] + graph[u, v] < dist[v])
                dist[v] = dist[u] + graph[u, v];
        }
    }
    // Print the shortest distances of all vertices from the source
    printSolution(dist);
}

public static void Main()
{
    // Example graph as an adjacency matrix
    int[, ] graph
            = new int[, ] { { 0, 4, 0, 0, 0, 0, 0, 8, 0 },
                            { 4, 0, 8, 0, 0, 0, 0, 11, 0 },
                            { 0, 8, 0, 7, 0, 4, 0, 0, 2 },
                            { 0, 0, 7, 0, 9, 14, 0, 0, 0 },
                            { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
                            { 0, 0, 4, 14, 10, 0, 2, 0, 0 },
                            { 0, 0, 0, 0, 0, 2, 0, 1, 6 },
                            { 8, 11, 0, 0, 0, 0, 1, 0, 7 },
                            { 0, 0, 2, 0, 0, 0, 6, 7, 0 } };
        GFG t = new GFG();
 
        // Function call
        t.dijkstra(graph, 0);
    }
}`;
</script>
<main>
    <div class="container">
        <div class="text">
            <p>
            Dijkstrův algoritmus je algoritmus pro nalezení nejkratší cesty v grafu s nezápornými <br>
            ohodnocenými hranami. Algoritmus je pojmenován po holandském informatiku Edsgeru W. <br>
            Dijkstrovi a byl publikován v roce 1959.
            <br><br>
            Algoritmus pracuje s dvěma seznamy uzlů: "otevřený" seznam a "uzavřený" seznam. <br>
            Začínáme s otevřeným seznamem obsahujícím pouze počáteční uzel, a uzavřený seznam je prázdný. <br>
            Dále přiřadíme počátečnímu uzlu vzdálenost 0 a všem ostatním uzlům nekonečno.
            <br><br>
            V každé iteraci algoritmu vybereme uzel s nejmenší vzdáleností z otevřeného seznamu <br>
            a přesuneme ho do uzavřeného seznamu. Poté pro každý sousední uzel (který není v uzavřeném seznamu) <br>
            aktualizujeme jeho vzdálenost, pokud je vzdálenost přes aktuální uzel menší, než jeho současná vzdálenost.
            <br><br>
            Algoritmus končí, když je cílový uzel přesunut do uzavřeného seznamu, nebo když je otevřený seznam prázdný (což znamená, že cílový uzel není dosažitelný).
            <br><br>
            Po dokončení algoritmu má každý uzel v grafu přiřazenou vzdálenost od počátečního uzlu, a tuto vzdálenost můžeme použít <br>
            k nalezení nejkratší cesty z počátečního uzlu do jakéhokoli jiného uzlu v grafu.
            <br><br>
            Dijkstrův algoritmus má časovou složitost O(|E|+|V| log |V|), kde |V| je počet uzlů v grafu a |E| je počet hran v grafu.
</p>
    </div>
    <div class="gif">
        <img src="animace/Dijkstra.png" alt="png">
    </div>
    <div class="code">
        <Prism language="c" code="{code}" header="Sameple R Code"/>
    </div>
    </div>
    </main>
<style>
    div{
        /* border: 1px solid #8D8272; */
        margin-top: 5%;
        margin-left: 5%;
        padding: 1%;
    }
    p{
        text-align: left;
        line-break: normal;
        color: white;
    }
    img{
        max-width:30vw;
    }
    .text{
        text-align: left;
        line-break: normal;
        color: white;
    }
    .gif{
        max-width: min-content;
    }
    .container {  display: grid;
        display: grid; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr 3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "text gif"
    "code code"; 
}
</style>