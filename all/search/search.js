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
.service("searchData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller('searchCtrl',['$scope','searchData',function($scope,searchData){
	searchData.get("http://m.u17.com/fav/recommend?num=7").success(function(res){
		console.log(res);
		$scope.recommendList = res;
	})
	$scope.goDetail=function(id){
		sessionStorage.setItem("id",id);
		sessionStorage.setItem("flag","false");
	}
	$scope.changetheme=function(id){
		sessionStorage.setItem("type","theme");
		sessionStorage.setItem("sortId",id);
	}
	$scope.changeCategory=function(id){
		sessionStorage.setItem("type","category");
		sessionStorage.setItem("sortId",id);
	}
	$scope.changeStatus=function(id){
		sessionStorage.setItem("type","status");
		sessionStorage.setItem("sortId",id);
	}
}])
