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
.controller('readCtrl',['$scope','$compile',function($scope,$compile){
	var getUpdateTime = function(time){
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
	var groupArr = ['少年','少女'];
	var tagArr = ['搞笑','魔幻','生活','恋爱','动作','科幻','战争','体育','推理','','恐怖','同人'];
	var tag;
	setTag();
	function setTag(){
		tag = function(theme){
			var the = theme.split(",");
			var str="";
			for(var i=0;i<the.length;i++){
				if(i<the.length-1&&the[i]!=10){
					str = str+tagArr[the[i]-1]+"/";
				}else{
					str = str+tagArr[the[i]-1];
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
	
	
	$('.bookrack_header_img').removeClass('show');
	$('.del-choose').removeClass('show');
	/*取到当前账号的阅读数据*/
	getCollection();
	function getCollection(){
		var ul = $('#collection-list');
		if(sessionStorage.getItem('currentUser')){
			var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			var recently = currentUser.recently;
			var img;;
			for(var i=0;i<recently.length;i++){
				var seriesStatus = recently[i].seriesStatus;
				var accredit = recently[i].accredit;
				var comicId = recently[i].comicId;
				var cover = recently[i].cover;
				var name = recently[i].name;
				var authorName = recently[i].authorName;
				var groupIds = recently[i].groupIds;
				var themeIds = recently[i].themeIds;
				var lastUpdateTime = recently[i].lastUpdateTime;
				var tagName = groupArr[groupIds-1]+'/'+tag(themeIds);
				var ldateTime = getUpdateTime(lastUpdateTime);
				console.log(tagName);
				if(seriesStatus==1){
					img = 'all/colorComic/image/status_finish.png';
				}else{
					console.log(accredit);
					if(accredit==0||accredit==1){
						img = 'all/colorComic/image/status_one.png';
					}else if(accredit==2){
						img = 'all/colorComic/image/status_two.png';
					}else{
						img = 'all/colorComic/image/status_three.png';
					}
				}
				
				var a = $('<a ui-sref="comicDetail" ng-click="toComic('+comicId+')" comicId="'+comicId+'">'+
							'<li class="clearfloat">'+
								'<div class="book-detial-box" style="background-image: url('+img+');">'+
									'<div class="imgCollection" style="background-image: url('+cover+');"></div>'+
									'<div class="detial-box">'+
										'<span class="book-name">'+name+'</span>'+
										'<span class="book-info book-author">'+authorName+'</span>'+
										'<span class="book-info book-praise">2031041万</span>'+
										'<span class="book-info book-tag">'+tagName+'</span>'+
										'<span class="book-updateTime">'+ldateTime+'</span>'+
									'</div>'+
								'</div>'+
							'</li>'+
						'</a>');
				$compile(a)($scope);
				ul.append(a);
				
			}
		}
	}
	
	
	
	
	
	
}])
