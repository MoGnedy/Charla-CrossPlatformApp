angular.module('ChatApp').controller('chat', function($scope,$http,users,$state,$timeout,$rootScope) {
	  $scope.message ={};

    socket.on('message',function(msgs){
    $timeout(function(){

        $scope.message=msgs;
    })

  })
$scope.send = function(){
    console.log($scope.message);

		$scope.message['username']=$rootScope.logedInUserData.username;
		console.log($scope.message);
    socket.emit('message',$scope.message);
    // $scope.message ='';
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
