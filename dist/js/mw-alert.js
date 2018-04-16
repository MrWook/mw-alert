/**
 * @version v1.0.1
 * @link https://github.com/MrWook/mw-alert
 * @license MIT
 * Copyright (c) 2018 MrWook
 */
'use strict';
(function(ng, undefined){
angular.module('mw-alert', ['mw-alert-template']);
angular.module('mw-alert').constant('mwAlertConfig', {
	parent_selector: 'body',
	timeout: 3000,
	close_auto: true,
	templateUrl: 'mw-alert.html'
});

angular.module('mw-alert').directive('mwAlert', ['$timeout', 'mwAlertService', 'mwAlertConfig', function ($timeout, mwAlertService, mwAlertConfig) {
	return {
		controller: ['$scope', function AlertCtrl($scope) {
			//bind close function
			$scope.close = mwAlertService.close;

			//listen for deleted event and set message
			$scope.$on('mw-alert-closed', function (event, message) {
				$scope.message = message;
			});

			//listen for open event and set message
			$scope.$on('mw-alert-opened', function (event, message) {
				$scope.message = message;
			});
		}],
		restrict: 'E',
		$scope: true,
		templateUrl: function templateUrl(params, attr) {
			if (attr.mwAlertTemplateUrl !== undefined) {
				return attr.mwAlertTemplateUrl;
			} else {
				return mwAlertConfig.templateUrl;
			}
		},
		replace: true
	};
}]);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('mw-alert').service('mwAlertService', ['$rootScope', '$document', '$compile', '$timeout', 'mwAlertConfig', function ($rootScope, $document, $compile, $timeout, mwAlertConfig) {
	var parent_selector = mwAlertConfig.parent_selector;
	//set the directive inside the parent selector, default is body
	//I'm totally aware of the fact that you shouldn't use DOM manipulation outside of a directive but this is for a greater GOOD!
	var parent = angular.element($document[0].querySelector(parent_selector));
	$timeout(function () {
		//create new scope object for the compile directive
		var $scope = $rootScope.$new();
		parent.prepend($compile('<mw-alert></mw-alert>')($scope));
		// // Finally, refresh the watch expressions in the new element
		// $scope.$digest();
	}, 0);

	var message = void 0;
	var debounce = null;
	//set new alert
	var open = function open(msg) {
		//message need to be an object and has the properties text and type
		if (msg !== null && Array.isArray(msg) === false && (typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
			if (msg.text !== undefined && msg.type !== undefined) {
				//destroy reference with angular.copy
				message = angular.copy(msg);
				$rootScope.$broadcast('mw-alert-opened', message);
				//check if auto close is active
				if (message.close_auto !== undefined && message.close_auto == true || message.close_auto === undefined && mwAlertConfig.close_auto) {
					var timeout = mwAlertConfig.timeout;
					//check if timeout is set and is a number
					if (message.timeout !== undefined && typeof data === 'number' && data % 1 === 0) {
						timeout = message.timeout;
					}

					if (debounce !== null) {
						$timeout.cancel(debounce);
					}
					debounce = $timeout(function () {
						close();
						debounce = null;
					}, timeout).catch(function () {});
				}
			} else {
				throw new Error("The message for mw-alert need to have the properties 'type' and 'text'");
			}
		} else {
			throw new Error("The message for mw-alert need to be an object.");
		}
	};

	//close the alert box
	var close = function close() {
		message = undefined;
		$rootScope.$broadcast('mw-alert-closed', message);
	};

	return {
		open: open,
		close: close
	};
}]);

angular.module("mw-alert-template", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("mw-alert.html",
		"<div class=\"mw-alert\" ng-class=\"'alert-' + (message.type || 'warning')\" ng-if=\"message != undefined\"><div class=\"mw-alert-text\">{{message.text}}</div><button type=\"button\" class=\"mw-alert-close\" ng-click=\"close()\" aria-hidden=\"false\"><span aria-hidden=\"true\">×</span></button></div>");
}]);

})();
//# sourceMappingURL=mw-alert.js.map