const game = (() => {
  const gameBoard = createBoard();
  const player = newPlayer();
  const computer = newComputerPlayer();
  const boardContainer = document.querySelector(".game-board");
  const scoreContainer = document.querySelector(".score"); 
  let lastPlayer = "";

  drawGame(gameBoard, player);

  //Create the HTML elements to display board and score 
  function drawGame(gameBoard, player,winningLines) {
    for (let i = 0; i < 9; i++) {
      const node = document.createElement("p");
      
      node.innerHTML = gameBoard[i];
      node.classList = "grid-element";
      node.id = `element${i}`;

      node.addEventListener("click", function() {
        if (this.innerHTML == "E") {
          // Player turn
          player.play(this, i);
          checkState(gameBoard);
          // Computer turn
          computer.play();
          checkState(gameBoard);
        }
      })

      boardContainer.appendChild(node);
    }
    //Add score to its container
    const node = document.createElement("p");
    node.classList = "scoreText";
    node.innerHTML = `${player.getName()} score: ${player.getScore()} 
                      ${computer.getName()} score: ${computer.getScore()}`;

    scoreContainer.appendChild(node);
  }

  // Checks if the board contains any winning line
  function lookForWinner(gameBoard) {
    const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],
                          [1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const winner = winningLines.some(function(line) {
      return (line.every(function(slot) { 
        return (gameBoard[slot] === lastPlayer)
      }));
    });

    return winner;
  }

  function displayWinner() { 
    const scoreText = document.querySelector(".scoreText");
    
    if (lastPlayer === "X") { 
      player.addPoint();
      lastPlayer = player.getName();
    } else {
      computer.addPoint();
      lastPlayer = computer.getName();
    }

    scoreText.innerHTML = `${player.getName()} score: ${player.getScore()} 
                           ${computer.getName()} score: ${computer.getScore()}`;
  }


  function checkState(gameBoard) {
    if (lookForWinner(gameBoard)) { 
      displayWinner();
      resetBoard();    
    } else if (isBoardFull(gameBoard)) {
      resetBoard();   
    } 
  }

  //Checks if the board is full
  function isBoardFull(gameBoard) {
    return (gameBoard.every(function(slot) { return slot !== "E" }));
  }

  function createBoard() {
    let gameBoard = []
    for (let i = 0; i < 9; i++) {
      // "E" represent empty slots in the board
      gameBoard.push("E");
    }
    return gameBoard;
  }

  function resetBoard() {
    const matchResult = document.querySelector(".match-result");
    matchResult.classList.remove("visible-text");
    lastPlayer = "";
    for (let i = 0; i < 9; i++) {
      const gridElement = document.getElementById(`element${i}`);
      gridElement.classList.remove("visible-text");
      gridElement.innerHTML = "E";
      gameBoard[i] = "E";
    }
  }

  // Player factory
  function newPlayer() {
    const name = prompt("Please, enter your name", "Player");
    let score = 0;
    const getName = () => name;
    const getScore = () => score;
    const addPoint = () => { score += 1 };
    const play = (node, i) => {
      node.innerHTML = "X";
      node.classList.add("visible-text");
      gameBoard[i] = "X";
      lastPlayer = "X";
    }
  
    return {getName, getScore, addPoint, play}
  }

  // ComputerPLayer factory
  function newComputerPlayer() {
    const name = "Computer";
    let score = 0;
    const getName = () => name;
    const getScore = () => score;
    const addPoint = () => { score += 1 };
    //Computer makes a valid move
    const play = () => {
      let randomNum = Math.floor(Math.random() * 9);
      let target = document.getElementById(`element${randomNum}`);

      while (target.innerHTML != "E") {
        randomNum = Math.floor(Math.random() * 9);
        target = document.getElementById(`element${randomNum}`);
      }

      target.innerHTML = "O";
      target.classList.add("visible-text");
      gameBoard[randomNum] = "O";
      lastPlayer = "O";
    }

    return {getName, getScore, addPoint, play}
  }

})();
