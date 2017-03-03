angular.module("myApp",["ui.router",'angularCSS','homeModule'])
.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise('/home')
})
.factory('pubvar',function(){
	return {
		id:0
	}
})

size = $(window).width()/10;
$("html").css("font-size",size);
$(window).resize(function(){
	size = $(window).width()/10;
	$("html").css("font-size",size);
})
