angular.module('readModule',['ui.router'])
.config(function($stateProvider){
	$stateProvider
	.state('bookrack.read',{
		url:'/read',
		templateUrl:'all/bookrack/read/read.html',
		css:'all/bookrack/read/read.css',
		controller:'readCtrl'
	})
})
.controller('readCtrl',['$scope',function($scope){
	
	$('.bookrack_header_img').removeClass('show');
	$('.del-choose').removeClass('show');
	/*取到当前账号的阅读数据*/
	getCollection();
	function getCollection(){
		if(sessionStorage.getItem('currentUser')){
			var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			$scope.recently = currentUser.recently;
			console.log($scope.recently);
			var seriesStatus = currentUser.seriesStatus;
			if(seriesStatus==1){
				$scope.img = 'all/colorComic/image/status_finish.png';
			}else{
				var accredit = currentUser.accredit;
				if(accredit==0||accredit==1){
					$scope.img = 'all/colorComic/image/status_one.png';
				}else if(accredit==2){
					$scope.img = 'all/colorComic/image/status_two.png';
				}else{
					$scope.img = 'all/colorComic/image/status_three.png';
				}
			}
		}
	}
	
	
	$scope.getUpdateTime = function(time){
		var date_ = new Date();
		date_.setTime(time*1000);
		var year = date_.getFullYear();
		var month = date_.getMonth();
		var day = date_.getDate();
		month%10!=month?month=month:month='0'+month;
		day%10!=day?day=day:day='0'+day;
		var dateStr = year+'-'+month+'-'+day;
		return dateStr;
	}
	
	//设置tag
	$scope.groupArr = ['少年','少女'];
	$scope.tagArr = ['搞笑','魔幻','生活','恋爱','动作','科幻','战争','体育','推理','','恐怖','同人'];
	setTag();
	function setTag(){
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
			if(str[str.length-1]=='/'){
				str = str.substring(0,str.length-1);
			}
			return str;
		}
	}
	
	$scope.toComic = function(comicId){
		sessionStorage.setItem('id',comicId);
		sessionStorage.setItem("flag","false");
	}
	
	flagToWhitch();
	function flagToWhitch(){
		sessionStorage.setItem('whitchFlag2','read');
	}
	
}])
