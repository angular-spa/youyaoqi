angular.module('readModule',['ui.router'])
.config(function($stateProvider){
	$stateProvider
	.state('bookrack.read',{
		url:'/read',
		templateUrl:'all/bookrack/read/read.html',
		css:'all/bookrack/read/read.css',
		controller:'readCtrl'
	})
})
.controller('readCtrl',['$scope',function($scope){
	
}])
