var quizz = {
    title: 'Example Quizz',
    description: 'This quizz will test your knowledge about AngularJS',
    questions: [
        {
            type: 'radio',
            text: '**AngularJS** is a...',
            answers: [
                {
                    text: '**Java** framework',
                    correct: false
                },
                {
                    text: '**JavaScript** Framework',
                    correct: true
                },
                {
                    text: '**Ruby** Framework',
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
            text: 'Which tools can help develop [AngularJS](http://angularjs.org) applications?',
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
angular.module("example-quizz", ['quizz', 'btford.markdown', 'ngAnimate', 'mgo-mousetrap']);
angular.module("example-quizz").constant('quizz', quizz);

var quizzWithoutPreviousButton = angular.extend({}, quizz);
quizzWithoutPreviousButton.options = {
    showPrevious: false
};
angular.module("example-quizz").constant('quizzWithoutPreviousButton', quizzWithoutPreviousButton);
