angular.module("quizz").controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.started = false;
    $scope.finished = false;

    $scope.initWithWindowVariable = function(variable) {
        $scope.quizz = $window[variable];
    };

    $scope.init = function(quizz) {
        $scope.quizz = quizz;
    };

    $scope.start = function() {
        $scope.started = true;
        $scope.currentQuestion = $scope.quizz.questions[0];
    };

    $scope.questionIndex = function() {
        return $scope.quizz.questions.indexOf($scope.currentQuestion);
    };

    $scope.hasNext = function() {
        return $scope.quizz.questions.indexOf($scope.currentQuestion) < $scope.quizz.questions.length - 1;
    };

    $scope.hasPrevious = function() {
        return $scope.quizz.questions.indexOf($scope.currentQuestion) > 0;
    };

    $scope.next = function() {
        $scope.currentQuestion = $scope.quizz.questions[$scope.quizz.questions.indexOf($scope.currentQuestion) + 1];
    };

    $scope.previous = function() {
        $scope.currentQuestion = $scope.quizz.questions[$scope.quizz.questions.indexOf($scope.currentQuestion) - 1];
    };

    $scope.finish = function() {
        $scope.currentQuestion = null;
        $scope.finished = true;
    };

    $scope.isAnswerCorrect = function(question) {
        if (question.type == 'radio') {
            return question.selectedAnswer && question.selectedAnswer.correct;
        }
        else {
            var ok = true;
            for (var i = 0; i < question.answers.length && ok; i++) {
                var answer = question.answers[i];
                if (answer.correct && !answer.checked ||
                    !answer.correct && answer.checked) {
                    ok = false;
                }
            }
            return ok;
        }
    };

    $scope.getScore = function() {
        return $scope.quizz.questions.filter($scope.isAnswerCorrect).length;
    };

    $scope.isAnswerSelected = function(question, answer) {
        if (question.type == 'radio') {
            return question.selectedAnswer === answer;
        }
        else {
            return answer.checked;
        }
    };

    $window.onbeforeunload = function () {
        if ($scope.started && !$scope.finished) {
            return "Beware: leaving the page will make you lose all your answers!";
        }
    };
}]);