<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class loading extends MY_Controller {
	function __construct() {
		parent::__construct ();
	}
	
	public function index()	{
		
		$this->view_data['pageTitle'] = getlable('home');
		$this->load->view('/loading/index',$this->view_data);
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */