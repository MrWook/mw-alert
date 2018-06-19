angular.module('mw-alert').service('mwAlertService', ['$rootScope', '$timeout', 'mwAlertConfig', function($rootScope, $timeout, mwAlertConfig){
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