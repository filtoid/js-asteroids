var aryCurPressedKeys = new Array();

function onKeyDown(evt)
{
	//alert(String.fromCharCode(evt.which||evt.keyCode));
	var key=String.fromCharCode(evt.which||evt.keyCode);
    // If key not already down then add to our list
	if(!isKeyPressed(key)){
		aryCurPressedKeys[aryCurPressedKeys.length]=key;
	}
}

function onKeyUp(evt)
{
	var key=String.fromCharCode(evt.which||evt.keyCode);

    // If the key released is in our list then remove it
	for(var i=0;i<aryCurPressedKeys.length;i++){
		if(key==aryCurPressedKeys[i]){
			removeArrayItem(aryCurPressedKeys,i);
		}
	}
}

function isKeyPressed(key){
	for(var i=0;i<aryCurPressedKeys.length;i++){
		if(aryCurPressedKeys[i]==key){
			return true;
		}
	}

	return false;
}

//Move all items in the array above the point down and then
//delete the last item.
function removeArrayItem(_array,nItem){
	for(var i=nItem;i<_array.length;i++){
		_array[i]=_array[i+1];

		if(i==_array.length-1){
			delete _array[_array.length];
			return;
		}
	}
}

function removeAllKeysFromArray(){
	aryCurPressedKeys = new Array();
}	

function isGamepadButtonPressed(name){
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	if(gamepads == undefined || gamepads == null || gamepads.length < 1 || gamepads[0] == null){
		return false;
	}
	var gp = null; 
		
	for(var i =0; i<gamepads.length; i++){
		if(gamepads[i].buttons[0] != undefined){
			gp = gamepads[i];
			console.log("Gamepad " + i + " being used");
			break;
		}
	};
	
	if(gp == null){
		console.log("No gaamepad that is valid detected");
		return;
	}

	if(name == "right" && gp.axes[0] > 0.5){
		return true;
	}else if(name == "left" && gp.axes[0] < -0.5){
		return true;
	}else if(name == 'up' && gp.axes[1] < -0.5){
		return true;	
	}else if(name == 'down' && gp.axes[1] > 0.5){
		return true;	
	}else if(name == "jump"){
		if( gp.buttons[0].value > 0 || gp.buttons[0].pressed == true
			|| gp.buttons[1].value > 0 || gp.buttons[1].pressed == true 
			|| gp.buttons[2].value > 0 || gp.buttons[2].pressed == true 
			|| gp.buttons[3].value > 0 || gp.buttons[3].pressed == true 
			){
				return true;
		}
	}else if(name == "start"){
		// console.log(gp.buttons[9])
		if(gp.buttons[9].value > 0 && gp.buttons[9].pressed == true){
			// console.log("Start button pressed");
			return true;
		}
	}
	// var gp = gamepads[0];
	// console.log(gp.buttons[4]);
	// console.log(gp.buttons[5]);
	// console.log(gp.buttons[6]);
	// console.log(gp.buttons[7]);
	// console.log(gp.buttons[8]);
	// console.log(gp.buttons[9]);
	// console.log(gp.buttons[4]);

	return false;
}