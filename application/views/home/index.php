<div class="banner">
  <ul class="border">
  <?php $i=0;
  	for($i=0;$i<count($slider['images']);$i++)
  	{
  		$class = $i!=0?'class="hide"':'';
  		echo '<li ',$class,'><img src="/images/',$slider['images'][$i],'" />';
  		echo '<p>',$slider['texts'][$i],'</p></li>';
  	  	}
  ?>
    
  </ul>
</div>
<div class="home-content">
  <div class="left-sider side1">
  <?php echo $webChatContent;?>
  </div>
  <div class="right-sider side2">
    <h1><?php echo getlable('establishment_look');?></h1>
    <marquee direction="right" behavior="scroll" scrolldelay="100" >
    <ul class="business">
    <?php $i=0;foreach ($centerSliderImages as $img):?>
    	<li><a href='/images/<?php echo $img;?>' target="new"><img src='/images/<?php echo $img;?>'></a></li>
    <?php endforeach;?>
    </ul>
    </marquee>
  </div>
  <div class="right-sider side3">
  <?php echo $corporate_culture;?>
      </div>
  <div class="fiexed"></div>
</div>
<script type="text/javascript">
var index = 0;
function bannerSwitch(){
	$('.banner li').hide();
	if(index >= $('.banner li').length-1){
		index = 0;
	}else{
		index++;
	}
	$('.banner li').eq(index).fadeIn(1000);
}
setInterval('bannerSwitch()',8000);
</script>