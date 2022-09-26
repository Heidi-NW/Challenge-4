const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const finishElement = document.querySelector('.over');
let initials = [];
let score = 0;

let shuffledQuestions, currentQuestionIndex, timerinterval;
let timer = 30;
let getInitial = JSON.parse(localStorage.getItem('initials'));
if (getInitial === null) localStorage.setItem('initials', JSON.stringify([]));
else initials = getInitial;

finishElement.classList.add('hide');
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  clearInterval(timerinterval);
  timerinterval = setInterval(() => {
    timer--;
    document.querySelector(".timer").innerText = timer;
    if (timer <= 1) {
      clearInterval(timerinterval);
      resetState();
      endGame();
      timer = 0;
    }
  }, 1000);

  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  finishElement.classList.add('hide');
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function endGame() {
  startButton.classList.remove('hide');
  questionContainerElement.classList.add('hide');
  document.querySelector(".timer").innerText = 60;
  questionElement.innerText = "";
  document.querySelector("#score").innerText = timer;
  timer = 30;
  finishElement.classList.remove('hide');
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct, true);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct, ifCheck) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
    score++;
  } else {
    if (ifCheck != undefined && ifCheck == true) timer -= 5;
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

document.querySelector('form').addEventListener("submit", () => {
  let name = document.querySelector('input').value;
  let finalScore = document.querySelector('#score').innerText;
  initials.push({name: name, score: finalScore});
  localStorage.setItem('initials', JSON.stringify(initials));
  startButton.classList.remove('hide');
  document.querySelector('.over').classList.add('hide');
})

const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: 'A - <javascript>', correct: false },
      { text: 'B - <script>', correct: true },
      { text: 'C - <js>', correct: false },
      { text: 'D - <scripting>', correct: false }
    ]
  },
  {
    question: 'Which of the following type of variable is visible only within a function where it is defined?',
    answers: [
      { text: 'A - global variable', correct: false },
      { text: 'B - local variable', correct: true },
      { text: 'C - Both of the above.', correct: false },
      { text: 'D - None of the above.', correct: false }
    ]
  },
  {
    question: 'Which built-in method sorts the elements of an array??',
    answers: [
      { text: 'A - sort()', correct: true },
      { text: 'B - changeOrder(order)', correct: false },
      { text: 'C - order()', correct: false },
      { text: 'D - None of the above.', correct: false }
    ]
  },
  {
    question: 'Which of the following function of String object extracts a section of a string and returns a new string?',
    answers: [
      { text: 'A - slice()', correct: true },
      { text: 'B - split()', correct: false },
      { text: 'C - replace()', correct: false },
      { text: 'D - search()', correct: false }
    ]
  },
  {
    question: 'Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?',
    answers: [
      { text: 'A - unshift()', correct: true },
      { text: 'B - sort()', correct: false },
      { text: 'C - splice()', correct: false },
      { text: 'D - toString()', correct: false }
    ]
  }
]