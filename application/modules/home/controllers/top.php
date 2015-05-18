<?php 
class Home_top_module extends CI_Module
{
	var $view_data = array();
	
	function __construct() {
		parent::__construct ();
	}

	function index()
	{
		$this->load->view('top',$this->view_data);
	}
}?>