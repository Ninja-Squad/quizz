angular.module("quizz.controllers").controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.started = false;
    $scope.finished = false;

    $window.onbeforeunload = function() {
        if ($scope.started && !$scope.finished) {
            return "Beware: leaving the page will make you lose all your answers!";
        }
    };

    $scope.initWithWindowVariable = function(variable) {
        $scope.init($window[variable]);
    };

    $scope.init = function(quizz) {
        $scope.quizz = quizz;
    };

    $scope.start = function() {
        $scope.started = true;
        $scope.currentQuestion = $scope.quizz.questions[0];
    };

    function questionIndex() {
        return $scope.quizz.questions.indexOf($scope.currentQuestion);
    }

    function quizzLength() {
        return $scope.quizz.questions.length;
    }

    $scope.questionIndex = questionIndex;

    $scope.hasNext = function() {
        return questionIndex() < quizzLength() - 1;
    };

    $scope.hasPrevious = function() {
        return questionIndex() > 0;
    };

    $scope.next = function() {
        $scope.currentQuestion = $scope.quizz.questions[questionIndex() + 1];
    };

    $scope.previous = function() {
        $scope.currentQuestion = $scope.quizz.questions[questionIndex() - 1];
    };

    $scope.finish = function() {
        $scope.currentQuestion = null;
        $scope.finished = true;
    };

    function isAnswerCorrect(question) {
        if (question.type == 'radio') {
            return question.selectedAnswer && question.selectedAnswer.correct;
        }
        else if (question.type == 'checkbox') {
            return question.answers.every(function(answer) {
                return ((answer.correct && answer.checked) || (!answer.correct && !answer.checked));
            });
        }
        else if (question.type == 'free') {
            return question.typedAnswer && question.answers.indexOf(question.typedAnswer.trim()) >= 0;
        }
        else {
            return false;
        }
    }

    $scope.isAnswerCorrect = isAnswerCorrect;

    $scope.getScore = function() {
        return $scope.quizz.questions.filter(isAnswerCorrect).length;
    };

    $scope.isAnswerSelected = function(question, answer) {
        if (question.type == 'radio') {
            return question.selectedAnswer === answer;
        }
        else {
            return answer.checked;
        }
    };
}]);