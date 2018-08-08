const game = (() => {
  const gameBoard = createBoard();
  const player = newPlayer();
  const boardContainer = document.querySelector(".game-board");
  const scoreContainer = document.querySelector(".score"); 
  let roundCount = 0;

  drawGame(gameBoard);

  //Create the HTML elements to display board and score 
  function drawGame(gameBoard) {
    for (let i = 0; i < 9; i++) {
      const node = document.createElement("p");
      
      node.innerHTML = gameBoard[i];
      node.classList = "grid-element";
      node.id = `element${i + 1}`;

      node.addEventListener("click", function() {
        //Try to place a playround function here
        if (node.innerHTML == "W") {
          roundCount += 1; 
          node.innerHTML = "X";
          gameBoard[i] = "X";
          node.classList.add("visible-text");

          !isBoardFull() ? computerPlay() : resetBoard();
        }
      })

      boardContainer.appendChild(node);
    }
    //Add score to its container
    const node = document.createElement("p");
    node.innerHTML = `${player.getName()} score: 
                      ${player.getScore()} Computer score: 0`;
    
    scoreContainer.appendChild(node);
  }

  //Computer makes a valid move
  function computerPlay() {
    let randomNum = Math.floor(Math.random() * 9) + 1;
    let target = document.getElementById(`element${randomNum}`);

    while (target.innerHTML != "W") {
      randomNum = Math.floor(Math.random() * 9) + 1;
      target = document.getElementById(`element${randomNum}`);
    }

    target.innerHTML = "O";
    target.classList.add("visible-text");
  }

  //Implement check if winner with some / every

  //Checks if the board is full
  function isBoardFull() {
    return (roundCount < 5 ? false : true);
  }

  function createBoard() {
    let gameBoard = []
    for (let i = 0; i < 9; i++) {
      gameBoard.push("W");
    }
    return gameBoard;
  }

  function resetBoard() {
    for (let i = 0; i < 9; i++) {
      const gridElement = document.getElementById(`element${i+1}`);
      gridElement.classList.remove("visible-text");
      gridElement.innerHTML = "W";
      roundCount = 0
    }
  }

  function newPlayer() {
    const name = prompt("Enter your name, please");
    let score = 0;
    const getName = () => name;
    const getScore = () => score;
    const addPoint = () => { score += 1 };
    
    return {getName, getScore, addPoint}
  }

})();
