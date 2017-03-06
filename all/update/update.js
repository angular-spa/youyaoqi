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
			for (j in data) {
				arrAll.push(data[j]);
			}
			$scope.arrList = arrAll;
			$scope.listClick = function (i) {
				var id = arrAll[i].comicId;
				sessionStorage.setItem("id",id);
				sessionStorage.setItem("flag","false");
			}
			
			linee(data);
			
			
		})
	}
//	console.log(data)
	//得到排数
	var count;
	var height;
	function linee (data) {
		if (data.length%3 == 0) {
			count = data.length/3;
//			console.log(count);
		}else if (data.length%3 != 0) {
			count = data.length/3+1;
//			console.log(count);
		}
			var top = 0;
		for (var k = 0 ; k <= count ; k ++) {
			var bg = $("<b class='bg'></b>");
			$(".line1").append(bg);
			top = 4.3*k+"rem"
			$(".bg").eq(k).css("margin-top",top)
			$(".bg").eq(0).css("display","none")
		}
		//画线
//		console.log(top)
		height = 5.2*count + "rem"
		var lineJq = $("<div class='leftline'></div>");
		$(".line").append(lineJq);
		$(".leftline").css("height",height)
	}
var num = 0
$("#upContent").on("scroll",function(){
	//滚动画线
	var height = this.scrollHeight;
	var top = 600 + $("#upContent").scrollTop() -20 + "px";
	$(".leftline").css("height",height-100)
	
	var top = $(this).scrollTop();
//	console.log(this.scrollHeight+"a");
	if (this.scrollHeight <= top + 640) {
		page += 15;
		mgList (page);
	}else {
		for (var i = 5 ; i <=(height/183)+1 ; i ++) {

			var top = 0;
			top = 4.3*i+"rem"
			$(".bg").eq(i).css("margin-top",top);
			if (i > 18) {
				for (var i = 18 ; i <=(height/183)+3 ; i ++) {
					var top = 0;
					top = 4.3*i+"rem"
					$(".bg").eq(i).css("margin-top",top);
				}
				
			}
		}
	}
});



}])