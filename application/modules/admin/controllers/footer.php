<?php
class Admin_footer_module extends CI_Module
{
	var $view_data = array();
	
	function __construct() {
		parent::__construct ();
	}

	function index()
	{		
		$this->load->view('footer',$this->view_data);
	}
}