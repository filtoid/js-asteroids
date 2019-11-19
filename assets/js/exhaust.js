function Exhaust(x,y, dir){
    this.rot = dir; // Rotation in radians
    this.loc = new Location(x, y);

    this.draw = ExhaustDraw;
    this.update = ExhaustUpdate;
    this.status = 'alive'
    
    this.ttl_default = 30;
    this.ttl = this.ttl_default;

    this.reset = ExhaustReset;

    this.fillStyle = "rgb(255, 255, 255)"
}

function ExhaustReset(x, y, rot){
    this.loc.x = x;
    this.loc.y = y;
    this.rot = rot;
    this.status = 'alive';
    this.ttl = this.ttl_default;

    // Experiemental - give a rainbow exhaust fume set
    // var red = getRandomInt(50, 255);
    // var green = getRandomInt(50, 255);
    // var blue = getRandomInt(50, 255);
    // this.fillStyle = "rgb(" + red + "," + green + "," + blue + ")"
}

function ExhaustUpdate(){
    if(this.status=="dead"){
        // Can't do anything when we are dead
        return;
    }
    if(this.ttl < 1){
        this.status='dead';
    }else{
        this.ttl -= 1;
    }
 
    this.loc.x += Math.sin(this.rot);
    this.loc.y += Math.cos(this.rot);
}

function ExhaustDraw(ctx){
    if(this.status != 'alive'){
        return;
    }
    var oldStyle = ctx.fillStyle;
    var oldOpacity = ctx.globalAlpha;
    
    ctx.globalAlpha = this.ttl/this.ttl_default;
    
    ctx.fillStyle = this.fillStyle;
    
    ctx.fillRect(this.loc.x, this.loc.y, 2, 2);
    ctx.fillStyle = oldStyle;
    ctx.globalAlpha = oldOpacity;
}