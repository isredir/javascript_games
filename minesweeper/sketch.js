function makeMatrix(c, r) {
    var arr = new Array(c);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(r);
    }
    return arr;
}




var grid;
var c;
var r;
var w = 40;
var totalMines = 20;

function setup() {
    createCanvas(400, 400);
    c = floor(width / w);
    r = floor(height / w);
    grid = makeMatrix(c, r);
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            grid[i][j] = new cell(i, j, w);
        }
    }

    var options = [];
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            options.push([i,j]);
        }
    }

    for (var n = 0; n < totalMines; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        options.splice(index,1);
        grid[i][j].mine = true;
    }


    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            grid[i][j].countMines();
        }
    }
}

function gameOver() {
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed() {
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            if (grid[i][j].contains(mouseX,mouseY)) {
                grid[i][j].reveal();

                if (grid[i][j].mine) {
                    gameOver();
                }
            }
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < c; i++) {
        for (var j = 0; j < r; j++) {
            grid[i][j].show();
        }
    }
}