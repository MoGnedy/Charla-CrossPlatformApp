angular.module('ChatApp').controller('user', function($scope,$state,users) {
  $scope.user={};
console.log("user Controller");
$scope.inerr = false;
$scope.inerrmsg = "message";
$scope.userLogin = function () {
  if($scope.user['email'] && $scope.user['password']){

    if ( users.sendUserData($scope.user).length ){
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
});
