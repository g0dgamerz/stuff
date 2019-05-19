//JSON OBJECT---------------------------------------------------------------------------------------------

var data = [
	 {
			 tagName: 'div',
			 className: 'test-class',
			 styles: {
					 width: "100px",
					 height: "100px",
					 backgroundColor: 'red'
			 },
			 children: [
					 {
							 tagName: 'div',
							 className: 'box',
							 styles: {
									 width: "50px",
									 height: "50px",
									 backgroundColor: 'blue'
							 },
					 },
					 {
							 tagName: 'div',
							 className: 'box',
							 styles: {
									 width: "50px",
									 height: "50px",
									 backgroundColor: 'brown',
									 float: 'right'
							 },
					 },
					 
			 ]
	 }
];



var body=document.getElementsByTagName("body")[0];
var objKeys=Object.keys(data[0]);

for(var i=0;i<data.length;i++){
	jsonToHtml(data[i],body);
}


//Converting JSON to HTML----------------------------------------------------------------------------
function jsonToHtml(jsonObject,parent){
	var child=constructElement(jsonObject);
	var flag=checkChildren(jsonObject);
	if(flag=="hasChildren"){
		for(var i=0;i<jsonObject.children.length;i++){
			jsonToHtml(jsonObject.children[i],child);
		}
	}
	parent.appendChild(child);
}

function constructElement(element){
	var newElement=document.createElement(element.tagName);
	newElement.setAttribute("class",element.className);
	for(styleKey in element.styles){
		newElement.style[styleKey]=element.styles[styleKey];
	}
	return newElement;
}


function checkChildren(jsonObject){
	var keys=Object.keys(jsonObject);
	var flag="noChildren";
	keys.forEach(function(key){
		if(key=="children"){
			flag="hasChildren";
		}
	});
	return flag;
}

