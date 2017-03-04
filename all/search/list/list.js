angular.module('listModule',['ui.router','angularCSS'])
.config(function($stateProvider){
	$stateProvider
	.state('list',{
		url:'/list',
		templateUrl:'all/search/list/list.html',
		css:'all/search/list/list.css',
		controller:'listCtrl'
	})
})
.service("listData",["$http",function($http){
	this.get = function(url){
		return $http.get(url);
	}
}])
.controller("listCtrl",['$scope','listData',function($scope,listData){
	$scope.type = sessionStorage.getItem("type");
	$scope.sort = sessionStorage.getItem("sortId");
	$scope.typeName = sessionStorage.getItem("typeName");
	$scope.page = 1;
	listData.get('http://m.u17.com/sort/'+$scope.type+'/'+$scope.sort+'?page='+$scope.page+'&size=15').success(function(res){
		$scope.listArr = res;
		$scope.groupArr = ['少年','少女'];
		$scope.tagArr = ['搞笑','魔幻','生活','','动作','科幻','','体育','','恋爱','恐怖','同人'];
		$scope.tag = function(theme){
			var the = theme.split(",");
			var str="";
			for(var i=0;i<the.length;i++){
				if(i<the.length-1){
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
	
	$scope.goDetail = function(id){
		sessionStorage.setItem("id", id);
		sessionStorage.setItem("flag","false");
	}
}])
