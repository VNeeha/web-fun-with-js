// event listeners:boxxes,new game,reset
// acessing elements through DOM
let btns=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".resetBtn");
let newBtn=document.querySelector(".newBtn");
let newGameSection=document.querySelector(".newGameSection");
let gameSection=document.querySelector(".gameSection");

let congratsPara=document.querySelector(".newGameSection p");
let winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let player="X",currentPlayer="X",count=0;

// event listeners
for(let btn of btns){
    
    btn.addEventListener("click",()=>{
        count++;

        btn.style.color=(player=='X')?"red":"green";
        btn.innerText=player;
        currentPlayer=player;
        player=(player=="X")?"O":"X";
        btn.disabled=true;
        if(checkWinner()){
            congratsPara.innerText=`Congratulations!Winner is ${currentPlayer}`;
            newGameSection.classList.remove("hideNewGameSection");
            gameSection.classList.add("hideGameSection");
        }else{
            if(count==9){
                congratsPara.innerText=`Its a draw.Try again!`;
            newGameSection.classList.remove("hideNewGameSection");
            gameSection.classList.add("hideGameSection");
            }
        }
    });
}

resetBtn.addEventListener("click",()=>{
    for(let btn of btns){
        btn.disabled=false;
         btn.innerText="";
    }
    count=0
    player = "X";
});
newBtn.addEventListener("click",()=>{
    for(let btn of btns){
        btn.disabled=false;
         btn.innerText="";
    }
    count=0;
    newGameSection.classList.add("hideNewGameSection");
    gameSection.classList.remove("hideGameSection");
    player = "X";
});
let checkWinner=()=>{
    return winPatterns.some((pattern)=>{
        return pattern.every((box)=>{
            return btns[box].innerText==currentPlayer;
        })
    })
};