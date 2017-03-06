angular.module('bookrackModule',['ui.router','collectionModule','readModule'])
.config(function($stateProvider){
	$stateProvider
	.state('bookrack',{
		url:'/bookrack',
		templateUrl:'all/bookrack/bookrack.html',
		css:'all/bookrack/bookrack.css',
		controller:'bookrackCtrl'
	})
})
.controller('bookrackCtrl',['$scope','$state',function($scope,$state){
	$scope.curflag = 1;
	$scope.selflag = true;
	
	//默认打开收藏
	if(sessionStorage.getItem('whitchFlag2')){
		var whitchFlag2 = sessionStorage.getItem('whitchFlag2');
		console.log(whitchFlag2);
		if(whitchFlag2=='collection'){
			$scope.curflag = 1;
		}else{
			$scope.curflag = 2;
		}
		$state.go('bookrack.'+whitchFlag2);
	}else{
		$state.go('bookrack.collection');
	}
	
	
	$scope.delShow = function(){
		if($('.bookrack_header_img').hasClass('show')){
			$('.bookrack_header_img').removeClass('show');
		}else{
			$('.bookrack_header_img').addClass('show');
		}
		if($('.del-choose').hasClass('show')){
			$('.del-choose').removeClass('show');
		}else{
			$('.del-choose').addClass('show');
		}
		if($('.book-list').hasClass('aniShow')){
			$('.book-list').removeClass('aniShow');
		}else{
			$('.book-list').addClass('aniShow');		
		}
	}
	
	//全选 或者 全不选
	$scope.selectAndCancel = function(flag,obj){
		if(flag){
			$('.checkbox').addClass('checked');
			$(obj.target).text('取消');
			$scope.selflag = !$scope.selflag;
		}else{
			$('.checkbox').removeClass('checked');
			$(obj.target).text('全选');
			$scope.selflag = !$scope.selflag;
		}
	}
	
	//删除功能
	$scope.del = function(){
		var allDel = $('.checkbox.checked').parents('li');
		var idArr = [];
		allDel.each(function(){
			var comidId = $(this).attr('comicId');
			idArr.push(comidId);
		});
		//先从currentUser中删除
		delCollection(idArr)
		//在将页面元素删除
		allDel.remove();
	}
	
	//从sessionStorage 的 currentUser 的 collection数组里面删除选中的数据
	function delCollection(idArr){
		if(sessionStorage.getItem('currentUser')){
			var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			var collection = currentUser.collection;
			for(var j=0;j<idArr.length;j++){
				for(var i=0;i<collection.length;i++){
					if(collection[i].comicId == idArr[j]){
						collection.splice(i,1);
					}
				}
			}
			sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
		}
	}
	
	//返回前一页功能
	$scope.returnLastPage = function(){
		var path = decodeURI(location.pathname);
		var origin = location.origin;
//		history.back();
		if(sessionStorage.getItem('whitchFlag')){
			var whitchFlag = sessionStorage.getItem('whitchFlag');
			console.log(whitchFlag);
			if(whitchFlag=='user'){
				location.href = origin+path+'#/user';
			}else{
				location.href = origin+path+'#/home';
			}
		}
	}
	
	
//	//二级路由切换页面replace
//	$scope.changePage = function(num){
//		var path = decodeURI(location.pathname);
//		var origin = location.origin;
//		$scope.curflag = num;
//		if(num==1){
//			location.replace(origin+path+'#/bookrack/collection');
//		}else{
//			location.replace(origin+path+'#/bookrack/read');
//		}
//	}
}])