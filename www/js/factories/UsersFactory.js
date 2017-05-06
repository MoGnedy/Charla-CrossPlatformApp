angular.module('ChatApp').factory("users",function($http,$q,$rootScope){

  var def = $q.defer();
   return {
       sendUserData: function(userData) {
         console.log(userData);
           $http({
               "url": "http://172.16.2.141/userdata",
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
       }

   };


})
