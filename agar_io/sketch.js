var cell;
var cells = [];
var zoom = 1;
function setup() {
    createCanvas(600, 600);
    cell = new Cell(0, 0, 64);
    for (var i = 0; i < 200; i++) {
        var x = random(-width, width);
        var y = random(-height, height);
        cells[i] = new Cell(x, y, 16);
    }
}

function draw() {
    background(0);
    translate(width/2,height/2);
    var newzoom = 64 / cell.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-cell.pos.x,-cell.pos.y);
    for (var i = cells.length - 1; i >= 0; i--) {
        cells[i].show();
        if (cell.eats(cells[i])) {
            cells.splice(i, 1);
        }
    }
    cell.show();
    cell.update();
}