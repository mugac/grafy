<svelte:head>
  <link href="prismXokai.css" rel="stylesheet" />
</svelte:head>
<script>
    import Prism from "./prism/PrismJS.svelte"
    let code = `using System;
using System.Collections.Generic;

public class Graph
{
    private int V; // number of vertices in the graph
    private List<int>[] adj; // adjacency list representing the graph

    // Constructor to initialize the graph
    public Graph(int v)
    {
        V = v;
        adj = new List<int>[v];
        for (int i = 0; i < v; i++)
        {
            adj[i] = new List<int>();
        }
    }

    // Method to add an edge between two vertices
    public void AddEdge(int v, int w)
    {
        adj[v].Add(w);
    }

    // Method to perform BFS traversal of the graph
    public void BFS(int s)
    {
        // Create a boolean array to keep track of visited vertices
        bool[] visited = new bool[V];
        // Create a queue to store the vertices to be visited
        Queue<int> queue = new Queue<int>();

        // Mark the source vertex as visited and enqueue it
        visited[s] = true;
        queue.Enqueue(s);

        while (queue.Count != 0)
        {
            // Dequeue a vertex from the queue and print it
            s = queue.Dequeue();
            Console.Write(s + " ");

            // Get all adjacent vertices of the dequeued vertex s
            // If an adjacent vertex has not been visited, mark it as visited and enqueue it
            foreach (int i in adj[s])
            {
                if (!visited[i])
                {
                    visited[i] = true;
                    queue.Enqueue(i);
                }
            }
        }
    }
}

// Driver code to test the implementation
public class BFS
{
    public static void Main()
    {
        Graph g = new Graph(4); // Create a graph with 4 vertices

        // Add edges to the graph
        g.AddEdge(0, 1);
        g.AddEdge(0, 2);
        g.AddEdge(1, 2);
        g.AddEdge(2, 0);
        g.AddEdge(2, 3);
        g.AddEdge(3, 3);

        Console.WriteLine("BFS traversal starting from vertex 2:");
        g.BFS(2); // Perform BFS traversal starting from vertex 2
    }
}`;
</script>
<main>
    <div class="container">
        <div class="text">
            BFS (breadth-first search) je algoritmus pro prohledávání grafů. Jeho základní myšlenkou je prohledávat graf postupně od startovního uzlu do sousedních uzlů,
            poté do sousedních uzlů těchto uzlů a tak dále, dokud nenavštíví všechny dosažitelné uzly.
            <br><br>
            Kroky algoritmu: 
            <br>
            <ul>
                <li>Zvolte počáteční uzel a vložte ho do fronty.</li>
                <li>Odeberte uzel z fronty a prohlédněte si jeho sousedy.</li>
                <li>Pokud sousední uzel ještě nebyl navštíven, vložte ho do fronty a označte jako navštívený.</li>
                <li> Opakujte krok 2 a 3 pro všechny sousedy aktuálního uzlu.</li>
                <li>Pokud byly navštíveny všechny dosažitelné uzly, algoritmus končí.</li>
                <li>Pokud ne, opakujte kroky 2 až 5 pro další uzel v frontě.</li>
            </ul>
            
            Algoritmus pokračuje v prohledávání grafu, dokud nenavštíví všechny dosažitelné uzly. Po dokončení algoritmu se pro každý uzel v grafu určí, zda byl navštíven nebo ne. 
            <br><br>
            Tento algoritmus je často používán k nalezení nejkratší cesty mezi dvěma uzly v grafu, pokud existuje.
            <br><br>
            BFS algoritmus lze implementovat pomocí datové struktury fronty (FIFO), do které se ukládají uzly, které čekají na prozkoumání jejich sousedů. Každý uzel by měl být označen jako navštívený v okamžiku, kdy je odebrán z fronty. To zajišťuje, že každý uzel bude prozkoumán pouze jednou a že algoritmus navštíví všechny dosažitelné uzly.
    </div>
    <div class="gif">
        <img src="animace/bfs.png" alt="gif">
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
        width: 30vw;
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
  grid-template-columns: 1.2fr 1fr; 
  grid-template-rows: 1fr 3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "text gif"
    "code code"; 
}
</style>