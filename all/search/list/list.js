angular.module('listModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('list',{
		url:'/list',
		templateUrl:'all/search/list/list.html',
		css:'all/search/list/list.css',
		controller:'listCtrl'
	})
})
.service("listData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller("listCtrl",['$scope',function($scope){
	
}])
