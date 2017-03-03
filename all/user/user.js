angular.module('userModule',['ui.router'])
.config(function($stateProvider){
	$stateProvider
	.state('user',{
		url:'/user',
		templateUrl:'all/user/user.html',
		css:'all/user/user.css',
		controller:'userCtrl'
	})
})
.controller('userCtrl',['$scope',function($scope){
	
	//获得当前登录的账号信息(用户名)
	getUserName();
	function getUserName(){
		if(sessionStorage.getItem('currentUser')){
			var userObj = JSON.parse(sessionStorage.getItem('currentUser'));
			console.log(userObj);
			$scope.userName = userObj.userName;
		}
	}
	
	$scope.exit = function(){
		if(sessionStorage.getItem('loginflag')&&sessionStorage.getItem('currentUser')){
			sessionStorage.setItem('loginflag',false);
			sessionStorage.setItem('currentUser','');
		}
	}
}])
