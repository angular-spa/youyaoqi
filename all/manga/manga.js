angular.module('mangaModule',['ui.router','angularCSS','sonModule'])
.config(function($stateProvider){
	$stateProvider
	.state('manga',{
		url:'/manga',
		templateUrl:'all/manga/manga.html',
		css:'all/manga/manga.css',
		controller:'mangaCtrl'
	})
})
.service("mangaData1",["$http",function($http){
	this.get = function(){
		return $http.get("all/manga/data/data1.json");
	};
}])
.service("mangaData2",["$http",function($http){
	this.get = function(url,suFn){
		return $http.get(url).success(suFn);
	};
}])
.controller('mangaCtrl',['$scope','mangaData1','mangaData2','pubvar',function($scope,mangaData1,mangaData2,pubvar){
	var arrId = [10,9,1,5,8,2,3,4,6];
	mangaData1.get().success(function(data){
		$scope.arrImgs = data;
		console.log($scope.arrImgs);
		$scope.mgClick = function (i){
			var arrUrlId = [];
			arrUrlId.push(arrId[i]);
			localStorage.setItem("sonId",JSON.stringify(arrUrlId));
//			console.log(JSON.parse(localStorage.getItem("sonId")));
		}
});
//头部
	var topNum = 0;
	$(".sonHeaderList").on("touchstart",function(){
		mangaData2.get('all/manga/data/data2.json',function(data){
			console.log(data);
			$scope.arrTopList = data;
			$scope.topLClick =function (i) {
//				console.log(data[i].cartoonId);
				var arrTopId = [];
				arrTopId.push(data[i].cartoonId);
				localStorage.setItem("sonId",JSON.stringify(arrTopId));
//				console.log(JSON.parse(localStorage.getItem("sonId1")));

			}
		});
		
		topNum++;
		if (topNum%2!=0) {
			$(".topList").show();
			$(".sonHeaderList").css("background-image","url(all/manga/img/icon_history_bg.png)")
		}else{
			$(".topList").hide();
			$(".sonHeaderList").css("background-image","")
		}
	});
	//分享
	$(".mgHeader-share").on("touchstart",function(){
		$(".cover").show();
		$(".cover").on("touchstart",function(){
			$(".cover").hide();
		});
	});
}])
