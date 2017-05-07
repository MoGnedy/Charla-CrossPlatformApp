angular.module('ChatApp').directive('logOut', function($rootScope, $state) {
  return {
    link: function($scope, element, attr) {
      element.on('click', function() {
        if ($rootScope.logedInUserData && $rootScope.logedInUserData.username) {
          $rootScope.user_logout();
        }
        $state.go('home');


      })

    }
  }

})
