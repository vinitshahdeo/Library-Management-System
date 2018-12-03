// Diapo slideshow v1.0.4 - a jQuery slideshow with many effects, transitions, easy to customize, using canvas and mobile ready, based on jQuery 1.4+
// Copyright (c) 2011 by Manuel Masia - www.pixedelic.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
;(function($){$.fn.diapo = function(opts, callback) {
	
	var defaults = {
		selector			: 'div',	//target element
		
		fx					: 'random',
//'random','simpleFade','curtainTopLeft','curtainTopRight','curtainBottomLeft','curtainBottomRight','curtainSliceLeft','curtainSliceRight','blindCurtainTopLeft','blindCurtainTopRight','blindCurtainBottomLeft','blindCurtainBottomRight','blindCurtainSliceBottom','blindCurtainSliceTop','stampede','mosaic','mosaicReverse','mosaicRandom','mosaicSpiral','mosaicSpiralReverse','topLeftBottomRight','bottomRightTopLeft','bottomLeftTopRight','bottomLeftTopRight','scrollLeft','scrollRight','scrollTop','scrollBottom','scrollHorz'
		
//you can also use more than one effect: 'curtainTopLeft, mosaic, bottomLeftTopRight'

		mobileFx			: '',	//leave empty if you want to display the same effect on mobile devices and on desktop etc.

		slideOn				: 'random',	//next, prev, random: decide if the transition effect will be applied to the current (prev) or the next slide
				
		gridDifference		: 250,	//to make the grid blocks slower than the slices, this value must be smaller than transPeriod
		
		easing				: 'easeInOutExpo',	//for the complete list http://jqueryui.com/demos/effect/easing.html
		
		mobileEasing		: '',	//leave empty if you want to display the same easing on mobile devices and on desktop etc.
		
		loader				: 'pie',	//pie, bar, none (even if you choose "pie", old browsers like IE8- can't display it... they will display always a loading bar)
		
		loaderOpacity		: .8,	//0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1
		
		loaderColor			: '#ffff00', 
		
		loaderBgColor		: '#222222', 
		
		pieDiameter			: 50,
		
		piePosition			: 'top:5px; right:5px',	//this option accepts any CSS value
		
		pieStroke			: 8,
		
		barPosition			: 'bottom',	//bottom, top
		
		barStroke			: 5,
		
		navigation			: true,	//true, false. It enables the previous and the next buttons, their IDs are #pix_prev and #pix_next
		
		mobileNavigation	: true,	//true, false. It enables the previous and the next buttons on mobile devices
		
		navigationHover		: true,	//true, false. If true navigation will be visible only on hover state
		
		mobileNavHover		: true,	//true, false. If true navigation will be visible only on hover state for mobile devices
		
		commands			: true,	//true, false. It enables stop and play buttons
		
		mobileCommands		: true,	//true, false. It enables stop and play buttons on mobile devices
				
		pagination			: true,	//true, false. It enables the pagination numbers. This is the appended code: 
									//<div id="pix_pag">
										//<ul id="pix_pag_ul">
											//<li id="pag_nav_0"><span><span>0</span></span></li>
											//<li id="pag_nav_1"><span><span>1</span></span></li>
											//<li id="pag_nav_2"><span><span>2</span></span></li>
											//...etc.
										//</ul>
									//</div>
		
		mobilePagination	: true,	//true, false. It enables the pagination numbers on mobile devices
		
		thumbs				: true,	//true, false. It shows the thumbnails (if available) when the mouse is on the pagination buttons. Not available for mobile devices
		
		hover				: true,	//true, false. Puase on state hover. Not available for mobile devices
		
		pauseOnClick		: true,	//true, false. It stops the slideshow when you click the sliders.
		
		rows				: 4,
		
		cols				: 6,
		
		slicedRows			: 8,	//if 0 the same value of rows
		
		slicedCols			: 12,	//if 0 the same value of cols
		
		time				: 3000,	//milliseconds between the end of the sliding effect and the start of the nex one
		
		transPeriod			: 1500,	//lenght of the sliding effect in milliseconds
		
		autoAdvance			: true,	//true, false
		
		mobileAutoAdvance	: true, //truem false. Auto-advancing for mobile devices
		
		onStartLoading		: function() {  },
		
		onLoaded			: function() {  },
		
		onEnterSlide		: function() {  },
		
		onStartTransition	: function() {  }
    };
	
	
	function isMobile() {	//sniff a mobile browser
		if( navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPod/i)
			){
				return true;
		}	
	}
	
	var opts = $.extend({}, defaults, opts);
	
	var elem = this;
	
	var h = elem.height();
	var w = elem.width();
	
	var u;

//Define some difference if is a mobile device or not
	var clickEv,
		autoAdv,
		navigation,
		navHover,
		commands,
		pagination;

	if (isMobile()) {
		clickEv = 'tap';
	} else {
		clickEv = 'click';
	}
	
	if(isMobile()){
		autoAdv = opts.mobileAutoAdvance;
	} else {
		autoAdv = opts.autoAdvance;
	}
	
	if(autoAdv==false){
		elem.addClass('stopped');
	}

	if(isMobile()){
		navigation = opts.mobileNavigation;
	} else {
		navigation = opts.navigation;
	}

	if(isMobile()){
		navHover = opts.mobileNavHover;
	} else {
		navHover = opts.navigationHover;
	}

	if(isMobile()){
		commands = opts.mobileCommands;
	} else {
		commands = opts.commands;
	}

	if(isMobile()){
		pagination = opts.mobilePagination;
	} else {
		pagination = opts.pagination;
	}

//The slideshow starts when all the images are loaded
	function loadimages(imgArr,callback) {
		if (!$.browser.msie || ($.browser.msie && $.browser.version == 9)) {
			var imagesLoaded = 0;
			opts.onStartLoading.call(this);
			$.each(imgArr, function(i, image) {
	
			   var img = new Image();
			
			   img.onload = function() {
				   imagesLoaded++;
				   if (imagesLoaded == imgArr.length) {
						opts.onLoaded.call(this);
					   callback();
				   }
			   };
			
			   img.src = image;
	
			});
		} else {
		   callback();
		}
	}



	if(elem.length!=0){
			
		var selector = $('> '+ opts.selector, elem).not('#pix_canvas').not('#pix_canvas_wrap').not('#pix_next').not('#pix_prev').not('#pix_commands');
		selector.wrapInner('<div class="pix_relativize" style="width:'+w+'px; height:'+h+'px" />');	//wrap a div for the position of absolute elements
		var amountSlide = selector.length;    //how many sliders
		
		var nav;	//nextSlide(nav)
		
		function imgFake() {	//this function replace elements such as iframes or objects with an image stored in data-fake attribute
			$('*[data-fake]',elem).each(function(){
				var t = $(this);
				var imgFakeUrl = t.attr('data-fake');
				var imgFake = new Image();
				imgFake.src = imgFakeUrl;
				t.after($(imgFake).attr('class','imgFake'));	//the image has class imgFake
				var clone = t.clone();
				t.remove();	//I remove the element after cloning so it is initialized only when it appears
				$('.elemToHide').show();
				$(imgFake)[clickEv](function(){
					$(this).hide().after(clone);
					$('.elemToHide').hide();
				});
			});
		}
		
		imgFake();
		
		
		if(opts.hover==true){	//if the option "hover" is true I stop the slideshow on mouse over and I resume it on mouse out
			if(!isMobile()){
				elem.hoverIntent({	
					over: function(){
							elem.addClass('stopped');
						},
					out: function(){
							if(autoAdv!=false){
								elem.removeClass('stopped');
							}									
						},
					timeout: 0
				});
			}
		}

		if(navHover==true){	//if the option is true I show the next and prev button only on mouse over
			if(isMobile()){
				elem.live('vmouseover',function(){
					$('#pix_prev, #pix_next').animate({opacity:1},200);
				});
				elem.live('vmouseout',function(){
					$('#pix_prev, #pix_next').delay(500).animate({opacity:0},200);
				});
			} else {
				elem.hover(function(){
					$('#pix_prev, #pix_next').stop(true,false).animate({opacity:1},200);
				},function(){
					$('#pix_prev, #pix_next').stop(true,false).animate({opacity:0},200);
				});
			}
		}
	
	
		$.fn.diapoStop = function() {
			autoAdv = false;
			elem.addClass('stopped');
			if($('#pix_stop').length){
				$('#pix_stop').fadeOut(100,function(){
					$('#pix_play').fadeIn(100);
					if(opts.loader!='none'){
						$('#pix_canvas').fadeOut(100);
					}
				});
			} else {
				if(opts.loader!='none'){
					$('#pix_canvas').fadeOut(100);
				}
			}
		}

		$('#pix_stop').live('click',function(){	//stop function
			elem.diapoStop();
		});
	
		$.fn.diapoPlay = function() {
			autoAdv = true;
			elem.removeClass('stopped');
			if($('#pix_play').length){
				$('#pix_play').fadeOut(100,function(){
					$('#pix_stop').fadeIn(100);
					if(opts.loader!='none'){
						$('#pix_canvas').fadeIn(100);
					}
				});
			} else {
				if(opts.loader!='none'){
					$('#pix_canvas').fadeIn(100);
				}
			}
		}

		$('#pix_play').live('click',function(){	//play function
			elem.diapoPlay();
		});
	
		if(opts.pauseOnClick==true){	//if option is true I stop the slideshow if the user clicks on the slider
			selector[clickEv](function(){
				autoAdv = false;
				elem.addClass('stopped');
				$('#pix_stop').fadeOut(100,function(){
					$('#pix_play').fadeIn(100);
					$('#pix_canvas').fadeOut(100);
				});
			});
		}
		
		
		var allImg = new Array();	//I create an array for the images of the slideshow
		$('img', elem).each( function() { 
			allImg.push($(this).attr('src'));	//all the images are pushed in the array
		});
		if (!$.browser.msie) {	//sorry IE8- has some problem with this
			$('div, span, a', elem).each(function(){	//I check all the background images in the sliders and I push them into the array
				var bG = $(this).css('background');
				var bG2 = $(this).attr('style');
				if(typeof bG !== 'undefined' && bG !== false && bG.indexOf("url") != -1) {
					var bGstart = bG.lastIndexOf('url(')+4;
					var bGfinish = bG.lastIndexOf(')');
					bG = bG.substring(bGstart,bGfinish);
					bG = bG.replace(/'/g,'');
					bG = bG.replace(/"/g,'');
					allImg.push(bG);
				} else if (typeof bG2 !== 'undefined' && bG2 !== false && bG2.indexOf("url") != -1) {
					var bG2start = bG2.lastIndexOf('url(')+4;
					var bG2finish = bG2.lastIndexOf(')');
					bG2 = bG2.substring(bG2start,bG2finish);
					bG2 = bG2.replace(/'/g,'');
					bG2 = bG2.replace(/"/g,'');
					allImg.push(bG2);
				}
			});
		}
				
	
		loadimages(allImg,nextSlide);	//when all the images in the array are loaded nextSlide function starts
		
	}
	
	
		function shuffle(arr) {	//to randomize the effect
			for(
			  var j, x, i = arr.length; i;
			  j = parseInt(Math.random() * i),
			  x = arr[--i], arr[i] = arr[j], arr[j] = x
			);
			return arr;
		}
	
		function isInteger(s) {	//to check if a number is integer
			return Math.ceil(s) == Math.floor(s);
		}	
	
		if (($.browser.msie && $.browser.version < 9) || opts.loader == 'bar') {	//IE8- has some problems with canvas, I prefer to use a simple loading bar in CSS
			elem.append('<span id="pix_canvas" />');
			var canvas = $("#pix_canvas");
			if(opts.barPosition=='top'){
				canvas.css({'top':0});
			} else {
				canvas.css({'bottom':0});
			}
			canvas.css({'position':'absolute', 'left':0, 'z-index':1001, 'height':opts.barStroke, 'width':0, 'background-color':opts.loaderColor});
		} else {
			elem.append('<canvas id="pix_canvas"></canvas>');
			var G_vmlCanvasManager;
			var canvas = document.getElementById("pix_canvas");
			canvas.setAttribute("width", opts.pieDiameter);
			canvas.setAttribute("height", opts.pieDiameter);
			canvas.setAttribute("style", "position:absolute; z-index:1002; "+opts.piePosition);
			var rad;
			var radNew;
	
			if (canvas && canvas.getContext) {
				var ctx = canvas.getContext("2d");
				ctx.rotate(Math.PI*(3/2));
				ctx.translate(-opts.pieDiameter,0);
			}
		
		}
		if(opts.loader=='none' || autoAdv==false) {	//hide the loader if you want
			$('#pix_canvas, #pix_canvas_wrap').hide();
		}
		
		if(navigation==true) {	//I create the next/prev buttons
			elem.append('<div id="pix_prev" />').append('<div id="pix_next" />');
			$('#pix_prev').animate({opacity:0},200);
		}
			
		elem.after('<div id="pix_pag" />');	//I create a div that will contain the play/stop button and the pagination buttons
		if(pagination==true) {
			$('#pix_pag').append('<ul id="pix_pag_ul" />');
			var li;
			for (li = 0; li < amountSlide; li++){
				$('#pix_pag_ul').append('<li id="pag_nav_'+li+'" style="position:relative; z-index:1002"><span><span>'+li+'</span></span></li>');
				if(opts.thumbs==true) {
					var dataThumb = selector.eq(li).attr('data-thumb');
					var newImg = new Image();
					newImg.src = dataThumb;
					$('li#pag_nav_'+li).append($(newImg).attr('class','pix_thumb').css('position','absolute').animate({opacity:0},0));
					$('li#pag_nav_'+li+' > img').after('<div class="thumb_arrow" />');
					$('li#pag_nav_'+li+' > .thumb_arrow').animate({opacity:0},0);
					
					if(!isMobile()){
						$('#pix_pag li').hover(function(){
							$('.pix_thumb, .thumb_arrow',this).addClass('visible').stop(true,false).animate({'margin-top':-15, opacity: 1},300,'easeOutQuad');					
						},function(){
							$('.pix_thumb, .thumb_arrow',this).removeClass('visible').stop(true,false).animate({'margin-top':0, opacity: 0},150);					
						});
					}
				}
			}
		}
			
		if(commands==true) {
			$('#pix_pag').append('<div id="pix_commands" />');
			$('#pix_pag').find('#pix_commands').append('<div id="pix_play" />').append('<div id="pix_stop" />');
			if(autoAdv==true){
				$('#pix_play').hide();
				$('#pix_stop').show();
			} else {
				$('#pix_stop').hide();
				$('#pix_play').show();
			}
		}
			
		if(navHover==true){
			$('#pix_prev, #pix_next').animate({opacity:0},0);
		}
			
		function canvasLoader() {
			opts.onStartTransition.call(this);
			rad = 0;
			if (($.browser.msie && $.browser.version < 9) || opts.loader == 'bar') {
				$('#pix_canvas').css({'width':0});
			} else {
				ctx.clearRect(0,0,opts.pieDiameter,opts.pieDiameter); // clear canvas
			}
		}
		
		
		canvasLoader();
		
		
		$('.fromLeft, .fromRight, .fromTop, .fromBottom, .fadeIn').each(function(){
			$(this).css('visibility','hidden');
		});
		
	
	/*************************** FUNCTION nextSlide() ***************************/
	
	function nextSlide(nav){    //funzione per il fading delle immagini
		elem.addClass('diaposliding');	//aggiunge una classe che mi dice che il fading è in corso
		
		var vis = parseFloat($('> '+opts.selector +'.diapocurrent',elem).not('#pix_canvas').not('#pix_canvas_wrap').not('#pix_next').not('#pix_prev').not('#pix_commands').index());    //la variabile è il numero del div partendo da 0

		if(nav>0){    //se siamo all'ultimo div o se ancora non ho creato nessun div
			var i = nav-1;
		} else if (vis == amountSlide-1) { 
			var i = 0;
		} else {    //altrimenti l'indice è l'id corrent più uno, quindi il div successivo
			var i = vis+1;
		}
				
		

		var rows = opts.rows,
			cols = opts.cols,
			couples = 1,
			difference = 0,
			dataSlideOn,
			time,
			fx,
			easing,
			randomFx = new Array('simpleFade','curtainTopLeft','curtainTopRight','curtainBottomLeft','curtainBottomRight','curtainSliceLeft','curtainSliceRight','blindCurtainTopLeft','blindCurtainTopRight','blindCurtainBottomLeft','blindCurtainBottomRight','blindCurtainSliceBottom','blindCurtainSliceTop','stampede','mosaic','mosaicReverse','mosaicRandom','mosaicSpiral','mosaicSpiralReverse','topLeftBottomRight','bottomRightTopLeft','bottomLeftTopRight','bottomLeftTopRight','scrollLeft','scrollRight','scrollTop','scrollBottom','scrollHorz');
			marginLeft = 0,
			marginTop = 0;
		
		
		if(isMobile()){
			var dataFx = selector.eq(i).attr('data-fx');
		} else {
			var dataFx = selector.eq(i).attr('data-mobileFx');
		}
		if(typeof dataFx !== 'undefined' && dataFx!== false){
			fx = dataFx;
		} else {
			if(isMobile()&&opts.mobileFx!=''){
				fx = opts.mobileFx;
			} else {
				fx = opts.fx;
			}
			if(fx=='random') {
				fx = shuffle(randomFx);
				fx = fx[0];
			} else {
				fx = fx;
				if(fx.indexOf(',')>0){
					fx = fx.replace(/ /g,'');
					fx = fx.split(',');
					fx = shuffle(fx);
					fx = fx[0];
				}
			}
		}
		
		if(isMobile()&&opts.mobileEasing!=''){
			easing = opts.mobileEasing;
		} else {
			easing = opts.easing;
		}

		dataSlideOn = selector.eq(i).attr('data-slideOn');
		if(typeof dataSlideOn !== 'undefined' && dataSlideOn!== false){
			slideOn = dataSlideOn;
		} else {
			if(opts.slideOn=='random'){
				var slideOn = new Array('next','prev');
				slideOn = shuffle(slideOn);
				slideOn = slideOn[0];
			} else {
				slideOn = opts.slideOn;
			}
		}
			
		time = selector.eq(i).attr('data-time');
		if(typeof time !== 'undefined' && time!== false){
			time = time;
		} else {
			time = opts.time;
		}
			
		if(!$(elem).hasClass('diapostarted')){
			fx = 'simpleFade';
			slideOn = 'next';
			$(elem).addClass('diapostarted')
		}

		switch(fx){
			case 'simpleFade':
				cols = 1;
				rows = 1;
					break;
			case 'curtainTopLeft':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainTopRight':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainBottomLeft':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainBottomRight':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainSliceLeft':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'curtainSliceRight':
				if(opts.slicedCols == 0) {
					cols = opts.cols;
				} else {
					cols = opts.slicedCols;
				}
				rows = 1;
					break;
			case 'blindCurtainTopLeft':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainTopRight':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainBottomLeft':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainBottomRight':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainSliceTop':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'blindCurtainSliceBottom':
				if(opts.slicedRows == 0) {
					rows = opts.rows;
				} else {
					rows = opts.slicedRows;
				}
				cols = 1;
					break;
			case 'stampede':
				difference = '-'+opts.transPeriod;
					break;
			case 'mosaic':
				difference = opts.gridDifference;
					break;
			case 'mosaicReverse':
				difference = opts.gridDifference;
					break;
			case 'mosaicRandom':
					break;
			case 'mosaicSpiral':
				difference = opts.gridDifference;
				couples = 1.7;
					break;
			case 'mosaicSpiralReverse':
				difference = opts.gridDifference;
				couples = 1.7;
					break;
			case 'topLeftBottomRight':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'bottomRightTopLeft':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'bottomLeftTopRight':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'topRightBottomLeft':
				difference = opts.gridDifference;
				couples = 6;
					break;
			case 'scrollLeft':
				cols = 1;
				rows = 1;
					break;
			case 'scrollRight':
				cols = 1;
				rows = 1;
					break;
			case 'scrollTop':
				cols = 1;
				rows = 1;
					break;
			case 'scrollBottom':
				cols = 1;
				rows = 1;
					break;
			case 'scrollHorz':
				cols = 1;
				rows = 1;
					break;
		}
			
			var cycle = 0;
			var blocks = rows*cols;	//number of squares
			var leftScrap = w-(Math.floor(w/cols)*cols);	//difference between rounded widths and total width
			var topScrap = h-(Math.floor(h/rows)*rows);	//difference between rounded heights and total height
			var addLeft;	//1 optional pixel to the widths
			var addTop;	//1 optional pixel to the heights
			var tAppW = 0;	//I need it to calculate the margin left for the widths
			var tAppH = 0;	//I need it to calculate the margin right for the widths
			var arr = new Array();
			var delay = new Array();
			var order = new Array();
			while(cycle < blocks){
				arr.push(cycle);
				delay.push(cycle);
				elem.append('<div class="diapoappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');
				var tApp = $('.diapoappended:eq('+cycle+')');
				tApp.find('iframe').remove();
				if(fx=='scrollLeft' || fx=='scrollRight' || fx=='scrollTop' || fx=='scrollBottom' || fx=='scrollHorz'){
					selector.eq(i).clone().show().appendTo(tApp);
				} else {
					if(slideOn=='next'){
						selector.eq(i).clone().show().appendTo(tApp);
					} else {
						selector.eq(vis).clone().show().appendTo(tApp);
					}
				}

				if(cycle%cols<leftScrap){
					addLeft = 1;
				} else {
					addLeft = 0;
				}
				if(cycle%cols==0){
					tAppW = 0;
				}
				if(Math.floor(cycle/cols)<topScrap){
					addTop = 1;
				} else {
					addTop = 0;
				}
				tApp.css({
					'height': Math.floor((h/rows)+addTop+1),
					'left': tAppW,
					'top': tAppH,
					'width': Math.floor((w/cols)+addLeft+1)
				});
				$('> '+opts.selector, tApp).not('#pix_canvas').not('#pix_canvas_wrap').not('#pix_next').not('#pix_prev').not('#pix_commands').css({
					'height': h,
					'margin-left': '-'+tAppW+'px',
					'margin-top': '-'+tAppH+'px',
					'width': w
				});
				tAppW = tAppW+tApp.width()-1;
				if(cycle%cols==cols-1){
					tAppH = tAppH + tApp.height() - 1;
				}
				cycle++;
			}
			

			
			switch(fx){
				case 'curtainTopLeft':
						break;
				case 'curtainBottomLeft':
						break;
				case 'curtainSliceLeft':
						break;
				case 'curtainTopRight':
					arr = arr.reverse();
						break;
				case 'curtainBottomRight':
					arr = arr.reverse();
						break;
				case 'curtainSliceRight':
					arr = arr.reverse();
						break;
				case 'blindCurtainTopLeft':
						break;
				case 'blindCurtainBottomLeft':
					arr = arr.reverse();
						break;
				case 'blindCurtainSliceTop':
						break;
				case 'blindCurtainTopRight':
						break;
				case 'blindCurtainBottomRight':
					arr = arr.reverse();
						break;
				case 'blindCurtainSliceBottom':
					arr = arr.reverse();
						break;
				case 'stampede':
					arr = shuffle(arr);
						break;
				case 'mosaic':
						break;
				case 'mosaicReverse':
					arr = arr.reverse();
						break;
				case 'mosaicRandom':
					arr = shuffle(arr);
						break;
				case 'mosaicSpiral':
					var rows2 = rows/2, x, y, z, n=0;
						for (z = 0; z < rows2; z++){
							y = z;
							for (x = z; x < cols - z - 1; x++) {
								order[n++] = y * cols + x;
							}
							x = cols - z - 1;
							for (y = z; y < rows - z - 1; y++) {
								order[n++] = y * cols + x;
							}
							y = rows - z - 1;
							for (x = cols - z - 1; x > z; x--) {
								order[n++] = y * cols + x;
							}
							x = z;
							for (y = rows - z - 1; y > z; y--) {
								order[n++] = y * cols + x;
							}
						}
						
						arr = order;

						break;
				case 'mosaicSpiralReverse':
					var rows2 = rows/2, x, y, z, n=blocks-1;
						for (z = 0; z < rows2; z++){
							y = z;
							for (x = z; x < cols - z - 1; x++) {
								order[n--] = y * cols + x;
							}
							x = cols - z - 1;
							for (y = z; y < rows - z - 1; y++) {
								order[n--] = y * cols + x;
							}
							y = rows - z - 1;
							for (x = cols - z - 1; x > z; x--) {
								order[n--] = y * cols + x;
							}
							x = z;
							for (y = rows - z - 1; y > z; y--) {
								order[n--] = y * cols + x;
							}
						}

						arr = order;
						
						break;
				case 'topLeftBottomRight':
					for (var y = 0; y < rows; y++)
					for (var x = 0; x < cols; x++) {
						order.push(x + y);
					}
						delay = order;
						break;
				case 'bottomRightTopLeft':
					for (var y = 0; y < rows; y++)
					for (var x = 0; x < cols; x++) {
						order.push(x + y);
					}
						delay = order.reverse();
						break;
				case 'bottomLeftTopRight':
					for (var y = rows; y > 0; y--)
					for (var x = 0; x < cols; x++) {
						order.push(x + y);
					}
						delay = order;
						break;
				case 'topRightBottomLeft':
					for (var y = 0; y < rows; y++)
					for (var x = cols; x > 0; x--) {
						order.push(x + y);
					}
						delay = order;
						break;
			}
			
			
						
			$.each(arr, function(index, value) {

				if(value%cols<leftScrap){
					addLeft = 1;
				} else {
					addLeft = 0;
				}
				if(value%cols==0){
					tAppW = 0;
				}
				if(Math.floor(value/cols)<topScrap){
					addTop = 1;
				} else {
					addTop = 0;
				}
				
				$('.interval').text(fx);
			
				switch(fx){
					case 'simpleFade':
						height = h;
						width = w;
							break;
					case 'curtainTopLeft':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainTopRight':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainBottomLeft':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainBottomRight':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1),
						marginTop = Math.floor((h/rows)+addTop+1)+'px';
							break;
					case 'curtainSliceLeft':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1);
						if(value%2==0){
							marginTop = Math.floor((h/rows)+addTop+1)+'px';					
						} else {
							marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';					
						}
							break;
					case 'curtainSliceRight':
						height = 0,
						width = Math.floor((w/cols)+addLeft+1);
						if(value%2==0){
							marginTop = Math.floor((h/rows)+addTop+1)+'px';					
						} else {
							marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';					
						}
							break;
					case 'blindCurtainTopLeft':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainTopRight':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainBottomLeft':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainBottomRight':
						height = Math.floor((h/rows)+addTop+1),
						width = 0,
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
							break;
					case 'blindCurtainSliceBottom':
						height = Math.floor((h/rows)+addTop+1),
						width = 0;
						if(value%2==0){
							marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
						} else {
							marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
						}
							break;
					case 'blindCurtainSliceTop':
						height = Math.floor((h/rows)+addTop+1),
						width = 0;
						if(value%2==0){
							marginLeft = '-'+Math.floor((w/cols)+addLeft+1)+'px';
						} else {
							marginLeft = Math.floor((w/cols)+addLeft+1)+'px';
						}
							break;
					case 'stampede':
						height = 0;
						width = 0;					
						marginLeft = (w*0.2)*(((index)%cols)-(cols-(Math.floor(cols/2))))+'px';					
						marginTop = (h*0.2)*((Math.floor(index/cols)+1)-(rows-(Math.floor(rows/2))))+'px';	
							break;
					case 'mosaic':
						height = 0;
						width = 0;					
							break;
					case 'mosaicReverse':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'mosaicRandom':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)*0.5+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)*0.5+'px';					
							break;
					case 'mosaicSpiral':
						height = 0;
						width = 0;
						marginLeft = Math.floor((w/cols)+addLeft+1)*0.5+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)*0.5+'px';					
							break;
					case 'mosaicSpiralReverse':
						height = 0;
						width = 0;
						marginLeft = Math.floor((w/cols)+addLeft+1)*0.5+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)*0.5+'px';					
							break;
					case 'topLeftBottomRight':
						height = 0;
						width = 0;					
							break;
					case 'bottomRightTopLeft':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';					
						marginTop = Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'bottomLeftTopRight':
						height = 0;
						width = 0;					
						marginLeft = 0;					
						marginTop = Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'topRightBottomLeft':
						height = 0;
						width = 0;					
						marginLeft = Math.floor((w/cols)+addLeft+1)+'px';					
						marginTop = '-'+Math.floor((h/rows)+addTop+1)+'px';					
							break;
					case 'scrollRight':
						height = h;
						width = w;
						marginLeft = -w;					
							break;
					case 'scrollLeft':
						height = h;
						width = w;
						marginLeft = w;					
							break;
					case 'scrollTop':
						height = h;
						width = w;
						marginTop = h;					
							break;
					case 'scrollBottom':
						height = h;
						width = w;
						marginTop = -h;					
							break;
					case 'scrollHorz':
						height = h;
						width = w;
						if(vis==0 && i==amountSlide-1) {
							marginLeft = -w;	
						} else if(vis<i  || (vis==amountSlide-1 && i==0)) {
							marginLeft = w;	
						} else {
							marginLeft = -w;	
						}
							break;
					}
					
			
				var tApp = $('.diapoappended:eq('+value+')');
								
				if(typeof u !== 'undefined'){
					clearInterval(u);
					setTimeout(canvasLoader,opts.transPeriod+difference);
				}
				
				
				function diapoeased() {
					$(this).addClass('diapoeased');
					if($('.diapoeased').length==blocks){
						opts.onEnterSlide.call(this);
						
						$('.fromLeft, .fromRight, .fromTop, .fromBottom, .fadeIn').each(function(){
							$(this).css('visibility','hidden');
						});
		
						selector.eq(i).show().css('z-index','999').addClass('diapocurrent');
						selector.eq(vis).css('z-index','1').removeClass('diapocurrent');
						var lMoveIn = selector.eq(i).find('.fromLeft, .fromRight, .fromTop, .fromBottom, .fadeIn').length;
						
						if (lMoveIn!=0){
							$('.diapocurrent .fromLeft, .diapocurrent .fromRight, .diapocurrent .fromTop, .diapocurrent .fromBottom, .diapocurrent .fadeIn').each(function(){
								if($(this).attr('data-easing')!=''){
									var easeMove = $(this).attr('data-easing');
								} else {
									var easeMove = easing;
								}
								var t = $(this);
								var wMoveIn = t.width();
								var hMoveIn = t.outerHeight();
								t.css('width',wMoveIn);
								var pos = t.position();
								var left = pos.left;
								var top = pos.top;
								var tClass = t.attr('class');
								var ind = t.index();
								var hRel = t.parents('.pix_relativize').height();
								var wRel = t.parents('.pix_relativize').width();
								if(tClass.indexOf("fromLeft") != -1) {
									t.css({'left':'-'+wRel+'px','right':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'left':pos.left},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fromRight") != -1) {
									t.css({'left':wRel+'px','right':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'left':pos.left},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fromTop") != -1) {
									t.css({'top':'-'+hRel+'px','bottom':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'top':pos.top},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fromBottom") != -1) {
									t.css({'top':hRel+'px','bottom':'auto'});
									t.css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({'top':pos.top},(time/lMoveIn)*0.2,easeMove);
								} else if(tClass.indexOf("fadeIn") != -1) {
									t.animate({opacity:0},0).css('visibility','visible').delay((time/lMoveIn)*(0.1*(ind-1))).animate({opacity:1},(time/lMoveIn)*0.2,easeMove);
								}
							});
						}

						
						
						$('.diapoappended').remove();
						elem.removeClass('diaposliding');	//I remove this class, that means the effect is finished
							selector.eq(vis).hide();

							$('#pix_canvas').animate({opacity:opts.loaderOpacity},400);
							u = setInterval(
								function(){
									if (($.browser.msie && $.browser.version < 9) || opts.loader == 'bar') {
										if(rad<=1 && !elem.hasClass('stopped')){
											rad = rad+0.01;
										} else if (rad<=1 && (elem.hasClass('stopped'))){
											rad = rad;
										} else {
											if(!elem.hasClass('stopped'))
												imgFake();
												clearInterval(u);
												$('#pix_canvas').animate({opacity:0},200,function(){
													setTimeout(canvasLoader,opts.transPeriod+difference);
													nextSlide();
												});
										}
										canvas.css({'width':(w*rad)});
									} else {
										radNew = rad;
										ctx.clearRect(0,0,opts.pieDiameter,opts.pieDiameter);
										ctx.globalCompositeOperation = 'destination-over';
										ctx.beginPath();
										ctx.arc((opts.pieDiameter)/2, (opts.pieDiameter)/2, (opts.pieDiameter)/2-opts.pieStroke,0,Math.PI*2,false);
										ctx.lineWidth = opts.pieStroke;
										ctx.strokeStyle = opts.loaderBgColor;
										ctx.stroke();
										ctx.closePath();
										ctx.globalCompositeOperation = 'source-over';
										ctx.beginPath();
										ctx.arc((opts.pieDiameter)/2, (opts.pieDiameter)/2, (opts.pieDiameter)/2-opts.pieStroke,0,Math.PI*2*radNew,false);
										ctx.lineWidth = opts.pieStroke-4;
										ctx.strokeStyle = opts.loaderColor;
										ctx.stroke();
										ctx.closePath();
												
										if(rad<=1 && !elem.hasClass('stopped')){
											rad = rad+0.01;
										} else if (rad<=1 && (elem.hasClass('stopped'))){
											rad = rad;
										} else {
											if(!elem.hasClass('stopped'))
												imgFake();
												clearInterval(u);
												$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},200,function(){
													setTimeout(canvasLoader,opts.transPeriod+difference);
													nextSlide(); 
												});
										}
									}
								},(time)*0.01
							);
						}

				}


				if(pagination==true){
					$('#pix_pag li').removeClass('diapocurrent');
					$('#pix_pag li').eq(i).addClass('diapocurrent');
				}

				if(fx=='scrollLeft' || fx=='scrollRight' || fx=='scrollTop' || fx=='scrollBottom' || fx=='scrollHorz'){
					tApp.delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).css({
							'display' : 'block',
							'height': height,
							'margin-left': marginLeft,
							'margin-top': marginTop,
							'width': width
						}).animate({
							'height': Math.floor((h/rows)+addTop+1),
							'margin-top' : 0,
							'margin-left' : 0,
							'width' : Math.floor((w/cols)+addLeft+1)
						},(opts.transPeriod-difference),easing,diapoeased);
					selector.eq(vis).delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).animate({
							'margin-left': marginLeft*(-1),
							'margin-top': marginTop*(-1)
						},(opts.transPeriod-difference),easing,function(){
							jQuery(this).css({'margin-top' : 0,'margin-left' : 0});
						});
				} else {
					if(slideOn=='next'){
						tApp.delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).css({
								'display' : 'block',
								'height': height,
								'margin-left': marginLeft,
								'margin-top': marginTop,
								'width': width,
								'opacity' : 0
							}).animate({
								'height': Math.floor((h/rows)+addTop+1),
								'margin-top' : 0,
								'margin-left' : 0,
								'opacity' : 1,
								'width' : Math.floor((w/cols)+addLeft+1)
							},(opts.transPeriod-difference),easing,diapoeased);
					} else {
						selector.eq(i).show().css('z-index','999').addClass('diapocurrent');
						selector.eq(vis).css('z-index','1').removeClass('diapocurrent');
						tApp.delay((((opts.transPeriod+difference)/blocks)*delay[index]*couples)*0.5).css({
								'display' : 'block',
								'height': Math.floor((h/rows)+addTop+1),
								'margin-top' : 0,
								'margin-left' : 0,
								'opacity' : 1,
								'width' : Math.floor((w/cols)+addLeft+1)
							}).animate({
								'height': height,
								'margin-left': marginLeft,
								'margin-top': marginTop,
								'width': width,
								'opacity' : 0
							},(opts.transPeriod-difference),easing,diapoeased);
					}
				}



				if(navigation==true){
					$('#pix_prev')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('div.diapocurrent',elem).index());
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum!=0){
								nextSlide(idNum);
							} else {
								nextSlide(amountSlide);
						   }
						}
					});
			
					$('#pix_next')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('div.diapocurrent',elem).index());
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum==amountSlide-1){
								nextSlide(1);
							} else {
								nextSlide(idNum+2);
						   }
						}
					});
				}


				if(isMobile()){
					elem.live('swipeleft',function(event){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('div.diapocurrent',elem).index());
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum==amountSlide-1){
								nextSlide(1);
							} else {
								nextSlide(idNum+2);
						   }
						}
					});
					elem.live('swiperight',function(event){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($('div.diapocurrent',elem).index());
							clearInterval(u);
							imgFake();
							$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
							canvasLoader();
							if(idNum!=0){
								nextSlide(idNum);
							} else {
								nextSlide(amountSlide);
						   }
						}
					});
				}

				if(pagination==true){
					$('#pix_pag li')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($(this).index());
							var curNum = parseFloat($('div.diapocurrent',elem).index());
							if(idNum!=curNum) {
								clearInterval(u);
								imgFake();
								$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
								canvasLoader();
								nextSlide(idNum+1);
							}
						}
					});
				}

				if(opts.thumbs==true){

					$('#pix_pag li .pix_thumb')[clickEv](function(){
						if(!elem.hasClass('diaposliding')){
							var idNum = parseFloat($(this).parents('li').index());
							var curNum = parseFloat($('div.diapocurrent',elem).index());
							if(idNum!=curNum) {
								clearInterval(u);
								imgFake();
								$('#pix_canvas, #pix_canvas_wrap').animate({opacity:0},0);
								canvasLoader();
								nextSlide(idNum+1);
							}
						}
					});
				}



			});
				
				
				
	 
	}

		
		
	
}

})(jQuery);


