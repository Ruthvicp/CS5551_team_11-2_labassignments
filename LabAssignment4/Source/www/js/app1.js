var App = angular.module("App", ["ionic"]);

App.service("FreshlyPressed", ["$http", "$log", FreshlyPressed]);

App.controller("AppCtrl", ["$scope","FreshlyPressed", "$log", AppCtrl]);

function AppCtrl($scope, FreshlyPressed, $log){
    $scope.results=[];
    $scope.refresh = function(){      
        FreshlyPressed.getHome($scope);
    }
    
    $scope.refreshWorld = function(){      
        FreshlyPressed.getWorld($scope);
    }
    
    $scope.refreshTech = function(){      
        FreshlyPressed.getTech($scope);
    }
    
    $scope.refreshSports = function(){      
        FreshlyPressed.getSports($scope);
    }
    
    $scope.refreshDining = function(){      
        FreshlyPressed.getDining($scope);
    }
    
    $scope.refreshFashion = function(){      
        FreshlyPressed.getFashion($scope);
    }
}

function FreshlyPressed($http, $log){
  this.getHome = function($scope){   
        document.getElementById("a1").classList.add('active');
        document.getElementById("a2").classList.remove('active');
        document.getElementById("a3").classList.remove('active');
        document.getElementById("a4").classList.remove('active');
        document.getElementById("a5").classList.remove('active');
        document.getElementById("a6").classList.remove('active');
      
        $http.get('http://api.nytimes.com/svc/topstories/v1/home.json?callback=callbackTopStories&api-key=ed61c93e03a7869f865195212bab69b8:4:73598028')
        .success(function(result) {
            $scope.results = result.results;
            $scope.$broadcast("scroll.refreshComplete");
        });
        
    };
    
    this.getWorld = function($scope){      
        document.getElementById("a2").classList.add('active');
        document.getElementById("a1").classList.remove('active');
        document.getElementById("a3").classList.remove('active');
        document.getElementById("a4").classList.remove('active');
        document.getElementById("a5").classList.remove('active');
        document.getElementById("a6").classList.remove('active');
    
        $http.get('http://api.nytimes.com/svc/topstories/v1/world.json?callback=callbackTopStories&api-key=ed61c93e03a7869f865195212bab69b8:4:73598028')
        .success(function(result) {
            $scope.results = result.results;
            $scope.$broadcast("scroll.refreshComplete");
        });
    };
    
    this.getTech = function($scope){
        document.getElementById("a3").classList.add('active');
        document.getElementById("a2").classList.remove('active');
        document.getElementById("a1").classList.remove('active');
        document.getElementById("a4").classList.remove('active');
        document.getElementById("a5").classList.remove('active');
        document.getElementById("a6").classList.remove('active');

        $http.get('http://api.nytimes.com/svc/topstories/v1/technology.json?callback=callbackTopStories&api-key=ed61c93e03a7869f865195212bab69b8:4:73598028')
        .success(function(result) {
            $scope.results = result.results;
            $scope.$broadcast("scroll.refreshComplete");
        });
    };
    
    this.getSports = function($scope){      
        document.getElementById("a4").classList.add('active');
        document.getElementById("a2").classList.remove('active');
        document.getElementById("a3").classList.remove('active');
        document.getElementById("a1").classList.remove('active');
        document.getElementById("a5").classList.remove('active');
        document.getElementById("a6").classList.remove('active');
        
        $http.get('http://api.nytimes.com/svc/topstories/v1/sports.json?callback=callbackTopStories&api-key=ed61c93e03a7869f865195212bab69b8:4:73598028')
        .success(function(result) {
            $scope.results = result.results;
            $scope.$broadcast("scroll.refreshComplete");
        });
    };
    
    this.getDining = function($scope){      
        document.getElementById("a6").classList.add('active');
        document.getElementById("a2").classList.remove('active');
        document.getElementById("a3").classList.remove('active');
        document.getElementById("a4").classList.remove('active');
        document.getElementById("a1").classList.remove('active');
        document.getElementById("a5").classList.remove('active');

        $http.get('http://api.nytimes.com/svc/topstories/v1/dining.json?callback=callbackTopStories&api-key=ed61c93e03a7869f865195212bab69b8:4:73598028')
        .success(function(result) {
            $scope.results = result.results;
            $scope.$broadcast("scroll.refreshComplete");
        });
    };
    
    this.getFashion = function($scope){
        document.getElementById("a5").classList.add('active');
        document.getElementById("a2").classList.remove('active');
        document.getElementById("a3").classList.remove('active');
        document.getElementById("a4").classList.remove('active');
        document.getElementById("a6").classList.remove('active');
        document.getElementById("a1").classList.remove('active');

        $http.get('http://api.nytimes.com/svc/topstories/v1/fashion.json?callback=callbackTopStories&api-key=ed61c93e03a7869f865195212bab69b8:4:73598028')
        .success(function(result) {
            $scope.results = result.results;
            $scope.$broadcast("scroll.refreshComplete");
        });
    };    
}