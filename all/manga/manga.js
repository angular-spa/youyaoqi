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
//			console.log(arrId[i]);
			var arrVideo = [];
			mangaData2.get('http://m.u17.com/cartoon/series/'+arrId[i],function(data){
//				console.log(data.data.show);
				var videoSrc = data.data.show[0][data.data.show.length-1].link;
				var video = {vSrc:videoSrc};
				arrVideo.push(video);
				localStorage.setItem("son",JSON.stringify(arrVideo));
//				console.log(JSON.parse(localStorage.getItem("son")))
			});
		}
});
}])
