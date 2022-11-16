<script>
	import Graph from "./dfs.svelte";
	import CanvasP from "./canvas.svelte"
	let text = "";
	let out = "";
	let nodes;
	let from;
	export let add = true; //true add node| false add path
	let mode = "node";
	
	let nodesCount = 0;
	let linesCount = 0;

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
		context.clearRect(0,0,canvasEl.width,canvasEl.height)
		out = "";
		text= "";
		//elements = [];
		//lines = [];
		nodesCount = 0;
		linesCount = 0;
	};
	const handleMode = (e) => {
		add = !add;
		switch (mode) {
			case "node":
				mode = "path";
				break;
			case "path":
				mode = "node";
				break;
		}
	};
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

	
</script>

<main>
	<CanvasP/>
	<br />
	<button on:click={handleMode}>{mode}</button>
	<button on:click={handleClear}>Clear</button>
	<br />
	<textarea
		name="inp"
		id="in"
		cols="30"
		rows="10"
		on:input={handleUpdate}
		value={text}
	/>
	<p>{out}</p>
	<br />
	<input type="text" placeholder="Number of nodes:" on:input={nodesInput} />
	<input type="text" placeholder="From node:" on:input={fromNode} />
	<button on:click={handleClick}>Solve</button>
	
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
	
</style>