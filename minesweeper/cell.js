function cell(i,j,w) {
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.neighborCount = 0;
    this.mine = false;
    this.revealed = false;

}

cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.mine) {
            fill(127)
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if(this.neighborCount > 0){
                textAlign(CENTER);
                fill(0);
                textSize(25);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 10);
            }
        }
    }
}

cell.prototype.countMines = function() {
    var total = 0;
    if (this.mine) {
        total = -1;
    } else {
        for (var xi = -1; xi <= 1; xi++) {
            for (var yj = -1; yj <= 1; yj++) {
                var i = this.i + xi;
                var j = this.j + yj;
                if (i > -1 && i < c && j > -1 && j < r){
                    var neighbor = grid[i][j];
                    if (neighbor.mine) {
                        total++;
                    }
                }
            }
        }
    }
    this.neighborCount = total;
}

cell.prototype.contains = function(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
}

cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0) {
        this.floodFill();
    }
}

cell.prototype.floodFill = function() {
    for (var xi = -1; xi <= 1; xi++) {
        for (var yj = -1; yj <= 1; yj++) {
            var i = this.i + xi;
            var j = this.j + yj;
            if (i > -1 && i < c && j > -1 && j < r){
                var neighbor = grid[i][j];
                if (!neighbor.mine && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}