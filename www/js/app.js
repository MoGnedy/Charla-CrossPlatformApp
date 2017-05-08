// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var serverIp = "127.0.0.1:3000"
var socket = io("http://" + serverIp);

angular.module('ChatApp', ['ionic'])


  .run(function($ionicPlatform, $state, $rootScope) {
    var localUserData = JSON.parse(localStorage.getItem("CharlaData"), true);
    if (localUserData) {
      $rootScope.logedInUserData = localUserData;
      $rootScope.online = "Go Offline";
      socket.emit('login', $rootScope.logedInUserData.username);
      socket.emit('user', $rootScope.logedInUserData.username);
      $state.go('app.users');
    } else {
      $state.go('home');
    }
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
