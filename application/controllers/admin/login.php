<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class login extends CI_Controller {
    
    function __construct() {
        parent::__construct();
            $this->load->model('adminModel');

    }

    public function index()
    {
    	$viewdata = array('errorMessage'=>false);
    	if($this->input->post('username')&&$this->input->post('password'))
    	{
    		if($this->adminModel->get_login_user())
    		{
    			redirect('/admin/home');
	    		exit();
    		}
	    	if($this->adminModel->login($this->input->post('username'),$this->input->post('password')))
	    	{
	    		redirect('/admin/home');
	    		exit();
	    	}
    		$viewdata['errorMessage'] = '用户名密码错误';
    	}
    	$controller = $this->router->fetch_class ();
    	$method = $this->router->fetch_method ();
    	$viewdata ['controller_name'] = $controller;
    	$viewdata ['method_name'] = $method;
		return $this->load->view('admin/login/index',$viewdata);  
        
    }
    public function logout()
    {

    	$this->adminModel->logout();
    	redirect('/admin/login');
    }
        
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
