angular.module('loginModule',['ui.router','registerModule'])
.config(function($stateProvider){
	$stateProvider
	.state('login',{
		url:'/login',
		templateUrl:'all/login/login.html',
		css:'all/login/login.css',
		controller:'loginCtrl'
	})
})
.controller('loginCtrl',['$scope','$state',function($scope,$state){
	
	//登录
	var userName;
	var psd;
	var url_ = '';
	$scope.login = function(){
		var path = decodeURI(location.pathname);
		var origin = location.origin;
		userName = $('#username').val();
		psd = $('#psd').val();
		if(localStorage.getItem('user')){
			var localArr = JSON.parse(localStorage.getItem('user'));
			for(var i=0;i<localArr.length;i++){
				if(userName == localArr[i].userName && psd == localArr[i].psd){
					sessionStorage.setItem('loginflag',true);
					sessionStorage.setItem('currentUser',JSON.stringify(localArr[i]));
					url_ = sessionStorage.getItem('whitchFlag');

					location.href = origin+path+'#/'+url_;
					if(url_=="comicDetail"){
						sessionStorage.setItem("login","go");
					}
					break;
				}
			}
		}
	}

}])
