<script>
    export let algorithm = 'DFS';
	import {GraphDFS, GraphBFS, GraphSHP} from  "./algs.js";
	import { onMount } from "svelte";
	
	let text = ""; //Textbox with paths
	let out = ""; //Output textbox
	let nodes = ""; //Number of nodes input
	let from = "";  //Number of starting node
	let valueIn = ""; //Path values for shortest path
	let add = true; //true add node| false add path
	let mode = "node"; //node|path
	let ft = true; //true from | false to
	
	let elements = []; //Array of nodes
	let elemLeft; //canvas offset from Left
	let elemTop;	//canvas offset from top
	let context;	//canvas Context
	let canvasEl;	

	let textHolder = ""; //Textbox with paths

	let lines = []; //Array of lines

	//Variables used in paths intersection calculations
	let lineStartX;
	let lineStartY;
	let lineEndX;
	let lineEndY;
	let lineFrom;
	let lineTo;

	let nodesCount = 0;
	let linesCount = 0;

	//Setup after rendering components 
	onMount(() => {
		context = canvasEl.getContext("2d");
		elemLeft = canvasEl.offsetLeft + canvasEl.clientLeft;
		elemTop = canvasEl.offsetTop + canvasEl.clientTop;
	});
	//Textbox with paths
	const handleUpdate = (e) => {
		text = e.target.value;
	};
	//Textbox with number of nodes
	const nodesInput = (e) => {
		nodes = e.target.value;
	};
	//Textbox with starting node for search
	const fromNode = (e) => {
		from = e.target.value;
	};
	//Textbox with paths values for shortest path
	const pathValue = (e)=>{
		valueIn = e.target.value;
	}
	//Clear
	const handleClear = () => {
		context.clearRect(0,0,canvasEl.width,canvasEl.height)
		out = "";
		text= "";
		valueIn=0;
		elements = [];
		lines = [];
		nodesCount = 0;
		linesCount = 0;
		clearInterval(timer);
		nodes = "";
		from = "";
		textHolder = "";	
	};
	//Mode switcher node|path
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
		//Determining, if click was on free space for adding new node
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
			//Determining, if click was on node to add new path
			elements.forEach((element) => {
				if (
					y > element.top - element.height &&
					y < element.top + element.height &&
					x > element.left - element.width &&
					x < element.left + element.width
				) {
					//Starting point of path
					if (ft) {
						lineFrom = element.num
						text += element.num + "=>";
						ft = false;
						lineStartX = element.left;
						lineStartY = element.top;
					} //Ending point of path
					else {
						lineTo = element.num;
						text += element.num + "\n";
						textHolder = text;
						ft = true;
						lineEndX = element.left;
						lineEndY = element.top;
						drawLine(lineFrom, lineTo);
					}
				}
			});
		} else {
			//Adding new node
			if(space){
				elements.push({
				colour: "#8F80F4",
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
			context.fillStyle = "#ded6c8";
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
		//Calculating intersection of path and border of node to prevent overlaping
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
		//Adding new path to Array with paths
		lines.push({
				colour: "#71e0eb",
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
	//Creating matrix
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
		
		//Filling matrix with path values
		let parsValue = valueIn.split("\n");
		let ind = 0;
		let parsArr = text.split("\n");
		parsArr.forEach((element)=> {
			let tempArr = element.split("=>");
			try {
				mat[tempArr[0]][tempArr[1]] = parseInt(parsValue[ind]);
				mat[tempArr[1]][tempArr[0]] = parseInt(parsValue[ind]);
				ind++;
			} catch {}
		} 
		)
	}
	//Creating class with requested algorithm
	const handleClick = () => {
		text = textHolder;
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
		//Parsing vales for algorithm
		g.setOut(out);
		partsArr.forEach((element) => {
			let tempArr = element.split("=>");
			try {
				g.addEdge(tempArr[0], tempArr[1]);
			} catch {}
		});
		//caling algorithm
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
	};
	let nodesA =[];
	
	const handlePlay = () => {
			nodesA = out.split("\n");
			i = 0;
			clearInterval(timer);
			timer = setInterval(play, 1000);
	}
	let i = 0;
	let timer;
	//Going thru nodes and recoloring them as algorithm searches through graph
	const play = () => {
		elements[nodesA[i]].colour = 'orange';
		redraw();
		elements[nodesA[i]].colour = '#8F80F4';
		i++;
		if(i==nodesA.length-1){
			//Timeout for showing last node before redrawing canvas
			setTimeout(() => {
				redraw();
			}, 1000);
			clearInterval(timer)
		}
	}
	//Function for redrawing canwas to show changes
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
				
				context.fillStyle = "#ded6c8";
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
	<button on:click={handleMode}>Přidává se: {mode}</button>
	<button on:click={handleClear}>Vyčistit plátno</button>
	{#if algorithm != 'SHP'}
	<button on:click={handlePlay}>Přehrát animaci</button>
	{/if}
	<br />
	<div class="flex-container">
	<div class="Input">
		<textarea
		placeholder="Vstup"
		name="inp"
		id="in"
		cols="30"
		rows="10"
		readonly
		on:input={handleUpdate}
		value={text}/>
</div>
	{#if algorithm == 'SHP'}
	<div class="Value">
		<textarea placeholder="Zadejte hodnotu cest mezi uzly. Pro každou cestu na samostatný řádek odpovídající cestě zobrazené v levém textovém poli" name="pathValue" id="pathValue" cols="30" rows="10" on:input={pathValue} value={valueIn}></textarea>
	</div>
    {:else if algorithm == 'SPT'}
	<div class="Value">
		<textarea placeholder="Path value" name="pathValue" id="pathValue" cols="30" rows="10" on:input={pathValue} value={valueIn}></textarea>
	</div>
    {/if}
	<div class="Output">
	<textarea placeholder="Výstup" name="output" id="output" cols="30" rows="10" readonly value={out}></textarea>
</div>
</div>
	<br />
	<input type="text" placeholder="Počet vrcholů v grafu:" on:input={nodesInput} value={nodes}/>
	<input type="text" placeholder="Z vrcholu:" on:input={fromNode} value={from}/>
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
		border-radius: 5px;
		box-shadow: 0.8px 0.8px 5px #888888;
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