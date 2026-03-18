/* DASHBOARD DATA */

let wins = Number(localStorage.getItem("wins")) || 0;
let games = Number(localStorage.getItem("games")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let best = localStorage.getItem("best") || "-";

const container = document.getElementById("confetti-container");

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
 if (navigator.vibrate) navigator.vibrate?.(10);
}

}

function deleteNum(){

let input=document.getElementById("guessInput");
input.value=input.value.slice(0,-1);
 if (navigator.vibrate) navigator.vibrate?.(10);

}

/* EXPLOSION */
function explode(emojis){

  let duration = 2000;
  let interval = 120;

  let blast = setInterval(()=>{

    for(let i=0;i<10;i++){

      let particle = document.createElement("div");
      particle.className = "particle";

      particle.innerText =
        emojis[Math.floor(Math.random()*emojis.length)];

      // 🔥 RANDOM POSITION ACROSS SCREEN
      particle.style.left = Math.random()*100 + "vw";

      // 🔥 START ABOVE SCREEN
      particle.style.top = "-20px";

      // 🎯 RANDOM SPREAD (slight sideways drift)
      particle.style.setProperty("--x",(Math.random()*200 - 100)+"px");

      // 🎯 FALL DOWN FULL SCREEN
      particle.style.setProperty("--y","100vh");

      particle.style.transform = `rotate(${Math.random()*360}deg)`;

      document.body.appendChild(particle);

      setTimeout(()=>particle.remove(),1500);
    }

  },interval);

  setTimeout(()=>clearInterval(blast),duration);
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
// blastConfetti(); // 🔥 ADD THIS

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

explode(["🩻","🩸","😶","👾","🕸️"]);

games++;
streak=0;

localStorage.setItem("games",games);
localStorage.setItem("streak",streak);

updateDashboard();

}

document.getElementById("guessInput").value="";

}

function openInstructions(){
  document.getElementById("instructionsModal").classList.add("show");
}

function closeInstructions(){
  document.getElementById("instructionsModal").classList.remove("show");
}



setDifficulty(4);

// function blastConfetti() {
//   const container = document.getElementById("confetti-container");

//   for (let i = 0; i < 80; i++) {
//     const confetti = document.createElement("div");

//     confetti.style.position = "absolute";
//     confetti.style.width = "8px";
//     confetti.style.height = "8px";
//     confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;

//     confetti.style.top = "0px";
//     confetti.style.left = Math.random() * window.innerWidth + "px";

//     confetti.style.opacity = "0.8";
//     confetti.style.transform = `rotate(${Math.random()*360}deg)`;

//     confetti.style.transition = "top 1s ease-out";

//     container.appendChild(confetti);

//     setTimeout(() => {
//       confetti.style.top = window.innerHeight + "px";
//     }, 50);

//     setTimeout(() => {
//       confetti.remove();
//     }, 1200);
//   }
// }

document.addEventListener("keydown", (e) => {

  if(e.key >= "0" && e.key <= "9"){
    addNum(e.key);
  }

  if(e.key === "Backspace"){
    deleteNum();
  }

  if(e.key === "Enter"){
    guess();
  }

});