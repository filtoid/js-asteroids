function AsteroidBounce(x, y, rot){
    this.loc = new Location(x, y);

    this.img = new Image();
    var pic_num = getRandomInt(2,3);
    this.img.src = "/img/asteroid" + pic_num + ".png";
    // console.log(this.img.src);
    this.size = new Location(40, 40);
    this.screen_size = new Location(GAME_SIZE.x, GAME_SIZE.y);
    this.update = AsteroidBounceUpdate;
    this.draw = AsteroidBounceDraw;
    this.reset = AsteroidBounceReset;
    this.delay = 20;

    this.rot = rot;
    this.speed = 5;
}

function AsteroidBounceDraw(ctx){
    drawImage(ctx, this.img, this.loc.x, this.loc.y, 0, 0, this.size.x, this.size.y, 0, false, false, false);
}

function AsteroidBounceUpdate(){   
    this.loc.x += this.speed * Math.sin(this.rot);
    this.loc.y += this.speed * Math.cos(this.rot);

    if(this.loc.x+this.size.x > this.screen_size.x){
        if(this.rot < Math.PI/2 ){
            this.rot = 2*Math.PI - this.rot;
        }else if(this.rot > Math.PI/2){
            var int_rot = Math.PI - this.rot;
            this.rot = Math.PI + int_rot;
        }else{
            // Heading right
            this.rot = 3*Math.PI/2;
        }
    }
    if(this.loc.y+this.size.y > this.screen_size.y){
        if(this.rot > Math.PI){
            var int_rot = 2*Math.PI - this.rot;
            this.rot = Math.PI + int_rot;
        }else if(this.rot < Math.PI){
            this.rot = Math.PI - this.rot;
        }else{
            // Heading directly down
            this.rot = Math.PI
        }
    }
    if(this.loc.x < 0){
        if(this.rot < 3*Math.PI/2 ){
            var int_rot = this.rot - Math.PI;
            this.rot = Math.PI - int_rot;
        }else if(this.rot > 3*Math.PI/2){
            this.rot = (2*Math.PI) - this.rot;
        }else{
            // Heading left
            this.rot = Math.PI/2;
        }
    }
    if(this.loc.y < 0){
        if(this.rot > Math.PI){
            var int_rot = this.rot - Math.PI;
            this.rot = 2*Math.PI - int_rot;
        }else if(this.rot < Math.PI){
            this.rot = Math.PI - this.rot;
        }else{
            // Heading up
            this.rot = 0;
        }
    }
}

function AsteroidBounceReset(){
    this.loc.x = getRandomInt(10, GAME_SIZE.x - this.size.x);
    this.loc.y = this.size.y * -1;
    this.delay = getRandomInt(5, 40);
    this.rot = getRandomInt(0, 628)/ 10;
}