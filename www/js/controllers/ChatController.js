angular.module('ChatApp').controller('chat', function($scope, $http, users, $state, $timeout, $rootScope) {
  $scope.message = [];
  $scope.privateMessage = [];
  $rootScope.privateMessages = [];
  socket.on('message', function(msgs) {
    $timeout(function() {
      $rootScope.messages = msgs;
    })

  })
  socket.on('privateMessage', function(messageData) {
    if ($rootScope.privateUserName == messageData[0]) {
      $timeout(function() {
        $rootScope.privateMessages.push(messageData[0] + " : " + messageData[1]);
      })
    }

  })
  $scope.send = function() {
    if ($scope.message && $scope.message != '') {
      $scope.message[0] = $rootScope.logedInUserData.username + " : " + $scope.message[0];
      socket.emit('message', $scope.message[0]);
      $scope.message[0] = '';
    }
  }


  $scope.updateEditor = function() {
    var element = document.getElementById("textar");
    element.style.height = element.scrollHeight + "px";
  };





  $scope.sendPrivate = function() {
    if ($scope.privateMessage[0] && $scope.privateMessage[0] != '') {
      var privateMessageData = {
        'private_code': $rootScope.private_code,
        'username': $rootScope.logedInUserData.username,
        'private_message': $scope.privateMessage[0]
      };
      var messageData = [$rootScope.privateUserName, $scope.privateMessage[0], $rootScope.logedInUserData.username];

      users.savePrivateMsg(privateMessageData).then(function(res) {
        if (res && res.status) {
          if ($scope.privateMessage != []) {

            socket.emit('privateMessage', messageData);
          }
          $rootScope.privateMessages.push($rootScope.logedInUserData.username + " : " + $scope.privateMessage[0])
          $scope.privateMessage = [];
        } else {
          console.log("send error");
        }


      });
    }
  }




});
