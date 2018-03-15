// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var imageApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

imageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

imageApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'AnalysisTwoController'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
                           
                           
imageApp.controller("AnalysisTwoController",function($scope,$http,$state){
                                          
    $scope.classify = function(){
        
        var textgiven = document.getElementById('textapi').value;
       $http.get("https://api.uclassify.com/v1/uclassify/topics/Classify?readkey=WVWoyqjGtvFe&text="+textgiven).success(function(data){
           console.log(data);
          $scope.result = [];
             $scope.result.push("Arts : "+data.Arts);
         
           $scope.result.push("Business : "+data.Business);
          
           $scope.result.push("Computers : "+data.Computers);
         
           $scope.result.push("Games : "+data.Games);
           
           $scope.result.push("Health : "+data.Health);
        
           $scope.result.push("Home : "+data.Home);
          
           $scope.result.push("Recreation : "+data.Recreation);
          
            $scope.result.push("Science : "+data.Science);
     
           $scope.result.push("Society : "+data.Society);
         
            $scope.result.push("Sports : "+data.Sports);
         
          console.log($scope.result);
           
       });
        
    }
           
    $scope.message = function(){
        
         
        
         google.charts.load('current', {'packages':['corechart']});
        
          var textgiven = document.getElementById('textapi').value;
       $http.get("https://api.uclassify.com/v1/uclassify/topics/Classify?readkey=WVWoyqjGtvFe&text="+textgiven).success(function(data){
           console.log(data);
      
           
           
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
console.log("3224");
        var data1 = google.visualization.arrayToDataTable([
          ['Classification', 'Probability'],
          ['Arts',     data.Arts],
          ['Business', data.Business],
          ['Computers',  data.Computers],
          ['Games',data.Games],
          ['Health',    data.Health],
            ['Home',   data.Home],
            ['Recreation',    data.Recreation],
            ['Science',    data.Science],
            ['Society',    data.Society],
            ['Sports',    data.Sports]
        ]);

        var options = {
          title: 'Classification of text',
            is3D: true
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data1, options);
      
       }
       
})
    }                                                                                                                          
});