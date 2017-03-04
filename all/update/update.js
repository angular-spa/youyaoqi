angular.module('upDateModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('update',{
		url:'/update',
		templateUrl:'all/update/update.html',
		css:'all/update/update.css',
		controller:'updateCtrl'
	})
})
.service("updateData",["$http",function($http){
	this.get = function(url,suFn){
		return $http.get(url).success(suFn);
	};
}])
.controller('updateCtrl',['$scope','updateData','pubvar',function($scope,updateData,pubvar){
	var page = 0;
	mgList (page);
	var arrAll = [];
	function mgList (page) {
		updateData.get('http://m.u17.com/update/list/0?page='+page+'&pageSize=15',function(data){
			console.log(data);
			for (j in data) {
				arrAll.push(data[j]);
			}
			$scope.arrList = arrAll;
			$scope.listClick = function (i) {
				var id = data[i].comicId;
				sessionStorage.setItem("id",id);
				sessionStorage.setItem("flag","false");
			}
			
			
			
		})
	}
	console.log(arrAll)
	//得到排数
	line();
	function line () {
		var count;
		if (arrAll.length%3 == 0) {
			count = arrAll.length/3;
			console.log(count);
		}else if (arrAll.length%3 != 0) {
			count = arrAll.length/3+1;
			console.log(count);
		}
		for (var k = 0 ; k < count ; k ++) {
			var lineJq = $("<div class='leftline'></div>");
			$(".line").append(lineJq);
		}
	
	}
var num = 0
$("#upContent").on("scroll",function(){
	
	if ($("#upContent").scrollTop() >= 240 && $("#upContent").scrollTop()<=250) {
		num++;
		if (num==1) {
//			$(".line").html();
//			line()
			page=15;
			mgList (page);
		}
	}
//	console.log($("#upContent").scrollTop());
});



}])