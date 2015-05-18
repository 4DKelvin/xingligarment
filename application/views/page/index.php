<div class="page-content">
  <p class="breadcrumbs"><a href="/"><?php echo getlable('home');?></a> &gt; <a href="#"><?php echo $page->title;?></a></p>
  <ul class="sider-menu">
    <?php foreach ($pages as $p){
    	
    	echo '<li><a href="/page/index/',$p,'"',(getlable($p) == $selectedTitle?' class="active"':''),'>',getlable($p),'</a></li>';
    }?>
  </ul>
  <div class="content">
 		<?php echo $page->content;?>
  </div>
  <div class="fiexed"></div>
</div>
<script type="text/javascript">
$(document).ready(function(e) {
	$('.frame a').each(function(index, element) {
		$('<img/>').attr('src',$(this).attr('href')).appendTo($(this));		
        $(this).click(function(e){return false;});		
    });
	$('.frame a').eq(0).hover(function(e){
		$(this).next().html('');
		var text = $('<div/>').addClass('note').html($(this).attr('alt')).hide();
		text.appendTo($(this).next());
		text.fadeIn(500);
		return false;
	},function(e){
		$(this).next().html('');
		var img = $('<img/>').attr('src',$(this).next().attr('href')).hide()
		img.appendTo($(this).next());
		img.fadeIn(500);
		return false;
	});
	$('.frame a').eq(1).hover(function(e){
		$(this).prev().html('');
		var text = $('<div/>').addClass('note').html($(this).attr('alt')).hide();
		text.appendTo($(this).prev());
		text.fadeIn(500);
		return false;
	},function(e){
		$(this).prev().html('');
		var img = $('<img/>').attr('src',$(this).prev().attr('href')).hide()
		img.appendTo($(this).prev());
		img.fadeIn(500);
		return false;
	});
});
</script>
