var mainWrapper=document.getElementById("main-wrapper");
mainWrapper.style.textAlign="center";
mainWrapper.style.fontSize="30px";
mainWrapper.style.fontWeight="bold";
mainWrapper.style.backgroundColor="darkkhaki";
mainWrapper.style.width="100%";
mainWrapper.style.display="table";
mainWrapper.style.content="";



var wrapper=document.createElement("div");
wrapper.style.width="80%";
wrapper.style.border="solid 1px";
wrapper.style.borderRadius="10px";
wrapper.style.margin="20px auto";
wrapper.style.padding="10px";
wrapper.style.display="table";
wrapper.style.content="";

mainWrapper.appendChild(wrapper);

var image=document.createElement("img");
image.src="IMG_2175.jpg";
image.style.maxWidth="100%";
image.style.width="40%";
image.style.height="auto";
image.style.float="left";
image.style.marginLeft="40px";
image.style.borderRadius="10px";

wrapper.appendChild(image);

var details=document.createElement("div");
details.style.width="55%";
details.style.paddingLeft="10px";
details.style.float="right";

wrapper.appendChild(details);



//creating JSON object--------------------------------------------------------------------------------------
var profile = {
    name: "Sushan Raj Shakya",
    image: "IMG_2175.jpg",
    age: "22",
    college: "Kantipur Engineering College",
    location: "Mangal Bazar",
  	email: "drop039beats@gmail.com",
}


var keys=Object.keys(profile);
//Loading into HTML------------------------------------------------------------------------------------------
for(var i=0;i<keys.length;i++){
	var key=keys[i];
	var ul=document.createElement("ul");
	ul.style.listStyleType="none";
	ul.style.padding="5px 5px 5px 0px";
	ul.style.fontSize="18px";
	ul.style.width="100%";
	ul.style.float="right";
	ul.style.margin="0px";

	details.appendChild(ul);

	var li=document.createElement("li");
	li.style.float="left";
	li.style.width="25%";
	li.style.textAlign="right";
	li.style.margin="5px";
	li.style.paddingLeft="20px";

	ul.appendChild(li);
	var text=document.createTextNode(key.toUpperCase()+" :");
	li.appendChild(text);

	var li=document.createElement("li");
	li.style.float="left";
	li.style.width="60%";
	li.style.margin="5px";
	li.style.textAlign="left";
	li.style.paddingLeft="20px";
	li.style.fontWeight= "normal";

	ul.appendChild(li);
	var text=document.createTextNode(profile[key]);
	li.appendChild(text);	
}

