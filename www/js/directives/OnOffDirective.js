angular.module('ChatApp').directive('onOff', function($rootScope, $state) {
  return {
    link: function($scope, element, attr) {
      element.on('click', function() {
        if ($rootScope.logedInUserData && $rootScope.logedInUserData.username) {
          $rootScope.user_OnOff();
        }
        
      })

    }
  }

})
