function Bullet(x, y, rot){
    this.loc = new Location(x, y);
    this.rot = rot;

    this.update = BulletUpdate;
    this.draw = BulletDraw;
    this.fillStyle = "#ffffff";
    this.speed = 7;

    this.status = "ALIVE";
}

function BulletUpdate(){
    
    if(this.status == "ALIVE"){
        this.loc.x += this.speed * Math.sin(deg2rad(this.rot));
        this.loc.y += this.speed * Math.cos(deg2rad(this.rot));
    }

    if(this.loc.x < 0 || this.loc.x > player.screen.x || this.loc.y < 0 || this.loc.y > player.screen.y){
        this.status= "DEAD";
    }
    if(this.rot > 360){
        this.rot = this.rot - 360;
    }
}

function BulletDraw(ctx){
    if(this.status != "ALIVE"){
        return;
    }
    var oldStyle = ctx.fillStyle;
    var oldOpacity = ctx.globalAlpha;
    
    ctx.globalAlpha = this.ttl/this.ttl_default;
    
    ctx.fillStyle = this.fillStyle;
    
    ctx.fillRect(this.loc.x-1, this.loc.y-1, 2, 2);
    ctx.fillStyle = oldStyle;
    ctx.globalAlpha = oldOpacity;
}