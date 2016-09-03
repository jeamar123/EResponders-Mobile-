// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app
.controller('authController', [
	"$http",
	"$scope",
	
	function controller($http,$scope,$state){
		console.log("authController Running !");

		
	} 

])

.controller('mainController', [
	"$http",
	"$scope",
	"responderService",
	"$state",
	"$ionicModal",
	function controller($http,$scope,responderService,$state,$ionicModal){
		console.log("mainController Running !");

		$scope.allResponders = responderService.getResponders();
		

		$scope.alertLocationSelf = function(){
			swal({   
				title: "Alert Nearest Responder",   
				text: "Proceed?",   
				type: "warning",   
				showCancelButton: true,   
				closeOnConfirm: false,   
				showLoaderOnConfirm: true, }, 
			function(){     
				swal("Alert Success!");   
			});
		}

		$scope.logout = function(){
			swal({   
				title: "Logging Out",   
				text: "Proceed?",   
				type: "warning",   
				showCancelButton: true,   
				closeOnConfirm: true,   
				showLoaderOnConfirm: true, }, 
			function(){     
				$state.go("login");
			});
		}

		
	} 

])

.controller('respondersController', [
	"$http",
	"$scope",
	"$ionicActionSheet",
	"responderService",
	"$ionicModal",
	"$state",
	function controller($http,$scope,$ionicActionSheet,responderService,$ionicModal,$state){
		console.log("respondersController Running !");
		
		$scope.isTyping = false;
		$scope.hospitals = responderService.getHospitals();
		$scope.fireStations = responderService.getFireStations();
		$scope.policeStations = responderService.getPoliceStations();
		$scope.allResponders = responderService.getResponders();

		$scope.selectedResponderDetails = {};

		$scope.selectedResponder = function(name,lat,lng){

			console.log(name + " " + lat + " " + lng);

			responderService.addSelectedResponderDetails([
				{ name: name, latitude: lat, longitude: lng}
			]);

			$scope.selectedResponderDetails = [
				{ name: name, latitude: lat, longitude: lng}
			];



			$ionicActionSheet.show({
		      titleText: name,
		      buttons: [
		        { text: 'Details <i class="icon ion-information-circled "></i>' },
		        { text: 'Map Location <i class="icon ion-android-pin"></i> ' },
		        { text: 'Alert <i class="icon ion-alert"></i>!' },
		      ],
		      destructiveText: 'Cancel',
		      destructiveButtonClicked: function() {
		        return true;
		      },
		      buttonClicked: function(index) {
		        // return true;

		        if( index == 0 ){							
		        	$state.go("responderDetails");
		        }else if( index == 1 ){
		        	$state.go('map');
		        	// setTimeout(function(){
		        		// google.maps.event.addDomListener(window, 'load', initialize);
						  	// $scope.initializeMap();
						  	responderService.setMapInitialize(true);
						  	console.log("Service Map initialize Set");
		        	// },1000);
		        	
		        }else if( index == 2 ){
		        	$scope.alertResponder();
		        	return true;
		        }
		      },
		      cancelOnStateChange: true,
		      cssClass: 'Action-Sheet'
		    });
		}  

		$scope.alertResponder = function(){
			swal({   
				title: "Alert " + $scope.selectedResponderDetails[0].name + " ?" ,   
				text: "Proceed?",   
				type: "warning",   
				showCancelButton: true,   
				closeOnConfirm: false,   
				showLoaderOnConfirm: true, }, 
			function(){     
				swal("Alert Success!");   
			});
		}



	} 

])

.controller('responderDetailsController', [
	"$http",
	"$scope",
	"responderService",
	"$state",
	function controller($http,$scope,responderService,$state){
		console.log("responderDetailsController Running !");

		$scope.selectedResponderDetails = responderService.getSelectedResponderDetails();


	// ****************** MAP FUNCTIONS START ********************* // 

			var marker;
			var myLatLng = new google.maps.LatLng(8.453818199999999, 124.63224839999998);
			var map;
			var directionsService = new google.maps.DirectionsService;
	  	var directionsDisplay = new google.maps.DirectionsRenderer;
	  	var watch;

	  	var isMapInitialized;
	  	

			$scope.initializeMap = function() {
				$scope.endWatchLocation();
		    console.log("map initialized");

		    var mapOptions = {
		      center: myLatLng,
		      zoom: 18,
		      scrollwheel: true,
		      zoomControl: true,
		    };
		    map = new google.maps.Map(document.getElementById("map"),
		        mapOptions);
		    directionsDisplay.setMap(map);
		    
			  if (navigator.geolocation) {
				  navigator.geolocation.getCurrentPosition($scope.setLocation, $scope.setLocationError);
				  setTimeout($scope.watchLocation,3000);
				  console.log("WatchLocation Started !");
				} else {
				  // Browser doesn't support Geolocation
				  console.log("Device does not support Geolocation");
				}

		  }

		  $scope.setLocationError = function() {
		    console.log("Device does not support Geolocation");
		  }

		  $scope.setLocation = function(position) {
		    var pos = {
		      lat: position.coords.latitude,
		      lng: position.coords.longitude
		    };

		    myLatLng = pos;
		    map.setCenter(pos);
		    marker = new google.maps.Marker({
			    position: pos,
			    map: map,
			    title: 'You are Here !'
			  });

			  var end = new google.maps.LatLng($scope.selectedResponderDetails[0].latitude, $scope.selectedResponderDetails[0].longitude);
	        

	        directionRequest = {
	            origin:myLatLng,
	            destination: end ,
	            avoidHighways:true,
	            travelMode: google.maps.TravelMode.DRIVING
	        };

	        directionsService.route(directionRequest, function(response, status) {
	          if (status == google.maps.DirectionsStatus.OK) {
	                directionsDisplay.setDirections(response);
	                directionsDisplay.setMap(map);
	                directionsDisplay.setOptions({
	                    preserveViewport: true,
	                    suppressMarkers: true,
	                    polylineOptions:{
	                        strokeColor:"#456ccc"
	                    }
	                });
	          }else {
	            console.log('Directions request failed due to ' + status);
	          }
	        });   
		    
		    console.log("Setting Location Successful !");	  
		    
		  }

		  $scope.watchLocation = function() {
	        navigator.geolocation.getCurrentPosition(function (position) {
	            marker.setPosition(
	                new google.maps.LatLng(
	                    position.coords.latitude,
	                    position.coords.longitude)
	            );
	            myLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

	            var end = new google.maps.LatLng($scope.selectedResponderDetails[0].latitude, $scope.selectedResponderDetails[0].longitude);
	            console.log(myLatLng + " " + end);

	            directionRequest = {
	                origin:myLatLng,
	                destination: end ,
	                avoidHighways:true,
	                travelMode: google.maps.TravelMode.DRIVING
	            };

	            directionsService.route(directionRequest, function(response, status) {
	              if (status == google.maps.DirectionsStatus.OK) {
	                    directionsDisplay.setDirections(response);
	                    directionsDisplay.setMap(map);
	                    directionsDisplay.setOptions({
	                        preserveViewport: true,
	                        suppressMarkers: true,
	                        polylineOptions:{
	                            strokeColor:"#456ccc"
	                        }
	                    });
	              }else {
			            console.log('Directions request failed due to ' + status);
			          }
	            });   
	        },$scope.setLocationError);

	       	watch = setTimeout($scope.watchLocation,3000);
	    }

	    $scope.endWatchLocation = function(){
	    		clearTimeout(watch);
	    		responderService.setMapInitialize(false);
	    		console.log("WatchLocation Stopped !");
	    }

	    if( responderService.getMapInitialize() == true ){
	  		isMapInitialized = responderService.getMapInitialize();
	  		console.log( "Map is " +isMapInitialized );
	  		

	  		$scope.initializeMap();
	  	}
	} 

])


.controller('eventsController', [
	"$http",
	"$scope",
	"$state",
	function controller($http,$scope,$state){
		console.log("eventsController Running !");
	} 

])

