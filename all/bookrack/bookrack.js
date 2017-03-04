angular.module('bookrackModule',['ui.router','collectionModule'])
.config(function($stateProvider){
	$stateProvider
	.state('bookrack',{
		url:'/bookrack',
		templateUrl:'all/bookrack/bookrack.html',
		css:'all/bookrack/bookrack.css',
		controller:'bookrackCtrl'
	})
})
.controller('bookrackCtrl',['$scope',function($scope){
	$scope.curflag = 1;
}])