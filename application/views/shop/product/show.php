<script type="text/javascript" src="<?php echo site_url('')?>/js/jQueryCloudZoom/js/cloud-zoom.1.0.2.js"></script>
<link rel="stylesheet" type="text/css" href="<?php echo site_url('')?>/js/jQueryCloudZoom/cloud-zoom.css"/>
<div id="sitemap" class="container wrapper">
	<div> <a href="<?php echo site_url('/shop')?>"><?php echo getlable('home');?></a>&gt; <a href="<?php echo site_url('/shop/product/?cid='.$selectedCategory->id);?>"><?php echo $selectedCategory->name;?></a>&gt; <span><?php echo $product->name;?></span></div>
	<h1><?php echo $product->name;?></h1>
	<span class="wrapper"></span> </div>
<div id="content" class="container wrapper">
	
	<div style="width:400px; height:400px;float:left;">
		<div class="block"> <a link="<?php echo base_url('/upload/products/' . $product->image);?>" rel=""  class="cloud-zoom" id='zoom1'><img src="<?php echo base_url('/upload/products/' . $product->image);?>" /></a> 
			<ul>
				<?php foreach($product->images as $image):?>
				<a link="<?php echo base_url('/upload/products/' . $image->image);?>"
					 class="cloud-zoom-gallery" rel="useZoom: 'zoom1', smallImage: '<?php echo base_url('/upload/products/' . $image->image);?>'"
				>
					<img src="<?php echo base_url('/upload/products/' . $image->image);?>"/>
				</a>
				<?php endforeach;?>
			</ul>
		</div>
	</div>
	<ul class="description">
		<li>
			<h2><?php echo $product->name;?></h2>
		</li>
		<li><span><?php echo getlable('model');?>:</span><?php echo $product->model;?></li>
		<li><span><?php echo getlable('fabric');?>:</span><?php echo $product->fabric;?></li>
		<li><span><?php echo getlable('ingredient');?>:</span><?php echo $product->ingredient;?></li>
		<li><span><?php echo getlable('washing');?>:</span><?php echo $product->washing;?></li>
		<li class="border"></li>
		<li><a href="javascript:addfavorite();" class="favorite"><?php echo getlable('addtofavorite');?></a></li>
	</ul>
</div>
<script type="text/javascript">
	function addfavorite()
	{
		try{
      		window.external.addFavorite(window.location.href, '<?php echo $product->name;?>');
		}catch (e){
			try{
				window.sidebar.addPanel('<?php echo $product->name;?>', window.location.href, "");
			}catch(e){
				alert('加入收藏失败，请使用Ctrl+D进行添加');
			}
		}	  
	} 
	$(function(){
	  $('.cloud-zoom').attr('rel','adjustX:30');
	});
</script> 