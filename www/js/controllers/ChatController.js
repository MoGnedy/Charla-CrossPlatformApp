angular.module('ChatApp').controller('chat', function($scope,$http,users,$state,$timeout,$rootScope) {
	  $scope.message = [];
		$scope.privateMessage = [];
	  $rootScope.privateMessages = [];
    socket.on('message',function(msgs){
    $timeout(function(){
        $rootScope.messages=msgs;
    })

  })
	socket.on('privatemessage',function(msgs){
	$timeout(function(){
		console.log("privatemessage event in client ChatController");
		console.log($rootScope.private_code);
	$rootScope.user_privateMsg($rootScope.private_code);
	})

	})
$scope.send = function(){
	if ($scope.message && $scope.message != ''){
    console.log($scope.message[0]);
		$scope.message[0]=$rootScope.logedInUserData.username+" : "+$scope.message[0];
		console.log($scope.message[0]);
    socket.emit('message',$scope.message[0]);
    $scope.message[0] ='';
	}
  }
  $scope.sendMessage = function(){
  	console.log($scope.message[0]);
  	console.log("clicked");


  };

  $scope.updateEditor = function() {
    var element = document.getElementById("textar");
    element.style.height = element.scrollHeight + "px";
};





$scope.sendPrivate = function() {
	var privateMessageData ={'private_code':$rootScope.private_code,'username':$rootScope.logedInUserData.username,'private_message':$scope.privateMessage[0]};
	users.savePrivateMsg(privateMessageData).then(function(res) {
		if (res && res.status) {
			console.log(res);
			if ($scope.privateMessage != ''){
				console.log("$scope.privateMessage != ''");

				socket.emit('privatemessage', $rootScope.logedInUserData.username);
		    $scope.privateMessage ='';
			}
		} else {
			console.log("didn't send the messages");
		}

	});

}











});
