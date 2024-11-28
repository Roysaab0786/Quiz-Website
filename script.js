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
let timeLeft = 15;
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
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    showScoreBoard(); // Show the score if it was the last question
  }
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

  // Start the timer for the new question
  startTimer(); // Restart timer for the new question

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
  
  // Stop the timer when an answer is selected
  clearInterval(timer);
  
  // Disable all answer buttons to allow only one selection
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
  });
  
  // Make the selected button appear darker when selected
  selectedButton.style.opacity = '0.5'; // Change opacity to give a darker appearance

  if (correct) score++;

  // Show the next button after an answer is selected
  nextButton.classList.remove('hide');
}


function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft} seconds`;
    
    // Check if time is up
    if (timeLeft <= 0) {
      clearInterval(timer);
      // Automatically show the scoreboard if no more questions
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
  scoreBoard.innerText = `Your Score is : ${score} / ${questions.length}`; // Display score
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
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    answers: [
      { text: 'William Shakespeare', correct: true },
      { text: 'Charles Dickens', correct: false },
      { text: 'George Orwell', correct: false },
      { text: 'Leo Tolstoy', correct: false }
    ]
  },
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false },
      { text: 'Rome', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Venus', correct: false }
    ]
  },
  {
    question: 'What is the largest mammal in the world?',
    answers: [
      { text: 'Elephant', correct: false },
      { text: 'Blue Whale', correct: true },
      { text: 'Giraffe', correct: false },
      { text: 'Shark', correct: false }
    ]
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Claude Monet', correct: false }
    ]
  },
  {
    question: 'Which gas do plants absorb during photosynthesis?',
    answers: [
      { text: 'Oxygen', correct: false },
      { text: 'Carbon Dioxide', correct: true },
      { text: 'Nitrogen', correct: false },
      { text: 'Hydrogen', correct: false }
    ]
  },
  {
    question: 'Who was the first man to walk on the moon?',
    answers: [
      { text: 'Buzz Aldrin', correct: false },
      { text: 'Neil Armstrong', correct: true },
      { text: 'Yuri Gagarin', correct: false },
      { text: 'Alan Shepard', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for water?',
    answers: [
      { text: 'H2O', correct: true },
      { text: 'O2', correct: false },
      { text: 'CO2', correct: false },
      { text: 'NaCl', correct: false }
    ]
  },
  {
    question: 'Which is the tallest mountain in the world?',
    answers: [
      { text: 'Mount Kilimanjaro', correct: false },
      { text: 'Mount Everest', correct: true },
      { text: 'K2', correct: false },
      { text: 'Mount Elbrus', correct: false }
    ]
  },
  {
    question: 'What is the currency of Japan?',
    answers: [
      { text: 'Yuan', correct: false },
      { text: 'Yen', correct: true },
      { text: 'Won', correct: false },
      { text: 'Ringgit', correct: false }
    ]
  },
  {
    question: 'What is the smallest prime number?',
    answers: [
      { text: '1', correct: false },
      { text: '2', correct: true },
      { text: '3', correct: false },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'Who discovered penicillin?',
    answers: [
      { text: 'Marie Curie', correct: false },
      { text: 'Alexander Fleming', correct: true },
      { text: 'Isaac Newton', correct: false },
      { text: 'Albert Einstein', correct: false }
    ]
  },
  {
    question: 'Which is the longest river in the world?',
    answers: [
      { text: 'Amazon River', correct: false },
      { text: 'Nile River', correct: true },
      { text: 'Yangtze River', correct: false },
      { text: 'Mississippi River', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false }
    ]
  },
  {
    question: 'In which year did World War II end?',
    answers: [
      { text: '1918', correct: false },
      { text: '1939', correct: false },
      { text: '1945', correct: true },
      { text: '1950', correct: false }
    ]
  },
  {
    question: 'What is the boiling point of water at sea level?',
    answers: [
      { text: '90°C', correct: false },
      { text: '100°C', correct: true },
      { text: '110°C', correct: false },
      { text: '120°C', correct: false }
    ]
  },
  {
    question: 'Which element has the atomic number 1?',
    answers: [
      { text: 'Oxygen', correct: false },
      { text: 'Hydrogen', correct: true },
      { text: 'Helium', correct: false },
      { text: 'Carbon', correct: false }
    ]
  },
  {
    question: 'What is the largest desert in the world?',
    answers: [
      { text: 'Sahara Desert', correct: false },
      { text: 'Antarctic Desert', correct: true },
      { text: 'Gobi Desert', correct: false },
      { text: 'Kalahari Desert', correct: false }
    ]
  },
  {
    question: 'Which country gifted the Statue of Liberty to the USA?',
    answers: [
      { text: 'United Kingdom', correct: false },
      { text: 'France', correct: true },
      { text: 'Germany', correct: false },
      { text: 'Italy', correct: false }
    ]
  },
  {
    question: 'Who is known as the "Father of Computers"?',
    answers: [
      { text: 'Alan Turing', correct: false },
      { text: 'Charles Babbage', correct: true },
      { text: 'John von Neumann', correct: false },
      { text: 'Ada Lovelace', correct: false }
    ]
  },
  {
    question: 'Who was the first Prime Minister of India?',
    answers: [
      { text: 'Mahatma Gandhi', correct: false },
      { text: 'Jawaharlal Nehru', correct: true },
      { text: 'Sardar Patel', correct: false },
      { text: 'Subhas Chandra Bose', correct: false }
    ]
  },
  {
    question: 'What is the capital of India?',
    answers: [
      { text: 'Mumbai', correct: false },
      { text: 'New Delhi', correct: true },
      { text: 'Kolkata', correct: false },
      { text: 'Bangalore', correct: false }
    ]
  },
  {
    question: 'Which Indian city is known as the "Pink City"?',
    answers: [
      { text: 'Jaipur', correct: true },
      { text: 'Udaipur', correct: false },
      { text: 'Jodhpur', correct: false },
      { text: 'Agra', correct: false }
    ]
  },
  {
    question: 'Who is known as the "Father of the Nation" in India?',
    answers: [
      { text: 'Bhagat Singh', correct: false },
      { text: 'Mahatma Gandhi', correct: true },
      { text: 'Rajendra Prasad', correct: false },
      { text: 'Jawaharlal Nehru', correct: false }
    ]
  },
  {
    question: 'What is the national animal of India?',
    answers: [
      { text: 'Lion', correct: false },
      { text: 'Tiger', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Peacock', correct: false }
    ]
  },
  {
    question: 'What is the national flower of India?',
    answers: [
      { text: 'Rose', correct: false },
      { text: 'Lotus', correct: true },
      { text: 'Marigold', correct: false },
      { text: 'Sunflower', correct: false }
    ]
  },
  {
    question: 'In which year did India gain independence?',
    answers: [
      { text: '1945', correct: false },
      { text: '1947', correct: true },
      { text: '1950', correct: false },
      { text: '1935', correct: false }
    ]
  },
  {
    question: 'What is the official language of India?',
    answers: [
      { text: 'Hindi', correct: true },
      { text: 'English', correct: false },
      { text: 'Bengali', correct: false },
      { text: 'Tamil', correct: false }
    ]
  },
  {
    question: 'Who was the first President of India?',
    answers: [
      { text: 'Jawaharlal Nehru', correct: false },
      { text: 'Rajendra Prasad', correct: true },
      { text: 'Sarvepalli Radhakrishnan', correct: false },
      { text: 'Zakir Hussain', correct: false }
    ]
  },
  {
    question: 'Which river is known as the "Ganga of the South"?',
    answers: [
      { text: 'Godavari', correct: false },
      { text: 'Cauvery', correct: true },
      { text: 'Krishna', correct: false },
      { text: 'Tungabhadra', correct: false }
    ]
  },
  {
    question: 'Who is the author of the Indian national anthem?',
    answers: [
      { text: 'Bankim Chandra Chatterjee', correct: false },
      { text: 'Rabindranath Tagore', correct: true },
      { text: 'Sarojini Naidu', correct: false },
      { text: 'Subhas Chandra Bose', correct: false }
    ]
  },
  {
    question: 'What is the national sport of India?',
    answers: [
      { text: 'Hockey', correct: true },
      { text: 'Cricket', correct: false },
      { text: 'Football', correct: false },
      { text: 'Kabaddi', correct: false }
    ]
  },
  {
    question: 'Which state is known as the "Land of Five Rivers"?',
    answers: [
      { text: 'Punjab', correct: true },
      { text: 'Haryana', correct: false },
      { text: 'Rajasthan', correct: false },
      { text: 'Uttar Pradesh', correct: false }
    ]
  },
  {
    question: 'Which is the largest state in India by area?',
    answers: [
      { text: 'Madhya Pradesh', correct: false },
      { text: 'Rajasthan', correct: true },
      { text: 'Uttar Pradesh', correct: false },
      { text: 'Maharashtra', correct: false }
    ]
  },
  {
    question: 'Which Indian monument is known as the "Symbol of Love"?',
    answers: [
      { text: 'Qutub Minar', correct: false },
      { text: 'Taj Mahal', correct: true },
      { text: 'Red Fort', correct: false },
      { text: 'India Gate', correct: false }
    ]
  },
  {
    question: 'Which is the smallest state in India by area?',
    answers: [
      { text: 'Sikkim', correct: false },
      { text: 'Goa', correct: true },
      { text: 'Tripura', correct: false },
      { text: 'Manipur', correct: false }
    ]
  },
  {
    question: 'Who is known as the "Iron Man of India"?',
    answers: [
      { text: 'Bhagat Singh', correct: false },
      { text: 'Sardar Vallabhbhai Patel', correct: true },
      { text: 'Subhas Chandra Bose', correct: false },
      { text: 'Mahatma Gandhi', correct: false }
    ]
  },
  {
    question: 'Which Indian festival is known as the "Festival of Lights"?',
    answers: [
      { text: 'Holi', correct: false },
      { text: 'Diwali', correct: true },
      { text: 'Dussehra', correct: false },
      { text: 'Pongal', correct: false }
    ]
  },
  {
    question: 'Which Indian state is known as "God’s Own Country"?',
    answers: [
      { text: 'Tamil Nadu', correct: false },
      { text: 'Kerala', correct: true },
      { text: 'Karnataka', correct: false },
      { text: 'Andhra Pradesh', correct: false }
    ]
  },
  {
    question: 'In which year was the Indian Constitution adopted?',
    answers: [
      { text: '1947', correct: false },
      { text: '1950', correct: true },
      { text: '1952', correct: false },
      { text: '1949', correct: false }
    ]
  }
]
