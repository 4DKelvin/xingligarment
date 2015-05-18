<?php
class Shop_category_module extends CI_Module
{
	var $view_data = array();
	
	function __construct() {
		parent::__construct ();
		$this->load->model('category_model');
	}

	function index()
	{		
		global $LANG;
		$this->categoryModel->get_list(array('language'=>$LANG));
		$this->load->view('menubar',$this->view_data);
	}
}