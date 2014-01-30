function Button(clipX, clipY, gameState) { //if button is click, switch game state
    this.width = 128;
    this.active = 0;
    this.height = 100;
    this.clipX = clipX;
    this.clipY = clipY;
    this.clipWidth = 128;
    this.clipHeight = 100;
    this.img = buttonImage;
    this.x = 0;
    this.y = SCREEN.HEIGHT - this.height;
    this.gameState = gameState;
}


Button.prototype.draw = function() {
    if(this.active == 0) {
        ctx.drawImage(this.img, this.clipX, this.clipY, this.clipWidth, this.clipHeight, this.x, this.y, this.width, this.height);
    } else {
        ctx.drawImage(this.img, this.clipX, this.clipY + this.clipHeight, this.clipWidth, this.clipHeight, this.x, this.y, this.width, this.height);
    }
}

//Check if a point is inside the button
Button.prototype.contains = function(x, y) {
    if(x <= this.x + this.width && x >= this.x && y <= this.y + this.height && y >= this.y) {
        console.log('clicked');
        return true;
    } else {        
        //console.log('miss clicked');
        return false;
    }
}
//on button clicked
Button.prototype.onClick = function(e) {
    if(this.active == 0) {
        for(var i = 0, length = buttons.length; i < length; i++) {
            if(buttons[i].active == 1) {
                buttons[i].active = 0;
                buttons[i].draw();
            }
        }
        this.active = 1;        
        state = this.gameState;
        paint();
    } else {
        state = this.gameState;
        paint();
    }
}