
var FPS = 30; // target frames per second
var SECONDSBETWEENFRAMES = 1 / FPS;
var ctx = null; // Useful to have a global reference for measuring fonts for instance
var canvas = null; // The main drawing area

var GAME_SIZE = {x: 800, y: 800};
var player = null;
var cur_screen = "menu";
var menu = null;
var game = null;

function loadGame(){

	canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);

    menu = new Menu();
    player = new Player(100, 700, 40, 40);
    //player = new Player(25, 450, 100, 90);
    game = new Game();

	// The following line sets up the game loop
	setInterval(update, SECONDSBETWEENFRAMES * 500);
    player.started = true;
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    ctx.fillStyle = "#00000";
	var w = GAME_SIZE.x;
	var h = GAME_SIZE.y;
    ctx.fillRect(0,0,w,h);

    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  
    if(cur_screen == "menu"){
        menu.update(w, h);        
        menu.draw(ctx);
    }else if(cur_screen == "game"){
        var offset = player.update(gamepads);
        game.update();
        game.draw(ctx,0);
    }

    ctx.restore();
}
 
var gamepads = null;
$(document).ready(function(){

    function gamepadHandler(event, connecting) {
        var gamepad = event.gamepad;
        // Note:
        // gamepad === navigator.getGamepads()[gamepad.index]

        if (connecting) {
            gamepads[gamepad.index] = gamepad;
        } else {
            delete gamepads[gamepad.index];
        }
    }

    window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
    window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
});

