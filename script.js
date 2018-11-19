$(document).ready(function() {
	
	var embed_content = {	"p1" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1610.00805" class="pdf">',
							"p2" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1711.11497" class="pdf">',
							"p3" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1610.00209" class="pdf">',
							"p4" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1712.02499" class="pdf">',
							"p5" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1801.00843" class="pdf">',
							"p6" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1509.08323" class="pdf">',
							"p7" :	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1712.02499" class="pdf">',
							"p8" : 	'<embed src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://arxiv.org/pdf/1811.06382" class="pdf">',
							"t1" : 	'<iframe src="https://fast.wistia.net/embed/iframe/minvaxedxd" class="pdf" allowfullscreen></iframe>',
							"t2" : 	'<iframe src="https://www.youtube.com/embed/tSNo5E2yRjA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="pdf"></iframe>',
							"t3" :  '<iframe src="https://www.youtube.com/embed/L5Y65QuZXAs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="pdf"></iframe>'
						}	
						

	
	
	var content_visible = false;
	var description_box = $('div[id=p1][class=intro]')
	var content_box = 	$('div[class=content]')[0]
	var menu_box = $('div[class=menu]')[0]
	var arrow = $('[class=menu-arrow]') 
	
	$(".menu li a").click(function(){
		description_box.hide();
		
		var id = this.getAttribute("id");
		console.log(id);
		
		description_box = $('div[id='+id+'][class=intro]')
		description_box.show();
		content_box.innerHTML = embed_content[id]
		if(!content_visible){ show_content() }
		
		resize_content();
		
		$(".menu").css("float", "left");
	});
	
	function resize_content(){
		content_box.setAttribute("style",'height:' + (menu_box.clientHeight - description_box[0].clientHeight) + 'px');
		console.log(menu_box.clientHeight)
		console.log(description_box[0].clientHeight)
		console.log(description_box[0])
		
		
		console.log('"' + (menu_box.clientHeight - description_box[0].clientHeight) + 'px"')
		
	}
	
	
	
	arrow.click(function(){
		hide_content();
		
		$(".menu").css("float", "right");
		
	});
	
	function show_content() {
		content_visible = true;
		$(".content-container").show();
		//$(".content-container").setAttribute("display", "table");
		arrow.show();
	}
	
	function hide_content()	{
		content_visible = false;
		$(".content-container").hide();
		//$(".content-container").setAttribute("display","none");
		
		arrow.hide();
	}
	

});