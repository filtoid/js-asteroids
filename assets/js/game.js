function Game(){
    this.update = GameUpdate;
    this.draw = GameDraw;
    this.is_started = false;
    this.reset = GameReset;

    this.asteroids = []
    this.asteroids.push(new AsteroidBounce(50, 50, 1));
    this.asteroids.push(new AsteroidBounce(250, 50, Math.PI + 1));

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
        if( rect_collides(asteroid, player)){
            asteroid.reset();
            player.reset();
        }
    }
}

function GameDraw(ctx){
    for(var i=0;i<this.asteroids.length;i++){
        var asteroid = this.asteroids[i];
        // Draw each asteroid (stored in the variable 'asteroid')
        asteroid.draw(ctx);
    }

    // Tell the player character to draw
    player.draw(ctx);
}

function GameReset(){

}
