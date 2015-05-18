<?php
class page extends MY_AdminController
{
	function __construct()
	{
		parent::__construct();
		$this->load->model('pageModel');
	}
	public function get_type($type)
	{
		return $type == 'normal'?'页面':'新闻';
	}
	public function index($type = 'normal')
	{
		$this->view_data['title'] = $this->get_type($type) . '管理';
		$this->view_data['type'] = $type;
		$this->view_data['pages']=$this->pageModel->get_list(array('type'=>$type));
		$this->view();
	}
	public function types()
	{
		$this->view_data['types'] = $this->pagetypeModel->get_list();
		$this->load->view('admin/base',$this->view_data);
	}
	public function add($type)
	{
		$this->view_data['title'] =  '添加' . $this->get_type($type);
		$this->view_data['type'] = $type;
		$this->view();
	}
	public function doadd()
	{
		$info = $this->input->post('atts');
		$info['title'] = str_replace("'", "''", $info['title']);
		$info['content'] = str_replace("'", "''", $info['content']);
		$this->pageModel->add($info);
		redirect('admin/page/index/'.$info['type']);
	}
	public function edit($id)
	{
		$page = $this->pageModel->get($id);
		if(!$page)
			$this->javascript('alert("非法访问"); window.location.href="/admin/login/logout";');
		$this->view_data['page'] = $page;
		$this->view_data['title'] =  '编辑' . $this->get_type($page->type);
		$this->load->view('admin/base',$this->view_data);
	}
	public function doedit($id)
	{
		$info = $this->input->post('atts');
		$info['title'] = str_replace("'", "''", $info['title']);
		$info['content'] = str_replace("'", "''", $info['content']);
		$this->pageModel->edit($id,$info);
		//redirect('admin/page/pages/' . ($info['pagetypeid']?$info['pagetypeid']:''));
		redirect('admin/page/index/'.$info['type']);
		
	}
	public function delete($id)
	{
		$this->pageModel->del($id);
		
		redirect($_SERVER['HTTP_REFERER']);
	}
}
?>