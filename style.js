const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let GameGrid;

const WinningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initgame () {
    currentPlayer = "X";
    GameGrid =["","","","","","","","",""];
    boxes.forEach((box , index)=>{
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        box.classList =`box box${index+1}`
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `currentPlayer-${currentPlayer}`;
}

initgame();

function swapTurn() {
    if(currentPlayer ==="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `current Player-${currentPlayer}`;
}

function CheckGameOver(){
    let answer ="";

    WinningPosition.forEach((position) =>{
        if((GameGrid[position[0]] !=="" || GameGrid[position[1]] !=="" || GameGrid[position[2]]!=="") && (GameGrid[position[0]] === GameGrid[position[1]]) && (GameGrid[position[1]] === GameGrid[position[2]])){

            if(GameGrid[position[0]] =="X")
                answer ="X";
            else  
                answer ="O";

            //disable pointer event to stop the game
            boxes.forEach((box) =>{
                box.style.pointerEvents ="none";
            })

            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")

        }
    })
    
    if(answer !==""){
        gameInfo.innerText = `winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    let fillCount = 0;
    GameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    });
    
    if(fillCount === 9) {
        gameInfo.innerText ="Game Tied !";
        newGameBtn.classList.add("active")
    }
}

function handleClick(index) {
    if(GameGrid[index] ===""){
        boxes[index].innerText = currentPlayer;
        GameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap the current player
        swapTurn();
        //check if and buddy win or not;
        CheckGameOver();
    }
}

boxes.forEach((box , index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click" , initgame)