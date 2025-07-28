let btns=document.querySelectorAll(".symBtn");
let msg=document.querySelector(".msg");
let msgSection=document.querySelector(".msgSection");
let userScore=document.querySelector(".userScore");
let compScore=document.querySelector(".compScore");
let symbols=["Rock","Paper","Scissors"]
function getRandomUpTo(max) {
  return Math.floor(Math.random() * (max + 1));
}
function winnerCheck(user,comp){
    if(user===comp)
        return "d";
    else if((user==0&&comp==2||user==1&&comp==0||user==2&&comp==1))
        return "u";
    return "c";

}

btns.forEach((btn,idx)=>{

    btn.addEventListener("click",()=>{
        let user=idx;
        let comp=getRandomUpTo(2);
        // check winner
        let winner=winnerCheck(user,comp);
        if(winner=="d"){
            msg.innerText=`It's a draw.Both chossen ${symbols[user]}`;
            msgSection.style.backgroundColor="rgb(161, 161, 79)";
            
        }
        else if(winner=="u"){
            msg.innerText=`Congrats!You won.${symbols[user]} beat ${symbols[comp]}`;
            msgSection.style.backgroundColor="green";
            // increase user score
            userScore.innerText=Number(userScore.innerText)+1;
        }
        else{
            msg.innerText=`You lost.${symbols[comp]} beat ${symbols[user]}`;
            msgSection.style.backgroundColor="red";
            // increase comp score
            compScore.innerText=Number(compScore.innerText)+1;
        }


    })
})
