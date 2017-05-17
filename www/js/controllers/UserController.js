angular.module('ChatApp').controller('user', function($scope, $state, users, $rootScope, $timeout, $ionicLoading) {
  $scope.user = {};
  $scope.myerrors = {};
  $rootScope.messages = [];
  $scope.remember = [];

  $scope.validetor = {

    'passwordLen': function() {
      if ($scope.user.password && $scope.user.password.length < 4) {
        $scope.myerrors.password_len = true;
      } else {
        $scope.myerrors.password_len = false;
      }
    }
  };
  $scope.userLogin = function(valid) {
    if (valid) {
      users.checkUserData($scope.user).then(function(res) {
        if (res && res.userdata && res.userdata.length) {
          $scope.dataresult = res.userdata[0];
          $rootScope.logedInUserData = res.userdata[0];
          socket.emit('login', $rootScope.logedInUserData.username);
          socket.emit('user', $rootScope.logedInUserData.username);
          $rootScope.online = "Go Offline";
          $state.go('app.users');
          cordova.plugins.notification.local.schedule({
          id: 10,
          title: "Charla",
          text: "Welcom "+$rootScope.logedInUserData.username,
          at: Date.now(),
          data: { meetingId:"#123FG8" }
          });
          if ($scope.remember.check) {
            $scope.localUserData = JSON.stringify({
              'id': $rootScope.logedInUserData._id,
              'username': $rootScope.logedInUserData.username,
              'email': $rootScope.logedInUserData.email
            });
            localStorage.setItem("CharlaData", $scope.localUserData);
          }
        } else {
          console.log('login error');
        }

      });
      $rootScope.root_user = $scope.dataresult;

    }
  }

  $scope.validetor = {
    'match': function() {
      if ($scope.user.password && $scope.user.password == $scope.re_password) {
        $scope.myerrors.re_password = true;
      } else {
        $scope.myerrors.re_password = false;
      }
    },

    'pwLen': function() {

      if ($scope.user.password && $scope.user.password.length > 4) {
        $scope.myerrors.password_len = true;
      } else {
        $scope.myerrors.password_len = false;
      }
    }
  };


  $scope.signUp = function(valid) {
    if (valid) {
      $scope.dataresult = users.regUserData($scope.user).then(function(res) {
        $scope.dataresult = res.data;
        $rootScope.logedInUserData = $scope.user;
        if (res.status) {
          $rootScope.online = "Go Offline";
          socket.emit('login', $rootScope.logedInUserData.username);
          socket.emit('user', $rootScope.logedInUserData.username);
          $state.go('app.users');
        } else {
          console.log($scope.myerrors);
        }

      });
      $rootScope.root_user = $scope.user;

    }
  }

  socket.on('user', function(users) {
    $timeout(function() {
      $scope.users = users;
    })

  })
  socket.on('message', function(msgs) {
    $timeout(function() {
      $rootScope.messages = msgs;
    })

  })

  $rootScope.user_logout = function() {
    localStorage.removeItem('CharlaData');
    socket.emit('logout', $rootScope.logedInUserData.username);
  }


  $rootScope.user_OnOff = function() {
    if ($rootScope.online && $rootScope.online == "Go Offline") {
      $rootScope.online = "Go Online";
      socket.emit('offline', $rootScope.logedInUserData.username);
    } else {
      $rootScope.online = "Go Offline";
      socket.emit('online', $rootScope.logedInUserData.username);
    }
  }

  $rootScope.user_privateMsg = function(private_code) {
    private_code = {
      'private_code': private_code
    };
    $rootScope.privateMessages = []
    users.getPrivateMsgs(private_code).then(function(res) {
      if (res && res.msgsdata && res.msgsdata.length) {

        for (var i in res.msgsdata) {
          $rootScope.privateMessages.push(res.msgsdata[i].username + " : " + res.msgsdata[i].private_message)
        }

      } else {
        console.log("no messages");
      }

    });


  }


  socket.on('privateMessage', function(messageData) {

      cordova.plugins.notification.local.schedule({
        id: 11,
        title: "Charla With " + messageData[0],
        text: messageData[1],
        at: Date.now(),
        data: {
          id: messageData[0]
        }
      });

  })






});
