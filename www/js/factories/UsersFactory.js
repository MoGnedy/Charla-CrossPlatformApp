angular.module('ChatApp').factory("users", function($http, $q, $rootScope) {

  return {
    checkUserData: function(userData) {
      var def = $q.defer();
      $http({
        "url": "http://192.168.1.101:3000/api/login",
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
        "url": "http://192.168.1.101:3000/api/signup",
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
        "url": "http://192.168.1.101:3000/api/users",
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
      console.log(msgsData);
      $http({
        "url": "http://192.168.1.101:3000/api/getprivate",
        "method": "post",
        "data": msgsData
      }).then(function(res) {
        console.log(res);
        console.log(res.data);
        def.resolve(res.data);
      }, function(err) {
        def.reject(err.data);
      });
      return def.promise;
    },
    savePrivateMsg: function(msgsData) {
      var def = $q.defer();
      $http({
        "url": "http://192.168.1.101:3000/api/saveprivate",
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
