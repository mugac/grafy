<svelte:head>
  <link href="prismXokai.css" rel="stylesheet" />
</svelte:head>
<script>
    import Prism from "./prism/PrismJS.svelte"
    let code = `using System;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        // create a new queue to use in DFS
        Queue<int> que = new Queue<int>();

        // create a new graph with 4 vertices
        Graph g = new Graph(4);

        // add edges to the graph
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 0);
        g.addEdge(2, 3);
        g.addEdge(3, 3);

        // perform DFS starting from vertex 2
        g.DFS(2);
    }
}

public class Graph
{
    int V; // the number of vertices in the graph
    List<int>[] adj; // an array of adjacency lists to represent the graph

    // constructor to initialize the graph with the given number of vertices
    public Graph(int v)
    {
        V = v;
        adj = new List<int>[v];
        for (int i = 0; i < v; i++)
        {
            adj[i] = new List<int>();
        }
    }

    // method to add an edge between two vertices in the graph
    public void addEdge(int v, int w)
    {
        adj[v].Add(w);
    }

    // method to perform depth-first search starting from the given source vertex
    public void DFS(int s)
    {
        bool[] visited = new bool[V]; // array to keep track of visited vertices
        for (int i = 0; i < V; i++)
            visited[i] = false;
        Queue<int> queue = new Queue<int>(); // create a new queue for DFS
        queue.Enqueue(s); // add the source vertex to the queue
        visited[s] = true; // mark the source vertex as visited
        while (queue.Count != 0) // loop until the queue is empty
        {
            int pop = queue.Dequeue(); // remove the next vertex from the queue
            Console.Write(pop + " "); // print the vertex
            foreach (var vert in adj[pop]) // iterate over the adjacent vertices
            {
                if (!visited[vert]) // if the adjacent vertex is not visited
                {
                    visited[vert] = true; // mark it as visited
                    queue.Enqueue(vert); // add it to the queue
                }
            }
        }
    }
}`;
</script>
<main>
    <div class="container">
        <div class="text">
        <p>DFS (Depth-First Search, česky prohledávání do hloubky) je jedna z nejběžnějších technik pro procházení grafů nebo stromů. <br><br>
        Algoritmus prochází graf od vrcholu, kde začíná, a pokračuje hlouběji a hlouběji, dokud nenarazí na konec 
        grafu, nebo nedosáhne nějakého limitu. V tomto okamžiku se vrací zpět a začne procházet jinou cestou.
            <br><br>
        DFS může být implementován pomocí rekurze nebo pomocí iterace s pomocí zásobníku (stacku). V případě 
        rekurze se algoritmus volá sám sebe pro každý sousední vrchol, který ještě nebyl navštíven. V případě 
        iterace se používá zásobník, který slouží jako náhrada za rekurzivní volání.
        <br><br>
        DFS je velmi rychlý a efektivní, ale má jednu nevýhodu: může snadno "zabloudit" v grafu a procházet se dokola,
         pokud graf obsahuje cykly. Je tedy vhodné použít DFS spíše v případech, kdy máte zájem o procházení celého grafu 
        nebo stromu, a nejen o nalezení nejkratší cesty mezi dvěma vrcholy.</p>
        <br>
        Využití DFS:
        <ul>
            <li>Prohledávání internetových stránek pro indexování vyhledávačů</li>
            <li>Prohledávání stromu souborů v počítači</li>
            <li>Prohledávání molekul pro hledání konformací</li>
            <li>Procházení topologie</li>
        </ul>
    
    </div>
    <div class="gif">
        <img src="animace/dfs.gif" alt="gif">
    </div>
    <div class="code">
        <Prism language="c" code="{code}" header="Sameple R Code"/>
    </div>
    </div>
    </main>
<style>
    div{
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
        max-width:40vw;
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