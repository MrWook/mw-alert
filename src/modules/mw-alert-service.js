angular.module('mw-alert').service('mwAlertService', ['$rootScope', '$document', '$compile', '$timeout', 'mwAlertConfig', function($rootScope, $document, $compile, $timeout, mwAlertConfig){
	let parent_selector = mwAlertConfig.parent_selector;
	//set the directive inside the parent selector, default is body
	//I'm totally aware of the fact that you shouldn't use DOM manipulation outside of a directive but this is for a greater GOOD!
	let parent = angular.element($document[0].querySelector(parent_selector));
	$timeout(function(){
		angular.element(parent).injector().invoke(function($compile){
			let $scope = angular.element(parent).scope();
			parent.prepend($compile('<mw-alert></mw-alert>')($scope));
			// Finally, refresh the watch expressions in the new element
			$scope.$apply();
		});
	}, 0);

	let message;

	//set new alert
	let open = function(msg){
		//message need to be an object and has the properties text and type
		if(msg !== null && Array.isArray(msg) === false && typeof msg === 'object'){
			if(msg.text !== undefined && msg.type !== undefined){
				//destroy reference with angular.copy
				message = angular.copy(msg);
				$rootScope.$broadcast('mw-alert-opened', message);
			}else{
				//throw exception missing properties
			}
		}else{
			//throw exception is not an object
		}
	};

	//close the alert box
	let close = function(){
		message = undefined;
		$rootScope.$broadcast('mw-alert-closed', message);
	};

	return {
		open:  open,
		close: close
	};
}]);