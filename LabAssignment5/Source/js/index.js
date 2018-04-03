/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('MongoRestController',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
    $scope.insertData = function(){
        console.log($scope.formData.lname);
        console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.password);
        console.log($scope.formData.cpassword);
        var dataParams = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            if(data!="UE"){
                alert("User created successfully. Please Login!");
                $window.location.href = 'index.html';
            }
            else{
                alert("User Exists. Please Login!");
                $window.location.href = 'index.html';
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.checkData = function(){
        /*console.log($scope.formData.email);
        console.log($scope.formData.password);
        var dataParams = {
            'email' : $scope.email,
            'pw' : $scope.pw
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/login',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
            if(data=="RNF"){
                alert("Invalid email or password!");
            }
            else{*/

                $window.location.href = 'home.html';
            /*}
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });*/
    };

    $scope.getData = function () {
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get('http://127.0.0.1:8081/getData',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);

                $scope.userlist = new Array();

                for (var i = 0; i < data.length; i++) {
                    $scope.userlist[i] = {
                        '_id' : data[i]._id,
                        'fname' : data[i].fname,
                        'lname' : data[i].lname,
                        'email' : data[i].email
                    }
                }


        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.edit = function(user,callback) {

        $http.post('http://127.0.0.1:8081/update',user)
            .success(function(data){
                alert(data);
                console.log("Successfully updated");
                window.location.href = "./home.html";
            });
    }
    $scope.remove = function(user,callback) {

        $http.post('http://127.0.0.1:8081/delete', user)
            .success(function(data){
                console.log("Successfully deleted");
                window.location.href = "./home.html";
            });
    }

    $scope.onRegister = function () {
        $window.location.href = 'signup.html';

    }

    $scope.onLogin = function () {
        $window.location.href = 'index.html';

    }
}]);

