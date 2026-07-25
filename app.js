let gameSeq =[];
let userSeq=[];
let btns = ["yellow" , "red" , "blue" , "green"];

let started = false;      
let level = 0;
let highScore = 0;
let gameSpeed = 1000;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let difficulty = document.querySelector("#difficulty");

difficulty.addEventListener("change", function () {
    gameSpeed = Number(this.value);
});
document.addEventListener("keypress" , function(){
  
   if(started == false){
    console.log("Game Started");
    started = true;

    levelUp();
   }
});

function btnFlash(btn){                 
   btn.classList.add("flash");          
   setTimeout(function(){
      btn.classList.remove("flash");    
   },250);
}

function userFlash(btn){     
   btn.classList.add("userflash");
   setTimeout(function(){
      btn.classList.remove("userflash");
   },250);
}

function levelUp(){
   userSeq = [];
   level++;
   h2.innerText = `Level ${level}`;

   let randIdx = Math.floor(Math.random()*4);
  
   let randColor = btns[randIdx];
   let randBtn= document.querySelector(`.${randColor}`);
   gameSeq.push(randColor);
  console.log(gameSeq);
   btnFlash(randBtn);
}
function checkAns(idx){
  
   if(userSeq[idx] === gameSeq[idx]){
      if(userSeq.length == gameSeq.length){
        setTimeout(levelUp , gameSpeed);    
      }
   }else{
      if(level > highScore){
    highScore = level;
    h3.innerText = `Highest Score : ${highScore}`;
}
    
      h2.innerHTML = `Game Over! Your score was <b> ${level} </b> <br> Press any key to start`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function(){ 
         document.querySelector("body").style.backgroundColor = "rgb(225, 222, 218)";
      }, 150);                   
      reset();
   }
}
 
function btnPress(){
   let btn = this;         
   userFlash(btn); 

   userColor = btn.getAttribute("id"); 
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
   btn.addEventListener("click" , btnPress);      
}


function reset(){
   started = false;
   gameSeq = [];
   userSeq = [];
   level = 0;

}
