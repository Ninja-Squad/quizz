describe('Home page', function() {
    beforeEach(function() {
        browser().navigateTo('/');
    });

    it('should display Hello world', function() {
        expect(element('h1:visible').text()).toContain('Hello world');
    });
});