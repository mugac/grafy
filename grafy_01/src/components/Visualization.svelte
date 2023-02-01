<script>
    export let algorithm = 'DFS';
	import {GraphDFS, GraphBFS, GraphSHP} from  "./algs.js";
	import { onMount } from "svelte";
    import { element } from "svelte/internal";
	let text = "";
	let out = "";
	let nodes;
	let from;
	let valueIn = "";
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
	const pathValue = (e)=>{
		valueIn = e.target.value;
	}
	const handleClear = () => {
		context.clearRect(0,0,canvasEl.width,canvasEl.height)
		out = "";
		text= "";
		valueIn=0;
		elements = [];
		lines = [];
		nodesCount = 0;
		linesCount = 0;
		clearInterval(timer)
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
			context.fillStyle = elements[index].colour;
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
	let mat;
	const matrix = () =>{
		mat = new Array(nodes)	//create 2d array
		for (let i = 0; i < nodes; i++) {
 			mat[i] = new Array(parseInt(nodes));
		}
		for(let i = 0; i<nodes;i++) //fill 2d array with 0
		{
			for(let j = 0;j<nodes;j++)
			{
				mat[i][j] = 0;
			}
		}
		
		let parsValue = valueIn.split("\n");
		let ind = 0;
		let parsArr = text.split("\n");
		parsArr.forEach((element)=> {
			let tempArr = element.split(",");
			try {
				mat[tempArr[0]][tempArr[1]] = parseInt(parsValue[ind]);
				mat[tempArr[1]][tempArr[0]] = parseInt(parsValue[ind]);
				ind++;
			} catch {}
		} 
		)
		console.log(mat);
	}
	const handleClick = () => {
		let g
		out = "";
		let partsArr = text.split("\n");
		switch (algorithm){
			case 'DFS':
				g = new GraphDFS(nodes);
			break;
			case 'BFS':
				g = new GraphBFS(nodes);
			break;
			case 'SHP':
				matrix();
				g = new GraphSHP(nodes);
			break;
		}
		
		g.setOut(out);
		partsArr.forEach((element) => {
			let tempArr = element.split(",");
			try {
				g.addEdge(tempArr[0], tempArr[1]);
			} catch {}
		});
		switch (algorithm){
			case 'DFS':
				g.DFS(from);
			break;
			case 'BFS':
				g.BFS(from);
			break;
			case 'SHP':
				g.SHP(mat, from);
			break;
		}
		
		out = g.getOut();
		console.log(out);
	};
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
	<div class="flex-container">
	<div class="Input">
		<textarea
		placeholder="Input"
		name="inp"
		id="in"
		cols="30"
		rows="10"
		on:input={handleUpdate}
		value={text}/>
		<!-- {#each text as txt}
            <textarea name="value" id="" cols="30" rows="10" value={txt}></textarea>
		{/each} -->
	/>
</div>
	{#if algorithm == 'SHP'}
	<div class="Value">
		<textarea placeholder="Path value" name="pathValue" id="pathValue" cols="30" rows="10" on:input={pathValue} value={valueIn}></textarea>
	</div>
    {:else if algorithm == 'SPT'}
	<div class="Value">
		<textarea placeholder="Path value" name="pathValue" id="pathValue" cols="30" rows="10" on:input={pathValue} value={valueIn}></textarea>
	</div>
    {/if}
	<div class="Output">
	<textarea placeholder="Output" name="output" id="output" cols="30" rows="10" value={out}></textarea>
</div>
</div>
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
	canvas {
        background-color: #3B3A3A;
		border: 1px solid #8D8272;
	}
    textarea{
        background-color: #3B3A3A;
    }
    input{
        background-color: #3B3A3A;
    }
	.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
    align-items: flex-start;
    }


.Input { 
	order: 0;
    flex: 0 1 auto;
    align-self: auto;
 }

.Value { 
	order: 0;
    flex: 0 1 auto;
    align-self: auto;
 }

.Output { 
	order: 0;
    flex: 0 1 auto;
    align-self: auto;
 }

</style>