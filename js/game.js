/* DASHBOARD DATA */

let wins = Number(localStorage.getItem("wins")) || 0;
let games = Number(localStorage.getItem("games")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let best = localStorage.getItem("best") || "-";

updateDashboard();

function updateDashboard(){

document.getElementById("wins").innerText = wins;
document.getElementById("games").innerText = games;
document.getElementById("streak").innerText = streak;
document.getElementById("best").innerText = best;

let rate = games>0 ? Math.round((wins/games)*100) : 0;
document.getElementById("rate").innerText = rate+"%";

}

/* GAME */

let digits = 4;
let secret;
let guessesLeft = 20;
let guessesUsed = 0;

generateSecret();

function generateSecret(){

let min = Math.pow(10, digits-1);
let max = Math.pow(10, digits) - min;

secret = Math.floor(Math.random()*max + min).toString();

}

function setDifficulty(d){

digits = d;

guessesLeft = 20;
guessesUsed = 0;

generateSecret();

let input = document.getElementById("guessInput");

input.value = "";
input.placeholder = digits + " digits";
input.maxLength = digits;

document.getElementById("history").innerHTML = "";
document.getElementById("result").innerText = "";

document.getElementById("remaining").innerText =
"Guesses Left: " + guessesLeft;

}

document.getElementById("remaining").innerText =
"Guesses Left: " + guessesLeft;

/* THEME */

function toggleTheme(){
document.body.classList.toggle("dark");
}

/* INPUT */

function addNum(n){

let input=document.getElementById("guessInput");

if(input.value.length < digits)
{
input.value+=n;
}

}

function deleteNum(){

let input=document.getElementById("guessInput");
input.value=input.value.slice(0,-1);

}

/* EXPLOSION */

function explode(emojis){

let duration = 3000;
let interval = 150;

let blast = setInterval(()=>{

for(let i=0;i<8;i++){

let particle = document.createElement("div");
particle.className="particle";

particle.innerText = emojis[Math.floor(Math.random()*emojis.length)];

particle.style.left = Math.random()*100 + "vw";
particle.style.top = Math.random()*100 + "vh";

particle.style.setProperty("--x",(Math.random()*400-200)+"px");
particle.style.setProperty("--y",(Math.random()*400-200)+"px");

document.body.appendChild(particle);

setTimeout(()=>{
particle.remove();
},3000);

}

},interval);

setTimeout(()=>{
clearInterval(blast);
},duration);

}

/* GUESS */

function guess(){

let guess=document.getElementById("guessInput").value;

if(guess.length != digits || isNaN(guess)){
alert("Enter " + digits + " digits");
return;
}

let correct=0;

for(let i=0;i<digits;i++){
if(guess[i]==secret[i]) correct++;
}

guessesLeft--;
guessesUsed++;

document.getElementById("remaining").innerText =
"Guesses Left: "+guessesLeft;

/* HISTORY */

let history=document.getElementById("history");

let item=document.createElement("div");
item.innerText = guess+" → "+correct+" correct";

history.prepend(item);

/* FEEDBACK */

if(correct==3){

document.getElementById("result").innerText=
"🌌 So close! 3 correct!";
explode(["🌌","🌙","⭐","✨","🦄"]);

}

else if(correct>0){

document.getElementById("result").innerText=
"🔥 "+correct+" correct!";
explode(["✨","🪻","💥","🎉","🌻"]);

}

else{

let coldMessages=[
"❄️ Let it Goooo",
"🍪 Its okay, have a cookie",
"🙊 Lets not say anything",
"👹 BOO!",
"🐍 Guess you are just not Ready For It...",
"🦇 Let this story die",
"🪄 Maybe in another timeline you got this",
"🧊 Ice cold",
"🤖 FAAHHHH",
"🙅 Not even close",
"🌫️ Lost in the fog"
];

document.getElementById("result").innerText =
coldMessages[Math.floor(Math.random()*coldMessages.length)];

}

/* WIN */

if(guess==secret){

document.getElementById("result").innerText="🎉 You won!";
explode(["🎉","✨","🌸","🦚","👸","🍁"]);

wins++;
games++;
streak++;

if(best=="-" || guessesUsed < best){
best = guessesUsed;
}

localStorage.setItem("wins",wins);
localStorage.setItem("games",games);
localStorage.setItem("streak",streak);
localStorage.setItem("best",best);

updateDashboard();

}

/* LOSE */

if(guessesLeft==0 && guess!=secret){

document.getElementById("result").innerText=
"Game Over! Number was "+secret;

games++;
streak=0;

localStorage.setItem("games",games);
localStorage.setItem("streak",streak);

updateDashboard();

}

document.getElementById("guessInput").value="";

}

setDifficulty(4);