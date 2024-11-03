const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timerElement');
const scoreBoard = document.getElementById('scoreBoard');
const restartButton = document.getElementById('restart-btn');
const greetingElement = document.getElementById('greeting'); // Reference to the greeting message

let shuffledQuestions, currentQuestionIndex;
let timer;
let timeLeft = 10;
let score = 0;

window.addEventListener('load', () => {
  const userName = localStorage.getItem('userName');
  greetingElement.innerText = `Welcome, ${userName}! Good luck!`;

  startGame();
});

restartButton.addEventListener('click', () => {
  location.reload(); // Refreshes the page to restart the game
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0; // Reset score
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();

  // Hide the greeting message after the first question
  if (currentQuestionIndex === 0) {
    greetingElement.style.display = 'block';
  } else {
    greetingElement.style.display = 'none';
  }
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
  });
}

function resetState() {
  clearInterval(timer); // Stop the timer
  nextButton.classList.add('hide');
  timeLeft = 15; // Reset timer for each question
  timerElement.innerText = `Time Left: ${timeLeft} seconds`;

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) score++;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showScoreBoard();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
      } else {
        showScoreBoard();
      }
    }
  }, 1000);
}

function showScoreBoard() {
  questionContainerElement.classList.add('hide');
  timerElement.classList.add('hide');
  nextButton.classList.add('hide');
  scoreBoard.innerText = `Your Score: ${score} / ${questions.length}`;
  scoreBoard.classList.remove('hide');
  restartButton.classList.remove('hide');
}
const questions = [
  {
    question: 'Who invented electricity?',
    answers: [
      { text: 'Elec Branford', correct: false },
      { text: 'Benjamin Franklin', correct: true },
      { text: 'Thomas Edison', correct: false },
      { text: 'Nicolas Charles', correct: false }
      
    ]
  },
  {
    question: 'Who discovered the X-rays first?',
    answers: [
      { text: 'Isaac Newton', correct: false },
      { text: 'Wilhelm Roentgen', correct: true },
      { text: 'Elbert Einstein', correct: false },
      { text: 'Nicoloas Tesla', correct: false }
    ]
  },
  {
    question: 'Which animal is known as the "Ship of the Desert"?',
    answers: [
      { text: 'Horse', correct: false },
      { text: 'Camel', correct: true },
      { text: 'Kangaroo', correct: false },
      { text: 'Elephant', correct: false }
    ]
  },
  {
    question: 'Rainbow consist of how many colours?',
    answers: [
      { text: '6', correct: false },
      { text: '3', correct: false },
      { text: '7', correct: true },
      { text: '9', correct: false }
    ]
  },
  {
    question: 'Who designed the National Flag of India?',
    answers: [
      { text: 'Rabindra Nath Tagore', correct: false },
      { text: 'Pandit Jawarlal Nehru', correct:false  },
      { text: 'Pingali Venkayya', correct: true },
      { text: 'Dr. B.R. Ambedkar', correct: false }
    ]
  },
  {
    question: 'What is the National game of India?',
    answers: [
      { text: 'Hockey', correct: false },
      { text: 'Cricket', correct: false },
      { text: 'Javellin Throw', correct: false },
      { text: 'None of the Above', correct: true }
    ]
  },
  {
    question: 'Name the National Reptile of India?',
    answers: [
      { text: 'Boa', correct: false },
      { text: 'Python', correct: false },
      { text: 'Cobra', correct: true },
      { text: 'Rattle Snake', correct: false }
    ]
  },
  {
    question: 'What is the smallest country in the world by land area?',
    answers: [
      { text: 'Ludhiana', correct: false },
      { text: 'Vetican', correct: true },
      { text: 'Yaroslavl', correct: false },
      { text: 'Texcoco', correct: false }
    ]
  },
  {
    question: 'Name the biggest continent in the world?',
    answers: [
      { text: 'North America', correct: false },
      { text: 'Asia', correct: true },
      { text: 'Russia', correct: false },
      { text: 'Africa', correct: false }
    ]
  },
  {
    question: 'Name the largest mammal?',
    answers: [
      { text: 'Hippopotamus', correct:false  },
      { text: 'Whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Tyrannosaurus Rex', correct: false }
    ]
  },
  {
    question: 'Name the place known as the Roof of the World?',
    answers: [
      { text: 'Russia', correct: false },
      { text: 'New-York', correct: false },
      { text: 'Tibet', correct: true },
      { text: 'India', correct: false }
    ]
  },
  {
    question: 'How many years are there in one Millenium?',
    answers: [
      { text: '100', correct: false },
      { text: '1000', correct: true },
      { text: '10000', correct: false },
      { text: '100000', correct: false }
    ]
  },
  {
    question: 'Name the smallest continent?',
    answers: [
      { text: 'Europe', correct: false },
      { text: 'North America', correct: false },
      { text: 'Asia', correct: false },
      { text: 'Australia', correct: true }
    ]
  },
  {
    question: 'Which is the National Aquatic Animal of India?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'River Doliphin', correct: true },
      { text: 'Penguin', correct: false },
      { text: 'Whale', correct: false }
    ]
  },
  {
    question: 'How many consonants are there in the English alphabet?',
    answers: [
      { text: '16', correct: false },
      { text: '5', correct: false },
      { text: '18', correct: false },
      { text: '21', correct: true }
    ]
  },
  {
    question: ' In which year did the Titanic sink?',
    answers: [
      { text: '1722', correct: false },
      { text: '1885', correct: false },
      { text: '1872', correct: false },
      { text: '1912', correct: true }
    ]
  }
]