angular.module('ChatApp').controller('user', function($scope, $state, users, $rootScope) {
      $scope.user = {};
      $scope.myerrors = {};
 $scope.validetor = {

              'passwordLen': function(){
                if ($scope.user.password && $scope.user.password.length < 4) {
                    $scope.myerrors.password_len = true;
                }
                else {
                    $scope.myerrors.password_len = false;
                }
            }
        };
$scope.userLogin = function (valid) {
  console.log(valid);
   valid = valid && !$scope.myerrors.password_len && $scope.user.username;
            if(valid) {
                $scope.dataresult=users.checkUserData($scope.user);
                // console.log($scope.userCheck)
                $rootScope.root_user = $scope.user;
                // console.log($scop.dataresult);
                if(false){
                $state.go('app.users');}
            } else {
                console.log($scope.myerrors);
            }


}

        
        $scope.validetor = {
          'match': function() {
            console.log($scope.user.password);
            console.log($scope.re_password);
            if ($scope.user.password && $scope.user.password == $scope.re_password) {
              $scope.myerrors.re_password = true;
            } else {
              $scope.myerrors.re_password = false;
            }
          },

          'pwLen': function() {

            console.log($scope.user.password.length);
            if ($scope.user.password && $scope.user.password.length > 4) {
              console.log("true");
              $scope.myerrors.password_len = true;
            } else {
              console.log("false");
              $scope.myerrors.password_len = false;
            }
          }
        };


        $scope.signUp = function(valid) {
          console.log(valid);
          // valid = valid && !$scope.myerrors.password_len && !$scope.myerrors.re_password;
          if (valid) {
            console.log("signUp");
            $scope.dataresult = users.regUserData($scope.user).then(function(res) {
              console.log(res.status);
              console.log(res);
              $scope.dataresult = res.data;
              if (res.status) {
                $state.go('app.users');
              } else {
                console.log($scope.myerrors);
              }

            });
            $rootScope.root_user = $scope.user;
            console.log($scope.dataresult);
            console.log($scope.dataresult.data);
            console.log($scope.dataresult.value);

          }



        }
      });
