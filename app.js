let gameSeq =[];
let userSeq=[];

//array made for buttons for choosing random color
let btns = ["yellow" , "red" , "blue" , "green"];

let started = false;        //this tells if the game has started....to start it has to be true
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
   /*As game can be started at once only so.....*/
   if(started == false){
    console.log("Game Started");
    started = true;

    levelUp();
   }
});
 //this function making white color
function btnFlash(btn){                   //btn is btn that should flash....if red is called then btn = red button....passed as parameter
   btn.classList.add("flash");            //if btn = red class flash is added to red button
   setTimeout(function(){
      btn.classList.remove("flash");     //returns back to original color
   },250);
}
//this function making green color

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
   //from random color random index have been chosen
   let randColor = btns[randIdx];
   //then whatever color we get , we can have the access
   let randBtn= document.querySelector(`.${randColor}`);
   
   
   //randomColors generated are getting pushed in gameSeq
   gameSeq.push(randColor);
  console.log(gameSeq);

   //before flashing game will have to choose random btn
   btnFlash(randBtn);
}
//To check userSeq with gameSeq
function checkAns(idx){
  //for highest Score
   if(userSeq[idx] === gameSeq[idx]){
      if(userSeq.length == gameSeq.length){
        setTimeout(levelUp , gameSpeed);      //dont call level up immediately...it waits thats why gameSpeed is given
      }
   }else{
      if(level > highScore){
    highScore = level;
    h3.innerText = `Highest Score : ${highScore}`;
}
      //we wrote innerHTML because tags cannot be given in innerText...then browser will treat tags as normal text if written in innerText
      h2.innerHTML = `Game Over! Your score was <b> ${level} </b> <br> Press any key to start`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function(){ 
         document.querySelector("body").style.backgroundColor = "rgb(225, 222, 218)";
      }, 150);                     //returns page to normal...for immediate effect 150 has been given
      reset();
   }
}


//Now for users to click on the respective colors
//All the buttons are being used in individual functions so they dont clash 
function btnPress(){
   let btn = this;      //this is the button that is clicked       
   userFlash(btn); //it is taking the button that we passed as an argument and working on it applying flash processes.

   userColor = btn.getAttribute("id"); //for knowing that which button has been pressed...so using id we can get color name ...the btn is clicked and its id get stored
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
   btn.addEventListener("click" , btnPress);        //whenever the btn is clicked run btnPress()
}

//To reset game
function reset(){
   started = false;
   gameSeq = [];
   userSeq = [];
   level = 0;

}