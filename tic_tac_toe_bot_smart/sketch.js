let board = [
    ['','',''],
    ['','',''],
    ['','',''],
];

let ai = 'X';
let human = 'O';
let currentPlayer = human;

let w;
let h;

function setup() {
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
    bestMove();
}

function equals3(a,b,c) {
    return (a == b && a == c && b == c && a != '');
}

function checkWinner() {
    let winner = null;
    //horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0],board[i][1],board[i][2])) {
            winner = board[i][0];
        }
    }
    //vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i],board[1][i],board[2][i])) {
            winner = board[0][i];
        }
    }
    // \ diagonal
    if (equals3(board[0][0] , board[1][1] , board[2][2])) {
        winner = board[0][0];
    }
    // / diagonal
    if (equals3(board[2][0] , board[1][1] , board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0){
        return 'draw';
    } else {
        return winner;
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let bestmove;
    let movei = 0;
    let movej = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestmove = {i, j};
                    movei = i;
                    movej = j;
                }
            }
        }
    }
    board[movei][movej] = ai;
    currentPlayer = human;
}

let scores = {
    X: 1,
    O: -1,
    draw: 0
};

function minimax(board, depth, isMax) {
    let result = checkWinner();
    if (result != null) {
        return scores[result];
    }

    if (isMax) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function mousePressed() {
    if (currentPlayer == human) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        if (board[i][j] == '') {
            board[i][j] = human;
            currentPlayer = ai;
            bestMove();
        }
    }
}

function draw() {
    background(255);
    strokeWeight(4);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let xr = w / 4;
            let spot = board[i][j];
            textSize(32);
            if (spot == human) {
                noFill();
                ellipse(x, y, xr * 2);
            } else if (spot == ai) {
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }

        }
    }
    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('color','#FFF').style('font-size','32pt');
        if (result == 'draw') {
            resultP.html('Draw!');
        } else {
            resultP.html(`${result} wins!`);
        }
    }
}
