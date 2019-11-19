function Player(x, y, w, h){
    this.update = PlayerUpdate;
    this.draw = PlayerDraw;
    this.reset = PlayerReset;

    this.loc = new Location(x,y);
    this.start_loc = new Location(x, y);

    this.size = new Location(w, h);
    this.img = new Image();
    this.img.src = '/img/player.png';
    this.img_loaded = false; 
    this.img.onload = function(){
        player.img_loaded= true;
    }
    this.screen = new Location(800, 800);
    this.level_size = new Location(800, 800);

    this.exhausts = [];
    this.last_exhaust = 0;
    this.exhaust_cooldown = 5;

    this.speed = 1;
    this.rot = 0;
    this.rot_speed = 1;
}

function PlayerUpdate(gamepads){
    // Before we do anything update any exhausts
    for(var i=0; i<this.exhausts.length;i++){
        var ex = this.exhausts[i];
        ex.update();
    }

    // Player updates
    var bMovingForward = null;

    if(isKeyPressed('D') || isGamepadButtonPressed('right')){
        // We are moving to the right - this.rot_speed holds the speed of the craft while turning
       
    }
    if(isKeyPressed('A') || isGamepadButtonPressed('left')){
        // Move to the left - this.rot_speed holds the speed of the craft while turning
    }
    if(isKeyPressed('W') || isGamepadButtonPressed('up')){
        bMovingForward = true;
        // Move forward
        var rot_rad = deg2rad(this.rot);
        // TODO: Change the x and y location
    }
    if(isKeyPressed('S') || isGamepadButtonPressed('down')){
        // Move backward
        bMovingForward = false;
        var rot_rad = deg2rad(this.rot);
        // TODO: Change the x and y location 
    }
    
    // Update the exhaust fumes from the craft
    if(this.last_exhaust > 0){
        this.last_exhaust -= 1;
    }else if(bMovingForward != null){
        this.last_exhaust = this.exhaust_cooldown;
        var bFoundOne = false;
        var rot = this.rot;
        if(bMovingForward == false){
            rot -= 180;
            if(rot < 0){
                // Wrap around
                rot += 360;
            }
        }

        var jitter_rot = rot + (30 - getRandomInt(0,60));
        var rot_rad = deg2rad(jitter_rot);
        
        var loc_x = this.loc.x + this.size.x/2;
        var loc_y = this.loc.y + this.size.y/2;

        for(var i=0;i<this.exhausts.length;i++){
            var ex = this.exhausts[i];
            if(ex.status == "dead"){
                bFoundOne = true;
                ex.reset(loc_x, loc_y, rot_rad)
            }
        }
        if(!bFoundOne){
            
            this.exhausts.push(new Exhaust(loc_x, loc_y, rot_rad))
        }
    }

    // boundary checking
    if(this.rot > 360){
        this.rot -= 360;
    }
    if(this.rot < 0){
        this.rot += 360;
    }

    if(this.loc.x < 0){
        this.loc.x = 0;
    }
    if(this.loc.x > this.screen.x - this.size.x){
        this.loc.x = this.screen.x - this.size.x;
    }
    if(this.loc.y < 0){
        this.loc.y =0;
    }
    if(this.loc.y > this.screen.y - this.size.y){
        this.loc.y = this.screen.y - this.size.y;
    }
}

function PlayerDraw(ctx){
    var loc_x = this.loc.x;
    
    for(var i=0; i<this.exhausts.length;i++){
        var ex = this.exhausts[i];
        ex.draw(ctx);
    }

    //function drawImage(context, img, x, y, s_x, s_y, width, height, deg, flip, flop, center) {
    drawImage(ctx, this.img, loc_x, this.loc.y, 0, 0, this.size.x, this.size.y, this.rot, false, false, false);
}

function PlayerReset(){
    this.loc.x = this.start_loc.x;
    this.loc.y = this.start_loc.y;
}