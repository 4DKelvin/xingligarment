<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home extends MY_AdminController {
    
    function __construct() {
        parent::__construct();
    }

    public function index()
    {
    	/*
        $this->view_data['categories'] = $this->categoryModel->get_list();
        $this->view_data['rootCategory'] = $this->categoryModel->getParents();
        $this->load->view('admin/base',$this->view_data);
        */
    	$this->view();
    }
    private function _createpermalink($name_en)
    {
    	$permalink =  str_replace(' ','_',trim($name_en));
    	$permalink =  str_replace('+','_', $permalink);
    	$permalink =  str_replace('%','_',$permalink);
    	return $permalink;
    }
    public function add(){
    	$info = array(
        	'name_cn'=>$this->input->post('name_cn'),
        	'name_en'=>$this->input->post('name_en'),
        	'parentid' => $this->input->post('parentid')
        );
        if(strlen($info['name_cn']) <2 || strlen($info['name_en'])<2)
        {
        	$this->javascript('alert("锟借鲸锟斤拷锟斤拷娑擄拷锟斤拷锟斤拷娴滐拷2 鐎涳拷锟�);window.location.href="' .site_url('admin/category'). '";');
        }
        $info['permalink'] = $this->_createpermalink($info['name_en']);
        $this->categoryModel->add($info);
        redirect('admin/category/index');
    }
    public function edit($id)
    {
        $info = array(
        	'name_cn'=>$this->input->post('name_cn'),
        	'name_en'=>$this->input->post('name_en'),
        	'parentid' => $this->input->post('parentid')
        );
        if(strlen($info['name_cn']) <2 || strlen($info['name_en'])<2)
        {
        	$this->javascript('alert("锟借鲸锟斤拷锟斤拷娑擄拷锟斤拷锟斤拷娴滐拷2 鐎涳拷锟�);windows.location.href="admin/category/index";');
        }
        $info['permalink'] = $this->_createpermalink($info['name_en']);
        $this->categoryModel->edit($id,$info);
        redirect('admin/category/index');
    }
        
    public function delete($id){
        $category = $this->categoryModel->get($id);
        $this->categoryModel->del($id);
        redirect($_SERVER['HTTP_REFERER']);
    }
        
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
