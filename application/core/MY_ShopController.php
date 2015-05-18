<?php
class MY_ShopController extends MY_Controller
{
	var $selectedCategory;
	function __construct() {
		
		parent::__construct ();
		global  $LANG;
		$this->load->model('categoryModel');
		$temps = $this->categoryModel->get_list(array('language'=>$LANG),'ordernum');
		$categories = array();
		foreach ($temps as $cate)
		{
			$categories[$cate->id] = $cate;
		}
		$this->view_data['categories'] = $categories;
		if(isset($_GET['cid']))
		{
			$this->view_data['selectedCategory'] = $categories[$_GET['cid']];
		}else{
			$this->view_data['selectedCategory'] = current($categories);
		}
	}
	function view() {
		$this->load->view ( 'shop/base', $this->view_data );
	}

}