function Game(){
    this.update = GameUpdate;
    this.draw = GameDraw;
    this.is_started = false;
    this.reset = GameReset;

    this.asteroids = []
    this.asteroids.push(new Asteroid());
    // To add more asteroids then repeat the line above
}

function GameUpdate(){
    for(var i=0;i<this.asteroids.length;i++){
        var asteroid = this.asteroids[i];
        asteroid.update();
    }
    // Loop through every asteroid and see if it is colliding with the player
    for(var i=0;i<this.asteroids.length;i++){
        var asteroid = this.asteroids[i];
        // Do the collision check here
       
    }
}

function GameDraw(ctx){
    for(var i=0;i<this.asteroids.length;i++){
        var asteroid = this.asteroids[i];
        // Draw each asteroid (stored in the variable 'asteroid')
        
    }

    // Tell the player character to draw
}

function GameReset(){

}
