<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title><?php echo $pageTitle;?></title>
<link rel="stylesheet" type="text/css" href="/css/shop/css.css"/>
<script type="text/javascript" src="/js/jquery.js"></script>
</head>
<body>
<div id="header" class="container wrapper">
	<div id="myepoch">My-Epoch</div>
	<ul id="nav">
		<?php
	 	foreach ($categories as $cate) {
		if($cate->id>3)
		{
			echo '<li><a href="',site_url('/shop/product/index?cid='. $cate->id),'">',$cate->name,'</a></li>';
		}
	} ?>
	</ul>
</div>
<div class="wrapper hr"></div>
<?php  $this->view(isset($temp_name)?$temp_name:'shop/'.$controller_name.'/'.$method_name.'.php');?>
<div class="wrapper hr"></div>
<div id="footer" class="container wrapper">
	<p><a href="/home"><?php echo getlable('home');?></a> <a href="<?php echo $links['corporate_culture'];?>"><?php echo getlable('corporate_culture');?></a>  <a href="<?php echo $links['hiring'];?>"><?php echo getlable('hiring');?></a> <a href="<?php echo $links['contact'];?>"><?php echo getlable('contact');?></a> <a href="#"><?php echo getlable('find_us_on_weibo');?></a> </p>
</div>
</body>
</html>