<div class="container">
	<h3>产品列表</h3>
	<h5 class="border-bottom">全部产品 ( 共 <?php echo $rowCount;?> 件 )，需要添加产品，请点这里 <a class="icon btn-add" href="<?php echo base_url('admin/product/add'); ?>">添加</a> 添加
		<form action="<?php site_url('admin/product')?>" id="pagetop" class="pages" method="POST">
		</form>
	</h5>
	<div class="mainbox" style="min-height: 500px;">
		<ul class="thead">
			<li class="th name">产品名称</li>
			<li class="th time">型号</li>
			<li class="th oper">操作</li>
		</ul>
		<?php foreach($products as $product) :?>
		<ul class="tbody">
			<li class="td name">
				<dt><img onerror="noimage(this)" src="<?php echo base_url('upload/products') . '/' . $product->color;?>" /></dt>
				<dl>
					<?php echo $product->name; ?>
				</dl>
				<dd>提供尺码：<?php echo $product->size; ?> </dd>
			</li>
			<li class="td time"><?php echo $product->model ?></li>
			<li class="td oper"><a class="icon btn-edit" href="<?php echo site_url('admin/product/edit/'.$product->model); ?>">编辑</a> <a class="icon btn-del" href="javascript:" pid="<?php echo $product->model;?>">删除</a> </li>
		</ul>
		<?php endforeach;?>
	</div>
	<h5 class="border-bottom">全部产品 ( 共 <?php echo $rowCount;?> 件 )，需要添加产品，请点这里 <a class="icon btn-add" href="<?php echo base_url('admin/product/add'); ?>">添加</a> 添加
		<form action="<?php site_url('admin/product')?>" id="pagebottom" class="pages" method="POST">
		</form>
	</h5>
</div>
<script type="text/javascript">
$(document).ready(function(e) {
	$('.btn-del').click(function(e) {
		if(confirm('是否删除此产品？')){
			window.location.href='<?php echo site_url('admin/product/delete');?>/'+$(this).attr('pid');
		}
	});
	$('form.pages').each(function(index, element) {
		new PageSplit({'pageindex':<?php echo $pageIndex;?>,
			   'form':$(this).attr('id'),'rowcount':<?php echo $rowCount;?>,
					   'linenum':'<?php echo $pageCount;?>'}).renderTo($(this).attr('id'));
	});
	$('dt img').each(function(){
		var tb_margin = parseInt((80 - $(this).height())/2);
		var lf_margin = parseInt((80 - $(this).width())/2);
		$(this).css('margin',tb_margin+'px '+lf_margin+'px ');
		$(this).load(function(){			
			var tb_margin = parseInt((80 - $(this).height())/2);
			var lf_margin = parseInt((80 - $(this).width())/2);
			$(this).css('margin',tb_margin+'px '+lf_margin+'px ');			
		});
		$(this).error(function(){
			$(this).parent().addClass('noimage');	
			$(this).remove();
		});
	});
});
function noimage(target){
	$(target).parent().addClass('noimage');	
	$(target).remove();
}

</script>