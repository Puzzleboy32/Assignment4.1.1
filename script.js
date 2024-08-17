var divCheckersBoard = document.getElementById("divCheckersBoard");
var currentPlayer = "w"; // Track the current player
var spnSelectedPiece = document.getElementById("spnSelectedPiece");
var selectedPiece = null;
//this is who goes first like player one then player two and it repeats
var arrPiece = [
  [null, 'w', null, 'w', null, 'w', null, 'w'],
  ['w', null, 'w', null, 'w', null, 'w', null],
  [null, 'w', null, 'w', null, 'w', null, 'w'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['b', null, 'b', null, 'b', null, 'b', null],
  [null, 'b', null, 'b', null, 'b', null, 'b'],
  ['b', null, 'b', null, 'b', null, 'b', null],
];
//This is how to create bored using with rows and colums and to make sure it fits the pieces 
function createCheckerBoard(divCheckersBoard) {
  for (var row = 0; row < 8; row++) {
    for (var col = 0; col < 8; col++) {
      var square = document.createElement("div");
      square.id = "square-" + row + "-" + col;
      square.className = "CheckersSquare";
      if ((row + col) % 2 === 1) {
        square.classList.add("checkersAlt");
      }
      square.addEventListener("click", movePiece);
      divCheckersBoard.appendChild(square);

      if (arrPiece[row][col]) {
        createPiece(row + "-" + col, arrPiece[row][col], square);
      }
    }
    var clearFloat = document.createElement("div");
    clearFloat.className = "clear-float";
    divCheckersBoard.appendChild(clearFloat);
  }
}

function createPiece(pieceId, pieceClass, theSquare) {
  var piece = document.createElement("div");
  piece.id = "piece-" + pieceId;
  piece.className = "checkerPiece checkerPiece-" + pieceClass;
  piece.addEventListener("click", savePieceid);
  theSquare.appendChild(piece);
}
//This is where the pieces stay in one place or else it would just go back 
function savePieceid(event) {
  console.log("savePieceid function called");

  if (event.target.classList.contains("checkerPiece-" + currentPlayer)) {
    selectedPiece = event.target;
    spnSelectedPiece.dataset.value = event.target.id;
    console.log("SelectedPieceId=" + event.target.id);
  }
}
//This is how to move pieces even though it doesn't destroy the pieces
function movePiece(event) {
  console.log("movePiece function was called");

  var newSquareId = event.target.id;
  console.log("newSquareid=" + newSquareId);

  if (selectedPiece && event.target.classList.contains("CheckersSquare")) {
    var oldSquare = selectedPiece.parentElement;
    var newSquare = event.target;

    // Get the row and column of the old and new squares
    var oldPos = oldSquare.id.split("-").slice(1).map(Number);
    var newPos = newSquare.id.split("-").slice(1).map(Number);

    // Check if the move is valid
    if (isValidMove(oldPos, newPos)) {
      newSquare.appendChild(selectedPiece);
      arrPiece[newPos[0]][newPos[1]] = arrPiece[oldPos[0]][oldPos[1]];
      arrPiece[oldPos[0]][oldPos[1]] = null;

      // Switch players
      currentPlayer = currentPlayer === "w" ? "b" : "w";

      selectedPiece = null;
      spnSelectedPiece.dataset.value = "";
    }
  }
}

function isValidMove(oldPos, newPos) {
  // Implement your move validation logic here
  // This is a simplified version, you'll need to add more rules
  var rowDiff = Math.abs(newPos[0] - oldPos[0]);
  var colDiff = Math.abs(newPos[1] - oldPos[1]);
  return rowDiff === 1 && colDiff === 1;
}

createCheckerBoard(divCheckersBoard);