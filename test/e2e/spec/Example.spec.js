describe('Example page', function() {
    beforeEach(function() {
        browser().navigateTo('/example.html');
    });

    describe('Intro', function() {
        it('should only display intro initially', function() {
            expect(element('.quizz-intro:visible').count()).toBe(1);
            expect(element('.quizz-question:visible').count()).toBe(0);
            expect(element('.quizz-result:visible').count()).toBe(0);
        });
    });

    describe('Question', function() {
        beforeEach(function() {
            element('.quizz-start-button').click();
        });

        it('should display first question when clicking start', function() {
            expect(element('.quizz-question h1').text()).toContain("1 / 3");

            expect(element('.quizz-intro:visible').count()).toBe(0);
            expect(element('.quizz-question:visible').count()).toBe(1);
            expect(element('.quizz-result:visible').count()).toBe(0);

            expect(element('.quizz-previous-button:visible').count()).toBe(0);
            expect(element('.quizz-next-button:visible').count()).toBe(1);
            expect(element('.quizz-finish-button:visible').count()).toBe(0);

            expect(element('input[type=radio]:visible').count()).toBe(3);
            expect(element('input[type=radio]:visible:checked').count()).toBe(0);
        });

        it('should go to the next question when clicking next', function() {
            element('.quizz-next-button').click();

            expect(element('.quizz-question h1').text()).toContain("2 / 3");

            expect(element('.quizz-previous-button:visible').count()).toBe(1);
            expect(element('.quizz-next-button:visible').count()).toBe(1);
            expect(element('.quizz-finish-button:visible').count()).toBe(0);
        });

        it('should go to the previous question when clicking previous and remember checked radio between questions', function() {
            element('input[type=radio]:visible:eq(0)').click();

            element('.quizz-next-button').click();
            element('.quizz-previous-button').click();

            expect(element('.quizz-question h1').text()).toContain("1 / 3");

            expect(element('input[type=radio]:visible:checked').count()).toBe(1);
            expect(element('input[type=radio]:visible:eq(0):checked').count()).toBe(1);
        });

        it('should display last question correctly', function() {
            element('.quizz-next-button').click();
            element('.quizz-next-button').click();

            expect(element('.quizz-question h1').text()).toContain("3 / 3");

            expect(element('.quizz-previous-button:visible').count()).toBe(1);
            expect(element('.quizz-next-button:visible').count()).toBe(0);
            expect(element('.quizz-finish-button:visible').count()).toBe(1);
        });

        it('should display checkboxes correctly', function() {
            element('.quizz-next-button').click();
            element('.quizz-next-button').click();

            expect(element('input[type=checkbox]:visible').count()).toBe(4);
            expect(element('input[type=checkbox]:visible:checked').count()).toBe(0);
        });

        it('should remember checked checkboxes between questions', function() {
            element('.quizz-next-button').click();
            element('.quizz-next-button').click();

            element('input[type=checkbox]:visible:eq(1)').click();
            element('input[type=checkbox]:visible:eq(2)').click();

            element('.quizz-previous-button').click();
            element('.quizz-next-button').click();

            expect(element('.quizz-question h1').text()).toContain("3 / 3");

            expect(element('input[type=checkbox]:visible:checked').count()).toBe(2);
            expect(element('input[type=checkbox]:visible:eq(1):checked').count()).toBe(1);
            expect(element('input[type=checkbox]:visible:eq(2):checked').count()).toBe(1);
        });
    });

    describe('Result', function() {
        beforeEach(function() {
            element('.quizz-start-button').click();

            element('input:visible:eq(0)').click();
            element('.quizz-next-button').click();
            input('currentQuestion.typedAnswer').enter('ngRepeat');
            element('.quizz-next-button').click();
            element('input:visible:eq(0)').click();
            element('.quizz-finish-button').click();
        });

        it("should display the correct score", function() {
            expect(element('.quizz-result h1').text()).toContain('Your score: 33 % (1 / 3)');
        });

        it("should display answers in first column", function() {
            expect(element('.quizz-result-question:eq(0) tbody tr:eq(0) td:eq(0) i.icon-remove:visible').count()).toBe(1);
            expect(element('.quizz-result-question:eq(2) tbody tr:eq(0) td:eq(0) i.icon-remove:visible').count()).toBe(1);
        });

        it("should display correct answers in second column", function() {
            expect(element('.quizz-result-question:eq(0) tbody tr:eq(1) td:eq(1) i.icon-ok:visible').count()).toBe(1);
            expect(element('.quizz-result-question:eq(2) tbody tr:eq(1) td:eq(1) i.icon-ok:visible').count()).toBe(1);
            expect(element('.quizz-result-question:eq(2) tbody tr:eq(2) td:eq(1) i.icon-ok:visible').count()).toBe(1);
        });

        it("should display free typed answer", function() {
            expect(element('.quizz-result-question:eq(1) .quizz-free-yours:visible').text()).toContain("ngRepeat");
            expect(element('.quizz-result-question:eq(1) .quizz-free-yours i.icon-ok:visible').count()).toBe(1);
            expect(element('.quizz-result-question:eq(1) .quizz-free-yours i.icon-remove:visible').count()).toBe(0);

            expect(element('.quizz-result-question:eq(1) .quizz-free-correct:visible').text()).toContain("ngRepeat ng-repeat");
        });

        it("should display the answer explanation when available", function() {
            expect(element('.quizz-result-question:eq(0) .quizz-explanation:visible').count()).toBe(0);
            expect(element('.quizz-result-question:eq(2) .quizz-explanation:visible').count()).toBe(1);
        });

        it("should display all questions by default", function() {
            expect(element('.quizz-result .nav li.active').text()).toContain('All');
            expect(element('.quizz-result-question:visible').count()).toBe(3);
        });

        it("should display errors only when clicking Errors only pill", function() {
            element('.quizz-result .nav li a:eq(1)').click();
            expect(element('.quizz-result .nav li.active').text()).toContain('Errors only');
            expect(element('.quizz-result-question:visible').count()).toBe(2);
        });
    });

});