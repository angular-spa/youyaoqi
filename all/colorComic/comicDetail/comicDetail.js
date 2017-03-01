angular.module('comicModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('comicDetail',{
		url:'/comicDetail',
		templateUrl:'all/colorComic/comicDetail/comicDetail.html',
		css:'all/colorComic/comicDetail/comicDetail.css',
		controller:'comicCtrl'
	})
})
.service("comicData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller('comicCtrl',['$scope','pubvar','comicData',function($scope){
	comicData.get().success()
}])
