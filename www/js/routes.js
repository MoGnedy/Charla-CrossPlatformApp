//js/routes.js
angular.module('ChatApp').config(function($stateProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      templateUrl: "templates/app.html",
      abstract: true
    })
    .state('home', {
      url: '/home',
      templateUrl: "templates/home.html",


    })

    .state('login', {
      url: '/login',
      templateUrl: "templates/login.html",
      controller: "user",


    })
    .state('signup', {
      url: '/signup',
      templateUrl: "templates/signup.html",
      controller: "user",

    })
    .state('app.about', {
      url: '/about',
      views: {
        "pageContent": {
          templateUrl: "templates/about.html",
        },

      }
    })
    .state('app.users', {
      url: '/users',
      views: {
        "pageContent": {
          templateUrl: "templates/users.html",
          controller: "user",
        },

      }
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        "pageContent": {
          templateUrl: "templates/chat.html",
          controller: "chat",
        },

      }
    })
    .state('app.privatemsgs', {
      url: '/privatemsgs',
      views: {
        "pageContent": {
          templateUrl: "templates/privatemsgs.html",
          controller: "chat",
        },

      }
    })

})
