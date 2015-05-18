<?php
class show extends MY_Controller
{
    function __construct() {
        parent::__construct();
    }
    function index()
    {
    	$this->load->view('shop/show',$this->view_data);
    	
    }
}