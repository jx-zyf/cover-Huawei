function getClass(oParent,sclass){
	var aResult=[];
	var aEle=oParent.getElementsByTagName('*');
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className==sclass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
};

window.onload=function(){
	var oSearch=document.getElementById('search');
	var oLogo=document.getElementById('logo');
	var oMenu=document.getElementById('menu');
	var oLi=oMenu.getElementsByTagName('li');
	var oSubMenu=document.getElementById('subMenu');
	var oSubMenu1=getClass(oSubMenu,'subMenu1')[0];
	var oSubMenu2=getClass(oSubMenu,'subMenu2')[0];
	var oSubMenu3=getClass(oSubMenu,'subMenu3')[0];
	var oSubMenu4=getClass(oSubMenu,'subMenu4')[0];
	var oSubMenu5=getClass(oSubMenu,'subMenu5')[0];
	var aSubMenu=[oSubMenu1,oSubMenu2,oSubMenu3,oSubMenu4,oSubMenu5];

	//页面可视宽度变化
	var clientWidth=document.documentElement.clientWidth||document.body.offsetWidth;
	var main=document.getElementById('main');
	var footer=document.getElementById('footer');
	if(clientWidth<=1243){
		main.style.width="1243px";
		footer.style.width="1243px";
	}
	if(clientWidth>1243){
		main.style.width="1400px";
		footer.style.width="100%";
	}

	//登录
	var login=document.getElementById('login');
	login.onclick=function(){
		window.open("http://www.huawei.com/cn/my-huawei/login");
	}

	//搜素图标
	search.onmouseover=function(){
		search.src="images/search2.png";
	}
	search.onmouseout=function(){
		search.src="images/search.png";
	}

	//logo
	oLogo.onclick=function(){
		window.location.assign("http://www.huawei.com");
	}

	//主菜单
	for(var i=5;i<oLi.length-1;i++){
		oLi[i].onmouseover=function(){
			this.className="active";
		}
		oLi[i].onmouseout=function(){
			this.className="notactive";
		}
	}
	var delay=null;
	var flag=false;
	for(var i=0;i<oLi.length-3;i++){
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
			this.className="active";
			flag=true;
			clearTimeout(delay);
			var _this=this;
			delay=setTimeout(function(){
				if(flag){
					oSubMenu.style.display="block";
					// if(_this.className=="active") return;
					if(aSubMenu[_this.index].style.top=="0px") return;
					for(var j=0;j<aSubMenu.length;j++){
						aSubMenu[j].style.top="-300px";
					}
					startMove(aSubMenu[_this.index],'top',0);
				}
			},500)
		}
		oLi[i].onmouseout=function(){
			clearTimeout(delay);
			var _this=this;
			_this.className="notactive";
			delay=setTimeout(function(){
				oSubMenu.style.display="none";
				startMove(aSubMenu[_this.index],'top',-300);
			},500)
		}
	}
	for(var i=0;i<aSubMenu.length;i++){
		aSubMenu[i].index=i;
		aSubMenu[i].onmouseover=function(){
			clearTimeout(delay);
			oSubMenu.style.display="block";
			oLi[this.index].className="active";
			// startMove(this,'top',0);
			this.style.top="0px";
		}
		aSubMenu[i].onmouseout=function(){
			var _this=this;
			oLi[this.index].className="notactive";
			delay=setTimeout(function(){
				oSubMenu.style.display="none";
				// startMove(_this,'top',-300);
				_this.style.top="-300px";
			},500)
		}
	}

	//content区域
	//轮播图
	var curIndex=0;
	var intervalHandler=null;
	function changeImg(nextIndex){
		var img=document.getElementById('img');
		var imgs=img.getElementsByTagName('img');
		var lis=img.getElementsByTagName('li');
		imgs[curIndex].className="imgHide";
		imgs[nextIndex].className="imgShow";
		lis[curIndex].className="";
		lis[nextIndex].className="select";
		curIndex=nextIndex;
	}
	function start(){//开始自动播放
		intervalHandler=setInterval(function(){
			changeImg(curIndex+1>2?0:curIndex+1);
		},3000);
	}
	function stop(){//停止自动播放
		clearInterval(intervalHandler);
	}
	function imgLB(){
		start();
		var img=document.getElementById('img');
		img.onmouseover=stop;
		img.onmouseout=start;
		var lis=img.getElementsByTagName("li");
		for(var i=0;i<lis.length;i++){
			(function(j){
				lis[j].onclick=function(){
					changeImg(j);
				};
			})(i);
		}
	}
	imgLB();

	//mainContent
	var mainContent=document.getElementById('mainContent');
	var mainDiv=mainContent.getElementsByTagName('div');
	var mainImg=mainContent.getElementsByTagName('img');
	var mainSpan=mainContent.getElementsByTagName('span');
	// for(var i=0;i<mainImg.length;i++){
	// 	mainImg[i].onmouseover=function(){
	// 		startMove1(this,{opacity:85,left:-25});
	// 	}
	// 	mainImg[i].onmouseout=function(){
	// 		startMove1(this,{opacity:100,left:0});
	// 	}
	// }
	for(var i=0;i<mainDiv.length;i++){
		mainDiv[i].index=i;
		mainDiv[i].onmouseover=function(){
			startMove1(mainImg[this.index],{opacity:85,left:-25});
			startMove1(mainSpan[this.index],{opacity:100,bottom:30});
		}
		mainDiv[i].onmouseout=function(){
			startMove1(mainImg[this.index],{opacity:100,left:0});
			startMove1(mainSpan[this.index],{opacity:0,bottom:0});
		}
	}
	var beautyworld=document.getElementById('beautyworld');
	var bwImg=beautyworld.getElementsByTagName('img')[0];
	bwImg.onmouseover=function(){
		this.src="images/pic9_after.png";
	}
	bwImg.onmouseout=function(){
		this.src="images/pic9.png";
	}

};
//页面可视区域变化时刷新页面
// window.onresize=function(){
// 	location.reload();
// };