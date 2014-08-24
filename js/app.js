window.requestAnimationFrame(function () {
  changeGameSize();
});

function changeGameSize(){
	var selectBox = document.getElementById("grid-container-size");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	
	var data_grid_size = (60 * selectedValue) + 20;
	
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "[data-grid-size='"+selectedValue+"']{\
		width:"+data_grid_size+"px;\
		height:"+data_grid_size+"px;\
	}\
	[data-grid-size='"+selectedValue+"'] > .ds-container {\
		width:"+data_grid_size+"px;\
		height:"+data_grid_size+"px;\
	}";
	document.body.appendChild(css);
	
	new GameManager(selectedValue);
}
