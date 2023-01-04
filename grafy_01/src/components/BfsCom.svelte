<script>
    function Solve(){
        let partsArr = text.split("\n");
		let g = new Graph(nodes);
		partsArr.forEach((element) => {
			let tempArr = element.split(",");
			try {
				g.addEdge(tempArr[0], tempArr[1]);
			} catch {}
		});
		g.BFS(from);
    }
    class Graph
    {
        // Constructor
        constructor(v)
        {
            this.V = v;
            this.adj = new Array(v);
            for(let i = 0; i < v; i++)
                this.adj[i] = [];
        }
        // Function to add an edge into the graph
        addEdge(v, w)
        {
            // Add w to v's list.
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
                document.write(s+" ");
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
    }
</script>

BfsCom