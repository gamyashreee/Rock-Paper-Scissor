let userScore = 0;
let compScore = 0;
let roundCount = 0;

const username = localStorage.getItem("username") || "User";
const totalRounds = parseInt(localStorage.getItem("rounds")) || 3;

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");
const userLabel = document.querySelector("#user-label");
const playAgainBtn = document.querySelector("#play-again-btn");

userLabel.textContent = username;

const choices = document.querySelectorAll(".choice");

const genComputerChoice = () => {
  const options = ["rock", "paper", "scissor"];
  return options[Math.floor(Math.random() * 3)];
};

const endGame = () => {
  let resultMsg = "";
  if (userScore > compScore) {
    resultMsg = `${username} wins the game! 🎉`;
  } else if (compScore > userScore) {
    resultMsg = `Computer wins the game 😢`;
  } else {
    resultMsg = `It's a tie! 🤝`;
  }

  msg.textContent = resultMsg;
  playAgainBtn.style.display = "inline-block";
  choices.forEach(choice => (choice.style.pointerEvents = "none"));
};

const playRound = (userChoice) => {
  if (roundCount >= totalRounds) return;

  const compChoice = genComputerChoice();

  if (userChoice === compChoice) {
    msg.textContent = `It's a draw! Both chose ${userChoice}`;
  } else if (
    (userChoice === "rock" && compChoice === "scissor") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissor" && compChoice === "paper")
  ) {
    userScore++;
    msg.textContent = `${username} wins this round!`;
  } else {
    compScore++;
    msg.textContent = `Computer wins this round!`;
  }

  userScorePara.textContent = userScore;
  compScorePara.textContent = compScore;
  roundCount++;

  if (roundCount === totalRounds) {
    setTimeout(endGame, 500);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playRound(userChoice);
  });
});

playAgainBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("rounds");
  window.location.href = "index.html";
});
