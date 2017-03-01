angular.module('homeModule',['ui.router','angularCSS','mangaModule'])
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
	var page = 0;
	

	getImg();
	$('#home').scroll(function(){
		getImg();
	});
	//检测高度变化动态给请求数据给高度最小的添加漫画
	function getImg(){
		scTop = $(window).scrollTop();
		minH = Math.min.apply(this,[$('#puleft').outerHeight()/1,$('#puright').outerHeight()/1]);
		scTop/1+bodyH/1>$('#pubu').offset().top/1+minH/1?puflag=true:puflag=false;
		if(puflag){
			page++;
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
					if($('#puleft').outerHeight()/1<$('#puright').outerHeight()/1){
						$('#puleft').append(div);
					}else{
						$('#puright').append(div);
					}
				}
				
			})
		}
	}
}])
