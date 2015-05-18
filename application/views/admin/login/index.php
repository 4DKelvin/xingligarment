<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7">
<title>后台管理</title>
<link rel="stylesheet" href="<?php echo base_url(); ?>css/admincp.css"	type="text/css" media="all"/>
<!--[if IE]>  <link rel="stylesheet" href="<?php echo base_url(); ?>css/ie.css"	type="text/css" media="all"/> <![endif]-->
</head>
<body>
<div class="login-panel">
	<?php if( $errorMessage!=''):?>
	<div id="errormsg" class="errormsg loginmsg">
		<p> <?php echo $errorMessage; ?> </p>
	</div>
	<?php endif; ?>
	<div class="logo">芯芽后台控制面板</div>
	<form action="/admin/login" method="post" id="loginform">
		<label>管理员账号:</label>
		<input type="text" name="username" class="txt" tabindex="1" id="userName" value="" />
		<label>管理员口令:</label>
		<input type="password" name="password" class="txt" tabindex="1" id="password" value="" />
		<input type="submit" name="submit" value="登录管理面板" class="button"	tabindex="3" />
	</form>
</div>
</body>
</html>
