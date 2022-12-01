<script>
	import { onMount } from "svelte";
	let text = "";
	let out = "";
	let nodes;
	let from;
	let add = true; //true add node| false add path
	let mode = "node";
	let ft = true; //true from | false to
	
	let elements = [];
	let elemLeft;
	let elemTop;
	let context;
	let canvasEl;

	let lines = [];
	let lineStartX;
	let lineStartY;
	let lineEndX;
	let lineEndY;
	let lineFrom;
	let lineTo;

	let nodesCount = 0;
	let linesCount = 0;



	onMount(() => {
		console.log("Onmount");
		context = canvasEl.getContext("2d");
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
		context.clearRect(0,0,canvasEl.width,canvasEl.height)
		out = "";
		text= "";
		elements = [];
		lines = [];
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

	const canvasClick = (event) => {
		let x = event.pageX - elemLeft;
		let y = event.pageY - elemTop;
		let space = true;
		elements.forEach((element) => {
				if (
					y > element.top - element.height*2 &&
					y < element.top + element.height*2 &&
					x > element.left - element.width*2 &&
					x < element.left + element.width*2
				){
					space = false;
				}})
		if (!add) {
			elements.forEach((element) => {
				if (
					y > element.top - element.height &&
					y < element.top + element.height &&
					x > element.left - element.width &&
					x < element.left + element.width
				) {
					// console.log(element.num)
					if (ft) {
						lineFrom = element.num
						text += element.num + ",";
						ft = false;
						lineStartX = element.left;
						lineStartY = element.top;
					} else {
						lineTo = element.num;
						text += element.num + "\n";
						ft = true;
						lineEndX = element.left;
						lineEndY = element.top;
						drawLine(lineFrom, lineTo);
					}
				}
			});
		} else {
			if(space){
				elements.push({
				colour: "red",
				width: 25,
				height: 25,
				top: y,
				left: x,
				num: nodesCount,
			});
			let index = nodesCount;
			// elements.forEach(element => {
			context.fillStyle = elements[index].colour;
			//context.fillRect(elements[index].left-elements[index].width/2, elements[index].top-elements[index].height/2, elements[index].width, elements[index].height);
			context.beginPath();
			context.arc(
				elements[index].left,
				elements[index].top,
				25,
				0,
				2 * Math.PI
			);
			context.fill();
			context.fillStyle = "blue";
			context.font = "20px Arial";
			context.fillText(
				elements[index].num,
				x - elements[index].width / 4,
				y + elements[index].height / 4
			);
			nodesCount++;
			//})
			}
			
		}
	};
	const drawLine = (lineFromF, lineToF) => {
		let dx = lineEndX - lineStartX;
		let dy = lineEndY - lineStartY;
		let length = Math.sqrt(dx * dx + dy * dy);
		if (length > 0){
    		dx /= length;
    		dy /= length;
		}
		dx *= length - 25;
		dy *= length - 25;

		lineEndX = lineStartX + dx
		lineEndY = lineStartY + dy

		dx = lineStartX - lineEndX;
		dy = lineStartY - lineEndY;
		length = Math.sqrt(dx*dx+dy*dy)
		if (length > 0){
    		dx /= length;
    		dy /= length;
		}
		dx *= length - 25;
		dy *= length - 25;

		lineStartX = lineEndX + dx
		lineStartY = lineEndY + dy

		lines.push({
				colour: "green",
				startX: lineStartX,
				startY: lineStartY,
				endX: lineEndX,
				endY: lineEndY,
				number: linesCount,
				from: lineFromF,
				to: lineToF
			});

		context.beginPath();
		context.moveTo(lineStartX, lineStartY);
		context.lineTo(lineEndX, lineEndY);
		context.strokeStyle = lines[linesCount].colour;
		context.lineWidth = 4;
		context.stroke();

		
			linesCount++;
	};

	const handleClick = () => {
		out = "";
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
	let nodesA =[];
	const handlePlay = () => {
			nodesA = out.split("\n");
			timer = setInterval(play, 1000)
	}
	let i = 0;
	let timer;
	const play = () => {
		elements[nodesA[i]].colour = 'orange';
		redraw();
		elements[nodesA[i]].colour = 'red';
		i++;
		if(i==nodesA.length-1){
			clearInterval(timer)
		}
	}

	const redraw = ()=>{
			context.clearRect(0,0,canvasEl.width,canvasEl.height)
			elements.forEach((element)=>{
				context.beginPath();
				context.arc(
				element.left,
				element.top,
				25,
				0,
				2 * Math.PI
				);

				context.fillStyle = element.colour;
				context.fill();
				
				context.fillStyle = "blue";
				context.font = "20px Arial";
				context.fillText(
					element.num,
					element.left - element.width / 4,
					element.top + element.height / 4
				);
			})
			lines.forEach((element)=>{
				context.beginPath();
				context.moveTo(element.startX, element.startY);
				context.lineTo(element.endX, element.endY);
				context.strokeStyle = element.colour;
				context.lineWidth = 4;
				context.stroke();
			})
	}

	

</script>

<main>
	<canvas
		width="800"
		height="400"
		id="myCanvas"
		on:click={canvasClick}
		bind:this={canvasEl}
	/>
	<br />
	<button on:click={handleMode}>{mode}</button>
	<button on:click={handleClear}>Clear</button>
	<button on:click={handlePlay}>play</button>
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
	canvas {
		border: 1px solid black;
	}
</style>