angular.module('ChatApp').controller('user', function($scope, $state, users, $rootScope, $timeout, $ionicLoading) {
  $scope.user = {};
  $scope.myerrors = {};
  $scope.stopLoading = function() {
    $ionicLoading.hide();
    $state.go('app.about');
  }
  $scope.stopSync = function() {
    $ionicLoading.hide();
  }

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
          $ionicLoading.hide();
          $scope.dataresult = res.userdata[0];
          $rootScope.logedInUserData = res.userdata[0];
          console.log($rootScope.logedInUserData.username);
          socket.emit('login', $rootScope.logedInUserData.username);
          socket.emit('user', $rootScope.logedInUserData.username);
          $state.go('app.users');
        } else {
          $ionicLoading.hide();
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

  $rootScope.user_logout = function() {
    socket.emit('logout', $rootScope.logedInUserData.username);

  }

});
