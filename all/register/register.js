angular.module('registerModule',['ui.router'])
.config(function($stateProvider){
	$stateProvider
	.state('register',{
		url:'/register',
		templateUrl:'all/register/register.html',
		css:'all/register/register.css',
		controller:'registerCtrl'
	})
})
.controller('registerCtrl',['$scope',function($scope){
	//保存账号到localStorage--->user
	var userName;
	var psd;
	var userObj = {};
	$scope.saveUser = function(){
		userName = $('#usernamere').val();
		psd = $('#psdre').val();
		if(localStorage.getItem('user')){
			var localArr = JSON.parse(localStorage.getItem('user'));
			console.log(localArr);
			var flag = true;
			for(var i=0;i<localArr.length;i++){
				if(userName == localArr[i].userName){
					flag = false;
					break;
				}
			}
			if(flag){
				userObj.userName = userName;
				userObj.psd = psd;
				userObj.id = localArr.length;
				userObj.collection = [];
				localArr.push(userObj);
				localStorage.setItem('user',JSON.stringify(localArr));
			}
		}else{
			userObj.userName = userName;
			userObj.psd = psd;
			userObj.id = 0;
			userObj.collection = [];
			var localArr = [];
			localArr.push(userObj);
			localStorage.setItem('user',JSON.stringify(localArr));
		}
	}
}])
