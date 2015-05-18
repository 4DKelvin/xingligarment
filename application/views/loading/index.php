<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title><?php echo $pageTitle;?></title>
<link rel="stylesheet" type="text/css" href="/css/css.css"/>
<script type="text/javascript" src="/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(e) {
		var interval = setInterval(function(){
				window.location.href='<?php echo site_url('/home/index')?>';
			},5000);
	});
</script>
</head>
<body>
<center class="loading">
<a href="<?php echo site_url('/home/index')?>">
	<img src="<?php echo base_url().'/images/onload.jpg'?>"/>
</a>
</center>
</body>
</html>