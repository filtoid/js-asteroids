function Asteroid(){
    this.loc = new Location(20, 20);
    this.img = new Image();
    this.img.src = "/img/asteroid2.png";
    this.size = new Location(40, 40);
    this.screen_size = new Location(GAME_SIZE.x, GAME_SIZE.y);
    this.update = AsteroidUpdate;
    this.draw = AsteroidDraw;
    this.reset = AsteroidReset;
    this.delay = 20;

    this.speed = 10;
}

function AsteroidDraw(ctx){
    drawImage(ctx, this.img, this.loc.x, this.loc.y, 0, 0, this.size.x, this.size.y, 0, false, false, false);

}
function AsteroidUpdate(){
    if(this.delay > 0){
        this.delay -= 1;
        return;
    }
    
    this.loc.y += this.speed;

    if(this.loc.y > this.screen_size.y + this.size.y){
        this.reset();
    }
}

function AsteroidReset(){
    this.loc.x = getRandomInt(10, GAME_SIZE.x - this.size.x);
    this.loc.y = this.size.y * -1;
    this.delay = getRandomInt(5, 40);

    // Suggestion - try to randomise the speed of the asteroid
}