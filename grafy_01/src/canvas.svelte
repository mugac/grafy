<script>
    import { onMount } from "svelte";
    import add from "./App.svelte";

    export let elements = [];
	let elemLeft;
	let elemTop;
	let context;
	let canvasEl;

    export let lines = [];
	let lineStartX;
	let lineStartY;
	let lineEndX;
	let lineEndY;

    let ft = true; //true from | false to

    onMount(() => {
		console.log("Onmount");
		context = canvasEl.getContext("2d");
		elemLeft = canvasEl.offsetLeft + canvasEl.clientLeft;
		elemTop = canvasEl.offsetTop + canvasEl.clientTop;
	});
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
						text += element.num + ",";
						ft = false;
						lineStartX = element.left;
						lineStartY = element.top;
					} else {
						text += element.num + "\n";
						ft = true;
						lineEndX = element.left;
						lineEndY = element.top;
						drawLine();
					}
				}
			});
		} else {
			if(space){
				elements.push({
				colour: "blue",
				width: 25,
				height: 25,
				top: y,
				left: x,
				num: nodesCount,
			});
			let index = nodesCount;
			// elements.forEach(element => {
			context.fillStyle = "#FF0000";
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
	const drawLine = () => {
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

		context.beginPath();
		context.moveTo(lineStartX, lineStartY);
		context.lineTo(lineEndX, lineEndY);
		context.strokeStyle = "green";
		context.lineWidth = 4;
		context.stroke();

		lines.push({
				colour: "green",
				startX: lineStartX,
				startY: lineStartY,
				endX: lineEndX,
				endY: lineEndY,
				number: linesCount
			});
			linesCount++;
	};
</script>
    <canvas
		width="800"
		height="400"
		id="myCanvas"
		on:click={canvasClick}
		bind:this={canvasEl}
	/>
<style>
    canvas {
		border: 1px solid black;
	}
</style>