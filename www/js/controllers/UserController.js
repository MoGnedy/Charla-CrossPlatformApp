angular.module('ChatApp').controller('user', function($scope, $state, users, $rootScope) {
      $scope.user = {};
      console.log("user Controller");
      $scope.inerr = false;
      $scope.inerrmsg = "message";
      $scope.userLogin = function() {

        if ($scope.user['email'] && $scope.user['password']) {



            $scope.userCheck = users.checkUserData($scope.user).then(function(res) {
              console.log(res.status);
              console.log(res);
              $scope.dataresult = res.data;
              if (res.status) {
                $state.go('app.users');
              }
               else {
                $scope.err = true;
                $scope.errmsg = "Invalid Email Or password"
              }


            });
            console.log($scope.userCheck);

          } else {
            $scope.inerr = true;
            $scope.inerrmsg = "Invalid Email Or password"
          }
        }


        $scope.myerrors = {};
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
