const gameBoard = document.querySelector(".game-board");
let roundCount = 0;

function newBoard() {
  for (let i = 0; i < 9; i++) {
    const node = document.createElement("p");
    
    node.innerHTML = "W";
    node.classList = "grid-element";
    node.id = `element${i + 1}`;

    node.addEventListener("click", function() {
      if (node.innerHTML == "W") {
        roundCount += 1; 
        node.innerHTML = "X";
        node.classList.add("visible-text");

        !gameHasEnded() ? computerPlay() : resetBoard();
      }
    })

    gameBoard.appendChild(node);
  }

}

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

function gameHasEnded() {
  return (roundCount < 5 ? false : true);
}

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    const gridElement = document.getElementById(`element${i+1}`);
    gridElement.classList.remove("visible-text");
    gridElement.innerHTML = "W";
    roundCount = 0
  }
}


newBoard();