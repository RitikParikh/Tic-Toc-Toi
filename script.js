console.log("Welcome Tic Tac Toe");

const music = new Audio("music.mp3")
const turnMusic = new Audio("ting.mp3")
const gameoverMusic = new Audio("gameover.mp3")

let turn = 'X';
let gameover = false;


const changeTurn = () => {
    return turn == "X" ? "O" : "X"
}

function updateLine() {
    const line = document.querySelector('.line');
    const x = window.innerWidth * 0.01;
    const y = window.innerHeight * 0.01;
    const rotate = Math.random() * 360;
    const width = Math.min(window.innerWidth, window.innerHeight) * 0.2;
    line.style.transform = `translate(${x}vw, ${y}vw) rotate(${rotate}deg)`;
    line.style.width = `${width}px`;
}

const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0,1,2, 0, 16.5, 0],
        [3,4,5, 0, 49.5, 0],
        [6,7,8, 0, 83,0],
        [0,3,6, 90, 50, -33.5],
        [1,4,7, 90, 50, 0],
        [2,5,8, 90, 50, 33.5],
        [0,4,8, 45,50,0.5],
        [2,4,6, 135, 50, 0.5]
    ];
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText == boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText == boxtexts[e[1]].innerText) && boxtexts[e[0]].innerText != ""){
            document.querySelector('.info').innerText = `${boxtexts[e[0]].innerText} Won`;
            gameover = true;
            // music.play();
            gameoverMusic.play();
            const line = document.querySelector('.line');
            if (e[1] === 4 && e[2] === 5 && e[3] === 5 && e[4] === 15 && e[5] === 0) {
                // Full size line
                line.style.width = `${Math.min(window.innerWidth, window.innerHeight)}px`;
                updateLine();
              } else {
                line.style.transform = `translate(0%,0%)  rotate(${e[3]}deg)`;
                line.style.width =`100%`;
                line.style.top =`${e[4]}%`;
                line.style.left =`${e[5]}%`;
              }
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px';
        }
    });
}


let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach((ele)=>{
     let boxtext = ele.querySelector('.boxtext');
     ele.addEventListener("click", ()=>{
            if(!gameover && boxtext.innerText === ""){
                boxtext.innerText = turn;
                turn = changeTurn();
                // if (turn === 'X') {
                //     turn = 'O';
                // } else {
                //     turn = 'X';
                //     let result = minmax(getBoard(), 0, 'O');
                //     let index = result.index;
                //     let aiBox = boxes[index].querySelector('.boxtext');
                //     aiBox.innerText = 'O';
                //     checkWin();
                //     turn = 'X';
                // }
                turnMusic.play();
                checkWin();
                document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;
            } 
     });
});

//Add Onclick listner to reste button 
reset.addEventListener('click',()=>{
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach((ele)=>{
        ele.innerText = "";
    })
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`
    gameover = false;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0';
    document.querySelector('.line').style.width =`0%`;
})

const getBoard = () => {
    const boxtexts = document.getElementsByClassName("boxtext");
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push(boxtexts[i].innerText);
    }
    return board;
  }

const minmax = (board, depth, player) => {
    console.log(board);
}