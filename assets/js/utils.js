function Location(_x, _y){
    this.x = _x;
    this.y = _y;
}

function rect_collides(a, b){
    return Math.max(a.loc.x, b.loc.x) < Math.min(a.loc.x+a.size.x, b.loc.x+b.size.x) &&
            Math.max(a.loc.y, b.loc.y) < Math.min(a.loc.y+a.size.y, b.loc.y+b.size.y);
}

// Taken (and modified slightly) from here: https://stackoverflow.com/questions/3129099/how-to-flip-images-horizontally-with-html5
function drawImage(context, img, x, y, s_x, s_y, width, height, deg, flip, flop, center) {

    context.save();
    
    if(typeof width === "undefined") width = img.width;
    if(typeof height === "undefined") height = img.height;
    if(typeof center === "undefined") center = false;
    
    // Set rotation point to center of image, instead of top/left
    if(center) {
        x -= width/2;
        y -= height/2;
    }
    
    // Set the origin to the center of the image
    context.translate(x + width/2, y + height/2);
    
    // Rotate the canvas around the origin
    var rad = 2 * Math.PI - deg * Math.PI / 180;    
    context.rotate(rad);
    
    // Flip/flop the canvas
    if(flip) flipScale = -1; else flipScale = 1;
    if(flop) flopScale = -1; else flopScale = 1;
    context.scale(flipScale, flopScale);
    
    // Draw the image   
    //ctx.drawImage(this.img_walk, this.cur_img_walk_frame*50, 0, 50,  100, loc_x, this.loc.y, 50, 100); 
    context.drawImage(img, s_x, s_y, width, height, -width/2, -height/2, width, height);
    
    context.restore();
}

function getRandomInt(min, max) {
    if(min != Math.floor(min) || max != Math.floor(max)){
        console.log("ERROR: only pass in integers to the function getRandomInt");
    }
    return Math.floor(Math.random() * Math.floor(max)) + Math.floor(min);
}

function deg2rad(deg){
    var output = deg/360;
    output = output * (2 * Math.PI);
    return output;
}