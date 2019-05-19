//main wrapper style
var mainWrapper=document.getElementById("main-wrapper");
	mainWrapper.style.fontSize="20px";
	mainWrapper.style.fontWeight="bold";
	mainWrapper.style.textAlign="center";
	mainWrapper.style.backgroundColor="darkgrey";
	mainWrapper.style.width="500px";
	mainWrapper.style.height="500px";
	mainWrapper.style.float="left";
	mainWrapper.style.postion="relative";


//created a bottom wrapper to display plotting points
var body=document.getElementsByTagName("body")[0];
var bottomWrapper=document.createElement("div");
	bottomWrapper.setAttribute("id","bottom-wrapper");
	bottomWrapper.style.width="500px";
	bottomWrapper.style.margin="0px 30px 20px 30px";
	bottomWrapper.style.float="left";
	bottomWrapper.style.fontSize="20px";
	bottomWrapper.style.fontWeight="bold";
	bottomWrapper.innerHTML="Scatter Plot Co-ordinates";
body.appendChild(bottomWrapper);


//Random number generation
function getRandomNumber(max,min){
	return Math.floor(Math.random()*(max-min+1))+min;
}

var data=[];
for(var i=0;i<10;i++){
	var temp={
		top: getRandomNumber(450,50)+"px",
		left: getRandomNumber(450,50)+"px"
	}
	data.push(temp);
}

//creating <ul> and <li>
var ul=document.createElement("ul");
bottomWrapper.appendChild(ul);

//scatter plotting
for(var i=0;i<data.length;i++){
	var block=document.createElement("div");
		block.style.position = "absolute";
		block.style.width = "20px";
		block.style.height = "20px";
		block.setAttribute("id","scatterId"+i);
		block.setAttribute("class","scatter-plot");
		block.style.backgroundColor = "black";
		block.style.top = data[i].top;
		block.style.left = data[i].left;
		mainWrapper.appendChild(block);
		block.onclick=function(){
			var deleted=mainWrapper.removeChild(this);
			var li=document.createElement("li");
			ul.appendChild(li);
			var valueTop=deleted.style.getPropertyValue("top");
			var valueLeft=deleted.style.getPropertyValue("left");
			var text=document.createTextNode("top: "+valueTop+", left: "+valueLeft);
			li.appendChild(text);
		}
} 
