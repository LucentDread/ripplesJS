document.addEventListener("DOMContentLoaded", () => {
	let style = document.createElement("style")
	style.innerHTML = `
	@keyframes ripples {
	to {
			transform: scale(10);
			opacity: 0;
		}
	}
	.ripples {
		overflow: hidden
	}
	.ripples:after {
		content:'';
		width:100%;
		height:100%;
		background:rgba(255, 255, 255, 0);
		transition: background 0.2s ease-in-out;
		position:absolute;
		top:0;
		left:0;

	} 
	.ripples.dark:after {
		background:rgba(0, 0, 0, 0);
	}
	.ripples.dark.mousedown:after {
		background:rgba(0, 0, 0, 0.1);
	} 
	.ripples.mousedown:after {
		background:rgba(255, 255, 255, 0.1);
	} 

	.ripples .spanRipple {
		position: absolute;
		animation: ripples 400ms ease-in-out 10ms forwards;
		background: rgba(255,255,255,0.5);
		border-radius: 50%;
	}
	.ripples.dark .spanRipple {
		background: rgba(0,0,0,0.5);
	}
	`
	document.head.appendChild(style)
	document.querySelectorAll(".ripples").forEach(el => {
		el.addEventListener("mousedown", (e) => {
			el.classList.add("mousedown")
		})
		el.addEventListener("mouseleave", (e) => {
			el.classList.remove("mousedown")
		})
		el.addEventListener("mouseenter", (e) => {
			if (e.which == 1) el.classList.add("mousedown")
		})
		el.addEventListener("mouseup", (e) => {
			let mouseX = e.layerX
			let mouseY = e.layerY
			el.classList.remove("mousedown")
			let span = document.createElement("span")
			let radius = Math.max(el.clientWidth, el.clientHeight) / 5
			span.style.width = radius + "px"
			span.style.height = radius + "px"
			span.style.top = mouseY - radius / 2 + "px"
			span.style.left = mouseX - radius / 2 + "px"
			span.classList.add("spanRipple")
			span.style.pointerEvents = "none"
			el.appendChild(span)
			setTimeout(() => {
				span.remove()
			}, 400)

		})
	})
})