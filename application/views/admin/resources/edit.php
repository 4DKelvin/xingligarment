<script type="text/javascript"
	src="<?php echo base_url(); ?>js/ckeditor/ckeditor.js"></script>

<div class="container">
	<h3>编辑系统资源</h3>
	<div class="panel resource">
		<?php if(isset($error)) echo '<div class="errormsg"><p>',nl2br($error),'<p></div>';?>
		<?php echo form_open_multipart('admin/resources/doedit'); ?>
		<label>资源主键 (Key):</label>
		<?php echo form_input("atts[key]",$resource->key,'required = "required" readonly="readonly"'); ?>
		<input type="hidden" name="atts[type]" value="<?php echo $resource->type;?>">
		<label>资源值 (Value):</label>
		<?php echo form_textarea("atts[value]",$resource->value,($resource->type == 'editor'?'class="ckeditor"':'class=editor')); ?> <?php echo form_submit('', '提交','class="button"'); ?> <?php echo form_close(); ?> </div>
</div>
