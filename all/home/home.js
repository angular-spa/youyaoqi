
angular.module('homeModule',['ui.router','angularCSS','mangaModule','colorModule','loginModule','userModule','bookrackModule','upDateModule'])
.config(function($stateProvider){
	$stateProvider
	.state('home',{
		url:'/home',
		templateUrl:'all/home/home.html',
		css:'all/home/home.css',
		controller:'homeCtrl'
	})
})
.service('swiper',[function(){
	this.start = function(){
		new Swiper ('.swiper-container', {
		   loop: true,
		    autoplay:4000
		 })
	}

}])
.service('homeData',['$http',function($http){
	this.get = function(url_,sufn){
		return $http.get(url_).success(sufn);
	}
}])
.controller('homeCtrl',['$scope','pubvar','swiper','homeData',function($scope,pubvar,swiper,homeData){
	
	/*登录flag*/
	$scope.loginflag = false;
	$scope.getLogin = function(){
		console.log("进来了");
		if(sessionStorage.getItem('loginflag')){
			$scope.loginflag = sessionStorage.getItem('loginflag');
		}
	}
	//每次进来确定是否已经登录
	$scope.getLogin();
	
	//判断从哪个按钮点进登录界面的(user,bookrank)登录界面点击登录按钮时会将此值赋给ui-sref
	$scope.flagToWhitch = function(str){
		sessionStorage.setItem('whitchFlag',str);
	}
	
	/*轮播图*/
	homeData.get('http://m.u17.com/banner/recommend',function(data){
		console.log(data);
		for(var i=0;i<data.length;i++){
			var img = data[i].img;
			var word = data[i].word;
			word = word.substring(0,word.length-2);
			var div = $('<div class="swiper-slide"><a ui-sref=""><img src="'+img+'" /><p>'+word+'</p><span>'+(i+1)+'/'+data.length+'</span></a></div>');
			$(".swiper-wrapper").append(div);
		}
		//开启开关
		swiper.start();
	});
	
	/*瀑布流*/
	var scTop = 0;//滑动高度
	var bodyH = $('body').outerHeight();//body高度
	var puflag = false;//是否添加漫画的flag
	var minH = 0;//最小高度
	var page = 1;//初始页数
	var ajaxflag = true;//ajax请求开关
	var j=0;//图片加载计数
	

	getImg();
	$('#home').scroll(function(){
		//控制返回top显/隐
		isTotopShow();
		//添加漫画
		getImg();
		
	});
	
	
	//控制返回top显/隐
	function isTotopShow(){
		scTop = $('#home').scrollTop();
		if(scTop/1 > (bodyH/1)*0.7){
			$('#retotop').css('display','block');
		}else{
			$('#retotop').css('display','none');
		}
	}
	
	//返回顶部
	$scope.toTop = function(){
		$('#home').scrollTop(0);
	}
	
	
	
	//检测高度变化动态给请求数据给高度最小的添加漫画
	function getImg(){
		scTop = $('#home').scrollTop();
		minH = Math.min.apply(this,[$('#puleft').outerHeight()/1,$('#puright').outerHeight()/1]);
//		console.log($('#pubu')[0].offsetTop/1);
		scTop/1+bodyH/1>$('#pubu')[0].offsetTop/1+minH/1?puflag=true:puflag=false;
		if(puflag && ajaxflag){
			ajaxflag = false;
			
			homeData.get('http://m.u17.com/waterfall/list?page='+page+'&pageSize=10',function(data){
				for(var i=0;i<data.length;i++){
					var img = data[i].comicCover;
					var comicName = data[i].comicName;
					var brief = data[i].brief;
					var div = $('<div class="box">'+
									'<a href="">'+
										'<img src="'+img+'" alt="" />'+
										'<p class="titp">'+comicName+'</p>'+
										'<p class="desp">'+brief+'</p>'+
									'</a>'+
								'</div>');
					//图片加载完成之后再添加到页面,全部加载完成之后再开启ajax开关
					div.find('img')[0].onload = function(){
						if($('#puleft').outerHeight()/1<$('#puright').outerHeight()/1){
							$('#puleft').append($(this).parents('.box'));
						}else{
							$('#puright').append($(this).parents('.box'));
						}
						j++;
						if(j >= data.length-1){
							j=0;
							page++;
							console.log(page);
							ajaxflag = true;
						}
					}
				}
				
				
			})
		}
	}
}])
