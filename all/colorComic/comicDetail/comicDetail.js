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
	$scope.flag = sessionStorage.getItem('flag');
//	获取单本漫画信息,显示在页面上
	comicData.get('http://m.u17.com/comic/'+sessionStorage.getItem('id')).success(function(res){
		$scope.comicDetailData = res;
		$scope.pay = res.accredit;
		$scope.timeDate = new Date($scope.comicDetailData.lastUpdateTime*1000).toLocaleDateString();
		$scope.timeDate = $scope.timeDate.replace(/\//g,'-');
		$scope.groupArr = ['少年','少女'];
		$scope.tagArr = $scope.tagArr = ['搞笑','魔幻','生活','恋爱','动作','科幻','战争','体育','推理','','恐怖','同人'];
		$scope.keyword = $scope.comicDetailData.themeIds;
		var the = $scope.keyword.split(",");
		var str="";
		for(var i=0;i<the.length;i++){
			if(i<the.length-1&&the[i]!=10){
				str = str+$scope.tagArr[the[i]-1]+"/";
			}else{
				str = str+$scope.tagArr[the[i]-1];
			}
		}
		if(str[str.length-1]=="/"){
			str = str.substring(0,str.length-1);
		}
		$scope.str = str;
		$scope.chapterNum = $scope.comicDetailData.chapterNum;
		var n=0;
		for(var i=Number($scope.chapterNum);i>0;i--){
			n++;
			if(n<8){
				($('<a href="javascript:void(0)" class="chapter">'+i+'</a>')).insertBefore($(".other"));
			}
			$(".show_chapter").append($('<a href="javascript:void(0)" class="chapter">'+i+'</a>'));
			if($scope.pay==3){
				$(".chapter").addClass("pay");
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
		sessionStorage.getItem('flag',"false");
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
				var item = $('<div class="comment_message">'+res[i].content+'</div><div class="reply_btn">回复</div><div class="clear"></div>');
				detail.append(info).append(item);
				liEle.append(img).append(detail);
				$(".comment_list").append(liEle);
			}
		})
		$scope.test = function(){
			console.log("test");
		}
	}
//	点击分享
	$scope.shore_way = function(){
		$(".shore_box").css("display","block");
		$(".shore_box").addClass("opacity");
	}
//	关闭分享
	$scope.closeShare=function(){
		$(".shore_box").css("display","none");
		$(".shore_box").removeClass("opacity");
	}
//	展开章节
	$scope.showAllChatper= function(){
		$(".chapter_black").css("display","block");
		$(".chapter_black").addClass("opacity");
	}
//	关闭完整章节
	$scope.closeChapter=function(){
		$(".chapter_black").css("display","none");
		$(".chapter_black").removeClass("opacity");
	}
//	进入时判断状态
	var loginflag = sessionStorage.getItem("loginflag");
	if(loginflag==undefined){
		loginflag="false";
	}
	checkStatus(loginflag);
	function checkStatus(loginflag){
		if(loginflag=="false"){
			$(".join_collec>a").removeClass("need");
			$(".join_collec>a:nth-of-type(2)").addClass("need");
			$(".read_start>a").removeClass("read");
			$(".read_start>a:first-of-type").addClass("read");
		}else if(loginflag=="true"){
			var current = JSON.parse(sessionStorage.getItem("currentUser"));
			var userArr = current.collection;
			var aim = false;
			if(userArr.length!=0){
				for(var i=0;i<userArr.length;i++){
					if(userArr[i].comicId==sessionStorage.getItem("id")){
						aim=true;
					}
				}
				if(aim){
					$(".join_collec>a").removeClass("need");
					$(".join_collec>a:nth-of-type(3)").addClass("need");
				}else{
					$(".join_collec>a").removeClass("need");
					$(".join_collec>a:nth-of-type(1)").addClass("need");
				}
			}else{
				$(".join_collec>a").removeClass("need");
				$(".join_collec>a:nth-of-type(1)").addClass("need");
			}
			var recent = current.recently;
			var lock = false;
			if(recent.length!=0){
				for(var i=0;i<recent.length;i++){
					if(recent[i].comicId==sessionStorage.getItem("id")){
						lock=true;
					}
				}
				if(lock){
					$(".read_start>a").removeClass("read");
					$(".read_start>a:nth-of-type(3)").addClass("read");
				}else{
					$(".read_start>a").removeClass("read");
					$(".read_start>a:nth-of-type(2)").addClass("read");
				}
			}else{
				$(".read_start>a").removeClass("read");
				$(".read_start>a:nth-of-type(2)").addClass("read");
			}
		}
	}
//	点击阅读
	$scope.join_recently=function(){
		var current = JSON.parse(sessionStorage.getItem("currentUser"));
		var recent = current.recently;
		recent.push($scope.comicDetailData);
		sessionStorage.setItem("currentUser",JSON.stringify(current));
		var totalStr = JSON.parse(localStorage.getItem('user'));
		for(var i=0;i<totalStr.length;i++){
			if(totalStr[i].userName == current.userName){
				totalStr.splice(i,1,current);
			}
		}
		localStorage.setItem("user",JSON.stringify(totalStr));
		checkStatus(loginflag);
	}
//	点击添加收藏
	$scope.join_collect=function(){
		var current = JSON.parse(sessionStorage.getItem("currentUser"));
		var userArr = current.collection;
		userArr.push($scope.comicDetailData);
		sessionStorage.setItem("currentUser",JSON.stringify(current));
		var totalStr = JSON.parse(localStorage.getItem('user'));
		for(var i=0;i<totalStr.length;i++){
			if(totalStr[i].userName == current.userName){
				totalStr.splice(i,1,current);
			}
		}
		localStorage.setItem("user",JSON.stringify(totalStr));
		checkStatus(loginflag);
		$(".success_collect").css("display","block");
	}
	
//	取消收藏功能
	$scope.remove_collect=function(){
		var current = JSON.parse(sessionStorage.getItem("currentUser"));
		var userArr = current.collection;
		for(var i=0;i<userArr.length;i++){
			if(userArr[i].comicId==$scope.comicDetailData.comicId){
				userArr.splice(i,1);
			}
		}
		sessionStorage.setItem("currentUser",JSON.stringify(current));
		var totalStr = JSON.parse(localStorage.getItem('user'));
		for(var i=0;i<totalStr.length;i++){
			if(totalStr[i].userName == current.userName){
				totalStr.splice(i,1,current);
			}
		}
		localStorage.setItem("user",JSON.stringify(totalStr));
		checkStatus(loginflag);
	}
	
//判断从哪个按钮点进登录界面的(user,bookrank)登录界面点击登录按钮时会将此值赋给ui-sref
	$scope.flagToWhitch = function(str){
		sessionStorage.setItem('whitchFlag',str);
	}
//	点击黑幕消失收藏成功
	$scope.removeThis=function(){
		$(".success_collect").css("display","none");
	}
//	判断显示后退
	if(sessionStorage.getItem("login")=="go"){
		$(".comic_top_bar>a").css("display","none");
		$(".comic_top_bar>a:last-of-type").css("display","block");
	}else{
		$(".comic_top_bar>a").css("display","none");
		$(".comic_top_bar>a:first-of-type").css("display","block");
	}
	$scope.removeItem = function(){
		sessionStorage.removeItem("login");
	}
}])
