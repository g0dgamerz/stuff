const MAX_IMAGE_COLLECTION_INDEX = 2;
const MIN_IMAGE_COLLECTION_INDEX = 0;
const INTERVAL_TIME_FADE = 15;
const OPACITY_CHANGE_INDEX = 1/100;

var imageCollection = {
  0: {
    title: ['Forest 1','Forest 2','Forest 3','Forest 4'],
    images: ['forest (1).jpg','forest (2).jpg','forest (3).jpg','forest (4).jpg']
  },
  1: {
    title: ['Mountain 1','Mountain 2','Mountain 3','Mountain 4'],
    images: ['smallMountain (1).jpg','smallMountain (2).jpg','smallMountain (3).jpg','smallMountain (4).jpg']
  },
  2: {
    title: ['Desert 1','Desert 2','Desert 3','Desert 4'],
    images: ['desert (1).jpg','desert (2).jpg','desert (3).jpg','desert (4).jpg']
  }
};

//image collection currently selected
var imageCollectionIndex = 1;
var imageCollectionKeys = Object.keys(imageCollection[0]);

//navigation left and right
var navLeft = document.getElementById('botNavLeft');
var navRight = document.getElementById('botNavRight');

var flag = true; //for preventing multiple on clicks

//initiating the function
init();
function init(){
  var that = this;
  this.maxText = imageCollection[imageCollectionIndex][imageCollectionKeys[0]].length;
  this.maxImage = imageCollection[imageCollectionIndex][imageCollectionKeys[1]].length;
  setText();
  setImage();

  //sets image description
  function setText(){
    for(var i=0;i<this.maxText;i++) {
      var textAbs = document.getElementById('textAbs'+(i+1));
      textAbs.textContent = imageCollection[imageCollectionIndex][imageCollectionKeys[0]][i];
    }
  }

  //sets image description
  function setImage(){
    for(var i=0;i<this.maxImage;i++) {
      var image = document.getElementById('imageBodyBot'+(i+1));
      image.src = 'images/' + imageCollection[imageCollectionIndex]['images'][i];
      image.style.opacity = 0; //setting opacity 0 firstly for all images
      setOpacity(image); //changing opacity if animation isn't occuring
    }
  }

  //display image if no animation
  function setOpacity(image){
    if(flag){
      image.style.opacity = 1;
    }
  }

  //function for animation next------------------------------------------------------------------------------------
  function animate() {
    var opacity = [0,0,0,0];
    var stopper = setInterval(function () {
      for(var i=0;i<that.maxImage;i++){
        var image = document.getElementById('imageBodyBot'+(i+1));
        opacity[i]+= OPACITY_CHANGE_INDEX;
        image.style.opacity = opacity[i];
      }
      if (opacity[3] >=1) {
        clearInterval(stopper);
        flag = true;
        opacity = [1,1,1,1];
      }
    }, INTERVAL_TIME_FADE);
  }

  navLeft.onclick = function(){
    if(imageCollectionIndex>MIN_IMAGE_COLLECTION_INDEX && flag) {
      imageCollectionIndex--;
      flag = false;
      init();
      animate();
    }
  }

  navRight.onclick = function(){
    if(imageCollectionIndex<MAX_IMAGE_COLLECTION_INDEX && flag) {
      imageCollectionIndex++;
      flag = false;
      init();
      animate();
    }
  }
}
