<script>
	let text;
	let out = '';
	let pathFrom = [];
	let pathTo = [];
	let nodes;
	let from;

	const handleUpdate = (e) => {
		text = e.target.value;
	}
	const nodesInput = (e) => {
		nodes = e.target.value;
	}
	const fromNode = (e) => {
		from = e.target.value;
	}
	const handleClear = () => {
		out = "";
	}

	const handleClick = () =>{
		let partsArr = text.split('\n');
		let g = new Graph(nodes);
		partsArr.forEach(element => {
			let tempArr = element.split(',')
			try{
				g.addEdge(tempArr[0], tempArr[1])
			}
			catch{

			}
			pathFrom.push(tempArr[0])
			pathTo.push(tempArr[1])
		});
	g.DFS(from);
	}

	class Graph {
		constructor(v) {
			this.V = v;
			this.adj = new Array(v);
			for (let i = 0; i < v; i++) this.adj[i] = [];
		}

		addEdge(v, w) {
			// Add w to v's list.
			this.adj[v].push(w);
		}

		DFSUtil(v, visited) {
			visited[v] = true;
			out += v + '\n'

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
	}
</script>

<main>
	<textarea name="inp" id="in" cols="30" rows="10"on:input={handleUpdate}></textarea>
	<br>
	<input type="text" placeholder="Number of nodes:" on:input={nodesInput} >
	<input type="text" placeholder="From node:" on:input={fromNode}>
	<button on:click={handleClick}>Solve</button>
	<button on:click={handleClear}>Clear</button>
	<p>{out}</p>
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
	p{
		white-space: pre-line
	}
</style>
