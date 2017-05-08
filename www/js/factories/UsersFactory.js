angular.module('ChatApp').factory("users", function($http, $q, $rootScope) {

  return {
    checkUserData: function(userData) {
      var def = $q.defer();
      $http({
        "url": "http://127.0.0.1:3000/api/login",
        "method": "post",
        "data": userData
      }).then(function(res) {
        def.resolve(res.data);
        $rootScope.user = res.data;
      }, function(err) {
        def.reject(err.data);
      });
      return def.promise;
    },
    regUserData: function(userData) {
      var def = $q.defer();
      $http({
        "url": "http://127.0.0.1:3000/api/signup",
        "method": "post",
        "data": userData
      }).then(function(res) {
        def.resolve(res.data);
        $rootScope.user = res.data;
      }, function(err) {
        def.reject(err.data);
      });
      return def.promise;
    },
    getAllUsers: function() {
      var def = $q.defer();
      $http({
        "url": "http://127.0.0.1:3000/api/users",
        "method": "get",
      }).then(function(res) {
        def.resolve(res.data);
        $rootScope.user = res.data;
      }, function(err) {
        def.reject(err.data);
      });
      return def.promise;
    },
    getPrivateMsgs: function(msgsData) {
      var def = $q.defer();
      $http({
        "url": "http://127.0.0.1:3000/api/getprivate",
        "method": "post",
        "data": msgsData
      }).then(function(res) {
        def.resolve(res.data);
      }, function(err) {
        def.reject(err.data);
      });
      return def.promise;
    },
    savePrivateMsg: function(msgsData) {
      var def = $q.defer();
      $http({
        "url": "http://127.0.0.1:3000/api/saveprivate",
        "method": "post",
        "data": msgsData
      }).then(function(res) {
        def.resolve(res.data);
      }, function(err) {
        def.reject(err.data);
      });
      return def.promise;
    },


  };


})
