angular.module('mangaModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('home.manga',{
		url:'/manga',
		templateUrl:'all/home/manga/manga.html',
		css:'all/home/manga/manga.css',
		controller:'mangaCtrl'
	})
})
.controller('mangaCtrl',['$scope','pubvar',function($scope,pubvar){
	console.log("11")
}])
