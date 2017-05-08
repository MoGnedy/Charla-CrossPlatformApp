angular.module('ChatApp').directive('privateMsg', function($rootScope, $state) {
  return {
    link: function($scope, element, attr) {
      element.on('click', function() {
        console.log(attr.id);

        if ($rootScope.logedInUserData && $rootScope.logedInUserData.username) {
          $rootScope.privateUserName=attr.id;
        	var private_code = '';
        	var TwoNames = [$rootScope.logedInUserData.username,$rootScope.privateUserName].sort();
        	console.log(TwoNames);
        	var code = TwoNames[0]+"(#Private#)"+TwoNames[1];
        	console.log(code);

        	for (var i = 0; i < code.length; i++) {
        // console.log(code.charCodeAt(i));
        private_code+=code.charCodeAt(i);
        		}
        		console.log(private_code);
        		$rootScope.private_code=private_code;

          $rootScope.user_privateMsg($rootScope.private_code);
        }
        $state.go('app.privatemsgs');


      })

    }
  }

})
