<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class category extends MY_AdminController {
    
    function __construct() {
        parent::__construct();
            $this->load->model('categoryModel');
    }

    public function index()
    {
		$categories =  array();
		$list = $this->categoryModel->get_list();
		$cates = array();
		foreach ($list as $cate)
		{
			
			if(array_key_exists($cate->id, $cates))
			{
				$obj = 	$cates[$cate->id];
			}
			else
			{
				$obj = $cate; 			
			}
			if($cate->language == 'en')
			{
				$obj->name_en = $cate->name;
			}
			else
			{
				$obj->name = $cate->name;
			}
			$cates[$cate->id] = $obj;
			//$obj = $cate;
		}
		foreach($cates as $cate){
			if(!array_key_exists($cate->parent,$categories))
				$categories[$cate->parent] = array();
			$categories[$cate->parent][] = $cate;
		}
        $this->view_data['categories'] = $categories;
        $this->load->view('admin/base',$this->view_data);
        
    }
    private function _createpermalink($name_en)
    {
    	$permalink =  str_replace(' ','_',trim($name_en));
    	$permalink =  str_replace('+','_', $permalink);
    	$permalink =  str_replace('%','_',$permalink);
    	return $permalink;
    }
    private function validate()
    {
    	if(!$this->input->post('name') || strlen($this->input->post('name')) < 2||!$this->input->post('name_en') || strlen($this->input->post('name_en')) < 2)
    	{
    		$this->javascript('alert("操作失败,类别名名少于 2 字符");history.back();');
    	}
    }
    private function get_lang($str)
    {
    	
    	if (preg_match("/[\x7f-\xff]/", $str)) {
    		return 'cn';
    	}else{
    		return 'en';
    	}
    }
    public function add(){
		if($this->input->post('id')){
			$this->validate();
			$info = array(
					'name'=>$this->input->post('name'),
					'parent' => $this->input->post('parent'),
					'language' =>'cn'
			);
	
			$this->categoryModel->edit_by_where(array('id'=>$this->input->post('id'),'language'=>$info['language']),$info);
			$info['name'] = $this->input->post('name_en');
			$info['language'] = 'en';
	
			$this->categoryModel->edit_by_where(array('id'=>$this->input->post('id'),'language'=>$info['language']),$info);
			redirect('admin/category/index');
		}else{
			$this->validate();
			$info = array(
				'name'=>$this->input->post('name'),
				'parent' => $this->input->post('parent'),
				'language' =>'cn'
			);
			$id = $this->categoryModel->add($info);
	
	
			if($id)
			{
				$info['name'] = $this->input->post('name_en');
				$info['language'] = 'en';
				$info['id'] = $id;
				$id = $this->categoryModel->add($info);
			}
			redirect('admin/category/index');
		}
    }
        
    public function delete($id){
        $category = $this->categoryModel->get($id);
        $this->categoryModel->del($id);
        redirect($_SERVER['HTTP_REFERER']);
    }
        
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
