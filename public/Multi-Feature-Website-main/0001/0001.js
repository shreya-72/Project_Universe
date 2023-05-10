
		var board = ["", "", "", "", "", "", "", "", ""];

		// function to make a move
		function makeMove(index) {
			// check if the move is valid
			if (board[index] !== "") {
				return;
			}

			// make the move
			board[index] = "X";
			document.getElementById(index).innerHTML = "X";

			// check if the game is over
			var result = evaluate(board);
			if (result !== null) {
				endGame(result);
				return;
			}

			// make the computer move
			makeComputerMove();

			// check if the game is over
			result = evaluate(board);
			if (result !== null) {
				endGame(result);
			}
		}

		// function to end the game
		function endGame(result) {
			// display the result
			var message;
			if (result === -1) {
				message = "You win!";
			} else if (result === 0) {
				message = "It's a tie!";
			} else {
				message = "You lose!";
			}
			alert(message);

			// reset the board
			board = ["", "", "", "", "", "", "", "", ""];
			for (var i = 0; i < 9; i++) {
				document.getElementById(i).innerHTML = "";
			}
		}

		// function to make the computer move
		function makeComputerMove() {
			var bestScore = -Infinity;
			var bestMove = null;

			// loop through all possible moves
			for (var i = 0; i < 9; i++) {
				if (board[i] === "") {
					board[i] = "O";
					var score = minimax(board, 0, false);
					board[i] = "";
					if (score > bestScore) {
						bestScore = score;
						bestMove = i;
					}
				}
			}

			// make the best move
			board[bestMove] = "O";
			document.getElementById(bestMove).innerHTML = "O";
		}

		// function to evaluate the score of a board state
		function evaluate(board) {
					// check rows
		for (var i = 0; i < 9; i += 3) {
			if (board[i] === board[i+1] && board[i+1] === board[i+2]) {
				if (board[i] === "X") {
					return -1;
				} else if (board[i] === "O") {
					return 1;
				}
			}
		}

		// check columns
		for (var i = 0; i < 3; i++) {
			if (board[i] === board[i+3] && board[i+3] === board[i+6]) {
				if (board[i] === "X") {
					return -1;
				} else if (board[i] === "O") {
					return 1;
				}
			}
		}

		// check diagonals
		if (board[0] === board[4] && board[4] === board[8]) {
			if (board[0] === "X") {
				return -1;
			} else if (board[0] === "O") {
				return 1;
			}
		}
		if (board[2] === board[4] && board[4] === board[6]) {
			if (board[2] === "X") {
				return -1;
			} else if (board[2] === "O") {
				return 1;
			}
		}

		// check for a tie
		if (!board.includes("")) {
			return 0;
		}

		// return null if the game is not over
		return null;
	}

	// function for the minimax algorithm
	function minimax(board, depth, isMaximizingPlayer) {
		// check if the game is over
		var result = evaluate(board);
		if (result !== null) {
			return result;
		}

		// maximize or minimize score depending on whose turn it is
		if (isMaximizingPlayer) {
			var bestScore = -Infinity;
			for (var i = 0; i < 9; i++) {
				if (board[i] === "") {
					board[i] = "O";
					var score = minimax(board, depth + 1, false);
					board[i] = "";
					bestScore = Math.max(score, bestScore);
				}
			}
			return bestScore;
		} else {
			var bestScore = Infinity;
			for (var i = 0; i < 9; i++) {
				if (board[i] === "") {
					board[i] = "X";
					var score = minimax(board, depth + 1, true);
					board[i] = "";
					bestScore = Math.min(score, bestScore);
				}
			}
			return bestScore;
		}
	}

	// add event listeners to the table cells
	var cells = document.getElementsByTagName("td");
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", function() {
			makeMove(this.id);
		});
	}
