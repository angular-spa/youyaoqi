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
		$scope.recommendList = res;
	})
	$scope.goDetail=function(id){
		sessionStorage.setItem("id",id);
		sessionStorage.setItem("flag","false");
	}
	$scope.changetheme=function(id){
		sessionStorage.setItem("type","theme");
		sessionStorage.setItem("sortId",id);
		switch (true){
			case id==1:sessionStorage.setItem("typeName","搞笑");
				break;
			case id==2:sessionStorage.setItem("typeName","魔幻");
				break;
			case id==3:sessionStorage.setItem("typeName","生活");
				break;
			case id==4:sessionStorage.setItem("typeName","恋爱");
				break;
			case id==5:sessionStorage.setItem("typeName","动作");
				break;
			case id==6:sessionStorage.setItem("typeName","科幻");
				break;
			case id==7:sessionStorage.setItem("typeName","战争");
				break;
			case id==8:sessionStorage.setItem("typeName","体育");
				break;
			case id==9:sessionStorage.setItem("typeName","推理");
				break;
			case id==11:sessionStorage.setItem("typeName","恐怖");
				break;
			case id==12:sessionStorage.setItem("typeName","同人");
				break;
			default:
				break;
		}
	}
	$scope.changeCategory=function(id){
		sessionStorage.setItem("type","category");
		sessionStorage.setItem("sortId",id);
		switch (true){
			case id==1:
				break;sessionStorage.setItem("typeName","少年");
			case id==2:
				break;sessionStorage.setItem("typeName","少女");
			case id==3:
				break;sessionStorage.setItem("typeName","耽美");
			case id==4:
				break;sessionStorage.setItem("typeName","四格");
			default:
				break;
		}
	}
	$scope.changeStatus=function(id){
		sessionStorage.setItem("type","status");
		sessionStorage.setItem("sortId",id);
		switch (true){
			case id==1:sessionStorage.setItem("typeName","完结");
				break;
			case id==2:sessionStorage.setItem("typeName","连载");
				break;
			case id==3:sessionStorage.setItem("typeName","VIP");
				break;
			case id==4:sessionStorage.setItem("typeName","付费");
				break;
			case id==5:sessionStorage.setItem("typeName","签约");
				break;
			default:
				break;
		}
	}
}])
