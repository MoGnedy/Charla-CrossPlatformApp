angular.module('ChatApp').controller('user', function($scope,$state,users) {
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
});
