<?php $type_text =array('image'=>'图片','text'=>'文本','editer'=>'HTML','config'=>'系统变量');?>
<div class="container">
	<h3>系统资源管理 <span style="color:red">（如要修改，请先咨询技术人员）</span></h3>
	<h5 class="border-bottom"> <a class="button" href="<?php echo base_url('admin/resources/add/image'); ?>">添加图片</a> <a class="button" href="<?php echo base_url('admin/resources/add/text'); ?>">添加文本</a> <a class="button" href="<?php echo base_url('admin/resources/add/editor'); ?>">添加HTML</a> <a class="button" href="<?php echo base_url('admin/resources/add/config'); ?>">添加系统变量</a> </h5>
	<div class="mainbox">
		<ul class="thead">
			<li class="th name">资源主键 (Key)</li>
			<li class="th time">资源类型</li>
			<li class="th oper">操作</li>
		</ul>
		<?php foreach($resources as $resource) :?>
		<ul class="tbody mini">
			<li class="td name"> <?php echo $resource->key; ?> </li>
			<li class="td time"><?php echo $type_text[$resource->type];?> </li>
			<li class="td oper"><a class="icon btn-edit" href="<?php echo site_url('admin/resources/edit/'.urlencode($resource->key));?>">编辑</a> <a class="icon btn-del" href="javascript:" pid="<?php echo urlencode($resource->key);?>">删除</a> </li>
		</ul>
		<?php endforeach;?>
	</div>
	<h5 class="border-bottom"> <a class="button" href="<?php echo base_url('admin/resources/add/image'); ?>">添加图片</a> <a class="button" href="<?php echo base_url('admin/resources/add/text'); ?>">添加文本</a> <a class="button" href="<?php echo base_url('admin/resources/add/editor'); ?>">添加HTML</a> <a class="button" href="<?php echo base_url('admin/resources/add/config'); ?>">添加系统变量</a> </h5>
</div>
<script type="text/javascript">
$(document).ready(function(){
	$('.someadd').click(function(){
			window.location.href=$(this).children("a").attr('href');
		});
	$('.btn-del').click(function(e) {
		if(confirm('是否删除此资源？')){
			window.location.href='<?php echo site_url('/admin/resources/delete/');?>/'+$(this).attr('pid');
		}
	});
});
</script>