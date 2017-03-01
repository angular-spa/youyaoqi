angular.module('sonModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('son',{
		url:'/son',
		templateUrl:'all/manga/son/son.html',
		css:'all/manga/son/son.css',
		controller:'sonCtrl'
	})
})
.controller('sonCtrl',['$scope','pubvar',function($scope,pubvar){
	var video = JSON.parse(localStorage.getItem("son"));
	console.log(video);
	$scope.arrVideo = video;
	document.getElementById("sonVideo-box").src = video[0].vSrc;
	var dTLis = document.querySelectorAll(".sonDetail-tab>li");
	console.log($(".sonDetail-tab>li"));
	$(".sonDetail-tab>li").each(function(i){
		$(this).on("touchstart",function(){
			$(this).css("color","white")
		});
	})
}])
