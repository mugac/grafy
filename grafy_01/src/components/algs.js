export class GraphDFS {
		constructor(v) {
			this.V = v;
			this.adj = new Array(v);
			for (let i = 0; i < v; i++) this.adj[i] = [];
		}
		addEdge(v, w) {
			this.adj[v].push(w);
		}
		DFSUtil(v, visited) {
			visited[v] = true;
			this.out += v + "\n";

			for (let i of this.adj[v].values()) {
				let n = i;
				if (!visited[n]) this.DFSUtil(n, visited);
			}
		}
		DFS(v) {
			let visited = new Array(this.V);
			for (let i = 0; i < this.V; i++) visited[i] = false;

			this.DFSUtil(v, visited);
		}
        getOut(){
            return this.out;
        }
        setOut(out){
            this.out = out;
        }
}
export class GraphBFS
    {
        constructor(v)
        {
            this.V = v;
            this.adj = new Array(v);
            for(let i = 0; i < v; i++)
                this.adj[i] = [];
        }
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
        getOut(){
            return this.out;
        }
        setOut(out){
            this.out = out;
        }
    }

export class GraphSHP
    {
        constructor(v) {
			this.V = v;
        }
    SHP(graph, src)
    {
        let dist = new Array(V);
        let sptSet = new Array(V);
        
        for(let i = 0; i < V; i++)
        {
            dist[i] = Number.MAX_VALUE;
            sptSet[i] = false;
        }
        
        dist[src] = 0;
        
        for(let count = 0; count < V - 1; count++)
        {
            let u = minDistance(dist, sptSet);

            sptSet[u] = true;

            for(let v = 0; v < V; v++)
            {

                if (!sptSet[v] && graph[u][v] != 0 &&
                    dist[u] != Number.MAX_VALUE &&
                    dist[u] + graph[u][v] < dist[v])
                {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
    }
    minDistance(dist,sptSet)
    {
        let min = Number.MAX_VALUE;
        let min_index = -1;
        
        for(let v = 0; v < V; v++)
        {
            if (sptSet[v] == false && dist[v] <= min)
            {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }
    printSolution(dist)
    {
        //document.write("Vertex \t\t Distance from Source<br>");
        for(let i = 0; i < V; i++)
        {
            this.out += i + " \t\t " + dist[i] + "<br>";
            // document.write(i + " \t\t " +
            //         dist[i] + "<br>");
        }
    }

    getOut(){
        return this.out;
    }
    setOut(out){
        this.out = out;
    }
    
}