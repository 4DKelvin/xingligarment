<?php
$cn = array(
		'home'=>'首页',
		'contact'=>'联系我们',
		'about'=>'公司简介',
		'company_overview'=>'公司概览',
		'corporate_culture'=>'企业文化',
		'terms_of_service'=>'服务条款',
		'disclaimer'=>'免责声明',
		'processing_plant'=>'加工厂',
		'weaving_factory'=>'织布厂',
		'hiring'=>'人才招聘',
		'my_epoch' =>'产品',
		'odm'=>'加工',
		'weaving'=>'织布',
		'find_us_on_weibo' =>'关注新浪微博',
		'blog'=>'博客',
		'ours_wechat'=>'我们的微信',
		'establishment_look'=>'企业容貌',
		'language'=>'选择语言：',
		'model'=>'款号',
		'fabric'=>'面料',
		'ingredient'=>'成份',
		'washing'=>'洗水温度',
		'addtofavorite'=>'加入收藏',
		'select_color'=>'颜色选择'
);
$en = array(
		'home'=>'Home',
		'contact'=>'Contact Us',
		'about'=>'About Us',
		'company_overview'=>'Company Overview',
		'corporate_culture'=>'Corporate Culture',
		'terms_of_service'=>'Terms of Service',
		'disclaimer'=>'Disclaimer',
		'processing_plant'=>'Processing Plant',
		'weaving_factory'=>'Weaving Factory',
		'hiring'=>'Hiring',
		'my_epoch' =>'PRODUCTS',
		'odm'=>'ODM',
		'weaving'=>'Weaving',
		'find_us_on_weibo' =>'Find Us Weibo',
		'blog'=>'Blog',
		'ours_wechat'=>"Ours WeChat",
		'establishment_look'=>'Establishment Looks',
		'language'=>'LANGUAGE: ',
		'model'=>'Item',
		'fabric'=>'Fabric',
		'ingredient'=>'Composition',
		'washing'=>'Washing',
		'addtofavorite'=>'Add To Favorite',
		'select_color'=>'Select Color'
);
global $labels;
$labels = array('cn'=>$cn,'en'=>$en);
global $pages;
$pages = array(
		'cn'=>array('contact'=>'联系我们',
				'hiring'=>'人才招聘',
				'company_overview'=>'公司概览',
				'processing_plant'=>'加工厂',
				'weaving_factory'=>'织布厂',
				'corporate_culture'=>'企业文化',
				'terms_of_service'=>'服务条款',
				'disclaimer'=>'免责声明'
		),
		'en'=>array('contact'=>'Contact Us',
				'hiring'=>'Hiring',
				'company_overview'=>'Company Overview',
				'processing_plant'=>'Processing Plant',
				'weaving_factory'=>'Weaving',
				'corporate_culture'=>'Corporate Culture',
				'terms_of_service'=>'Terms Of Service',
				'disclaimer'=>'Disclaimer'
		)
);
function getlangkey($value)
{
	global $labels;
	$arr =  $labels['cn'];
	foreach ($arr as $key=>$v)
	{
		if($v == $value)
		{
			return $key;
		}
	}
	$arr =  $labels['en'];
	foreach ($arr as $key=>$v)
	{
		if($v == $value)
		{
		return $key;
		}
	}
	return false;
}
function getlable($label)
{
	global $LANG;

	global $labels;
	return $labels[$LANG][$label];
}

function getPageTitle($key)
{
	global $pages;
	global $LANG;
	if(array_key_exists($key, $pages[$LANG]))
		return $pages[$LANG][$key]; 
	return false;
}
function getCustomFont()
{
	global $LANG;
	if($LANG=='cn')
	{
		return '<script type="text/javascript" src="'.base_url().'js/frontend/cufon-yui.js"></script>
				<script type="text/javascript" src="'.base_url().'js/frontend/cufon-microsoft-yahei.js"></script>
						<script type="text/javascript" src="'.base_url().'js/frontend/cufon-replace.js"></script>
								<!--[if lt IE 9]><script type="text/javascript">Cufon.set(\'engine\', \'canvas\');</script><![endif]-->';
	}
}

function getImage($url)
{
	$names  = explode(".", $url);
	return $names[0].'_thumb' . '.' . $names[1];
}