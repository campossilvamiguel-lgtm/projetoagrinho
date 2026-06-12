const questions = [
  {
    question: "Qual prática ajuda a conservar o solo no agro?",
    options: ["Monocultura contínua", "Rotação de culturas", "Queimada da área"],
    answer: 1
  },
  {
    question: "O que reduz o desperdício de água na produção agrícola?",
    options: ["Irrigação por gotejamento", "Lavar o solo com excesso de água", "Usar água sem controle"],
    answer: 0
  },
  {
    question: "Qual ação é mais sustentável?",
    options: ["Desmatar para ampliar área", "Usar energia solar na fazenda", "Descartar embalagens no campo"],
    answer: 1
  },
  {
    question: "Como proteger a biodiversidade no agro?",
    options: ["Eliminar todas as áreas verdes", "Preservar matas ciliares", "Usar só um tipo de planta"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let life = 100;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const nextBtn = document.getElementById("nextBtn");
const lifeFill = document.getElementById("lifeFill");
const lifeValue = document.getElementById("lifeValue");

function updateLifeBar() {
  lifeFill.style.width = life + "%";
  lifeValue.textContent = life + "%";
  
  if (life > 60) {
    lifeFill.style.background = "linear-gradient(90deg, #1db954, #7CFC00)";
  } else if (life > 30) {
    lifeFill.style.background = "linear-gradient(90deg, #f7b731, #ffe066)";
  } else {
    lifeFill.style.background = "linear-gradient(90deg, #ff5c5c, #ff8a80)";
  }
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  levelEl.textContent = currentQuestion + 1;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => selectAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selected, button) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === q.answer) {
    score += 10;
    life = Math.min(100, life + 5);
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correto! Você escolheu uma prática sustentável.";
    button.classList.add("correct");
  } else {
    life = Math.max(0, life - 15);
    feedbackEl.textContent = "Ops! Essa opção não é a mais sustentável.";
    button.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }

  updateLifeBar();
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Fim do jogo! Seu resultado final foi " + score + " pontos.";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "Parabéns por aprender sobre agro sustentável!";
    nextBtn.disabled = true;
  }
}

updateLifeBar();
loadQuestion();