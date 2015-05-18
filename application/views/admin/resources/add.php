<script type="text/javascript"
	src="<?php echo base_url(); ?>js/ckeditor/ckeditor.js"></script>
<div class="container">
	<h3>添加系统资源</h3>
	<div class="panel">
		<?php if(isset($error)) echo '<div class="errormsg"><p>',nl2br($error),'<p></div>';?>
		<?php echo form_open_multipart('admin/resources/doadd'); ?>
		<label>资源主键 (Key):</label>
		<?php echo form_input("atts[key]",'','required = "required"'); ?>
		<input type="hidden" name="atts[type]" value="<?php echo $type;?>"> 
		<label>资源值 (Value):</label>
	<?php echo form_textarea("atts[value]",'',($type == 'editor'?'class="ckeditor"':'class=editor')); ?> 
	<?php echo form_submit('', '提交','class="button"'); ?> <?php echo form_close(); ?> 
	</div>
		
</div>
