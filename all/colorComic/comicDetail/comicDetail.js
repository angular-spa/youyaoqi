angular.module('comicModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('comicDetail',{
		url:'/comicDetail',
		templateUrl:'all/colorComic/comicDetail/comicDetail.html',
		css:'all/colorComic/comicDetail/comicDetail.css',
		controller:'comicCtrl'
	})
})
.service("comicData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller('comicCtrl',['$scope','comicData',function($scope,comicData){
//	获取单本漫画信息,显示在页面上
	comicData.get('http://m.u17.com/comic/'+sessionStorage.getItem('id')).success(function(res){
		$scope.comicDetailData = res;
		$scope.timeDate = new Date($scope.comicDetailData.lastUpdateTime*1000).toLocaleDateString();
		$scope.timeDate = $scope.timeDate.replace(/\//g,'-');
		$scope.groupArr = ['少年','少女'];
		$scope.tagArr = ['搞笑','魔幻','生活','','动作','科幻','','体育','','恋爱','恐怖','同人'];
		$scope.keyword = $scope.comicDetailData.themeIds;
		var the = $scope.keyword.split(",");
		var str="";
		for(var i=0;i<the.length;i++){
			if(i<the.length-1){
				str = str+$scope.tagArr[the[i]-1]+"/";
			}else{
				str = str+$scope.tagArr[the[i]-1];
			}
		}
		$scope.str = str;
		$scope.chapterNum = $scope.comicDetailData.chapterNum;
		var n=0;
		for(var i=Number($scope.chapterNum);i>0;i--){
			n++;
			if(n<8){
				$(".chapter-box").append($('<a href="javascript:void(0)" class="chapter">'+i+'</a>'));
			}else if(n==8){
				$(".chapter-box").append($('<a href="javascript:void(0)" class="chapter other"></a>'));
			}
		}
	})
	
//	获取单独数据和评论数据显示
	comicData.get('http://m.u17.com/comment/thread/'+sessionStorage.getItem('id')).success(function(res){
		$scope.countId = res.threadId;
		comicData.get('http://m.u17.com/comment/count/'+$scope.countId).success(function(res){
			$scope.count = res.data.count;
		})
		$scope.page = 1;
		scrollPush($scope.countId,$scope.page);
		$(".comic_inner>div").scroll(function(){
			var scLong = $('body').scroll().height()+$(this).scrollTop();
			var limitLong = Number($(".comic_scroll_view").height());
			if(scLong>limitLong){
				$scope.page++;
				scrollPush($scope.countId,$scope.page);
			}
		})
	})
	var z=0;
	$scope.rotate = function(event){
		if(z==0){
			$(event.target).addClass("top");
			z=1;
			$($(event.target).prev()).addClass("push");
		}else{
			$(event.target).removeClass("top");
			z=0;
			$($(event.target).prev()).removeClass("push");
		}
	}
	
//	猜你喜欢
	comicData.get('http://m.u17.com/fav/recommend?num=3').success(function(res){
		$scope.recommend = res;
	})
	
//	点击切换页面保存id
	$scope.goDetail=function(id){
		sessionStorage.setItem("id", id);
	}
	
//	控制评论字数
	$scope.limit=150;
	$scope.changeText=function(){
		console.log($scope.text.length);
		if($scope.text.length>=150){
			$scope.text = $scope.text.substr(0,150);
		}
		$scope.limit = 150-$scope.text.length;
	}
	
//	滚动添加事件
	function scrollPush(countId,page){
		comicData.get('http://m.u17.com/comment/list?threadId='+countId+'&page='+page+'&pageSize=5').success(function(res){
			for(var i=0;i<res.length;i++){
				var liEle = $("<li></li>");
				var img = $("<div class='reader_img'></div>").css("background-image","url("+res[i].xxMember.face+")");
				var time = new Date(res[i].createTime*1000).toLocaleString();
				var detail = $("<div class='reader_detail'></div>");
				var info = $('<div class="reader_info">'+
								'<span class="reader_name">'+res[i].xxMember.nickname+'</span>'+
								'<span class="reader_time">'+time+'</span>'+
							'</div>');
				var item = $('<div class="comment_message">'+res[i].content+'</div><div class="reply_btn">回复</div>');
				detail.append(info).append(item);
				liEle.append(img).append(detail);
				$(".comment_list").append(liEle);
			}
		})
	}
}])
