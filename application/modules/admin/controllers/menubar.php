<?php
class Admin_menubar_module extends CI_Module
{
	var $view_data = array();
	
	function __construct() {
		parent::__construct ();
	}

	function index()
	{		
		$this->load->view('menubar',$this->view_data);
	}
}