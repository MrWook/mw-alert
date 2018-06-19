'use strict';
angular.module('app', ["mw-alert", "ngAnimate"]);

angular.module('app').config(['mwAlertConfig', function(mwAlertConfig){
	mwAlertConfig.parent_selector = 'body';
	mwAlertConfig.timeout = 1500;
	mwAlertConfig.close_auto = true;
	mwAlertConfig.templateUrl = 'mw-alert.html';
}]);

angular.module('app').controller('MainCtrl', ['$scope', 'mwAlertService', function($scope, mwAlertService){
	$scope.message = {};
	$scope.message.type = 'success';
	$scope.open = function(){
		$scope.message.close_auto = false;
		mwAlertService.open($scope.message);
	};
}]);