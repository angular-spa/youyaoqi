angular.module('rankModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('rank',{
		url:'/rank',
		templateUrl:'all/rank/rank.html',
		css:'all/rank/rank.css',
		controller:'rankCtrl'
	})
})
.service("rankData",["$http",function($http){
	this.get = function(url,suFn){
		return $http.get(url).success(suFn);
	};
}])
.controller('rankCtrl',['$scope','rankData','pubvar',function($scope,rankData,pubvar){
	var arrData = [];
	//内容
	var page = 15;
	rankList(page);
	function rankList (page) {
		rankData.get('http://m.u17.com/rank/list?page='+(page-15)+'&size=20',function(data){
			$scope.arrSpan = ["1","2","3"];
			var arrC = [];
			//漫画类型
			var arrGrounp = ["","少年","少女"];
			var arrTheme = ["","搞笑","魔幻","生活","恋爱","动作","科幻","战争","","推理","","恐怖","同人"]
			var arrTheme1 = [];
			for (i in data) {
				arrData.push(data[i])
			}
			$scope.arrRank = arrData;
			for (j in arrData) {
				
				
				var bg = $("<b class='bg'></b>")
				$(".rankListContent").append(bg);
				var top = 0;
//				$(".bg").each(function(k){
					top = 3.463*j+"rem"
					$(".bg").eq(j).css("margin-top",top)
//				});
				if (arrData[j].isVip == 4) {
					$(".bg").eq(j).css("background-image","url(all/colorComic/image/status_two.png)")
				}else if (arrData[j].isVip == 2) {
					$(".bg").eq(j).css("background-image","url(all/colorComic/image/status_three.png)")
				}
				
				
				
				arrC.push((arrData[j].clickWeek/10000).toFixed(1));
				//男女类型
				var grounp = arrGrounp[arrData[j].groupIds];
				//书籍类型
				var themeId = arrData[j].themeIds;
				//将类型id转换为数组
				var themeId1 = themeId.split(",");
				var theme;
				//判断长度为3，取前两个；
				if (themeId1.length==3 || themeId1.length==2) {
					theme = grounp+"/"+arrTheme[themeId1[0]]+"/"+arrTheme[themeId1[1]];
					arrTheme1.push(theme);
				}else{
					theme = grounp+"/"+arrTheme[themeId1[0]]
					arrTheme1.push(theme);
				}
			}
			$scope.arrT = arrTheme1;
			$scope.arrClickWeek = arrC;
			
			//点击跳转
			$scope.rankClick = function (i) {
				var id = arrData[i].comicId;
				sessionStorage.setItem("id",id);
				sessionStorage.setItem("flag","false")
			}
		});
	}
	//滚动加载
	var num = 0;
	var num1 = 0;
	$("#rankContent").on("scroll",function(){
//		console.log($(this).scrollTop());
//		console.log(this.scrollHeight+"a");
		var top = $(this).scrollTop();
		if (this.scrollHeight<=top+641) {
				page += 15;	
				rankList(page);
		}
	});
}])