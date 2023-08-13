 const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }
 }

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    let board;
    let round;

    let render = () => {
        let boardHTML = "";

        board.forEach((tile, index) => { // get the value and index from each element from the array and  do something to it
            boardHTML += `<div class="board__tile" id="tile-${index}">${tile}</div>`;
        });      

        document.querySelector(".board").innerHTML = boardHTML;

        const tiles = document.querySelectorAll(".board__tile");
        tiles.forEach((tile) => {
            tile.addEventListener("click", handleClick);
        });
    }

    const start = (playerOneName, playerTwoName) => {
        let boardContainerHTML = document.createElement("div");
        boardContainerHTML.className = "board";
        document.body.appendChild(boardContainerHTML);

        players = [createPlayer(playerOneName, "X"), createPlayer(playerTwoName, "O")];
        currentPlayerIndex = 0; // we assign the value here in case the game needs to restart.
        gameOver = false;
        board = ["", "", "", "", "", "", "", "", ""];
        round = 1;
        render();
    }

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]); // tile-1 -> [target, 1] -> 1
        if (!board[index]) { // prevents players from overriding each others moves
            board[index] = players[currentPlayerIndex].marker;
            currentPlayerIndex = currentPlayerIndex == 0 ? 1 : 0;
            round += 1;
            console.log(currentPlayerIndex);
            render();

            if (checkForWin()) {
                alert(`${players[currentPlayerIndex].name} has won!`)
            } else if (round === 10) {
                alert('Tie!');
            }
        }
    }

    const checkForWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i=0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]; // assign multiple variables
            if (board[a] && board[a] == board[b] && board[a] == board[c]) {
                return true;
            }
        }

        return false;
    }

    return {
        start
    };

})();

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", (e) => {
    const playerOneName = (document.querySelector("#player-one-name")).value;
    const playerTwoName = (document.querySelector("#player-two-name")).value;

    // check if name is valid
    if (playerOneName === "" || playerTwoName === "") {
        alert("please enter a name");
        return;
    }

    document.querySelector("#player-creation").remove();
    Game.start(playerOneName, playerTwoName);










});


