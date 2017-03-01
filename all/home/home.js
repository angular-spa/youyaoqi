angular.module('homeModule',['ui.router','angularCSS','colorModule'])
.config(function($stateProvider){
	$stateProvider
	.state('home',{
		url:'/home',
		templateUrl:'all/home/home.html',
		css:'all/home/home.css',
		controller:'homeCtrl'
	})
})
.controller('homeCtrl',['$scope','pubvar',function($scope,pubvar){
	
}])
