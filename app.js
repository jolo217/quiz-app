var state = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentQuestion: 0,
    questions: [{
      question: "What is the main character's name in the movie Lion King?",
      answers: [
        "Simba",
        "Aladdin",
        "Nemo",
        "Ariel"
      ],
      correctAnswer: 0,
    }, {
      question: "In Aladdin, what is the name of Jasmine's pet tiger?",
      answers: [
        "Abu",
        "Nalla",
        "Belle",
        "Rajah"
      ],
      correctAnswer: 3,
    }, {
      question: "During the battle with Aladdin, what type of animal does Jafar transform himself into?",
      answers: [
        "Lion",
        "Tiger",
        "Snake",
        "Dragon"
      ],
      correctAnswer: 2,
    }, {
      question: "In Toy Story, what game does the slinky play?",
      answers: [
        "Poker",
        "Chess",
        "Checkers",
        "Hopscotch"
      ],
      correctAnswer: 2,
    }, {
      question: "In Aladdin, who voiced the character Genie?",
      answers: [
        "Eddie Murphey",
        "Robin Williams",
        "Jackie Chan",
        "Michael Jackson"
      ],
      correctAnswer: 1,
    }],
};
// HTML Template
 
var questionTemplate = '<div><div class="js-current-question"></div>' +
    '<ul class="js-multiple-choice">' + '</ul>' + '<div><button id="js-answer-submit">Submit Answer</button></div>' +
    '<footer>' + '<div class="js-question-number"></div>' + '<div class="js-current-tally"></div>' + '</footer></div>'
 
var endingTemplate = '<div><div class="js-current-question"><p>Results:</p></div>' + '<div class="js-final-score"><p></p></div>' +
    '<div><button id="js-try-again">Try Again</button></div></div>';
 
// State Manipulation Functions
 
 function getCurrentQuestion(state) {
    var currentQuestionIndex = state.currentQuestion;
    return state.questions[currentQuestionIndex];
 }

 function incrementCorrectAnswers(state) {
    state.correctAnswers++;
 }

 function increaseIncorrectAnswers(state) {
    state.incorrectAnswers++;
 }

function incrementCurrentQuestion(state) {
    state.currentQuestion++;
}
// DOM

function renderQuestion(questionFromState, questionTemplate, state) {
    var template = $(questionTemplate);
    var answersHtml = questionFromState.answers.map(function(item, index){
        return '<li><input type="radio" name="answer" value="'+index+'">'+item+'</li>'; 
    }); 
    template.find('.js-current-question').text(questionFromState.question);
    template.find('.js-multiple-choice').html(answersHtml);
    template.find('.js-current-tally').text('Correct: ' +  state.correctAnswers + ' Incorrect: ' + state.incorrectAnswers);
    return template;
}

function renderCurrentQuestion(elementToRenderIn, state) {
    var currentQuestion = getCurrentQuestion(state);
    var renderHtml = renderQuestion(currentQuestion, questionTemplate, state);
    $(elementToRenderIn).html(renderHtml);
}

function renderResultScreen(elementToRenderIn, state) {
    $(elementToRenderIn).html('<h2>Your final score is </h2><p>Correct: ' +  state.correctAnswers + ' Incorrect: ' + state.incorrectAnswers + '</p><input type="button" id="start-again" value="Try Again">');
}

 // Event Listener

 $('#start-button').on('click', function(event) {
    renderCurrentQuestion('#content', state);
 });

$('#content').on('click', '#js-answer-submit', function(event) {
    $('#error').text("");
    var userInput = $('input[name="answer"]:checked').val();
    var correctAnswer = getCurrentQuestion(state).correctAnswer;
    if (userInput) {
        if (userInput == correctAnswer) {
            incrementCorrectAnswers(state);
        } else {
            increaseIncorrectAnswers(state);
        }
        if (state.currentQuestion < state.questions.length - 1) {
            incrementCurrentQuestion(state);
            renderCurrentQuestion('#content', state);
        } else {
            renderResultScreen('#content', state);
        }
    } else {
        $('#error').text("Choose an answer!");
    }
});

$('#content').on('click', '#start-again', function(event) {
    state.correctAnswers = 0;
    state.incorrectAnswers = 0;
    state.currentQuestion = 0;
    renderCurrentQuestion('#content', state);
});




