<?php 
class Home_buttom_module extends CI_Module
{
	var $view_data = array();
	
	function __construct() {
		parent::__construct ();
	}

	function index()
	{		
		$this->load->view('buttom',$this->view_data);
	}
}