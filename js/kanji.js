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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

init();

canvas.addEventListener('click', function(e) {
    console.log(e);
    //check if buttons has been clicked
    for(i = 0, length = displayList.length; i < length; i++) {
        if(displayList[i].contains(e.clientX, e.clientY)) {
            displayList[i].onClick(e);
            return;
        }
    }

    //check if text has been clicked
    switch(state) {
        case STATE.HIRAGANA:
            for(var i = 0, length = hiraganaList.length; i < length; i ++) {
                if(hiraganaList[i].contains(e.clientX, e.clientY)) {
                    hiraganaList[i].onClick(e);
                    return;
                }
            }
            break;
        case STATE.KATAKANA:
            for(var i = 0, length = katakanaList.length; i < length; i ++) {
                if(katakanaList[i].contains(e.clientX, e.clientY)) {
                    katakanaList[i].onClick(e);
                    return;
                }
            }
            break;
        case STATE.RADICALS:
            for(var i = 0, length = radicalList.length; i < length; i ++) {
                if(radicalList[i].contains(e.clientX, e.clientY)) {
                    radicalList[i].onClick(e);
                    return;
                }
            }
            break;
        case STATE.DRAW: //clear painting
            if(e.clientX < 560 + 50 && e.clientX > 560 - 50 && e.clientY > 50 - 30 && e.clientY < 50 + 30) {
                paint();
            }
            break;
    }

});

//mouse down
canvas.addEventListener('mousedown', function(e) {
    touchY = e.clientY;
    canvas.addEventListener('mousemove', onMouseMove, false);
    console.log('Mouse down : ' + e.clientY);
});

function onMouseMove(e) {
    if(state == STATE.RADICALS) {
        deltaY = e.clientY - touchY;
        touchY += deltaY;
        upY += deltaY;
        paint();
    }
}

canvas.addEventListener('mouseup', function(e) {
    canvas.removeEventListener('mousemove', onMouseMove);
    if(state == STATE.RADICALS) {
        upY += deltaY;
        deltaY = 0;
        paint();
        console.log('mouseup');
    }  
});



// Touch event
canvas.addEventListener('touchstart', function(e) {
    ctx.strokeStyle = '#093751';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    var touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX, touch.clientY);
    canvas.addEventListener('touchmove', onTouchMove, false);
    touchY = touch.screenY;
    console.log('touch start');
}, false);


function onTouchMove (e) {
    console.log('touch move');
    var touch = e.touches[0];
    // for(k in touch) {
    //     console.log(k + ':' + touch[k]);
    // }
    if(state == STATE.DRAW && touch.clientY < window.innerHeight - 100) {
        ctx.lineTo(touch.clientX, touch.clientY);
        ctx.stroke();
    } else if (state == STATE.RADICALS) {
        deltaY = touch.screenY - touchY;
        touchY += deltaY;
        upY += deltaY;
        //console.log('touch move');
        paint(); 
    } 
}

canvas.addEventListener('touchend', function(e) {
    canvas.removeEventListener('touchmove', onTouchMove);
}, false);
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
    ctx.rect(0,0, window.innerWidth,window.innerHeight);
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
            } else if (upY < window.innerHeight - 7200) {
                upY = window.innerHeight - 7200;
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