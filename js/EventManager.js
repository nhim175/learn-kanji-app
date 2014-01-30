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
    if(state == STATE.DRAW && touch.clientY < SCREEN.HEIGHT - 100) {
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