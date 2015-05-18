<div class="container">
	<h3><?php echo $title;?></h3>
	<h5 class="border-bottom">页面管理，此面板提供对基础页面的内容修改。</h5>
	<div class="mainbox">
		<ul class="thead">
			<li class="th name">标题</li>
			<li class="th time">语言</li>
			<li class="th oper">操作</li>
		</ul>
		<?php foreach($pages as $page) :?>
		<ul class="tbody mini">
			<li class="td name">
				<?php echo $page->title; ?>
			</li>
			<li class="td time"><?php echo $page->language =='cn'?'中文':'英文';?></li>
			<li class="td oper"><a class="icon btn-edit" href="<?php echo site_url('admin/page/edit/'.$page->id); ?>">编辑</a>&nbsp;</li>
		</ul>
		<?php endforeach;?>
	</div>
	<h5 class="border-bottom"> 添加与删除功能暂时不可用，如需添加新的页面，请联系技术人员。</h5>
</div>