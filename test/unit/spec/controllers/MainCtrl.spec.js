describe('Controller: MainCtrl', function() {
    var $scope;
    
    beforeEach(module('quizz'));
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('MainCtrl', {
            $scope: $scope
        });
    }));
    
    it('should create a message in scope', function() {
        expect($scope.message).toBe('world');
    });
});