angular.module("myApp",["ui.router",'angularCSS','homeModule'])
.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise('/home')
})
.controller('indexCtrl',['$scope','$compile',function($scope,$compile){
	$scope.allBtnShow = function(){
		btnWhitchShow();
		$('#pop_tools_content').addClass('show');
		$('.pop-tools-box').removeClass('traisitionno').addClass('btnshow');
	}
	$scope.noShow = function(){
		$('.pop-tools-box').addClass('traisitionno').removeClass('btnshow');
		$('#pop_tools_content').removeClass('show');
	}
	
	$scope.flagToWhitch = function(str){
		sessionStorage.setItem('whitchFlag',str);
	}
	
	btnWhitchShow();
	function btnWhitchShow(){
		var a = $('.pl-shelf');
		if(sessionStorage.getItem('loginflag')){
			$scope.loginflag = sessionStorage.getItem('loginflag');
		}else{
			$scope.loginflag = 'false';
		}
		if($scope.loginflag=="false"){
			a.attr('ui-sref','login');
			$compile(a)($scope);
		}else{
			a.attr('ui-sref','bookrack');
			$compile(a)($scope);
		}
	}
}])
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

