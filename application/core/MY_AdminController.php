<?php
class MY_AdminController extends CI_Controller
{
	var $userObj = false;
	var $view_data = array ();
	var $lan;
	
	function __construct() {
		
		parent::__construct ();
		date_default_timezone_set ( 'Asia/Shanghai' );
		$this->load->library('session');
		$this->load->model('adminModel');
		$this->view_data ['pageTitle'] = '';
		$this->view_data ['errorMessage'] = '';
		$this->load->model('adminModel');
		$controller = $this->router->fetch_class ();
		$method = $this->router->fetch_method ();
		$this->view_data ['controller_name'] = $controller;
		$this->view_data ['method_name'] = $method;
		$this->userObj = $this->adminModel->get_login_user ();
		if (! $this->userObj) {
			$this->javascript("alert('请先登录');window.location.href='/admin/login';");
	
		}
		$this->view_data['admin'] = $this->userObj;
	}
	function view() {
		$this->load->view ( 'admin/base', $this->view_data );
	}
	function javascript($script)
	{
		header("Content-type: text/html; charset=utf-8");
		echo "<script type='text/javascript'>$script</script>";
		exit();
	}
}