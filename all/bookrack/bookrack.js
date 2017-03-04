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
}])