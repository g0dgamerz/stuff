const IMAGE_WIDTH = 1170;
const SLIDE_LENGTH = .5;
const MAX_SLIDER_TYPE = 2;
const MIN_SLIDER_TYPE = 0;
const INTERVAL_TIME_SLIDER = 5;

var slider = {
  0: {
    title: 'Donec faucibus ultricies congue',
    images: ['scene (1).jpeg','scene (2).jpeg','scene (3).jpeg','scene (4).jpeg','scene (5).jpeg']
  },
  1: {
    title: 'Faucibus donec congue ultricies',
    images: ['animal (1).jpg','animal (2).jpeg','animal (3).jpg','animal (4).jpg','animal (5).jpg']
  },
  2: {
    title: 'Ultricies congue donec faucibus ',
    images: ['lake (1).jpg','lake (2).jpg','lake (3).jpg','lake (4).jpg','lake (5).jpg']
  }
};

var sliderKeys = Object.keys(slider[0]);
console.log(sliderKeys);

//Slider Images--------------------------------------------------------------------------------------------------
var sliderType = 0;

//TITLE
var sliderTitle=document.getElementById('titleText');

//Slider Title button left
var sliderTitleBtnLeft=document.getElementById('sliderTitleBtnLeft');

//Slider Title button right
var sliderTitleBtnRight=document.getElementById('sliderTitleBtnRight');

//sliderDivision
var sliderDiv=document.getElementById('sliderImage');
sliderDiv.style.overflow="hidden";

//Slider button
var sliderBtnDiv=document.getElementById('sliderButton');

initiateSlider();

function initiateSlider() {
  var that = this;
  this.flag = true;
  this.sliderImageIndex = 0;
  this.NUMBER_OF_IMAGE_IN_SLIDER = slider[sliderType][sliderKeys[1]].length;

  //title for slider-------------------------------------------------------------------------------------------
  sliderTitle.textContent = slider[sliderType][sliderKeys[0]];

  //change slider button next
  sliderTitleBtnRight.onclick = function () {
    if (sliderType < MAX_SLIDER_TYPE) {
      sliderType++;
      removeChildren(sliderBtnDiv);
      removeChildren(sliderDiv);
      initiateSlider();
    }
  }

  //change slider button prev
  sliderTitleBtnLeft.onclick = function () {
    if (sliderType > MIN_SLIDER_TYPE) {
      sliderType--;
      removeChildren(sliderDiv);
      removeChildren(sliderBtnDiv);
      initiateSlider();
    }
  }

  //creating slide next and prev button-------------------------------------------------------------------------
  this.btnNext = document.createElement("a");
  this.btnNext.setAttribute('class','r-right');
  this.btnPrev = document.createElement("a");
  this.btnPrev.setAttribute('class','l-left');
  sliderDiv.appendChild(this.btnNext);
  sliderDiv.appendChild(this.btnPrev);
  //creating ul-------------------------------------------------------------------------------------------------
  this.ul = document.createElement("ul");
  this.ul.style.position = "absolute";
  this.ul.style.top = "0%";
  this.ul.style.left = "0%";
  this.ul.style.listStyle = "none";
  this.ul.style.width = (IMAGE_WIDTH * this.NUMBER_OF_IMAGE_IN_SLIDER) + "px";
  sliderDiv.appendChild(this.ul);

//creating this.ul for button below slider--------------------------------------------------------------------------
  this.ulBtn = document.createElement("ul");
  sliderBtnDiv.appendChild(this.ulBtn);


//function for adding image to list----------------------------------------------------------------------------
  this.addImage = function (imgName) {
    var image = document.createElement("img");
    image.src = 'images/' + imgName;
    var li = document.createElement("li");
    li.style.margin = "0px";
    li.style.padding = "0px";
    li.style.float = "left";
    that.ul.appendChild(li);
    li.appendChild(image);
  };

//function for adding button to list----------------------------------------------------------------------------
  this.addButton = function (index) {
    var imageBtn = document.createElement("img");
    imageBtn.src = 'images/transparent.png';
    var liBtn = document.createElement("li");
    liBtn.setAttribute('id', 'sliderBtn' + index);
    liBtn.setAttribute('class', 'dummy');
    that.ulBtn.appendChild(liBtn);
    liBtn.appendChild(imageBtn);
    if (index == that.sliderImageIndex) {
      liBtn.setAttribute('class', 'active');
    }
  };


//adding image to list------------------------------------------------------------------------------------------
  for (var c = 0; c < this.NUMBER_OF_IMAGE_IN_SLIDER; c++) {
    this.addImage(slider[sliderType]['images'][c]);
    this.addButton(c);
  }

//function for animation next------------------------------------------------------------------------------------
  function animateNext(percent) {
    var stopper = setInterval(function () {
      percent -= SLIDE_LENGTH;
      that.ul.style.left = percent + "%";
      if (Math.abs(percent % 100) == 0) {
        clearInterval(stopper)
        that.flag = true;
      }
    }, INTERVAL_TIME_SLIDER);
  }

//function for animation previous-------------------------------------------------------------------------------
  function animatePrev(percent) {
    var stopper = setInterval(function () {
      percent += SLIDE_LENGTH;
      that.ul.style.left = percent + "%";
      if (Math.abs(percent % 100) == 0) {
        clearInterval(stopper);
        that.flag = true;
      }
    }, INTERVAL_TIME_SLIDER);
  }

//Sliding Function for Next-------------------------------------------------------------------------------------
  this.btnNext.onclick = function () {
    if (that.flag == true && that.sliderImageIndex < that.NUMBER_OF_IMAGE_IN_SLIDER - 1) {
      that.flag = false;
      that.sliderImageIndex++;
      var percent = -(that.sliderImageIndex - 1) * 100;
      animateNext(percent);
      setSliderBtnActive();
    }
  }

//Sliding Function for Previous--------------------------------------------------------------------------------
  this.btnPrev.onclick = function () {
    if (that.flag == true && that.sliderImageIndex > 0) {
      that.flag = false;
      that.sliderImageIndex--;
      var percent = -(that.sliderImageIndex + 1) * 100;
      animatePrev(percent);
      setSliderBtnActive();
    }
  }

  function setSliderBtnActive(){
    for(var i =0;i<that.NUMBER_OF_IMAGE_IN_SLIDER;i++){
      var tempBtn = document.getElementById('sliderBtn'+i);
      if(i==that.sliderImageIndex){
        tempBtn.setAttribute('class','active');
      }else{
        tempBtn.setAttribute('class','dummy');
      }
    }
  }

  for(var i=0;i<this.NUMBER_OF_IMAGE_IN_SLIDER;i++) {
    var tempBtn = document.getElementById('sliderBtn'+i);
    tempBtn.onclick = function (i) {
      return function () {
        if(flag) {
          changeSliderImage(i);
        }
      }
    }(i);
  }

  function changeSliderImage(index){
    that.sliderImageIndex = index;
    that.ul.style.left = -(100*index) + "%";
    setSliderBtnActive();
  }
}

//removing all the child -------------------------------------------------------------------------------------
function removeChildren(parent){
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}