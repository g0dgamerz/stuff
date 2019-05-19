var searchIcon = document.getElementById('searchIcon');
var searchBox = document.getElementById('searchBox');

document.onclick = function(event){
  var searchIconClicked = searchIcon.contains(event.target);
  var searchBoxClicked = searchBox.contains(event.target);
  if(searchIconClicked || searchBoxClicked) {
    searchBox.style.display = "block";
  }
  else {
    searchBox.style.display = "none";
  }
};