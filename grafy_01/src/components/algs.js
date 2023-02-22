//Deep First Search
export class GraphDFS {
        //Constructor receives nodes cound and creates array with length of nodes count
		constructor(v) {
			this.V = v;
			this.adj = new Array(v);
			for (let i = 0; i < v; i++) this.adj[i] = [];
		}
        // This method adds a new edge between vertices v and w to the graph.
		addEdge(v, w) {
			this.adj[v].push(w);
		}
        //Helping function recursively going through graph. For every unvisited neighboring node method recursively calls it self to search next node.
		DFSUtil(v, visited) {
			visited[v] = true;
			this.out += v + "\n";

			for (let i of this.adj[v].values()) {
				let n = i;
				if (!visited[n]) this.DFSUtil(n, visited);
			}
		}
        //Main method, that starts DFS
		DFS(v) {
			let visited = new Array(this.V);
			for (let i = 0; i < this.V; i++) visited[i] = false;

			this.DFSUtil(v, visited);
		}
        //Getting variable to vrite in algorithm result
        getOut(){
            return this.out;
        }
        //Outputing algorithm result
        setOut(out){
            this.out = out;
        }
}
//Breadth First Search
export class GraphBFS
    {
        //Constructor creates a graph with the given number of vertices (v).
        constructor(v)
        {
            this.V = v;
            this.adj = new Array(v);
            // Initialize the adjacency list with empty arrays for each node.
            for(let i = 0; i < v; i++)
                this.adj[i] = [];
        }
        // This method adds a new edge between vertices v and w to the graph.
        addEdge(v, w)
        {
            this.adj[v].push(w);
        }
        // prints BFS traversal from a given source s
        BFS(s)
        {
            // Mark all the vertices as not visited(By default
            // set as false)
            let visited = new Array(this.V);
            for(let i = 0; i < this.V; i++)
                visited[i] = false;
            // Create a queue for BFS
            let queue=[];
            // Mark the current node as visited and enqueue it
            visited[s]=true;
            queue.push(s);
            //Iterate over the queue until it's empty.
            while(queue.length>0)
            {
                // Dequeue a vertex from queue and print it
                s = queue[0];
                //document.write(s+" ");
                this.out += s + "\n";
                queue.shift();
                 
                // Get all adjacent vertices of the dequeued
                // vertex s. If a adjacent has not been visited,
                // then mark it visited and enqueue it
                this.adj[s].forEach((adjacent,i) => {
                    if(!visited[adjacent])
                    {
                        visited[adjacent]=true;
                        queue.push(adjacent);
                    }
                });
            }
        }
        //Get variable to vrite in algorithm result
        getOut(){
            return this.out;
        }
        //Output algorithm result
        setOut(out){
            this.out = out;
        }
    }
//Shortest path
export class GraphSHP
    {
        //Constructors takes number of vertices
        constructor(v) {
			this.V = v;
        }
    SHP(graph, src)
    {
        let dist = new Array(this.V); //Array to store distances from the source
        let sptSet = new Array(this.V);//Array to keep track of vertices included in shortest path tree
        
        for(let i = 0; i < this.V; i++)
        {
            dist[i] = Number.MAX_VALUE; //Initialize all distances to infinity
            sptSet[i] = false; //Mark all vertices as not included in the shortest path tree
        }
        //Distance of source node from itself is always 0
        dist[src] = 0;
        
        for(let count = 0; count < this.V - 1; count++)
        {
            //Pick the minimum distance node from the set of nodes not yet processed
            let u = this.minDistance(dist, sptSet);
            //Mark the picked ndoe as processed
            sptSet[u] = true;

            //Update distance value of adjacent nodes of the picked node
            for(let v = 0; v < this.V; v++)
            {
                //If node is not in sptSet, there is an edge from u to v, and the distance from the source to u is not infinity. Then update the distance from the source to v
                if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Number.MAX_VALUE && dist[u] + graph[u][v] < dist[v])
                {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
        this.printSolution(dist);
    }
    //Utility function to find the node with minimum distance value, from the set of nodes not yet included in shortest path tree
    minDistance(dist,sptSet)
    {
        let min = Number.MAX_VALUE;
        let min_index = -1;
        
        for(let v = 0; v < this.V; v++)
        {
            //If node is not in sptSet and its distance from the source is less than or equal to the minimum distance found so far
            if (sptSet[v] == false && dist[v] <= min)
            {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }
    //Function to print the distances of all nodes from the source
    printSolution(dist)
    {
        this.out += "Destinace => Cena cesty" + "\n";
        for(let i = 0; i < this.V; i++)
        {
            this.out += i + " => " + dist[i] + "\n";
        }
    }

    //Get variable to vrite in algorithm result
    getOut(){
        return this.out;
    }
    //Output algorithm result
    setOut(out){
        this.out = out;
    }
}