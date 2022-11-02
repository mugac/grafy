<script>
	import { onMount } from 'svelte';
	let text = "";
	let out = "";
	let nodes;
	let from;
	//true add node| false add path
	let add = true;
	let mode = "node";
	let ft = true //true from | false to

	let elements = [];
	let elemLeft;
	let elemTop;
	let context;
	let canvasEl;

	let nodesCount = 0;

	onMount(() => {
    console.log('Onmount');
    context = canvasEl.getContext('2d');
	elemLeft = canvasEl.offsetLeft + canvasEl.clientLeft;
	elemTop = canvasEl.offsetTop + canvasEl.clientTop;
  });
	
	const handleUpdate = (e) => {
		text = e.target.value;
	};
	const nodesInput = (e) => {
		nodes = e.target.value;
	};
	const fromNode = (e) => {
		from = e.target.value;
	};
	const handleClear = () => {
		out = "";
	};
	const handleMode = (e) => {
		add = !add;
		switch(mode){
			case "node":
				mode = "path"
				break;
			case "path":
				mode = "node"
				break;
		}
		
	}

	const canvasClick = (event) => {
		let x = event.pageX - elemLeft
		let y = event.pageY - elemTop

		if (!add) {
			elements.forEach((element) => {
				if (
					y > element.top - element.height &&
					y < element.top + element.height &&
					x > element.left - element.width &&
					x < element.left + element.width
				) {
					// console.log(element.num)
					if(ft){
						text += element.num + ','
						ft = false;
					}
					else{
						text += element.num + "\n"
						ft = true;
					}
					
				}
			});
		} else {
			
			elements.push({
				colour: "blue",
				width: 25,
				height: 25,
				top: y,
				left: x,
				num: nodesCount
			});
			let index = nodesCount;
			// elements.forEach(element => {
    		context.fillStyle = "#FF0000";
    		//context.fillRect(elements[index].left-elements[index].width/2, elements[index].top-elements[index].height/2, elements[index].width, elements[index].height);
			context.beginPath();
    		context.arc(elements[index].left,  elements[index].top, 25, 0, 2 * Math.PI);
    		context.fill();
			context.fillStyle = "blue";
			context.font = "20px Arial"
			context.fillText(elements[index].num,x-elements[index].width/4,y+elements[index].height/4)
			nodesCount++;
		//})
	};
}

	const handleClick = () => {
		let partsArr = text.split("\n");
		let g = new Graph(nodes);
		partsArr.forEach((element) => {
			let tempArr = element.split(",");
			try {
				g.addEdge(tempArr[0], tempArr[1]);
			} catch {}
		});
		g.DFS(from);
	};

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
			out += v + "\n";

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
	<canvas width="800" height="400" id="myCanvas" on:click={canvasClick} bind:this={canvasEl} /> 
	<br>
	<button on:click={handleMode}>{mode}</button>
	<button>Clear</button>
	<br>
	<textarea name="inp" id="in" cols="30" rows="10" on:input={handleUpdate} value = {text}/>
	<br />
	<input type="text" placeholder="Number of nodes:" on:input={nodesInput} />
	<input type="text" placeholder="From node:" on:input={fromNode} />
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
	p {
		white-space: pre-line;
	}
	canvas {
		border: 1px solid black;
	}
</style>
