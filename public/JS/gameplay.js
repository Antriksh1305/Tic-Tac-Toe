const board_turn = document.querySelector('.board_turn');
const toggleButton = document.getElementById("toggleButton");
const message = document.getElementById("message");
const restart = document.querySelector('.board_restart');
const confirm_restart = document.querySelector('.btn2');
const board = document.querySelector('.game_board');
const player = document.querySelector('.player');
const tie = document.querySelector('.board_score-tie');
const cpu = document.querySelector('.cpu');
const loading = document.querySelector('.loading');
const banner = document.querySelector('.banner');
const text1 = document.querySelector('.banner-text1');
const text2 = document.querySelector('.banner-text2');
const btn1 = document.querySelector('.btn1');
const btn2 = confirm_restart;


const win_comb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const arr = Array.from(board.children);
let turn = false; //turn = false means x will proceed first
let preview = 'preview-o';
var active = [];
var winner = undefined, win_mark = undefined, move;
var playerscore = 0;
var tiescore = 0;
var cpuscore = 0;

//onload values set function
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

    if (localStorage.getItem('player-mark') === 'o' && localStorage.getItem('versus') === 'CPU') {
        player.children[0].innerText = 'O (YOU)';
        cpu.children[0].innerText = 'X (CPU)';
    }
    else if (localStorage.getItem('versus') === 'player') {
        if (localStorage.getItem('player-mark') === 'o') {
            player.children[0].innerText = 'O (PLAYER 1)';
            cpu.children[0].innerText = 'X (PLAYER 2)';
        }
        else {
            player.children[0].innerText = 'X (PLAYER 1)';
            cpu.children[0].innerText = 'O (PLAYER 2)';
        }
    }
}

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

// Restart button
restart.addEventListener('click', () => {
    console.log('restart');
    text1.innerText = '';
    text2.innerText = 'RESTART GAME';
    btn1.innerText = 'NO, CANCEL';
    btn2.innerText = 'YES, RESTART';
    banner.classList.add('restart');
    banner.classList.add('active');
});

//Quit or Cancel button
btn1.addEventListener('click', () => {
    banner.classList.remove('active');
    setTimeout(() => {
        if (banner.classList.contains('restart')) {
            banner.classList.remove('restart');
        }
        else {
            location.href = '../';
        }
    }, 1000);
})

//confirm restart button
confirm_restart.addEventListener('click', () => {
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
        banner.classList.remove('active');
        banner.classList.remove('tied');
        if (banner.classList.contains('restart')) {
            setTimeout(() => {
                banner.classList.remove('restart');
                player.children[1].innerText = '0';
                tie.children[1].innerText = '0';
                cpu.children[1].innerText = '0';
            }, 700);
        }
    });
});

//checker of winner
function winning(win_comb) {
    console.log(winner);
    console.log(active, active.length);

    for (let i = 0; i < win_comb.length; i++) {
        if (arr[(win_comb[i][0])].dataset.move === arr[(win_comb[i][1])].dataset.move && arr[(win_comb[i][1])].dataset.move === arr[(win_comb[i][2])].dataset.move && arr[(win_comb[i][0])].dataset.move != undefined) {
            winner = win_comb[i];
            // console.log(winner);
            for (let j = 0; j < 3; j++) board.children[winner[j]].classList.add('match-3');

            if (arr[(win_comb[i][0])].dataset.move === 'o') {
                text2.classList.remove('x');
                text2.classList.add('o');
                if (localStorage.getItem("player-mark") === 'o') {
                    player.children[1].innerText = (++playerscore);
                    if(localStorage.getItem('versus') === 'CPU') text1.innerText = 'YOU WON !';
                    else text1.innerText = 'PLAYER 1 WON !';
                    text2.innerText = 'TAKES THE ROUND';
                }
                else {
                    cpu.children[1].innerText = (++cpuscore);
                    if(localStorage.getItem('versus') === 'CPU') text1.innerText = 'OH NO, YOU LOST !';
                    else text1.innerText = 'PLAYER 2 WON !';
                    text2.innerText = 'TAKES THE ROUND';
                }
                console.log('O Wins');
            }
            else {
                text2.classList.remove('o');
                text2.classList.add('x');
                if (localStorage.getItem("player-mark") === 'x') {
                    player.children[1].innerText = (++playerscore);
                    if(localStorage.getItem('versus') === 'CPU') text1.innerText = 'YOU WON !';
                    else text1.innerText = 'PLAYER 1 WON !';
                    text2.innerText = 'TAKES THE ROUND';
                }
                else {
                    cpu.children[1].innerText = (++cpuscore);
                    if(localStorage.getItem('versus') === 'CPU') text1.innerText = 'OH NO, YOU LOST !';
                    else text1.innerText = 'PLAYER 2 WON !';
                    text2.innerText = 'TAKES THE ROUND';
                }
                console.log('X Wins');
            }
            setTimeout(() => {
                banner.classList.add('active');
            }, 1700);

            return arr[(win_comb[i][0])].dataset.move;
        }
    }
    
    if (winner === undefined && active.length === 9) {
        tie.children[1].innerText = (++tiescore);
        banner.classList.add('tied');
        text1.innerText = '';
        text2.innerText = 'ROUND TIED';
        setTimeout(() => {
            banner.classList.add('active');
        }, 1700);
        console.log('tie');
        return undefined;
    }

    return undefined;
}

//CPU move
function CPU() {
    if (localStorage.getItem("mode") === 'easy') {
        do {
            move = Math.floor(Math.random() * 9);
        } while (active.includes(move));
    }
    else {
        console.log('AI will decide the move');
    }
    active.push(move);
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
}

//preview listener, activate button, player move affect, cpu move, cpu move affect
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
    //activate the block when clicked and show solid x or o.
    element.addEventListener('click', (e) => {
        board.style.pointerEvents = "none";

        //Player
        if (e.target.classList.contains('empty')) {
            active.push(Number(e.target.id));
            console.log(Number(e.target.id));
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
                if (winning(win_comb) === undefined && active.length !== 9) {
                    setTimeout(() => {
                        board_turn.classList.remove('x');
                        board_turn.classList.add('o');
                    }, 300);
                }
            }
            turn = (!turn);
        }

        //CPU
        if (winner === undefined && localStorage.getItem("versus") === "CPU" && active.length !== 9) {
            loading.style.visibility = "visible";
            setTimeout(() => {
                CPU();
                console.log('CPU chance');
                loading.style.visibility = "hidden";
                board.style.pointerEvents = "all";
                winning(win_comb);
            }, 2000);
        }
        else {
            loading.style.visibility = "hidden";
            board.style.pointerEvents = "all";
        }
    });
});

// window.addEventListener('resize',()=>{
//     // console.log(window.innerWidth,window.innerHeight);
// })