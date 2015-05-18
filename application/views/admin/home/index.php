<div id="append"></div>
<div class="container">
	<h3>微商城 管理系统</h3>
	<h5>您好，<?php echo $admin->username;?>，欢迎您使用微商城管理系统。使用时有任何疑问或建议，请<a href="#">联系我们</a>。</h5>

	<h4>服务器信息</h4>
	<ul class="status">
		<li><em>服务器域名：</em> <?php echo $_SERVER["SERVER_NAME"]; ?> </li>
		<li><em>服务器地址：</em> <?php echo $_SERVER["SERVER_ADDR"]; ?> </li>
		<li><em>服务器环境：</em> <?php echo $_SERVER["SERVER_SOFTWARE"]; ?> </li>
		<li><em>客户端地址：</em> <?php echo $_SERVER["REMOTE_ADDR"]; ?> </li>
		<li><em>数据库支持：</em> <?php echo showResult(function_exists("mysql_close"))."MySQL"; ?> </li>
		<li><em>Cookie支持：</em> <?php echo showResult(strlen($_SERVER["HTTP_COOKIE"])?1:0); ?> </li>
	</ul>
</div>
<?php
function showResult($v)
{
	if($v==1)
	{
		echo "√支持";
	}else{
		echo "×不支持";
	}
}
?>
