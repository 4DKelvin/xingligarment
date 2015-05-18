<?php
class Admin_topbar_module extends CI_Module
{
	var $view_data = array();
	
	function __construct() {
		parent::__construct ();
	}

	function index()
	{		
		$this->load->view('topbar',$this->view_data);
	}
}