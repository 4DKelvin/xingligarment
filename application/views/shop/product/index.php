<div id="banner" class="container wrapper"><img src="/images/2.jpg"></div>
<div id="content" class="container wrapper">
<h3><?php echo $selectedCategory->name; ?></h3>
	<ul class="buttons">
		<li> <a href="<?php echo site_url('/shop/product/index?cid=1');?>"><?php echo $categories[1]->name;?></a> </li>
		<li> <a href="<?php echo site_url('/shop/product/index?cid=2');?>"><?php echo $categories[2]->name;?></a> </li>
		<li> <a href="<?php echo site_url('/shop/product/index?cid=3');?>"><?php echo $categories[3]->name;?></a> </li>
	</ul>
	<?php foreach ($products as $product) {?>
	<dl style=" margin:15px 10px;" >		
		<dt style="margin:0;"><a href="<?php echo site_url('/shop/product/show/'. $product->id .'?cid='.$selectedCategory->id); ?>"><img src="<?php echo base_url('/upload/products/'. $product->image); ?>" width="177" height="176"></a></dt>
		<dd style="line-height:30px;"><a href="<?php echo site_url('/shop/product/show/'. $product->id .'?cid='.$selectedCategory->id); ?>"><?php echo  $product->name; ?></a></dd>
	</dl>
	<?php }?>
</div>