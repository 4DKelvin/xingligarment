<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title><?php echo $pageTitle;?></title>
<link rel="stylesheet" type="text/css" href="/css/css.css"/>
<script type="text/javascript" src="/js/jquery-1.9.1.min.js"></script>
</head>
<body class="<?php echo $bodyclass;?>">
<div class="page-header">
	<?php $this->load->module('home/top'); ?>
</div>
<?php  $this->view(isset($temp_name)?$temp_name:$controller_name.'/'.$method_name.'.php');?>
<div class="page-footer">
 <?php $this->load->module('home/buttom'); ?>
</div>
<script type="text/javascript" src="http://webchat.jk-soft.net/js/service.php?cid=1">
</script>
</body>
</html>