<?php
class resources extends MY_AdminController
{
	function __construct()
	{
		parent::__construct();
		$this->load->model('resourcesModel');
	}
	
	public function index()
	{
		$this->view_data['resources'] = $this->resourcesModel->get_list();
		$this->view();
	}
	public function add($type)
	{
		$this->view_data['type'] = $type;
		$this->view();
	}
	public function doadd()
	{
		$info = $this->input->post('atts');
		$info['key'] = str_replace("'", "''", $info['key']);
		$info['value'] = str_replace("'", "''", $info['value']);
		$resource = $this->resourcesModel->get($info['key']);
		if($resource)
			$this->javascript('alert("键已经存在!");history.back();');
		$this->resourcesModel->add($info);
		redirect('admin/resources/index');
	}
	public function edit($key)
	{
		$resource = $this->resourcesModel->get(urldecode($key));
		if(!$resource)
			$this->javascript('alert("非法访问"); window.location.href="/admin/login/logout";');
		$this->view_data['resource'] = $resource;
		$this->view();
	}
	public function doedit()
	{
		$info = $this->input->post('atts');
		$info['key'] = str_replace("'", "''", $info['key']);
		$info['value'] = str_replace("'", "''", $info['value']);
		$this->resourcesModel->edit($info['key'],$info);
		//redirect('admin/page/pages/' . ($info['pagetypeid']?$info['pagetypeid']:''));
		redirect('admin/resources/index');
		
	}
	public function delete($key)
	{
		$this->resourcesModel->del(urldecode($key));
		
		redirect($_SERVER['HTTP_REFERER']);
	}
}
?>