let secret = Math.floor(Math.random()*9000+1000).toString();
let guessesLeft = 20;

document.getElementById("remaining").innerText =
"Guesses Left: " + guessesLeft;

/* THEME */

function toggleTheme(){
document.body.classList.toggle("dark");
}

/* INPUT */

function addNum(n){

let input = document.getElementById("guessInput");

if(input.value.length < 4){
input.value += n;
}

}

function deleteNum(){
let input=document.getElementById("guessInput");
input.value = input.value.slice(0,-1);
}

/* EXPLOSION */

function explode(emojis){

let duration=3000;
let interval=150;

let blast=setInterval(()=>{

for(let i=0;i<8;i++){

let particle=document.createElement("div");
particle.className="particle";

particle.innerText=emojis[Math.floor(Math.random()*emojis.length)];

particle.style.left=Math.random()*100+"vw";
particle.style.top=Math.random()*100+"vh";

particle.style.setProperty("--x",(Math.random()*400-200)+"px");
particle.style.setProperty("--y",(Math.random()*400-200)+"px");

document.body.appendChild(particle);

setTimeout(()=>particle.remove(),3000);

}

},interval);

setTimeout(()=>clearInterval(blast),duration);

}

/* GUESS */

function guess(){

let guess=document.getElementById("guessInput").value;

if(guess.length!=4 || isNaN(guess)){
alert("Enter a valid 4 digit number");
return;
}

let correct=0;

for(let i=0;i<4;i++){
if(guess[i]==secret[i]) correct++;
}

guessesLeft--;

document.getElementById("remaining").innerText =
"Guesses Left: "+guessesLeft;

/* history */

let history=document.getElementById("history");

let item=document.createElement("div");
item.innerText = guess+" → "+correct+" correct";

history.prepend(item);

/* messages */

if(correct==3){

document.getElementById("result").innerText=
"🌌 So close! 3 correct!";
explode(["🌌","🌙","⭐","✨","💫"]);

}

else if(correct>0){

document.getElementById("result").innerText=
"🔥 "+correct+" correct!";
explode(["✨","💥"]);

}

else{

let coldMessages=[
"❄️ Cold",
"🧊 Ice cold",
"🙅 Not even close",
"🌫️ Lost in the fog",
"🥶 Arctic level wrong"
];

document.getElementById("result").innerText =
coldMessages[Math.floor(Math.random()*coldMessages.length)];

}

/* win */

if(guess==secret){

document.getElementById("result").innerText="🎉 You won!";
explode(["🎉","✨","🌸"]);

}

/* lose */

if(guessesLeft==0 && guess!=secret){

document.getElementById("result").innerText=
"Game Over! Number was "+secret;

}

document.getElementById("guessInput").value="";

}
