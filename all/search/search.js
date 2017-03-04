angular.module('searchModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('search',{
		url:'/search',
		templateUrl:'all/search/search.html',
		css:'all/search/search.css',
		controller:'searchCtrl'
	})
})
.controller('searchCtrl',['$scope',function($scope){
	
}])
