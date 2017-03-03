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
	
}])
