var STATE = {
    HIRAGANA: 0,
    KATAKANA: 1,
    RADICALS: 2,
    KANJI: 3,
    AUTHOR: 4,
    DRAW: 5

}
var canvas = document.createElement('canvas');
var buttons = [], displayList = [];
var hiraganaList = [];
var katakanaList = [];
var radicalList = [];
var touchY = 0, deltaY = 0, upY = 0;

var state = STATE.HIRAGANA;

var drawText;

canvas.width = SCREEN.WIDTH;
canvas.height = SCREEN.HEIGHT;
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

init();


// var stage = new createjs.Stage(canvas);

var buttonImage = new Image();
buttonImage.src = 'img/buttons.png';
buttonImage.onload = function() {
    var radicals = new Button(0,0, STATE.RADICALS);
    var hiragana = new Button(128, 0, STATE.HIRAGANA);
    hiragana.x = 128;
    hiragana.active = 1;
    var katakana = new Button(256, 0, STATE.KATAKANA);
    katakana.x = 256;
    var kanji = new Button(384, 0, STATE.KANJI);
    kanji.x = 384;
    var author = new Button(512, 0, STATE.AUTHOR);
    author.x = 512;
    buttons.push(radicals, hiragana, katakana, kanji, author);
    displayList.push(radicals, hiragana, katakana, kanji, author);
    paint();
}

var radicalImage1 = new Image();
radicalImage1.src = 'img/radicals1.png';
var radicalImage2 = new Image();
radicalImage2.src = 'img/radicals2.png';
var authorImage = new Image();
authorImage.src = 'img/author.png';

function paint() {
    //bg    
    ctx.beginPath();
    ctx.rect(0,0, SCREEN.WIDTH,SCREEN.HEIGHT);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    //text
    switch(state) {
        case STATE.HIRAGANA:
            ctx.fillStyle = '#777';
            ctx.font = '40pt Calibri';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for(var i = 0, length = hiraganaList.length; i < length; i++) {
                hiraganaList[i].draw();
            }
            break;
        case STATE.KATAKANA:
            ctx.fillStyle = '#777';
            ctx.font = '40pt Calibri';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for(var i = 0, length = katakanaList.length; i < length; i++) {
                katakanaList[i].draw();
            }
            break;
        case STATE.RADICALS:
            if(upY > 0) {
                upY = 0;
            } else if (upY < SCREEN.HEIGHT - 7200) {
                upY = SCREEN.HEIGHT - 7200;
            }
            ctx.drawImage(radicalImage1, 0, upY);
            ctx.drawImage(radicalImage2, 0, upY + 3500)
            break;
        case STATE.DRAW:
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '500pt Calibri';
            ctx.fillStyle = '#DDD';
            ctx.fillText(drawText, 320, 500);

            ctx.font = '36px Helvetica Neue';
            ctx.fillStyle = '#007aff';
            ctx.fillText('Clear', 560, 50);
            break;
        case STATE.AUTHOR:
            ctx.drawImage(authorImage, 0, 0);
            break;
    }
    

    for(i = 0, length = displayList.length; i < length; i++) {
        displayList[i].draw();
    }
}

function init() {
    //Create Hiragana character objects
    var x = 64, y = 50;
    for(var i = 0, length = data.hiragana.length; i < length; i++) {
        hiraganaList.push(new Character(data.hiragana[i], x, y));
        x += 128;
        if((i+1)%5 == 0) {
            y += 100;
            x = 64;
        }
    }

    //Create Katakana character objects
    var x = 64, y = 50;
    for(var i = 0, length = data.katakana.length; i < length; i++) {
        katakanaList.push(new Character(data.katakana[i], x, y));
        x += 128;
        if((i+1)%5 == 0) {
            y += 100;
            x = 64;
        }
    }

    //Create Radicals character objects
    var x = 64, y = 50;
    for(key in data.radicals) {
        //radicalList.push(new Character(key, x, y));
        y += 100;
        //loopin:
        for(var i = 0, length = data.radicals[key].length; i < length; i++) {
            radicalList.push(new Character(data.radicals[key][i], x, y));
            x += 128;
            if((i+1)%5 == 0) {
                y += 100;
                x = 64;
            }
        }
        y += 100;
        x = 64;
    }
}