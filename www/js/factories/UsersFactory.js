angular.module('ChatApp').factory("users", function($http, $q, $rootScope) {
  var def = $q.defer();
  return {
    checkUserData: function(userData) {
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


   };


})
