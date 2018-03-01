
/*** cnvyr.js.gz ***/
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //Login screen
  .state('login', {
     url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  // the signup route
      .state('registration', {
        url: '/registration',
        templateUrl: 'templates/registration.html',
        data: {
          public: true
        }
      })
      .state('geolocation', {
          url: '/geolocation',
          templateUrl: 'templates/geolocation.html',
          data: {
              public: true
          }
      })
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.restaurants', {
      url: '/restaurants',
      views: {
        'tab-restaurants': {
          templateUrl: 'templates/tab-restaurants.html',
          controller: 'RestaurantsCtrl'
        }
      }
    })
    .state('tab.restaurant-detail', {
      url: '/restaurants/:restaurantId',
      views: {
        'tab-restaurants': {
          templateUrl: 'templates/restaurant-detail.html',
          controller: 'RestaurantDetailCtrl'
        }
      }
    })

  .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'FavoritesCtrl'
        }
      },
      reload: true
    });

  $urlRouterProvider.otherwise('/login');
});

angular.module('starter.services', [])

    .factory('Restaurants', function($q) {

        var userData = {};
        //Initialize db
        //var db = new PouchDB('restaurants')
        var remoteCouch = "http://localhost:8100/restaurants";

        //Sync db


        return {
            choose: function(restaurant) {
                //save the restaurant like as a doc in CouchDB
                var likes = {
                    _id: userData.data.username,
                    likes: restaurant.name
                };

                //Check if doc exists, and update it
                var abc = db.get(userData.data.username).then(function(doc) {
                    //Ignore already liked restaurant
                    likedRestaurants = doc.likes.split(",");
                    if(likedRestaurants.indexOf(restaurant.name) > -1) {
                        console.log("You got it");
                        return;
                    }
                    return db.put({_id:userData.data.username, likes:doc.likes+","+restaurant.name, _rev:doc._rev});
                });

                abc.then(function(resp) {
                    console.log("doc updated");
                    console.log(resp);
                });

                //If not, add a new one
                abc.catch(function(err) {
                    console.log("doc doesn't exist");
                    db.put({_id:userData.data.username, likes:restaurant.name}).then(function(doc) {
                        console.log("doc created");
                        console.log(doc);
                    }).catch(function(err2) {
                        console.log("doc could not be created");
                        console.log(err2);
                    })
                });
            },
            get: function() {
                var deferred = $q.defer();
                //Return all the docs
                db.allDocs({include_docs:true, descending:true}).then(function(doc) {
                    console.log("docs fetched");
                    favorites = [];
                    for(i=0;i<doc.rows.length;i++) {
                        name = doc.rows[i].doc._id.split("@")[0];
                        likes = doc.rows[i].doc.likes;
                        photo = "https://outlook.office365.com/EWS/Exchange.asmx/s/GetUserPhoto?email=" + doc.rows[i].doc._id + "&size=HR64x64";
                        favorites.push({name: name, likes: likes, photo: photo});
                    }
                    console.log("fav");
                    console.log(favorites);
                    deferred.resolve(favorites);
                }).catch(function(err) {
                    console.log("Error fetching docs");
                    console.log(err);
                })
                return deferred.promise;
            },
            saveCurrentSessionInfo: function(data, photo) {
                console.log("Saving");
                userData = {data: data, photo: photo};
                console.log(userData);
            }
        };
    });




/*** cnvyr.js.gz ***/
angular.module('starter.controllers', ['ionic','ngCordova'])


    .controller('MapController', function($scope, $ionicLoading) {


        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
        console.log("this is position");
        $scope.map = map;


    })

    .controller('myCtrl', function($scope, $cordovaGeolocation){

        $scope.toggle = function(){

            var posOption = {timeout: 10000,enableHighAccuracy: true};
            $cordovaGeolocation
                .getCurrentPosition(posOption)
                .then(function (position)  {

                        $scope.lat = position.coords.latitude;
                        $scope.long = position.coords.longitude;


                    }, function(err){
                        //error
                    }

                );

        }



    })


    .controller('FavoritesCtrl', function($scope, $q, Restaurants) {

        Restaurants.get().then(function(favorites) {
            $scope.favorites = favorites;
        });

        $scope.doRefresh = function() {
            Restaurants.get().then(function(favorites) {
                $scope.favorites = favorites;
            });
            $scope.$broadcast('scroll.refreshComplete');
        };
    })

    .controller('RestaurantsCtrl', function($scope, $http, $q, $ionicLoading, Restaurants) {

        restaurants = [];
        distance = [];

        // $ionicLoading.show({
        //    templateUrl: "/templates/spinner.html"
        //  });

        //Calculate distance between two coordinates
        function calcDistance(destination){
            var p1 = new google.maps.LatLng(destination.lat(), destination.lng());
            var p2 = new google.maps.LatLng($scope.position.latitude, $scope.position.longitude);
            console.log(typeof("distance is "+google.maps.geometry.spherical.computeDistanceBetween(p1, p2) ));

            var distanceBetween= (google.maps.geometry.spherical.computeDistanceBetween(p1, p2))/1000;
            return parseFloat(distanceBetween).toFixed(2);
        }

        //Get current location
        navigator.geolocation.getCurrentPosition(function(position) {
            // $scope.$apply(function() {

            $scope.position = position.coords;
            console.log("Position:");
            console.log(position.coords.longitude);
            var map;
            var service;
            var infowindow;


            //PlaceService.nearBySearch
            var currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map = new google.maps.Map(document.getElementById('map'));
            var request = {
                location: currLocation,
                //radius: '1000',
                types: ['restaurant'],
                rankBy: google.maps.places.RankBy.DISTANCE
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);

            function callback(results, status, pagination) {
                console.log("Here!");
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    console.log("NOO");
                    console.log(status);
                    return;
                }
                for(i=0;i<1;i++) {
                    for (var i = 0; i < results.length; i++) {
                        restaurants.push(results[i]);
                        distance.push(calcDistance(results[i].geometry.location) + " kilometers away");
                    }
                    if(!pagination.hasNextPage) {
                        $scope.$apply(function() {
                            $scope.restaurants = restaurants;
                            $scope.distance = distance;
                            $ionicLoading.hide();
                        });
                        break;
                    }
                    pagination.nextPage();
                }
            }
            // });
        }, function(error) {
            console.log("error");
            console.log(JSON.stringify(error));
        });

        $scope.choose = function(restaurant) {
            console.log("Data");
            console.log($scope.data);
            Restaurants.choose(restaurant);
        }
    })

    .controller('RestaurantDetailCtrl', function($scope, $stateParams, $http, $q, $ionicModal, $ionicSlideBoxDelegate, Restaurants) {

        //PlaceService.getDetails
        var request = {
            placeId: $stateParams.restaurantId
        };
        map = new google.maps.Map(document.getElementById('map'));
        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);
        photos = [];

        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                $scope.restaurant = place;
                if (typeof place.photos != "undefined") {


                    for(i=0; i<place.photos.length; i++) {
                        src = place.photos[i].getUrl({'maxWidth': 400, 'maxHeight': 400});
                        msg = "Image " + (i+1) + "/" + place.photos.length;
                        photos.push({src:src,msg:msg});
                    }
                    $scope.$apply(function() {
                        $scope.photos = photos;
                    });
                }else{
                    console.log("no image");
                } }
        }

        //Image pop handling stuff
        $ionicModal.fromTemplateUrl('image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $ionicSlideBoxDelegate.slide(0);
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        $scope.$on('modal.hide', function() {

        });

        $scope.$on('modal.removed', function() {

        });
        $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
        });

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.goToSlide = function(index) {
            $scope.modal.show();
            $ionicSlideBoxDelegate.slide(index);
        }

        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
    })

    .controller('LoginCtrl', function($scope, $q, $ionicPopup, $state, Restaurants, $cordovaOauth) {

        $scope.data = {};

        $scope.login = function() {
            
             $cordovaOauth.google("405123950532-cc6gmi3s7ik9fdf2dgeuv5gkc22b021h.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
            
            /*if ($scope.data.username == 'Admin' && $scope.data.password == 'Admin') {
                $state.go('geolocation');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });*/
            }

        }
    );
