angular.module('colorModule',['ui.router','angularCSS','comicModule'])
.config(function($stateProvider){
	$stateProvider
	.state('colorComic',{
		url:'/colorComic',
		templateUrl:'all/colorComic/colorComic.html',
		css:'all/colorComic/colorComic.css',
		controller:'ColorCtrl'
	})
})
.service("colorData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller('ColorCtrl',['$scope','colorData',function($scope,colorData){
//	彩漫大图数据拿取使用
	colorData.get("http://m.u17.com/banner/caiman").success(function(res){
		$scope.showImage = res;
		$scope.showWord = new String($scope.showImage.word).substring(0,$scope.showImage.word.length-2);
		$scope.showId = new String($scope.showImage.link).substring($scope.showImage.link.length-11,$scope.showImage.link.length-5);
	});
//彩漫书籍列表数据拿取使用
	$scope.colorPage=0;
	colorData.get('http://m.u17.com/color/list?page='+$scope.colorPage+'&size=15').success(function(res){
		$scope.colorList = res;
		console.log(res);
		$scope.groupArr = ['少年','少女'];
		$scope.tagArr = ['搞笑','魔幻','生活','恋爱','动作','科幻','战争','体育','推理','','恐怖','同人'];
		$scope.tag = function(theme){
			var the = theme.split(",");
			var str="";
			for(var i=0;i<the.length;i++){
				if(i<the.length-1&&the[i]!=10){
					str = str+$scope.tagArr[the[i]-1]+"/";
				}else{
					str = str+$scope.tagArr[the[i]-1];
				}
			}
			return str;
		}
		$scope.updateTime= function(time){
			var day = new Date(time*1000).toLocaleDateString();
			return day;
		}
	})
//	点击进入下一个界面传值
	$scope.goDetail = function(id){
		sessionStorage.setItem("id", id);
		sessionStorage.setItem("flag","false");
	}
}])
