angular.module('searchModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('search',{
		url:'/search',
		templateUrl:'all/search/search.html',
		css:'all/search/search.css',
		controller:'searchCtrl'
	})
})
.service("searchData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller('searchCtrl',['$scope','searchData',function($scope,searchData){
	searchData.get("http://m.u17.com/fav/recommend?num=7").success(function(res){
		$scope.recommendList = res;
	})
	$scope.goDetail=function(id){
		sessionStorage.setItem("id",id);
		sessionStorage.setItem("flag","false");
	}
	$scope.changetheme=function(id){
		sessionStorage.setItem("type","theme");
		sessionStorage.setItem("sortId",id);
		switch (true){
			case id==1:sessionStorage.setItem("typeName","搞笑");
				break;
			case id==2:sessionStorage.setItem("typeName","魔幻");
				break;
			case id==3:sessionStorage.setItem("typeName","生活");
				break;
			case id==4:sessionStorage.setItem("typeName","恋爱");
				break;
			case id==5:sessionStorage.setItem("typeName","动作");
				break;
			case id==6:sessionStorage.setItem("typeName","科幻");
				break;
			case id==7:sessionStorage.setItem("typeName","战争");
				break;
			case id==8:sessionStorage.setItem("typeName","体育");
				break;
			case id==9:sessionStorage.setItem("typeName","推理");
				break;
			case id==11:sessionStorage.setItem("typeName","恐怖");
				break;
			case id==12:sessionStorage.setItem("typeName","同人");
				break;
			default:
				break;
		}
	}
	$scope.changeCategory=function(id){
		sessionStorage.setItem("type","category");
		sessionStorage.setItem("sortId",id);
		switch (true){
			case id==1:
				break;sessionStorage.setItem("typeName","少年");
			case id==2:
				break;sessionStorage.setItem("typeName","少女");
			case id==3:
				break;sessionStorage.setItem("typeName","耽美");
			case id==4:
				break;sessionStorage.setItem("typeName","四格");
			default:
				break;
		}
	}
	$scope.changeStatus=function(id){
		sessionStorage.setItem("type","status");
		sessionStorage.setItem("sortId",id);
		switch (true){
			case id==1:sessionStorage.setItem("typeName","完结");
				break;
			case id==2:sessionStorage.setItem("typeName","连载");
				break;
			case id==3:sessionStorage.setItem("typeName","VIP");
				break;
			case id==4:sessionStorage.setItem("typeName","付费");
				break;
			case id==5:sessionStorage.setItem("typeName","签约");
				break;
			default:
				break;
		}
	}
	$scope.searchComic=function(event){
		var k = $scope.keywords;
		var p = 1;
		$(".comic_sort").css("display","none");
		$(".reco_list").css("display","none");
		$(".search_post_list").css("display","block");
		if(k!=""){
			$.post("http://m.u17.com/search/comic/",{key:k,page:p},function(res){
				var groupArr = ['少年','少女'];
				var tagArr = $scope.tagArr = ['搞笑','魔幻','生活','恋爱','动作','科幻','战争','体育','推理','','恐怖','同人'];
				var searchList = JSON.parse(res).comics;
				console.log(searchList);
				console.log(searchList);
				for(var i=0;i<searchList.length;i++){
					var liEle = $("<li></li>");
					var aEle = $('<a ui-sref="comicDetail" ng-click="goDetail(obj.comicId)"></a>')
					var boxEle = $('<div class="search_detail_box"></div>');
					if(searchList[i].seriesStatus==1){
						boxEle.addClass("typeFour");
					}else{
						if(searchList[i].accredit==0||searchList[i].accredit==1){
							boxEle.addClass("typeOne");
						}else if(searchList[i].accredit==0){
							boxEle.addClass("typeTwo");
						}else{
							boxEle.addClass("typeThree");
						}
					}
					var imgEle = $('<div class="detail_img" style="background-image: url('+searchList[i].cover+');"></div>');
					var msgEle = $('<div class="detail_msg"></div>');
					var nameEle = $('<span class="book_name">'+searchList[i].name+'</span>');
					var authorEle = $('<span class="book_author">'+searchList[i].authorName+'</span>');
					var praiseEle = $('<span class="book-praise" >'+((searchList[i].comicExtra.clickTotal)/10000).toFixed(1)+'万</span>')
					var theme = searchList[i].themeIds;
					var the = theme.split(",");
					var str="";
					for(var j=0;j<the.length;j++){
						if(i<the.length-1&&the[i]!=10){
							str = str+$scope.tagArr[the[i]-1]+"/";
						}else{
							str = str+$scope.tagArr[the[i]-1];
						}
					}
					if(str[str.length-1]=="/"){
						str = str.substring(0,str.length-1);
					}
					var flag = $('<span class="book-flag">'+str+'</span>');
					var timeDate = new Date(searchList[i].lastUpdateTime*1000).toLocaleDateString();
					var timeDate = timeDate.replace(/\//g,'-');
					var time = $('<span class="book-updateTime">'+timeDate+'</span>');
					msgEle.append(nameEle).append(authorEle).append(praiseEle).append(flag).append(time);
					boxEle.append(imgEle).append(msgEle);
					aEle.append(boxEle);
					liEle.append(aEle);
					$('.search_post_list').append(liEle);
				}
			})
		}
		
	}
}])			