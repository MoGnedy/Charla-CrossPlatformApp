angular.module('ChatApp').controller('chat', function($scope,$state) {

$scope.send = function(){
    // console.log($scope.message);
    socket.emit('message',$scope.message);
    $scope.message ='';
  }
  socket.on('message',function(msgs){
    $timeout(function(){

        $scope.messages=msgs;
    })

  })

});
