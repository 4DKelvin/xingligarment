<script type="text/javascript"
	src="<?php echo base_url(); ?>js/ckeditor/ckeditor.js"></script>
<div class="container">
	<h3><?php echo $title;?></h3>
	<div class="panel page-panel">
		<?php if(isset($error)) echo '<div class="errormsg"><p>',nl2br($error),'<p></div>';?>
		<?php echo form_open_multipart('admin/page/doedit/'.$page->id); ?>
		<div class="field">
			<label>标题:</label>
			<?php echo form_input("atts[title]",$page->title,'required = "required"'); ?>
			<input type="hidden" name="atts[type]" value="<?php echo $page->type;?>">
		</div>
		<div class="field">
			<label>语言:</label>
			<input type="radio" value="cn" name="atts[language]" <?php echo $page->language == 'cn'?'checked="checked"':'';?> />
			中文
			<input type="radio" value="en" name="atts[language]" <?php echo $page->language == 'en'?'checked="checked"':'';?>/>
			英文</div>
		<div class="clear"></div>
		<label>内容:</label>
		<?php echo form_textarea("atts[content]",$page->content,'class="ckeditor"'); ?>
		<div class="clear"></div>
		<?php echo form_submit('', '提交','class="button"'); ?> <?php echo form_close(); ?> </div>
</div>
