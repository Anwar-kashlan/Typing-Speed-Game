// array of word

const wordsArry = [
  "Hello",
  "Fun",
  "Riot",
  "Burst",
  "Feast",
  "Adopt",
  "Back",
  "Young",
  "Bait",
  "Run",
  "Jam",
  "Cell",
  "Radio",
  "Coma",
  "Sail",
  "Honor",
  "Weak",
  "Pupil",
  "Kid",
  "Gift",
  "Duty",
  "Basis",
  "Eat",
  "Gain",
  "Row",
  "Raid",
  "Gear",
  "Knot",
  "Cool",
  "Can",
];
// lvls
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Selectors

let lvlsSel = document.querySelector(".msg .lvl");
let secSpan = document.querySelector(".sec");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");

input.onpaste = function () {
  return false;
};

lvlsSel.addEventListener("change", (e) => {
  output = lvlsSel.options[lvlsSel.selectedIndex].value;
  let defultSec = lvls[output];
  secSpan.innerHTML = defultSec;
  timeLeft.innerHTML = defultSec;

  lvlsSel.value = e.currentTarget.value;
  secSpan.innerHTML = defultSec;
  scoreTotal.innerHTML = wordsArry.length;
  timeLeft.innerHTML = defultSec;

  // // setting names

  // // Start game

  startBtn.onclick = function () {
    this.remove();
    input.focus();
    genWords();
  };

  function genWords() {
    let randomWord = wordsArry[Math.floor(Math.random() * wordsArry.length)];
    let index = wordsArry.indexOf(randomWord);
    wordsArry.splice(index, 1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = "";
    for (let i = 0; i < wordsArry.length; i++) {
      let div = document.createElement("div");
      let text = document.createTextNode(wordsArry[i]);
      div.appendChild(text);
      upcomingWords.appendChild(div);
    }
    StartPlay();
  }

  function StartPlay() {
    timeLeft.innerHTML = defultSec;
    let start = setInterval(() => {
      timeLeft.innerHTML--;
      if (timeLeft.innerHTML === "0") {
        clearInterval(start);
        if (wordsArry.length > 0) {
          if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
            input.value = "";
            scoreGot.innerHTML++;
            genWords();
          } else if (
            theWord.innerHTML.toLowerCase() !== input.value.toLowerCase()
          ) {
            input.value = "";
            genWords();
          }
        } else {
          let got = parseInt(scoreGot.innerHTML);
          if (got > 25 && got <= 30) {
            let goodSpan = document.createElement("span");
            goodSpan.className = "good";
            let goodSpanText = document.createTextNode(
              "You are great, congratulations!"
            );
            goodSpan.appendChild(goodSpanText);
            finish.appendChild(goodSpan);
          } else if (got > 15 && got <= 25) {
            let goodSpan = document.createElement("span");
            goodSpan.className = "good";
            let goodSpanText = document.createTextNode("You are good");
            goodSpan.appendChild(goodSpanText);
            finish.appendChild(goodSpan);
          } else if (got >= 7 && got <= 15) {
            let midSpan = document.createElement("span");
            midSpan.className = "mid";
            let midSpanText = document.createTextNode(
              "You are miducer, you should practice more"
            );
            midSpan.appendChild(midSpanText);
            finish.appendChild(midSpan);
          } else {
            let badSpan = document.createElement("span");
            badSpan.className = "bad";
            let badSpanText = document.createTextNode("You are loser");
            badSpan.appendChild(badSpanText);
            finish.appendChild(badSpan);
          }
        }
      }
    }, 1000);
  }
});
