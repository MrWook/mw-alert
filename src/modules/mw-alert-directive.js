angular.module('mw-alert').directive('mwAlert', ['$timeout', 'mwAlertService', 'mwAlertConfig', function($timeout, mwAlertService, mwAlertConfig){
	return {
		controller:  ['$scope', function AlertCtrl($scope){
			//bind close function
			$scope.close = mwAlertService.close;

			//listen for deleted event and set message
			$scope.$on('mw-alert-closed', function(event, message){
				$scope.message = message;
			});

			//listen for open event and set message
			$scope.$on('mw-alert-opened', function(event, message){
				$scope.message = message;
				//check if auto close is active
				if((message.close_auto !== undefined && message.close_auto == true) || (message.close_auto === undefined && mwAlertConfig.close_auto)){
					let timeout = mwAlertConfig.timeout;
					//check if timeout is set and is a number
					if(message.timeout !== undefined && typeof data === 'number' && (data%1) === 0){
						timeout = message.timeout;
					}
					$timeout(function(){
						$scope.close();
					}, timeout);
				}
			});
		}],
		restrict:    'E',
		$scope:      true,
		templateUrl: function(params, attr){
			if(attr.mwAlertTemplateUrl !== undefined){
				return attr.mwAlertTemplateUrl;
			}else{
				return mwAlertConfig.templateUrl;
			}

		},
		replace:     true
	};
}]);