const canvas = document.getElementById("GameWindow"),  canvasLeft = canvas.offsetLeft + canvas.clientLeft,
    canvasTop = canvas.offsetTop + canvas.clientTop;
const context = canvas.getContext("2d");
const background = new Image()
let switches = [], switches_c;

background.src = 'images/Games/PilotBrothers/background.png';
background.onload = function() {
    context.drawImage(background, 0, 0);
};

function Switch(state_i, x_i, y_i) {
    let state = state_i;
    let image = new Image();
    let x = x_i;
    let y = y_i;

    this.getX = function() {
        return x;
    }

    this.getY = function() {
        return y;
    }

    this.getImage = function() {
        return image;
    }

    this.getState = function () {
        return state;
    }

    this.changeState = function() {
        state = 0 + !state; // "0 +" для перевода bool в int
    }

    this.draw = function() {
        image.src = 'images/Games/PilotBrothers/switch_' + state + '.png';
        image.onload = function() {
            context.drawImage(image, x, y);
        }
    }
}

function changeSwitchesState(sI, sJ) {
    for (let j = 0; j < 4; j++) {
        switches[sI][j].changeState();
    }
    for (let i = 0; i < 4; i++) {
        switches[i][sJ].changeState();
    }
    switches[sI][sJ].changeState();
}

function isFinished() {
    let finished = true;
    for (let i = 0; i < 4; i++) {
        if (!finished) break;
        for (let j = 0; j < 4; j++) {
            if (switches[i][j].getState() == 1) {
                finished = false;
                break;
            }
        }
    }
    return finished;
}

function redraw() {
    background.src = 'images/Games/PilotBrothers/background.png';
    background.onload = function() {
        context.drawImage(background, 0, 0);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                switches[i][j].draw();
            }
        }
    };
}

function drawVictory() {
    let victoryBG = new Image();
    victoryBG.src = 'images/Games/PilotBrothers/victory.png';
    victoryBG.onload = function() {
        context.drawImage(victoryBG, 0, 0);
    };
}

canvas.addEventListener('click', function(event) {

    if (!isFinished()) {
        let x = event.pageX - canvasLeft, y = event.pageY - canvasTop;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (x > switches[i][j].getX() && x < (switches[i][j].getX() + switches[i][j].getImage().width) &&
                    y > switches[i][j].getY() && y < (switches[i][j].getY() + switches[i][j].getImage().height)) {
                    changeSwitchesState(i, j);
                    redraw()
                    if (isFinished()) setTimeout(drawVictory,500);
                }

            }
        }
    }


}, false);

window.onload = function() {
    for (let i = 0; i < 4; i++) {
        switches.push(switches_c = [])
        for (let j = 0; j < 4; j++) {
            switches[i].push(null);
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            switches[i][j] = new Switch(Math.round(Math.random()), 120 + j * 120, 100 + i * 150);
            switches[i][j].draw();
        }
    }
}