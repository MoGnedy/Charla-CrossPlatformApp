angular.module('ChatApp').controller('chat', function($scope,$http,users,$state,$timeout,$rootScope) {
	  $scope.message = [];
    socket.on('message',function(msgs){
    $timeout(function(){
        $scope.messages=msgs;
    })

  })
$scope.send = function(){
    console.log($scope.message[0]);
		$scope.message[0]=$rootScope.logedInUserData.username+" : "+$scope.message[0];
		console.log($scope.message[0]);
    socket.emit('message',$scope.message[0]);
    $scope.message[0] ='';
  }
  $scope.sendMessage = function(){
  	console.log($scope.message[0]);
  	console.log("clicked");


  };

  $scope.updateEditor = function() {
    var element = document.getElementById("textar");
    element.style.height = element.scrollHeight + "px";
};

});
