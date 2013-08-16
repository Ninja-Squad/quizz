describe('Example page', function() {
    beforeEach(function() {
        browser().navigateTo('/example_without_previous_button.html');
    });

    describe('Question', function() {
        beforeEach(function() {
            element('.quizz-start-button').click();
        });

        it('should not have a previous button on the second question', function() {
            element('.quizz-next-button').click();
            element('.quizz-next-button').click();
            expect(element('.quizz-previous-button.visible').count()).toBe(0);
        });
    });

});