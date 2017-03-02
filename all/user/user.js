angular.module('userModule',['ui.router'])
.config(function($stateProvider){
	$stateProvider
	.state('user',{
		url:'/user',
		templateUrl:'all/user/user.html',
		css:'all/user/user.css',
		controller:'userCtrl'
	})
})
.controller('userCtrl',['$scope',function($scope){
	
}])
