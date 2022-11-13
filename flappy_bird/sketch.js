function Bird() {
    this.x = 64;
    this.y = height / 2;

    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > height) {
            this.y = height;
            this.velocity = 0;

        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;

        }
    }
}

function obstacle() {
    var space = 100;//random(20, height / 2);
    var center = random(space, height - space);
    this.top = center - space / 2;
    this.bottom = height - (center + space / 2);
    this.x = width;
    this.w = 50;
    this.speed = 3;

    this.highlight = false;

    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    this.show = function() {
        fill(255);
        if (this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }
    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        }
        else {
            return false;
        }
    }
}

var bird;
var obstacles = [];
function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    obstacles.push(new obstacle());
}

function draw() {
    background(0);

    for (var i = obstacles.length - 1; i >= 0; i--){
        obstacles[i].show();
        obstacles[i].update();

        if (obstacles[i].hits(bird)) {
            console.log("HIT");
        }

        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
        }
    }

    bird.update();
    bird.show();

    if (frameCount % 100 == 0) {
        obstacles.push(new obstacle());
    }


}

function keyPressed() {
    if (key == ' ') {
        bird.up();
    }
}
