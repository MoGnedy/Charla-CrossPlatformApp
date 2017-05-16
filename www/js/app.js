// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var serverIp = "172.16.2.141:3000"
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

        //push notification

        var push = PushNotification.init({
          android: {
            senderID: "287432877293"
          },
          browser: {
            pushServiceURL: 'https://api.ionic.io/push/notifications'
          },
          windows: {}
        });

        push.on('registration', function(data) {
          // data.registrationId
          console.log(data.registrationId);
        });

        push.on('notification', function(data) {
          console.log(data);
          // data.message,
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData
        });

        push.on('error', function(e) {
          // e.message
        });
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
