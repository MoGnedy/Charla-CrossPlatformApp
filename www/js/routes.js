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

<<<<<<< HEAD
  })
  .state('login',{
    url:'/login',
  
  })
  .state('signup',{
    url:'/signup',
     templateUrl:"templates/signup.html",
        controller:"user",
      
  })
  .state('app.about',{
    url:'/about',
    views:{
      "pageContent":{
        templateUrl:"templates/about.html",
      }
=======
    })
    .state('login', {
      url: '/login',
      templateUrl: "templates/login.html",
      controller: "user",
>>>>>>> b5237fa6b168687babe3fc328643273293ddbbee

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

})
