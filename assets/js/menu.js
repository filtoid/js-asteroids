function Menu(){
    this.update = MenuUpdate;
    this.draw = MenuDraw;
    this.menu_items = ["Continue", "Start Game"];
    this.size = new Location(800,800);

    this.game_name = "Asteroids Game";
    this.shown_details = "menu";
    this.draw_shadow = MenuDrawTextShadow;

    this.pointer_img_loaded = false;
    this.pointer_img = new Image();
    this.pointer_img.src = "/img/arrow_right.png";
    this.pointer_img.onload = function(){
        menu.pointer_img_loaded = true;
    }
  
    this.cur_selected = 1;
    this.is_ready_for_button = true;
}

function MenuDrawTextShadow(ctx, text, x, y, greyed_out){
    ctx.fillStyle = "#000000";
    ctx.fillText(text, x+2, y+2);
    if(greyed_out == false){
        ctx.fillStyle = "#ff0000";
    }else{
        ctx.fillStyle = "#505050";
    }
    ctx.fillText(text, x, y);
}

function MenuUpdate(w, h){
    this.size.x = w;
    this.size.y = h;
    if(this.shown_details == "menu" && this.is_ready_for_button && (isKeyPressed('S') || isGamepadButtonPressed('down')) ){
        this.cur_selected += 1;
        if(this.cur_selected >= this.menu_items.length){
            this.cur_selected = 0;
        }
        this.is_ready_for_button = false;
    }else  if(this.shown_details == "menu" && this.is_ready_for_button && (isKeyPressed('W') || isGamepadButtonPressed('up')) ){
        this.cur_selected -= 1;
        if(this.cur_selected < 0){
            this.cur_selected = this.menu_items.length - 1;
        }
        this.is_ready_for_button = false;
    }

    if(this.is_ready_for_button == true && 
        (isKeyPressed('E') || isKeyPressed('ENTER') || isKeyPressed('D') || isGamepadButtonPressed('jump')) ){
            if(this.cur_selected == 0 && game.is_started){
                cur_screen = "game";
            }else if(this.cur_selected == 1){
                // Load a new game
                this.cur_selected = 0;
                game.reset();
                player.reset();
                cur_screen = "game";
            }
            
    }

    if(this.is_ready_for_button == false && !isKeyPressed('S') && !isKeyPressed('W')
    && !isKeyPressed('D') && !isKeyPressed('A') && !isKeyPressed('E') && !isKeyPressed('ENTER') 
    && !isGamepadButtonPressed('jump') && !isGamepadButtonPressed('up') && !isGamepadButtonPressed('down')){
        this.is_ready_for_button = true;
    }
}

function MenuDraw(ctx){
    var old_fillStyle = ctx.fillStyle;
    var old_font = ctx.font;

    // TODO: Draw logos
    if(this.shown_details == "menu"){
        ctx.fillStyle = "#ff0000";
        ctx.font = "46px Arial";

        var title_width = ctx.measureText(this.game_name).width;
        this.draw_shadow(ctx, this.game_name, (GAME_SIZE.x/2) - (title_width/2), 100, false);
        
        for(var i=0;i<this.menu_items.length;i++){
            var y_offset = 200 + i*100;
            if(i==0 && game.is_started == false){
                this.draw_shadow(ctx,this.menu_items[i], 100, y_offset, true );
            }else{
                this.draw_shadow(ctx,this.menu_items[i], 100, y_offset, false );
            }

            if(this.cur_selected == i && this.pointer_img_loaded){
                ctx.drawImage(this.pointer_img, 40, y_offset-45);
            }
        }
    }
    ctx.font = old_font;
    ctx.fillStyle = old_fillStyle;
}