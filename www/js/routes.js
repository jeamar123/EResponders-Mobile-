var app = angular.module('main', ['ionic']);

app
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$compileProvider,$ionicConfigProvider) {
    // $ionicConfigProvider.views.maxCache(10);
    // remove back button text completely
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    $stateProvider 
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'authController',
        cache: false
      })   
     
      .state('header', {
        url: '/header',
        abstract: true,
        templateUrl: 'templates/header.html',
        cache: false
      })
      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: 'mainController',
        cache: false
      }) 
      
      .state('options', {
        url: "/options",
        templateUrl: "templates/options.html",
        controller: 'mainController',
        cache: false
      }) 
      .state('events', {
        url: "/events",
        templateUrl: "templates/events.html",
        controller: 'eventsController',
        cache: false
      }) 
      .state('hospitals', {
        url: "/hospitals",
        templateUrl: "templates/hospitals.html",
        controller: 'respondersController',
        cache: false
      }) 
      .state('fireStations', {
        url: "/fireStations",
        templateUrl: "templates/fireStations.html",
        controller: 'respondersController',
        cache: false
      }) 
      .state('policeStations', {
        url: "/policeStations",
        templateUrl: "templates/policeStations.html",
        controller: 'respondersController',
        cache: false
      }) 
      .state('responderDetails', {
        url: "/responderDetails",
        templateUrl: "templates/responderDetails.html",
        controller: 'responderDetailsController',
        cache: false
      }) 
      .state('map', {
        url: "/map",
        templateUrl: "templates/map.html",
        cache: false,
        controller: 'responderDetailsController'
      }) 

      $urlRouterProvider.otherwise('/login');
      

  })
