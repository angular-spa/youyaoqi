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
			
			linee(data);
			
			
		})
	}
//	console.log(data)
	//得到排数

	function linee (data) {
		var count;
		if (data.length%3 == 0) {
			count = data.length/3;
			console.log(count);
		}else if (data.length%3 != 0) {
			count = data.length/3+1;
			console.log(count);
		}
		for (var k = 0 ; k <= count ; k ++) {
			var bg = $("<b class='bg'></b>");
			$(".line1").append(bg);
			var top = 0;
			top = 4.2*k+"rem"
			$(".bg").eq(k).css("margin-top",top)
			$(".bg").eq(0).css("display","none")
			$(".bg").eq(11).css("display","none")
		}
		//画线
		var lineJq = $("<div class='leftline'></div>");
		$(".line").append(lineJq);
		$(".leftline").css("height","660px")
	}
var num = 0
$("#upContent").on("scroll",function(){
	//滚动画线
	$(".leftline").css("height","660px")
	var top = 600 + $("#upContent").scrollTop() -10 + "px";
	$(".leftline").css("height",top)
	for (var i = 5 ; i <= 10 ; i ++) {
		var top = 0;
		top = 4.2*i+"rem"
		$(".bg").eq(i).css("margin-top",top);
	}
	if ($("#upContent").scrollTop() >= 240 && $("#upContent").scrollTop()<=250) {
		num++;
		if (num==1) {
//			$(".bg").remove();
//			linee(arrAll)
			page=15;
			mgList (page);
		}
	}
//	console.log($("#upContent").scrollTop());
});



}])