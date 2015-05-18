<div class="page-header-fixed">
    <div class="header">
      <p class="language"><?php echo getlable('language');?><a href="/home/language/cn">简体中文</a> <a href="/home/language/en">English</a></p>
      <div class="logo"></div>
    </div>
    <ul class="nav">
  
      <li><a href="/home" <?php echo $pageTitle==getlable('home')?'class="active"':'';?>><?php echo getlable('home');?></a></li>
      <li><a href="<?php echo $links['about'];?>" <?php echo $pageTitle==getlable('about')?'class="active"':'';?>><?php echo getlable('about');?></a></li>
      <li><a href="/shop/product/" <?php echo $pageTitle==getlable('my_epoch')?'class="active"':'';?>><?php echo getlable('my_epoch');?></a></li>
      <li><a href="<?php echo $links['odm'];?>" <?php echo $pageTitle==getlable('odm')?'class="active"':'';?>><?php echo getlable('odm');?></a></li>
      <li><a href="<?php echo $links['weaving_factory']; ?>" <?php echo $pageTitle==getlable('weaving_factory')?'class="active"':'';?>><?php echo getlable('weaving');?></a></li>
      <li><a href="#" ><?php echo getlable('blog');?></a></li>
      <li><a href="<?php echo $links['hiring']; ?>" <?php echo $pageTitle==getlable('hiring')?'class="active"':'';?>><?php echo getlable('hiring');?></a></li>
      <li><a href="<?php echo $links['contact']; ?>" <?php echo $pageTitle==getlable('contact')?'class="active"':'';?>><?php echo getlable('contact');?></a></li>
    </ul>
</div>