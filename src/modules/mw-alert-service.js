angular.module('mw-alert').service('mwAlertService', ['$rootScope', '$document', '$compile', '$timeout', 'mwAlertConfig', function($rootScope, $document, $compile, $timeout, mwAlertConfig){
	let parent_selector = mwAlertConfig.parent_selector;
	//set the directive inside the parent selector, default is body
	//I'm totally aware of the fact that you shouldn't use DOM manipulation outside of a directive but this is for a greater GOOD!
	let parent = angular.element($document[0].querySelector(parent_selector));
	$timeout(function(){
		//create new scope object for the compile directive
		let $scope = $rootScope.$new();
		parent.prepend($compile('<mw-alert></mw-alert>')($scope));
		//the $timeout service call $digest by itself so its not necessary at this point
		// $scope.$digest();
	}, 0);

	let message;
	let debounce = null;
	//set new alert
	let open     = function(msg){
		//message need to be an object and has the properties text and type
		if(msg !== null && Array.isArray(msg) === false && typeof msg === 'object'){
			if(msg.text !== undefined && msg.type !== undefined){
				//destroy reference with angular.copy
				message = angular.copy(msg);
				$rootScope.$broadcast('mw-alert-opened', message);
				//check if auto close is active
				if((message.close_auto !== undefined && message.close_auto == true) || (message.close_auto === undefined && mwAlertConfig.close_auto)){
					let timeout = mwAlertConfig.timeout;
					//check if timeout is set and is a number
					if(message.timeout !== undefined && typeof data === 'number' && (data%1) === 0){
						timeout = message.timeout;
					}

					if(debounce !== null){
						$timeout.cancel(debounce);
					}
					debounce = $timeout(function(){
						close();
						debounce = null;
					}, timeout).catch(function(){
					});
				}
			}else{
				throw new Error("The message for mw-alert need to have the properties 'type' and 'text'");
			}
		}else{
			throw new Error("The message for mw-alert need to be an object.");
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