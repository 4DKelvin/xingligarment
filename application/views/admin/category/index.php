<script type="text/javascript">
$(document).ready(function(e) {
	$('a.btn-del.icon').click(function(e) {
		if(confirm('是否删除此类别?')){
			window.location.href='<?php echo site_url().'/admin/category/delete/';?>'+$(this).attr('category');
		}
	});
	$('a.new').click(function(){
		$('#modify_id').val('0');
		$('#name_cn').val('');
		$('#name_en').val('');
		$('#btn_submit').val('添加');
		$('#parent').val($(this).attr('parent'));
	});
	$('a.btn-edit').click(function(){
		$('#modify_id').val($(this).attr('category'));
		$('#name_cn').val($(this).attr('cn'));
		$('#name_en').val($(this).attr('en'));
		$('#btn_submit').val('修改');
		$('#parent').val($(this).attr('parent'));
	});
	
});
</script>

<div class="container">
	<h3>类别管理</h3>
	<div class="mainbox">
		<ul class="categories">
			<?php foreach($categories[0] as $base_category):?>
			<li> <?php echo $base_category->name?> <a href="javascript:;" parent="0" cn="<?php echo $base_category->name?>" en="<?php echo $base_category->name_en?>" category="<?php echo $base_category->id?>" class="icon btn-edit">修改</a> <a href="javascript:;" category="<?php echo $base_category->id?>" class="icon btn-del">修改</a>
				<?php if(array_key_exists($base_category->id,$categories)):?>
				<ul>
					<?php foreach($categories[$base_category->id] as $sub_category):?>
					<li><?php echo $sub_category->name;?><a href="javascript:;" parent="<?php echo $base_category->id?>" cn="<?php echo $sub_category->name?>" en="<?php echo $sub_category->name_en?>" category="<?php echo $sub_category->id?>" class="icon btn-edit">修改</a> <a href="javascript:;" category="<?php echo $sub_category->id?>" class="icon btn-del">删除</a> </li>
					<?php endforeach;?>
					<li><a href="javascript:;" parent="<?php echo $base_category->id?>" class="new">添加新类别</a></li>
				</ul>
				<?php endif;?>
			</li>
			<?php endforeach;?>
			<li><a href="javascript:;" parent="0" class="new">添加新类别</a></li>
		</ul>
		<form action="<?php echo site_url('admin/category/add'); ?>" method="post" class="category_form">
			<input type="hidden" value="0" name="id" id="modify_id"/>
			<h4>提示：修改指定的类别,请在左边点击 <span class="icon btn-edit">修改</span> ，删除请点击 <span class="icon btn-del">删除</span> 。</h4>
			<ul>
				<li><span>父类别:</span>
					<select name="parent" id="parent">
						<option value="0">根类别</option>
						<?php foreach($categories[0] as $base_category):?>
						<option value="<?php echo $base_category->id?>"><?php echo $base_category->name?></option>
						<?php endforeach;?>
					</select>
				</li>
				<li><span>名称(中文):</span>
					<input name="name" type="text" placeholder="请输入中文名称" id="name_cn" required="required"/>
				</li>
				<li><span>名称(英文):</span>
					<input name="name_en" type="text" placeholder="请输入英文名称" id="name_en" required="required"/>
				</li>
				<li>
					<input type="submit" value="添加" class="button" id="btn_submit"/>
				</li>
			</ul>
		</form>
		<div class="clear"></div>
	</div>
</div>
