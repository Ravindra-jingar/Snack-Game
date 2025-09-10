let speed = 5;
let score = 0;
let inputDir = {x:0, y:0};
let snakeArr = [{x:10, y:10}];
let food = {x:3, y:9};
let lastPaintTime = 0;
let game = document.querySelector(".game");
let gameBord = document.querySelector(".gameBord");
let scorebox = document.querySelector(".scorebox");
let highscorebox = document.querySelector(".highscorebox");
let overhighscorebox = document.querySelector(".overhighscorebox");
let overscorebox = document.querySelector(".overscorebox");
let gameover = document.querySelector(".gameover");

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gamengine();
}
function isCollide(snake){
//if you bumb into your self
  for(let i = 1; i < snakeArr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }}
// if ypu bumb into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
     return false;
}
function resetGame(){
 inputDir = {x:0, y:0};
        speed = 5;
        gameover.classList.add("hide");
        game.style.display = "block";
        scorebox.innerHTML = "Score : " + score + "0";
        snakeArr = [{x:10, y:10}];
       window.location.reload();
    window.requestAnimationFrame(main);
}
function gamengine(){
//uptdate the snake array and food
    if(isCollide(snakeArr)){
        gameover.classList.remove("hide");
        overhighscorebox.innerHTML = "HighScore: " + highscoreval;
        game.style.display = "none";
        overscorebox.innerHTML = "Score: " + score;
        return;
    }
//if sanke eaten the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
          score += 1;
           if(score % 5 === 0){
            speed += 1;
            console.log(speed)
        }
           if(score > highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
           highscorebox.innerHTML = "HighScore: " + highscoreval;
        }

          scorebox.innerHTML = "Score : " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b-a)* Math.random()),
            y: Math.round(a + (b-a)* Math.random())
        }
    }
//move the snake
    for(let i = snakeArr.length  - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
//for the 0 index //head
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

//display the snake 
    gameBord.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index  === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        gameBord.appendChild(snakeElement);
    })
        let foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        gameBord.appendChild(foodElement);
}
let highscore = localStorage.getItem("highscore");
let highscoreval;
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{  
    highscoreval = JSON.parse(highscore)
    highscorebox.innerHTML = "High Score : " + highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
   inputDir = {x:0, y:1}; //start the game;
   switch (e.key){
    case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
 break;
    case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
 break;
 case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
 break;
 case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
 break;
 case "Enter":
    resetGame();    
 break;       
   }
});

