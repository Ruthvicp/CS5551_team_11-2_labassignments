var module = angular.module("myApp",[]);

module.controller("appController",Login);
module.controller("appController",Register);


function Login($scope,$window){

    $scope.login = function () {
        $window.location.href = 'https://www.facebook.com';
    }
}

function Register($scope,$window){

    $scope.register = function () {
        localStorage.setItem($scope.email , $scope.password);
        $window.location.href = 'index.html';
    }
}