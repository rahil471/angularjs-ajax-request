(function(){
	angular.module('myapp',[])
	
	//define controller and inject $http service as dependency.
	.controller('axajCtrl',['$http','$scope',function($http,$scope){ 
		$http.get('extras/data.json').success(function(response){ //make a get request to mock json file.
			$scope.data = response; //Assign data recieved to $scope.data
		})
		.error(function(err){
			//handel error
		})
	}])
	
	//afactory to consume webservices and return data to controllers.
	.factory('webServices',['$http',function($http){
		return {
			getFriends : function(){
				return 	$http.get('extras/data.json').then(function(response){ //wrap it inside another promise using then
							return response.data.friends;  //only return friends 
						});
			}
		}
	}])
	//define controller and inject webServices service as dependency.
	.controller('prefferedCtrl',['webServices','$scope',function(webServices,$scope){ 
		webServices.getFriends().then(function(response){ 
			$scope.friends = response; //Assign data received to $scope.data
		});
	}])

})();