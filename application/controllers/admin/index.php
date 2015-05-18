<?php
class Index extends CI_Controller
{
	var $view_data = array();
	function __construct()
	{
		parent::__construct();
		$this->view_data['errorMessage'] = false;
	}
	function index()
	{
		redirect('admin/index/login');
	}
	function login($error=false)
	{
		if($error){
			$this->view_data['errorMessage'] = urldecode($error);
		}
		return $this->load->view('admin/index/login',$this->view_data);
	}
	function logedin()
	{
		$this->load->model('adminModel');
		if($this->adminModel->login($this->input->post('username'),$this->input->post('password')))
		{
			$ref = $this->session->flashdata('ref');
			if($ref)
				redirect($ref);
			else
				redirect("admin/home/");
		}
		else
		{
			redirect('admin/index/login/'.urlencode('密码或用户名输入错误，请重新输入!'));
		}
		
	}
	function logout()
	{
		$this->load->model('adminModel');
		$this->adminModel->logout();
		redirect("admin/index/login");
	}
}