$(document).ready(function(e) {

	$('.add-image').click(function(){		
		$(this).next('input[type=file]').trigger('click');	
	});
	$('.btn-edit').click(function(){		
		$(this).parent().parent().next('input[type=file]').trigger('click');	
		$(this).parent().parent().next('input[type=file]').change(function(){
			if($(this).val()){
				$(this).parent().submit();
			}
		});
	});
	$('.btn-del').click(function(){
		if(confirm('删除此图片?')){
			$(this).parent().parent().parent().parent().remove();
			$('#mainImage').val('');
			$('.left-panel ul li img').each(function(index, element) {
				if($('.left-panel ul li img').length>1){
					$('#mainImage').val($('#mainImage').val()+','+$(this).attr('src'));
				}else{
					$('#mainImage').val(result.data);
				}
			});
		}
	});
	$('input[type=file]').change(function(){
		if($(this).val()){
			$(this).parent().submit();
		}
	});
	$('.upload').ajaxForm({
    	url:'/admin/product/upload',
		dataType:'json',
    	success: upload,
		error: upload
	});
	$('li img').each(function(index, element) {
		if(!$(this).height() || !$(this).width()){
			$(this).unbind('load');
			$(this).bind('load',function(){			
				var tb_margin = parseInt((150 - $(this).height())/2);
				var lf_margin = parseInt((220 - $(this).width())/2);
				$(this).css('margin',tb_margin+'px '+lf_margin+'px ');		
			});
		}else{
			var tb_margin = parseInt((150 - $(this).height())/2);
			var lf_margin = parseInt((220 - $(this).width())/2);
			$(this).css('margin',tb_margin+'px '+lf_margin+'px ');	
		}
	});
});
function refreshUploadImage(currentImage){
	$('#mainImage').val('');
	$('.left-panel ul li img').each(function(index, element) {
		if($('.left-panel ul li img').length>1){
			
			$('#mainImage').val($('#mainImage').val()+','+$(this).attr('src').replace('/upload/products/',''));
		}else{
			$('#mainImage').val(","+currentImage);
		}
	});
	$('#mainImage').val($('#mainImage').val().substring(1));
}
function upload(result){
	if(result.data)
	{
		if($('.left-panel ul li#'+result.id).length){
			$('.left-panel ul li#'+result.id).find('img').attr('src','/upload/products/'+result.data);
		}else{
			var li = $('.left-panel ul li').first().clone().attr('id',result.id).hide();
			var img = $('<img/>').attr({'src':'/upload/products/'+result.data});
			var tools = $('<div/>').addClass('tools');
			var hidden = $('<input/>').attr({'type':'hidden','name':'id'}).val(result.id);
			$(li).find('form').ajaxForm({
				url:'/admin/product/upload',
				dataType:'json',
				success: upload,
				error: upload
			});
			var edit= $('<font/>').addClass('icon btn-edit').bind('click',function(){
				$(this).parent().parent().next('input[type=file]').trigger('click');	
				$(this).parent().parent().next('input[type=file]').change(function(){
					if($(this).val()){
						$(this).parent().submit();
					}
				});
			});
			var del= $('<font/>').addClass('icon btn-del').bind('click',function(){
				if(confirm('删除此图片?')){
					$(this).parent().parent().parent().parent().remove();
					refreshUploadImage(result.data);
				}
			});
			tools.append(edit).append(del).append(hidden);
			li.find('.add-image').removeClass('add-image').addClass('normal');
			li.find('a').html('').append(img).append(tools).unbind('click');
			li.appendTo($('.left-panel ul'));
			if(!$(img).height() || !$(img).width()){
				$(img).unbind('load');
				$(img).bind('load',function(){			
					var tb_margin = parseInt((150 - $(this).height())/2);
					var lf_margin = parseInt((220 - $(this).width())/2);
					$(this).css('margin',tb_margin+'px '+lf_margin+'px ');		
				});
			}else{
				var tb_margin = parseInt((150 - $(img).height())/2);
				var lf_margin = parseInt((220 - $(img).width())/2);
				$(img).css('margin',tb_margin+'px '+lf_margin+'px ');	
			}
			li.fadeIn(500);	
		}
		refreshUploadImage(result.data);
		
	}else{
		alert('上传失败,请重试.');
	}
}