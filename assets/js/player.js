function Player(x, y, w, h){
    this.update = PlayerUpdate;
    this.draw = PlayerDraw;
    this.reset = PlayerReset;

    this.loc = new Location(x,y);
    this.start_loc = new Location(x, y);

    this.size = new Location(w, h);
    this.img = new Image();
    this.img.src = '/img/player2.png';
    this.img_loaded = false; 
    this.img.onload = function(){
        player.img_loaded= true;
    }
    this.screen = new Location(800, 800);
    this.level_size = new Location(800, 800);

    this.speed = 10;
}

function PlayerUpdate(gamepads){
    // Player updates

    if(isKeyPressed('D') || isGamepadButtonPressed('right')){
        // We are moving to the right - this.speed holds the speed of the craft
        
    }
    if(isKeyPressed('A') || isGamepadButtonPressed('left')){
        // Move to the left - this.speed holds the speed of the craft
        
    }
    
    if(this.loc.x < 0){
        this.loc.x = 0;
    }
    if(this.loc.x > this.screen.x - this.size.x){
        this.loc.x = this.screen.x - this.size.x;
    }
}

function PlayerDraw(ctx){
    var loc_x = this.loc.x;
   
    //function drawImage(context, img, x, y, s_x, s_y, width, height, deg, flip, flop, center) {
    drawImage(ctx, this.img, loc_x, this.loc.y, 0, 0, this.size.x, this.size.y, 0, false, false, false);
}

function PlayerReset(){
    this.loc.x = this.start_loc.x;
    this.loc.y = this.start_loc.y;
}