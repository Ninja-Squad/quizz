describe('Home page', function() {
    beforeEach(function() {
        browser().navigateTo('/');
    });

    describe('Intro', function() {
        it('should only display intro initially', function() {
            expect(element('#intro:visible').count()).toBe(1);
            expect(element('#question:visible').count()).toBe(0);
            expect(element('#result:visible').count()).toBe(0);
        });
    });

    describe('Question', function() {
        beforeEach(function() {
            element('#start_button').click();
        });

        it('should display first question when clicking start', function() {
            expect(element('#question h1').text()).toContain("1 / 3");

            expect(element('#intro:visible').count()).toBe(0);
            expect(element('#question:visible').count()).toBe(1);
            expect(element('#result:visible').count()).toBe(0);

            expect(element('#previous_button:visible').count()).toBe(0);
            expect(element('#next_button:visible').count()).toBe(1);
            expect(element('#finish_button:visible').count()).toBe(0);

            expect(element('input[type=radio]:visible').count()).toBe(3);
            expect(element('input[type=radio]:visible:checked').count()).toBe(0);
        });

        it('should go to the next question when clicking next', function() {
            element('#next_button').click();

            expect(element('#question h1').text()).toContain("2 / 3");

            expect(element('#previous_button:visible').count()).toBe(1);
            expect(element('#next_button:visible').count()).toBe(1);
            expect(element('#finish_button:visible').count()).toBe(0);
        });

        it('should go to the previous question when clicking previous and remember checked radio between questions', function() {
            element('input[type=radio]:visible:eq(0)').click();

            element('#next_button').click();
            element('#previous_button').click();

            expect(element('#question h1').text()).toContain("1 / 3");

            expect(element('input[type=radio]:visible:checked').count()).toBe(1);
            expect(element('input[type=radio]:visible:eq(0):checked').count()).toBe(1);
        });

        it('should display last question correctly', function() {
            element('#next_button').click();
            element('#next_button').click();

            expect(element('#question h1').text()).toContain("3 / 3");

            expect(element('#previous_button:visible').count()).toBe(1);
            expect(element('#next_button:visible').count()).toBe(0);
            expect(element('#finish_button:visible').count()).toBe(1);
        });

        it('should display checkboxes correctly', function() {
            element('#next_button').click();
            element('#next_button').click();

            expect(element('input[type=checkbox]:visible').count()).toBe(4);
            expect(element('input[type=checkbox]:visible:checked').count()).toBe(0);
        });

        it('should remember checked checkboxes between questions', function() {
            element('#next_button').click();
            element('#next_button').click();

            element('input[type=checkbox]:visible:eq(1)').click();
            element('input[type=checkbox]:visible:eq(2)').click();

            element('#previous_button').click();
            element('#next_button').click();

            expect(element('#question h1').text()).toContain("3 / 3");

            expect(element('input[type=checkbox]:visible:checked').count()).toBe(2);
            expect(element('input[type=checkbox]:visible:eq(1):checked').count()).toBe(1);
            expect(element('input[type=checkbox]:visible:eq(2):checked').count()).toBe(1);
        });
    });

    describe('Result', function() {
        beforeEach(function() {
            element('#start_button').click();

            element('input:visible:eq(0)').click();
            element('#next_button').click();
            element('input:visible:eq(0)').click();
            element('#next_button').click();
            element('input:visible:eq(0)').click();
            element('#finish_button').click();
        });

        it("should display the correct score", function() {
            expect(element('#result h1').text()).toContain('Your score: 33 % (1 / 3)');
        });

        it("should display answers in first column", function() {
            expect(element('#result table:eq(0) tbody tr:eq(0) td:eq(0) i.icon-remove:visible').count()).toBe(1);
            expect(element('#result table:eq(1) tbody tr:eq(0) td:eq(0) i.icon-ok:visible').count()).toBe(1);
            expect(element('#result table:eq(2) tbody tr:eq(0) td:eq(0) i.icon-remove:visible').count()).toBe(1);
        });

        it("should display correct answers in second column", function() {
            expect(element('#result table:eq(0) tbody tr:eq(1) td:eq(1) i.icon-ok:visible').count()).toBe(1);
            expect(element('#result table:eq(1) tbody tr:eq(0) td:eq(1) i.icon-ok:visible').count()).toBe(1);
            expect(element('#result table:eq(2) tbody tr:eq(1) td:eq(1) i.icon-ok:visible').count()).toBe(1);
            expect(element('#result table:eq(2) tbody tr:eq(2) td:eq(1) i.icon-ok:visible').count()).toBe(1);
        });
    });

});