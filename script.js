console.log("Welcome Tic Tac Toe");

const music = new Audio("music.mp3")
const turnMusic = new Audio("ting.mp3")
const gameoverMusic = new Audio("gameover.mp3")

const Multiplayer = true;

let turn = 'X';
let gameover = false;


const changeTurn = () => {
    return turn == "X" ? "O" : "X"
}

const wins = [
    [0, 1, 2, 0, 16.5, 0],
    [3, 4, 5, 0, 49.5, 0],
    [6, 7, 8, 0, 83, 0],
    [0, 3, 6, 90, 50, -33.5],
    [1, 4, 7, 90, 50, 0],
    [2, 5, 8, 90, 50, 33.5],
    [0, 4, 8, 45, 50, 0.5],
    [2, 4, 6, 135, 50, 0.5]
];

const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText == boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText == boxtexts[e[1]].innerText) && boxtexts[e[0]].innerText != "") {
            document.querySelector('.info').innerText = `${boxtexts[e[0]].innerText} Won`;
            gameover = true;
            gameoverMusic.play();
            // music.play();
            const line = document.querySelector('.line');
            line.style.transform = `translate(0%,0%)  rotate(${e[3]}deg)`;
            line.style.width = `100%`;
            line.style.top = `${e[4]}%`;
            line.style.left = `${e[5]}%`;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px';
        }
    });
}


let boxes = document.getElementsByClassName("box");

if (Multiplayer) {
    Array.from(boxes).forEach((ele) => {
        let boxtext = ele.querySelector('.boxtext');
        ele.addEventListener("click", () => {
            if (!gameover && boxtext.innerText === "") {
                boxtext.innerText = turn;
                turn = changeTurn();
                turnMusic.play();
                checkWin();
                document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;
            }
        });
    });
} else {
    Array.from(boxes).forEach((ele) => {
        let boxtext = ele.querySelector('.boxtext');
        ele.addEventListener("click", () => {
            if (!gameover && boxtext.innerText === "") {
                boxtext.innerText = turn;
                if (turn === 'X') {
                    turn = 'O';
                    turnMusic.play();
                    checkWin();
                    // document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;
                }
                if (!gameover) {
                    turn = 'X';
                    let {index} = minimax(getBoard(), 9, 'O');
                    console.log(index)
                    let aiBox = boxes[index].querySelector('.boxtext');
                    aiBox.innerText = 'O';
                    checkWin();
                    turn = 'X';
                }

            }
        });
    });
}



//Add Onclick listner to reste button 
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach((ele) => {
        ele.innerText = "";
    })
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`
    gameover = false;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0';
    document.querySelector('.line').style.width = `0%`;
    // music.pause();
})

const getBoard = () => {
    const boxtexts = document.getElementsByClassName("boxtext");
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(boxtexts[i].innerText);
    }
    return board;
}


const evaluate = (board) => {
    // Evaluate the board and return a score
    // For example, you could assign a score of 1 for each X and -1 for each O
    // Then add up the scores for each row, column, and diagonal
    // Return the total score
    let score = 0;
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        score += (board[i] === "X" ? 1 : (board[i] === "O" ? -1 : 0)) +
            (board[i + 1] === "X" ? 1 : (board[i + 1] === "O" ? -1 : 0)) +
            (board[i + 2] === "X" ? 1 : (board[i + 2] === "O" ? -1 : 0));
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        score += (board[i] === "X" ? 1 : (board[i] === "O" ? -1 : 0)) +
            (board[i + 3] === "X" ? 1 : (board[i + 3] === "O" ? -1 : 0)) +
            (board[i + 6] === "X" ? 1 : (board[i + 6] === "O" ? -1 : 0));
    }
    // Check diagonals
    score += (board[0] === "X" ? 1 : (board[0] === "O" ? -1 : 0)) +
        (board[4] === "X" ? 1 : (board[4] === "O" ? -1 : 0)) +
        (board[8] === "X" ? 1 : (board[8] === "O" ? -1 : 0));
    score += (board[2] === "X" ? 1 : (board[2] === "O" ? -1 : 0)) +
        (board[4] === "X" ? 1 : (board[4] === "O" ? -1 : 0)) +
        (board[6] === "X" ? 1 : (board[6] === "O" ? -1 : 0));
    return score;

    // wins.forEach(e => {
    //     if ((boxtexts[e[0]].innerText == boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText == boxtexts[e[1]].innerText) && boxtexts[e[0]].innerText != "") {
    //         document.querySelector('.info').innerText = `${boxtexts[e[0]].innerText} Won`;
    //         gameover = true;
    //         gameoverMusic.play();
    //         // music.play();
    //         const line = document.querySelector('.line');
    //         line.style.transform = `translate(0%,0%)  rotate(${e[3]}deg)`;
    //         line.style.width = `100%`;
    //         line.style.top = `${e[4]}%`;
    //         line.style.left = `${e[5]}%`;
    //         document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px';
    //     }
    // });
};

// const minmax = (board, depth, player) => {
//     console.log(board);
//     let index = Math.floor(randomnumber = Math.floor((Math.random() * 8) + 1));
//     return board[index] != "" ? minmax(board, depth, player) : index
// }

const minimax = (board, depth, player) => {
    // console.log(board);
    // Check if the game is over
    if (depth === 0 || gameover) {
      return evaluate(board);
    }
  
    if (player === "X") {
      // It's X's turn, so maximize the score
      let maxScore = -Infinity;
      let bestIndex = -1;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let {score} = minimax(board, depth - 1, "O");
          board[i] = "";
          if (score > maxScore) {
            maxScore = score;
            bestIndex = i;
          }
        }
      }
      if (bestIndex === -1) {
        // There are no more empty squares, so it's a tie
        return {score : 0, index : bestIndex};
      }
      return {score : maxScore, index : bestIndex};
    } else {
      // It's O's turn, so minimize the score
      let minScore = Infinity;
      let bestIndex = -1;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let {score} = minimax(board, depth - 1, "X");
          board[i] = "";
          if (score < minScore) {
            minScore = score;
            bestIndex = i;
          }
        }
      }
      if (bestIndex === -1) {
        // There are no more empty squares, so it's a tie
        return {score : 0, index : bestIndex};
      }
      return {score : minScore, index : bestIndex};
    }
  };
  

