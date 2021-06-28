// select all elements
const startBtnEl = document.getElementById('startBtn');
const startEl = document.getElementById('start');
const quizEl = document.getElementById('quiz');
const highscoreEl = document.getElementById('high');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answer1El = document.getElementById('answer1');
const answer2El = document.getElementById('answer2');
const answer3El = document.getElementById('answer3');
const answer4El = document.getElementById('answer4');
const resultEl = document.getElementById('result');
const hsEl = document.getElementById('HS');
const returnBtnEl = document.getElementById('returnBtn');
const endEl = document.getElementById('end');
const displayScoreEl = document.getElementById('displayScore');
const containerEl = document.getElementById('container');
const submitBtn = document.getElementById('submit');
const initialsEl = document.getElementById('initials');
const hslistE1 = document.getElementById('hslist');
const clearHSBtn = document.getElementById('clearHS');

// create the questions
const q1 = {question:'Commonly used data types DO NOT include:',
    a1:'strings',
    a2:'booleans',
    a3:'alerts',
    a4:'numbers',
    correct:3
};

const q2 = {question:'The "function" and " var" are known as:',
    a1:'Keywords',
    a2:'Data types',
    a3:'Declaration statements',
    a4:'Prototypes',
    correct:3
};

const q3 = {question:'Which type of language is JavaScript:',
    a1:'Object-Oriented',
    a2:'Object-Based',
    a3:'Assembly-language',
    a4:'High-level',
    correct:2
};

// create some variables
const questions = [q1, q2, q3];
const endQuestions = questions.length - 1;
var currentQuestion = 0;
var timeLeft;
var score = 0;
var gameLength = 30;
var highscores = [];


startBtnEl.addEventListener('click',startQuiz);

//Start Quiz function - display question when start button is pressed
function startQuiz() {
    currentQuestion = 0;
    startEl.style.display = 'none';
    displayQuestion();
    quizEl.style.display = 'block';
    countdown(gameLength);
}

/*Check Answer function - Confirms if answer is correct and
displays result for 2 seconds */
function checkAnswer(answer){
    if (questions[currentQuestion].correct === answer) {
        resultEl.textContent = 'Correct!';
        
    } else {
        resultEl.textContent = 'Wrong!';
        timeLeft = timeLeft -10;
    }
    // display correct fo 2 seconds then delete
    setTimeout(function(){
        resultEl.textContent = '';
    }, 2000);
    if (currentQuestion < endQuestions) {
        currentQuestion++;
        displayQuestion();
    } else {
        score = timeLeft;
        countdown(0); //Setting the time to 0 ends the game

    }
}
//Display the questions to the screen
function displayQuestion() {
    questionEl.textContent = questions[currentQuestion].question;
    
    answer1El.textContent = questions[currentQuestion].a1;
    answer2El.textContent = questions[currentQuestion].a2;
    answer3El.textContent = questions[currentQuestion].a3;
    answer4El.textContent = questions[currentQuestion].a4;
}

//Displays the highscores
function displayHS() {
    startEl.style.display = 'none';
    quizEl.style.display = 'none';
    endEl.style.display = 'none';
    hsEl.style.display = 'block';
    
    for (var i = 0; i < highscores.length; i++) {
        var hs = highscores[i];

        var li = document.createElement('li');
        li.textContent = hs;

        hslistE1.appendChild(li);
    }
}

//Dispalys initial screen - triggered by Return to Quiz button
function returnToStart (){
    containerEl.style.display = 'block';
    startEl.style.display= 'block';
    quizEl.style.display = 'none';
    hsEl.style.display = 'none';
    endEl.style.display = 'none';
}

returnBtnEl.addEventListener('click', returnToStart);

//sets the timer
function countdown(time) {
    timeLeft = time;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 0) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'Time: ' + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = 'Time: 0';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        endGame();
        
      }
    }, 1000);
  }

//displays final score when quiz complete
function endGame() {
    containerEl.style.display = 'none';
    quizEl.style.display = 'none';
    hsEl.style.display = 'none';
    endEl.style.display = 'block';

    displayScoreEl.textContent ='Your final score is ' + score;
  }
//stores score in loca storage when buton clicked
submitBtn.addEventListener('click', function(event) {
      event.preventDefault();

      var storedHighscores = [];
      var initials = initialsEl.value + '-' + score;
      storedHighscores = JSON.parse(localStorage.getItem('highscores'));

      if (storedHighscores !== null) {
          highscores = storedHighscores;
      }

      console.log(initials);
      highscores.push(initials);
      localStorage.setItem('highscores', JSON.stringify(highscores));
      displayHS();
      initialsEl.value = '';
});
  
//clears high scores when button clicked
clearHSBtn.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('highscores')
    highscores = [];
    for (var i = 0; i < hslistE1.childElementCount; i++) {
        hslistE1.removeChild(hslistE1.childNodes[i]);
    }
    displayHS();
});