<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>控制面板</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link href="<?php echo base_url(); ?>css/admincp.css" rel="stylesheet" type="text/css" />
<link href="<?php echo base_url(); ?>css/ui-lightness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" type="text/css" />
<!--[if IE]>  <link rel="stylesheet" href="<?php echo base_url(); ?>css/ie.css"	type="text/css" media="all"/> <![endif]-->
<script type="text/javascript" src="<?php echo base_url(); ?>js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/jquery.form.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/widget-pagesplit.js"></script>
</head>
<body>
<div class="top_header">
	<?php $this->load->module('admin/topbar'); ?>
</div>
<div class="left_menu">
	<div class="body">
		<?php $this->load->module('admin/menubar'); ?>
	</div>
</div>
<div class="content_body">
	<div class="body">
		<?php  $this->view(isset($temp_name)?$temp_name:'admin/'.$controller_name.'/'.$method_name.'.php');?>
	</div>
</div>
<?php $this->load->module('admin/footer'); ?>
</body>
</html>