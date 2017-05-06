angular.module('ChatApp').controller('chat', function($scope,users,$state,$timeout,$rootScope) {
    $scope.message =[];
$scope.send = function(){
    console.log($scope.message);
    // socket.emit('message',$scope.message);
    $scope.message ='';
  }
  // socket.on('message',function(msgs){
  //   $timeout(function(){

  //       $scope.messages=msgs;
  //   })

  // })

  $scope.sendMessage = function(){
  	console.log($scope.message);
  	console.log("clicked");


  };

  $scope.updateEditor = function() {
    var element = document.getElementById("textar");
    element.style.height = element.scrollHeight + "px";
};  

});
