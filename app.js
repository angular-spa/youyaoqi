angular.module("myApp",["ui.router",'angularCSS','homeModule'])
.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise('/home')
})
.factory('pubvar',function(){
	return {
		
	}
})

size = $(window).width()/16;
$("html").css("font-size",size);
$(window).resize(function(){
	size = $(window).width()/16;
	$("html").css("font-size",size);
})

