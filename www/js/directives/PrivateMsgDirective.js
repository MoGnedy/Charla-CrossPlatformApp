angular.module('ChatApp').directive('privateMsg', function($rootScope, $state) {
  return {
    link: function($scope, element, attr) {
      element.on('click', function() {

        if ($rootScope.logedInUserData && $rootScope.logedInUserData.username) {
          $rootScope.privateUserName = attr.id;
          var private_code = '';
          var TwoNames = [$rootScope.logedInUserData.username, $rootScope.privateUserName].sort();
          var code = TwoNames[0] + "(#Private#)" + TwoNames[1];

          for (var i = 0; i < code.length; i++) {
            private_code += code.charCodeAt(i);
          }
          $rootScope.private_code = private_code;

          $rootScope.user_privateMsg($rootScope.private_code);
        }
        $state.go('app.privatemsgs');


      })

    }
  }

})
