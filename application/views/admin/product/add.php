<script type="text/javascript" src="/js/product-upload.js"></script>
<script type="text/javascript">
	$(document).ready(function(e) {
		$('.tabhost a').click(function(e) {
			$('.tabhost a').removeClass('active');
			$('.tab').removeClass('active');
			$(this).addClass('active');
			$($(this).attr('href')).addClass('active');
			return false;
		});
	});
</script>
<div class="container">
	<h3>添加产品</h3>
	<div class="panel left-panel">
		<label>产品图片(颜色):</label>
		<ul>
			<li> <?php echo form_open_multipart('admin/product/upload',"class='upload'"); ?> <a class="add-image">添加图片</a> <?php echo form_upload('mainImage','','accept="image/*"'); ?> <?php echo form_close();?> </li>
		</ul>
	</div>
	<div class="panel right-panel">		
		<?php if(isset($error)) echo '<div class="errormsg"><p>',nl2br($error),'<p></div>';?>
		<?php echo form_open_multipart('admin/product/create'); ?>
		<input name="atts[image]" type="hidden" id="mainImage"/>
		<label>型号:</label>
		<?php echo form_input("atts[model]",'','required = "required" maxlength="22" placeholder="如 : NXM-100DSVB"'); ?>
		<label>尺寸: (请用逗号分隔)</label>
		<?php echo form_input("atts[size]",'','required = "required" placeholder="如 : S , M , L , XL , XXL"'); ?>
		<label>类别:</label>
		<ul>
			<?php foreach ($categories[0] as $cate):?>
			<li><span><?php echo form_checkbox('cates[]',$cate->id,'');?><?php echo $cate->name;?></span>
				<?php if(array_key_exists($cate->id,$categories)):?>
				<ul>
					<?php foreach ($categories[$cate->id] as $sub):?>
					<li><span><?php echo form_checkbox('cates[]',$sub->id,'');?><?php echo $sub->name;?></span></li>
					<?php endforeach;?>
				</ul>
				<?php endif;?>
			</li>
			<?php endforeach;?>
		</ul>
		<div class="clear"></div>
		<ul class="tabhost">
			<li><a href="#cn" class="active">中文信息</a></li>
			<li><a href="#en">英文信息</a></li>
		</ul>
		<div id="cn" class="tab active">
			<label>名称:</label>
			<?php echo form_input("atts[name][cn]",'','required = "required" maxlength="45" placeholder="如 : 经典品牌牛仔裤"'); ?>
			<label>面料:</label>
			<?php echo form_input("atts[fabric][cn]",'','required = "required" maxlength="45" placeholder="如 : 纤维 / 棉"'); ?>
			<label>成分:</label>
			<?php echo form_input("atts[ingredient][cn]",'','required = "required" maxlength="45" placeholder="如 : 60%纤维 / 40%棉"'); ?>
			<label>洗涤:</label>
			<?php echo form_input("atts[washing][cn]",'','required = "required" maxlength="45" placeholder="如 : 40°c以下"'); ?>
			<label>简介:</label>
			<?php echo form_textarea("atts[description][cn]",'','required = "required" placeholder="描述产品的卖点,优势等"'); ?></div>
		<div id="en" class="tab">
			<label>Name:</label>
			<?php echo form_input("atts[name][en]",'','required = "required" maxlength="45" placeholder="eg: Classic brand jeans"'); ?>
			<label>Fabric:</label>
			<?php echo form_input("atts[fabric][en]",'','required = "required" maxlength="45" placeholder="eg: Fiber / Cotton"'); ?>
			<label>Ingredient:</label>
			<?php echo form_input("atts[ingredient][en]",'','required = "required" maxlength="45" placeholder="eg: 60% of the fiber / 40% cotton"'); ?>
			<label>Washing:</label>
			<?php echo form_input("atts[washing][en]",'','required = "required" maxlength="45" placeholder="eg: 40 degrees Celsius"'); ?>
			<label>Description:</label>
			<?php echo form_textarea("atts[description][en]",'','required = "required" placeholder="Description Product selling point, advantage, etc."'); ?></div>
		<div class="clear"></div>
		<?php echo form_submit('', '提交','class="button"'); ?> <?php echo form_close(); ?> </div>
	<div class="clear"></div>
</div>
