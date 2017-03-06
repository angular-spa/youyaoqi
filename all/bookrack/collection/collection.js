angular.module('collectionModule',['ui.router'])
.config(function($stateProvider){
	$stateProvider
	.state('bookrack.collection',{
		url:'/collection',
		templateUrl:'all/bookrack/collection/collection.html',
		css:'all/bookrack/collection/collection.css',
		controller:'collectionCtrl'
	})
})
.controller('collectionCtrl',['$scope',function($scope){
	$('.bookrack_header_img').addClass('show');
	
	
	//给所有的checkbox设置点击事件
	$scope.checkStatus = function(obj){
		if($(obj.target).hasClass('checked')){
			$(obj.target).removeClass('checked');
		}else{
			$(obj.target).addClass('checked');
		}
	}
	
	/*取到当前账号的收藏数据*/
	getCollection();
	function getCollection(){
		if(sessionStorage.getItem('currentUser')){
			var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			$scope.collection = currentUser.collection;
		}
	}
	
	$scope.getUpdateTime = function(time){
		var date_ = new Date();
		date_.setTime(time*1000);
		var year = date_.getFullYear();
		var month = date_.getMonth();
		var day = date_.getDate();
		month%10!=month?month=month:month='0'+month;
		day%10!=day?day=day:day='0'+day;
		var dateStr = year+'-'+month+'-'+day;
		return dateStr;
	}
	
	flagToWhitch();
	function flagToWhitch(){
		sessionStorage.setItem('whitchFlag2','collection');
	}
	
}])
