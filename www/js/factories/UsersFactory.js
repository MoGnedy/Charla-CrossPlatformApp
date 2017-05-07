angular.module('ChatApp').factory("users",function($http,$q,$rootScope){

  var def = $q.defer();
   return {
       checkUserData: function(userData) {
         console.log(userData);
           $http({
               "url": "http://172.16.2.246:3000/api/login",
               "method": "post",
               "data": userData
           }).then(function(res) {
               console.log(res);
               def.resolve(res.data);
                $rootScope.user = res.data;
           }, function(err) {
               def.reject(err.data);
           });
             return def.promise;
       },
       regUserData: function(userData) {
         console.log(userData);
           $http({
               "url": "http://172.16.2.246:3000/api/signup",
               "method": "post",
               "data": userData
           }).then(function(res) {
               console.log(res);
               def.resolve(res.data);
                $rootScope.user = res.data;
           }, function(err) {
               def.reject(err.data);
           });
             return def.promise;
       },
       getAllUsers: function() {
         console.log(userData);
           $http({
               "url": "http://172.16.2.246:3000/api/users",
               "method": "get",
           }).then(function(res) {
               console.log(res);
               def.resolve(res.data);
                $rootScope.user = res.data;
           }, function(err) {
               def.reject(err.data);
           });
             return def.promise;
       },

getAllMessages: function() {
         console.log(userData);
           $http({
               "url": "http://172.16.2.246:3000/api/chat",
               "method": "get",
           }).then(function(res) {
               console.log(res);
               def.resolve(res.data);
                $rootScope.user = res.data;
           }, function(err) {
               def.reject(err.data);
           });
             return def.promise;
       },
   };


})
