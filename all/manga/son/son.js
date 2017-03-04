angular.module('sonModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('son',{
		url:'/son',
		templateUrl:'all/manga/son/son.html',
		css:'all/manga/son/son.css',
		controller:'sonCtrl'
	})
})
.service("mangaData2",["$http",function($http){
	this.get = function(url,suFn){
		return $http.get(url).success(suFn);
	};
}])
.controller('sonCtrl',['$scope','pubvar','mangaData2',function($scope,pubvar,mangaData2){
	//取数据
	var id = JSON.parse(sessionStorage.getItem("id1"));
	
	mangaData2.get('http://m.u17.com/cartoon/series/'+id[0],function(data){
		all(data);
	});
	//内容
	function all (data){
		
		var arrVideo = [];
		console.log(data.data);
		var videoSrc1 = data.data.show[data.data.show.length-1][data.data.show[data.data.show.length-1].length-1].link;
		$(".sonVideo-box>video").attr("src",videoSrc1);
		var res = data.data.show;
		$(".sonVideo-box>p").text(res[res.length-1][res[res.length-1].length-1].name)
		$scope.arrQuarter = data.data.series;
		$scope.arrVideoList = data.data.show;
		//取预告片数据
		mangaData2.get('http://m.u17.com/cartoon/video/'+id[0],function(data1){
//			console.log(data1);
			if (data1!="") {
				var num = 0;
				for (m in data1) {
					num++;
					var aJq = $("<a></a>")
					aJq.text(num);
					$(".xg-video").append(aJq);
					$(".xg-video>a").eq(m).on("touchstart",function(){
						$(".xg-video>a").css("background","")
						$(this).css("background","yellow");
						$(".videoList>a").css("background","#9b9b9b");
						$(".sonVideo-box>video").attr("src",data1[m].link);
						$(".sonVideo-box>p").text(data1[m].name)
					});
//					console.log(data1[m])
				}
			}
		})
		//影片详情
		for (var j = 1 ; j <= 10 ; j ++) {
			var arrDetails = [];
			mangaData2.get('http://m.u17.com/cartoon/random/'+j,function(data){
//			console.log(data)
			arrDetails.push(data);
			localStorage.setItem("details",JSON.stringify(arrDetails));
		});
			var details = JSON.parse(localStorage.getItem("details"));
//			console.log(details);
			for (i in details) {
				for (k in details[i]) {
//					console.log(details[i][k]);
					if (details[i][k].cartoonId == id[0]) {
//						console.log(details[i][k].comicId)
						var threadId = details[i][k].threadId;
						$scope.arrMSG = details[i][k];
						var newTime = new Date();
						newTime.setTime(details[i][k].publishTime*1000);
						var year = newTime.getFullYear();
						var month = newTime.getMonth()+1;
						var day = newTime.getDate();
						var times = year+"-"+month+"-"+day
						$scope.arrTime = times;
						//漫画跳转
						var id1 = details[i][k].comicId;
//						console.log(id1)
						$scope.getComicId = function () {
							sessionStorage.setItem("id",id1);
//							console.log(sessionStorage.getItem("id"))
							sessionStorage.setItem("flag","true");
						}
						
						
						
						//评论
						mangaData2.get('http://m.u17.com/comment_other/list?threadId='+threadId+'&page=1&pageSize=',function(data1){
//							console.log(data1);
							$scope.arrDiscuss = data1;
							for (t in data1){
								var newTime = new Date();
								newTime.setTime(data1[t].createTime*1000);
								var year = newTime.getFullYear();
								var month = newTime.getMonth()+1;
								var day = newTime.getDate();
								var hour = newTime.getHours();
								var minute = newTime.getMinutes();
//								console.log(minute)
								var times = year+"-"+month+"-"+day+" "+hour+":"+minute
								$scope.arrUserTime = times;
							}
						})
						

					}
				}
			}
		}
		
		
		$scope.videoClick = function (i,j) {
//			console.log(data.data.show[i][j]);
			$(".sonVideo-box>p").text(data.data.show[i][j].name)
//			console.log(i)
			$(".sonVideo-box>video").attr("src",data.data.show[i][j].link);
//		视频剧集样式
			$(".videoList>a").css("background","#9b9b9b");
			$(".xg-video>a").css("background","#9b9b9b")
			$(".box>div:nth-of-type("+(i+1)+")>div>a:nth-of-type("+(j+1)+")").css("background","#9ebb2d");
		}
		
		
		
		//列表样式
		var dTLis = document.querySelectorAll(".sonDetail-tab>li");
		$(".sonDetail-tab>li").each(function(i){
			$(".sonDetail-tab>li").eq(0).css({
				background:"#99cb4b",
				color:"white"
			});
			$(".box").hide();
			$(".box").eq(0).css("display","block");
			$(this).on("touchstart",function(){
				//css样式
				$(".sonDetail-tab>li").css({
					background:"",
					color:""
				});
				$(this).css({
					background:"#99cb4b",
					color:"white"
				});
				//重置
				$(".box").hide();
				//联动
				$(".box").each(function(j){
					if(i==j){
//						console.log(j)
						$(".box").eq(j).show()
					}
				});
			});
		})
	
	}
	
	
	//头部
	var topNum = 0;
	$(".sonHeaderList").on("touchstart",function(){
		mangaData2.get('all/manga/data/data2.json',function(data){
			console.log(data);
			$scope.arrTopList = data;
			$scope.topLClick =function (i) {
//				console.log(data[i].cartoonId);
				var arrTopId = [];
				arrTopId.push(data[i].cartoonId);
				sessionStorage.setItem("id1",JSON.stringify(arrTopId));
//				console.log(JSON.parse(localStorage.getItem("sonId1")));

			}
		});
		topNum++;
		if (topNum%2!=0) {
			$(".topList").show();
			$(".sonHeaderList").css("background-image","url(all/manga/img/icon_history_bg.png)")
		}else{
			$(".topList").hide();
			$(".sonHeaderList").css("background-image","")
		}
	});
	//分享
	$(".sonHeader-share").on("touchstart",function(){
		$(".cover").show();
		$(".cover").on("touchstart",function(){
			$(".cover").hide();
		});
	});
}])
