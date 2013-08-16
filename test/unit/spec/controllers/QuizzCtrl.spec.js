angular.module('test-quizz', ['controllers-quizz']).
    constant('constantQuizz', {
        title: 'Constant Quizz',
        questions: []
    });

describe('Controller: QuizzCtrl', function() {
    var $scope;
    var $window;
    var exampleQuizz;

    beforeEach(module('test-quizz'));

    beforeEach(inject(function($rootScope, $controller, $injector) {
        $scope = $rootScope.$new();
        $window = {};
        $controller('QuizzCtrl', {
            $scope: $scope,
            $window: $window,
            $injector : $injector
        });
        exampleQuizz = {
            title: 'Example Quizz',
            description: 'This quizz will test your knowledge about AngularJS',
            questions: [
                {
                    type: 'radio',
                    text: 'AngularJS is a...',
                    answers: [
                        {
                            text: 'Java framework',
                            correct: false
                        },
                        {
                            text: 'JavaScript Framework',
                            correct: true
                        },
                        {
                            text: 'Ruby Framework',
                            correct: false
                        }
                    ]
                },
                {
                    type: 'free',
                    text: 'What is the name of the directive used to *loop* over elements?',
                    answers: ['ngRepeat', 'ng-repeat']
                },
                {
                    type: 'checkbox',
                    text: 'Which tools can help develop AngularJS applications?',
                    answers: [
                        {
                            text: 'Excel',
                            correct: false
                        },
                        {
                            text: 'Grunt',
                            correct: true
                        },
                        {
                            text: 'Karma',
                            correct: true
                        },
                        {
                            text: 'A hammer',
                            correct: false
                        }
                    ],
                    explanation: 'Here\'s what each tool is for:\n\n' +
                        '- Excel is a Microsoft spreadsheet;\n' +
                        '- Grunt is used to execute various tasks like minifying JS or CSS files;\n' +
                        '- Karma is a test runner that executes JavaScript tests in various browsers;\n' +
                        '- A hammer is used to knock on nails, or on anything else you could imagine.'
                }
            ]
        };
        $scope.init(exampleQuizz);
    }));

    it('should have default options after init', function() {
        expect($scope.quizz.options.showPrevious).toBe(true);
    });

    it('should not be started nor finished at beginning', function() {
        expect($scope.started).toBe(false);
        expect($scope.finished).toBe(false);
        expect($scope.currentQuestion).toBeFalsy();
    });

    it('should be started but not finished after start', function() {
        $scope.start();
        expect($scope.started).toBe(true);
        expect($scope.finished).toBe(false);
    });

    it('should not be started nor finished and have no current question after init', function() {
        $scope.start();
        $scope.init(exampleQuizz);
        expect($scope.started).toBe(false);
        expect($scope.finished).toBe(false);
        expect($scope.currentQuestion).toBeFalsy();
    });

    it('should have next question but no previous after start', function() {
        $scope.start();
        expect($scope.showPrevious()).toBe(false);
        expect($scope.showNext()).toBe(true);
        expect($scope.currentQuestion).toBe($scope.quizz.questions[0]);
        expect($scope.questionIndex()).toBe(0);
    });

    it('should have next question and previous after start and next', function() {
        $scope.start();
        $scope.next();
        expect($scope.showPrevious()).toBe(true);
        expect($scope.showNext()).toBe(true);
        expect($scope.currentQuestion).toBe($scope.quizz.questions[1]);
        expect($scope.questionIndex()).toBe(1);
    });

    it('should have previous but not show it after start and next when showPrevious option is false', function() {
        exampleQuizz.options = {
            showPrevious: false
        };
        $scope.init(exampleQuizz);
        $scope.start();
        $scope.next();
        expect($scope.showPrevious()).toBe(false);
        expect($scope.hasPrevious()).toBe(true);
    });

    it('should have no next question but previous at last question', function() {
        $scope.start();
        while ($scope.showNext()) {
            $scope.next();
        }
        expect($scope.showPrevious()).toBe(true);
        expect($scope.showNext()).toBe(false);
        expect($scope.currentQuestion).toBe($scope.quizz.questions[$scope.quizz.questions.length - 1]);
        expect($scope.questionIndex()).toBe($scope.quizz.questions.length - 1);
    });

    it('should have next question but no previous after start, next and previous', function() {
        $scope.start();
        $scope.next();
        $scope.previous();
        expect($scope.showPrevious()).toBe(false);
        expect($scope.showNext()).toBe(true);
        expect($scope.questionIndex()).toBe(0);
    });

    it('should be started and finished after start and finish', function() {
        $scope.start();
        $scope.finish();
        expect($scope.started).toBe(true);
        expect($scope.finished).toBe(true);
        expect($scope.currentQuestion).toBeFalsy();
    });

    it("should have score of 0 when no answer given", function() {
        expect($scope.getScore()).toBe(0);
    });

    it("should tell answer is correct when correct radio answer is selected", function() {
        var question = $scope.quizz.questions[0];
        question.selectedAnswer = question.answers[1];
        expect($scope.isAnswerCorrect(question)).toBe(true);
    });

    it("should tell answer is incorrect when incorrect radio answer is selected", function() {
        var question = $scope.quizz.questions[0];
        question.selectedAnswer = question.answers[0];
        expect($scope.isAnswerCorrect(question)).toBe(false);
    });

    it("should tell answer is correct when correct checkbox answers are selected", function() {
        var question = $scope.quizz.questions[2];
        question.answers[1].checked = true;
        question.answers[2].checked = true;
        expect($scope.isAnswerCorrect(question)).toBe(true);
    });

    it("should tell answer is incorrect when incorrect checkbox answer is selected", function() {
        var question = $scope.quizz.questions[2];
        question.answers[0].checked = true;
        question.answers[1].checked = true;
        expect($scope.isAnswerCorrect(question)).toBe(false);
    });

    it("should tell answer is incorrect when correct checkbox answer is not selected", function() {
        var question = $scope.quizz.questions[2];
        question.answers[1].checked = true;
        expect($scope.isAnswerCorrect(question)).toBe(false);
    });

    it("should tell answer is correct when correct free answer is typed", function() {
        var question = $scope.quizz.questions[1];
        question.typedAnswer = question.answers[0];
        expect($scope.isAnswerCorrect(question)).toBe(true);

        question.typedAnswer = '  ' + question.answers[1] + '  ';
        expect($scope.isAnswerCorrect(question)).toBe(true);
    });

    it("should tell answer is incorrect when incorrect free answer is typed", function() {
        var question = $scope.quizz.questions[1];
        question.typedAnswer = 'hello';
        expect($scope.isAnswerCorrect(question)).toBe(false);
    });

    it("should have score of 1 when one answer is correct given", function() {
        var question = $scope.quizz.questions[0];
        question.selectedAnswer = question.answers[1];
        expect($scope.getScore()).toBe(1);
    });

    it("should init with constant", function() {
        $scope.initWithConstant('constantQuizz');
        expect($scope.quizz.title).toBe('Constant Quizz');
    });
});