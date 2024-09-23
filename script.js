let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");

let newGamebtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")

let turn0 = true;
let count=0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            box.style.color="blue";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            box.style.color="red";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner=checkWinner();
        if(count==9 && !isWinner){
            gameDraw();
        }

        
    });
});


const gameDraw=()=>{
    msg.innerText="Game Draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const showWinner = (winner) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1Value != "" && pos2value != "" && pos3value != "") {
            if (pos1Value == pos2value && pos2value == pos3value) {
                showWinner(pos1Value);
                return;
            }
        }

    }
};




newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);