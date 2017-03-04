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
					console.log("登陆成功");
					sessionStorage.setItem('loginflag',true);
					sessionStorage.setItem('currentUser',JSON.stringify(localArr[i]));
					url_ = sessionStorage.getItem('whitchFlag');
<<<<<<< HEAD
					if(url_=='bookrack'){
						location.replace(origin+path+'#/bookrack/collection');
						break;
					}
					location.replace(origin+path+'#/'+url_);
=======
					location.href = origin+path+'#/'+url_;
					if(url_=="comicDetail"){
						sessionStorage.setItem("login","go");
					}
>>>>>>> bdb03a2981589a3aa3d26810de4c8fb72fc06098
					break;
				}
			}
		}
	}
	$scope.regi = function(){
		var path = decodeURI(location.pathname);
		var origin = location.origin;
		location.replace(origin+path+'#/register');
	}
}])
