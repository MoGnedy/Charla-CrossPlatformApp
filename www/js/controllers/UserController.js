angular.module('ChatApp').controller('user', function($scope,$state,users,$rootScope) {
  $scope.user={};
console.log("user Controller");
$scope.inerr = false;
$scope.inerrmsg = "message";
$scope.userLogin = function () {
  if($scope.user['email'] && $scope.user['password']){
    $scope.userCheck = users.checkUserData($scope.user);
    console.log($scope.userCheck);
    if ( $scope.userCheck.length  ){
  $state.go('app.users');
  }else {
    $scope.err = true;
    $scope.errmsg = "Invalid Email Or password"
  }
  }else {
    $scope.inerr = true;
    $scope.inerrmsg = "Invalid Email Or password"
  }
}


$scope.myerrors={};
        $scope.validetor = {
            'match': function(){
                if ($scope.user.pw && $scope.user.pw !== $scope.re_pw) {
                    $scope.myerrors.re_pw = true;
                }else {
                    $scope.myerrors.re_pw = false;
                }
            },

              'pwLen': function(){
                if ($scope.user.pw && $scope.user.pw.length < 4) {
                    $scope.myerrors.pw_len = true;
                }
                else {
                    $scope.myerrors.pw_len = false;
                }
            }
        };


                $scope.signUp = function(valid) {
            valid = valid && !$scope.myerrors.pw_len && !$scope.myerrors.mob && !$scope.myerrors.re_pw;
            if(valid) {
                $scope.dataresult=users.regUserData($scope.user);
                $rootScope.root_user = $scope.user;
                console.log($scop.dataresult);
                if(false){
                $state.go('app.users');}
            } else {
                console.log($scope.myerrors);
            }
        }




});
