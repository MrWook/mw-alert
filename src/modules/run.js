angular.module('mw-alert').run(['$rootScope', '$document', '$compile', '$timeout', 'mwAlertConfig', function($rootScope, $document, $compile, $timeout, mwAlertConfig){
	let parent_selector = mwAlertConfig.parent_selector;
	//set the directive inside the parent selector, default is body
	//I'm totally aware of the fact that you shouldn't use DOM manipulation outside of a directive but this is for a greater GOOD!
	let parent = angular.element($document[0].querySelector(parent_selector));
	$timeout(function(){
		//create new scope object for the compile directive
		let $scope = $rootScope.$new();
		parent.prepend($compile('<mw-alert></mw-alert>')($scope));
	}, 0);
}]);