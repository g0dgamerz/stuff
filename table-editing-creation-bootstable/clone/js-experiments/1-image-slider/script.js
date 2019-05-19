document.body.style.backgroundColor="darkgrey";

var mainWrapper=document.getElementById("main-wrapper");

mainWrapper.style.backgroundColor="darkgrey";
mainWrapper.style.textAlign="center";
mainWrapper.style.fontSize="30px";
mainWrapper.style.fontWeight="bold";
mainWrapper.style.margin="20px auto";
mainWrapper.style.width="500px";

//imageDivision-------------------------------------------------------------------------------------

var imageDiv=document.createElement("div");

imageDiv.style.width="500px";
imageDiv.style.height="500px";
imageDiv.style.position="relative";
imageDiv.style.overflow="hidden";

mainWrapper.appendChild(imageDiv);



//creating ul----------------------------------------------------------------------------------------

var ul=document.createElement("div");

ul.style.position="absolute";
ul.style.top="0%";
ul.style.left="0%";
ul.style.height="500px";
ul.style.width="2500px";
ul.style.margin="0px";
ul.style.padding="0px";
ul.style.listStyle="none";

imageDiv.appendChild(ul);


//creating button-------------------------------------------------------------------------------------
var btnPrev=document.createElement("button");

btnPrev.setAttribute("id","btnPrev");
btnPrev.style.borderRadius="5px";
btnPrev.style.border="none";
btnPrev.style.float="left";
btnPrev.style.width="100px";
btnPrev.style.height="30px";
btnPrev.style.margin="20px";
btnPrev.innerHTML="<< Previous";

mainWrapper.appendChild(btnPrev);



var btnNext=document.createElement("button");

btnNext.setAttribute("id","btnPrev");
btnNext.style.borderRadius="5px";
btnNext.style.border="none";
btnNext.style.float="right";
btnNext.style.width="100px";
btnNext.style.height="30px";
btnNext.style.margin="20px";
btnNext.innerHTML="Next >>";

mainWrapper.appendChild(btnNext);






//Slider Images----------------------------------------------------------------------------------------
var images=["image.jpg","image(1).jpg","image(2).jpg","image(3).jpg","image(4).jpg"];
var counter=0;




//function for adding image to list------------------------------------------------------------------
var addImage=function(imgName){ 

	var image=document.createElement("img");

	image.src=imgName;
	image.style.height="500px";

	var li=document.createElement("li");

	li.style.margin="0px";
	li.style.padding="0px";
	li.style.float="left";

	ul.appendChild(li);
	li.appendChild(image);
};


//adding image to list--------------------------------------------------------------------------------

for(var c=0;c<images.length;c++){
	addImage(images[c]);
}



//function for setting image loop---------------------------------------------------------------------
function check(value){
	if(value>4){
		return 0;
	}

	if(value<0){
		return 4;
	}

	return value;
}


//function for timeout---------------------------------------------------------------------------------
var flag=true;
function preventClick(){
	setTimeout(function(){
		flag=true;
	},1000);
}


//function for animation next--------------------------------------------------------------------------
function animateNext(percent){
	var stopper=setInterval(function(){
		percent-=2.5;
		ul.style.left=percent+"%";
		if(Math.abs(percent%100)==0){
			clearInterval(stopper);
		}
	},25);
}

//function for animation previous----------------------------------------------------------------------
function animatePrev(percent){
	var stopper=setInterval(function(){
		percent+=2.5;
		ul.style.left=percent+"%";
		if(Math.abs(percent%100)==0){
			clearInterval(stopper);
		}
	},25);
}

//Sliding Function for Next----------------------------------------------------------------------------
btnNext.onclick=function(){
	if(flag==true){
		flag=false;
		counter++;
		counter=check(counter);
		var percent=-(counter-1)*100;
		animateNext(percent);
		preventClick();
	}
}




//Sliding Function for Previous----------------------------------------------------------------------------
btnPrev.onclick=function(){
	if(flag==true){
		flag=false;
		counter--;
		counter=check(counter);
		var percent=-(counter+1)*100;
		animatePrev(percent);
		preventClick();
	}
}
