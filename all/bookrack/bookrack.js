angular.module('bookrackModule',['ui.router','collectionModule'])
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
	$scope.selflag = true;
	
	$state.go('bookrack.collection');
	$scope.curflag = 1;
	$scope.delShowSlag = true;
	$scope.delShow = function(){
		$scope.delShowSlag = !$scope.delShowSlag;
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
		console.log(idArr);
		if(sessionStorage.getItem('currentUser')){
			var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			var collection = currentUser.collection;
			console.log(collection);
			for(var j=0;j<idArr.length;j++){
				console.log('进来了');
				for(var i=0;i<collection.length;i++){
					if(collection[i].comicId == idArr[j]){
						collection.splice(i,1);
					}
				}
			}
			sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
		}
	}
}])