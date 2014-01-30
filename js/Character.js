function Character(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 100;
}

Character.prototype.contains = function(x, y) {
    if(state == STATE.HIRAGANA || state == STATE.KATAKANA) {
        if(x <= this.x + this.width/2 && x >= this.x - this.width/2 && y <= this.y + this.height/2 && y >= this.y - this.height/2) {
            return true;
        } else {
            return false;
        }
    } else if (state == STATE.RADICALS) {
        if(x <= this.x + this.width/2 && x >= this.x - this.width/2 && y <= this.y + this.height/2 + upY && y >= this.y - this.height/2 + upY) {
            return true;
        } else {
            return false;
        }
    }
    
}

Character.prototype.onClick = function(e) {
    console.log(this.text);
    state = STATE.DRAW;
    drawText = this.text;
    paint();
}

Character.prototype.draw = function() {
    ctx.fillText(this.text, this.x, this.y);
}