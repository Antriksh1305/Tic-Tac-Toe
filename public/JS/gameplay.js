const board_turn = document.querySelector('.board_turn');
const toggleButton = document.getElementById("toggleButton");
const message = document.getElementById("message");
const restart = document.querySelector('.button_restart');
const board = document.querySelector('.game_board');
const player = document.getElementById('board_score-x');
const tie = document.getElementById('board_score-tie');
const cpu = document.getElementById('board_score-o');
const loading = document.querySelector('.loading');

const win_comb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const arr = Array.from(board.children);
let turn = false; //turn = false means x will proceed first
let preview = 'preview-o';
var active = [];
var winner = undefined, win_mark = undefined, move;

// Mode selection button
toggleButton.addEventListener("click", (e) => {
    if (e.target.checked) {
        localStorage.setItem("mode", "difficult");
        message.innerText = "DIFFICULT";
    }
    else {
        message.innerText = "EASY";
        localStorage.setItem("mode", "easy");
    }
});

// restart button
restart.addEventListener('click', () => {
    arr.forEach(element => {
        element.classList.replace('active', 'empty');
        element.classList.remove('o');
        element.classList.remove('x');
        delete element.dataset.move;
        element.classList.remove('match-3');
        active = [];
        board.style.pointerEvents = "all";
        winner = undefined;
        turn = false;
        board_turn.classList.remove('o');
        board_turn.classList.add('x');
    });
});

arr.forEach(element => {
    //preview o or x on mouseenter
    element.addEventListener('mouseenter', (e) => {
        if (turn === true) preview = 'preview-o';
        else preview = 'preview-x';
        if (e.target.classList.contains('empty')) e.target.classList.add(preview);
    });

    //remove preview o or x on mouseleave
    element.addEventListener('mouseleave', (e) => {
        e.target.classList.remove(preview);
    });

    //activate the block when clicked and preview solid x or o.
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('empty')) {
            e.target.classList.remove('empty');
            e.target.classList.add('active');
            if (turn === true) {
                e.target.classList.add('o');
                e.target.dataset.move = 'o';
                if (winning(win_comb) === undefined && active.length !== 9) {
                    setTimeout(() => {
                        board_turn.classList.remove('o');
                        board_turn.classList.add('x');
                    }, 300);
                }
            }
            else {
                e.target.classList.add('x');
                e.target.dataset.move = 'x';
                if (winning(win_comb) === undefined) {
                    setTimeout(() => {
                        board_turn.classList.remove('x');
                        board_turn.classList.add('o');
                    }, 300);
                }
            }
            turn = (!turn);
        }
    });
});

window.onload = function () {
    localStorage.setItem('mode', 'easy');
    if (localStorage.getItem('player-mark') === 'o' && active.length === 0 && localStorage.getItem('versus') === 'CPU') {
        board.style.pointerEvents = "none";
        loading.style.visibility = "visible";
        setTimeout(() => {
            CPU();
            board.style.pointerEvents = "all";
            loading.style.visibility = "hidden";
        }, 2000);
    }
}

function moves_available() {
    for (let i = 0; i < arr.length; i++) {
        if (board.children[i].classList.contains('empty')) {
            return true;
        }
    }
    return false;
}

function winning(win_comb) {
    if (winner === undefined && active.length === 9) {
        console.log('tie');
        return undefined;
    }
    for (let i = 0; i < win_comb.length; i++) {
        if (arr[(win_comb[i][0])].dataset.move === arr[(win_comb[i][1])].dataset.move && arr[(win_comb[i][1])].dataset.move === arr[(win_comb[i][2])].dataset.move && arr[(win_comb[i][0])].dataset.move != undefined) {
            winner = win_comb[i];
            console.log(winner);
            for (let j = 0; j < 3; j++) board.children[winner[j]].classList.add('match-3');

            if (arr[(win_comb[i][0])].dataset.move === 'o') {
                console.log('O Wins');
            }
            else {
                console.log('X Wins');
            }
            return arr[(win_comb[i][0])].dataset.move;
        }
    }
    return undefined;
}

function CPU() {
    if (localStorage.getItem("mode") === 'easy') {
        do {
            move = Math.floor(Math.random() * 9);
        } while (active.includes(move));
    }
    else {
        console.log('AI will decide the move');
    }
    console.log(move);
    arr[move].classList.remove('empty');
    arr[move].classList.add('active');
    if (turn === true) {
        arr[move].classList.add('o');
        arr[move].dataset.move = 'o';
        setTimeout(() => {
            board_turn.classList.remove('o');
            board_turn.classList.add('x');
        }, 300);
    }
    else {
        arr[move].classList.add('x');
        arr[move].dataset.move = 'x';
        setTimeout(() => {
            board_turn.classList.remove('x');
            board_turn.classList.add('o');
        }, 300);
    }
    turn = (!turn);
    active.push(move);
}

arr.forEach(element => {
    element.addEventListener('click', (e) => {
        board.style.pointerEvents = "none";
        active.push(Number(e.target.id));
        console.log(e.target.id);
        console.log(active);
        winning(win_comb);
        if (winner === undefined && localStorage.getItem("versus") === "CPU") {
            loading.style.visibility = "visible";
            setTimeout(() => {
                CPU();
                console.log('CPU chance');
                board.style.pointerEvents = "all";
                loading.style.visibility = "hidden";
                winning(win_comb);
            }, 2000);
        }
        else {
            board.style.pointerEvents = "all";
        }
    })
})

// window.addEventListener('resize',()=>{
//     // console.log(window.innerWidth,window.innerHeight);
// })