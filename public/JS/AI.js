let NUM_ROWS = 3,
	NUM_COLS = 3,
	NUM_SQUARES = NUM_ROWS * NUM_COLS,
	GAMEBOARD = new Array(NUM_SQUARES),
	WIN_COMBOS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
	[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
	MAX_DEPTH,
	AI_MOVE,
	PLAYER_CLASS = 'cross',
	COMPUTER_CLASS = 'nought',
	RUNNING = false;

document.ready(function () {

	new_game();


	document.getElementByClassName("board__settings-cog").click(function () {
		if (document.getElementByClassName("board__settings").css('visibility') == 'hidden') {
			document.getElementByClassName("board__settings").css('visibility', 'visible');
		} else {
			document.getElementByClassName("board__settings").css('visibility', 'hidden');
		}
	});


	document.getElementByClassName("board__settings__choice-cross").click(function () {
		PLAYER_CLASS = 'cross';
		COMPUTER_CLASS = 'nought';
		document.getElementByClassName("board__settings").css('visibility', 'hidden');
		console.log('set class to cross');
	});

	document.getElementByClassName("board__settings__choice-nought").click(function () {
		PLAYER_CLASS = 'nought';
		COMPUTER_CLASS = 'cross';
		document.getElementByClassName("board__settings").css('visibility', 'hidden');
	});


	$("div[class*=board__difficulty__button]").click(function () {
		let difficulty = this.attr("id");

		if (difficulty === 'easy') MAX_DEPTH = 1;
		else if (difficulty === 'medium') MAX_DEPTH = 3;
		else MAX_DEPTH = 6;

		document.getElementByClassName("board__difficulty").classList.remove("slideDown").classList.add("slideUp");
		new_game();

	});


	document.getElementByClassName("board__slot").click(function () {
		if (RUNNING) {
			let pos = Number(this.attr("id"));


			if (GAMEBOARD[pos] == "") {
				this.addClass(PLAYER_CLASS + ' player-color');
				GAMEBOARD[pos] = "X";

				if (full(GAMEBOARD)) {
					RUNNING = false;
					document.getElementByClassName("board__header-difficulty").innerHTML = "It's a tie!";
					document.getElementByClassName("board__difficulty").classList.remove("slideUp").classList.add("slideDown");
				} else if (wins(GAMEBOARD, "X")) {
					RUNNING = false;
					document.getElementByClassName("board__header-difficulty").innerHTML = "You win!";
					document.getElementByClassName("board__difficulty").classList.remove("slideUp").classList.add("slideDown");
				} else {
					minimax(GAMEBOARD, "O", 0);
					GAMEBOARD[AI_MOVE] = "O";
					$(".board__slot[id=" + AI_MOVE + "]").addClass(COMPUTER_CLASS + ' computer-color');

					if (wins(GAMEBOARD, "O")) {
						RUNNING = false;
						document.getElementByClassName("board__header-difficulty").innerHTML = "You lost!";
						document.getElementByClassName("board__difficulty").classList.remove("slideUp").classList.add("slideDown");
					}
				}
			}
		}
	});
});


function new_game() {

	document.getElementByClassName("board__slot").each(function () {
		this.removeClass(PLAYER_CLASS + ' player-color computer-color ' + COMPUTER_CLASS);
	});


	for (let i = 0; i < NUM_SQUARES; i++) {
		GAMEBOARD[i] = "";
	}

	RUNNING = true;
}


function get_available_moves(state) {
	let all_moves = Array.apply(null, { length: NUM_SQUARES }).map(Number.call, Number);
	return all_moves.filter(function (i) { return state[i] == ""; });
}


function full(state) {
	return !get_available_moves(state).length;
}


function wins(state, player) {
	let win;

	for (let i = 0; i < WIN_COMBOS.length; i++) {
		win = true;
		for (let j = 0; j < WIN_COMBOS[i].length; j++) {
			if (state[WIN_COMBOS[i][j]] != player) {
				win = false;
			}
		}
		if (win) {
			return true;
		}
	}
	return false;
}


function terminal(state) {
	return full(state) || wins(state, "X") || wins(state, "O");
}


function score(state) {
	if (wins(state, "X")) {
		return 10;
	} else if (wins(state, "O")) {
		return -10;
	} else {
		return 0;
	}
}


function minimax(state, player, depth) {
	if (depth >= MAX_DEPTH || terminal(state)) {
		return score(state);
	}

	let max_score,
		min_score,
		scores = [],
		moves = [],
		opponent = (player == "X") ? "O" : "X",
		successors = get_available_moves(state);

	for (let s in successors) {
		let possible_state = state;
		possible_state[successors[s]] = player;
		scores.push(minimax(possible_state, opponent, depth + 1));
		possible_state[successors[s]] = "";
		moves.push(successors[s]);
	}

	if (player == "X") {
		AI_MOVE = moves[0];
		max_score = scores[0];
		for (let s in scores) {
			if (scores[s] > max_score) {
				max_score = scores[s];
				AI_MOVE = moves[s];
			}
		}
		return max_score;
	} else {
		AI_MOVE = moves[0];
		min_score = scores[0];
		for (let s in scores) {
			if (scores[s] < min_score) {
				min_score = scores[s];
				AI_MOVE = moves[s];
			}
		}
		return min_score;
	}
}