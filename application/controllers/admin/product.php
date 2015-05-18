<?php 
class product extends MY_AdminController 
{
	function __construct() {
		parent::__construct();
		$this->load->model('productModel');
		$this->load->model('categoryModel');
		$categories =  array();
		$this->load->model('product_categoriesModel');
		$list = $this->categoryModel->get_list(array('language'=>'cn'));
		foreach($list as $cate){
			if(!array_key_exists($cate->parent,$categories))
				$categories[$cate->parent] = array();
			$categories[$cate->parent][] = $cate;
		}
        $this->view_data['categories'] = $categories;
	}
	public function index()
	{
		$pageCount = 20;
		$pageIndex = $this->input->post('pageIndex')? $this->input->post('pageIndex'):1;
		$this->view_data['pageIndex'] = $pageIndex;
		 
		$pageIndex = ($pageIndex - 1) * $pageCount;
		$products = $this->productModel->query("select `name`,`model`,`color`,`size` from `product` where language = 'cn' group by `model` order by `name`   limit $pageIndex,$pageCount;");
		$count = $this->productModel->query("SELECT COUNT(`mm`) 'count' FROM (SELECT DISTINCT `model` 'mm' FROM `product`  GROUP BY `model`) tb;");
	
		$count = current($count);
		$this->view_data['pageCount'] = $pageCount;
		$this->view_data['rowCount']  = $count->count;
		$this->view_data['products'] = $products;		
		$this->view();
	}
	public function add()
	{
		$this->view();
	}
	private function _add_product($attr,$categories)
	{
		$i = 0;		
		$image = explode(',',$attr['image']);
		$obj =array();
		$obj['model'] = $attr['model'];
		$obj['size'] = $attr['size'];
		for(;$i<count($image);$i++)
		{
			$obj['image'] = str_replace('_thumb','',$image[$i]);
			$obj['color'] = $image[$i];
			$obj['name'] = $attr['name']['cn'];
			$obj['fabric'] = $attr['fabric']['cn'];
			$obj['washing'] = $attr['washing']['cn'];
			$obj['ingredient'] = $attr['ingredient']['cn'];
			$obj['description'] = $attr['description']['cn'];
			$obj['language'] = 'cn';
			$id = $this->productModel->add($obj);
			$obj['name'] = $attr['name']['en'];
			$obj['fabric'] = $attr['fabric']['en'];
			$obj['washing'] = $attr['washing']['en'];
			$obj['ingredient'] = $attr['ingredient']['en'];
			$obj['description'] = $attr['description']['en'];
			$obj['language'] = 'en';
			$id = $this->productModel->add($obj);
		}
		foreach ($categories as $cid)
		{
			$this->product_categoriesModel->add(array('model'=>$obj['model'],'category_id'=> $cid));
		}
	}
	private function _validation($attr,$isedit = false)
	{
		$sumError = '';
		$categories = $attr['cates'];
		
		if(!$isedit)
		{
			$pds = $this->productModel->get_list(array('model'=>$attr['model']));
			if(count($pds))
			{
				$sumError.='已经存在此型号\n';
			}
		}
		if(!$categories||!is_array($categories)||count($categories)<1)
		{
			$sumError.='至少选择一种类别\n';
		}
		if(!$attr['model']||strlen($attr['model'])<2)
		{
			$sumError.='请填写中文名称\n';
		}
		if(!$attr['name']['cn']||strlen($attr['name']['cn'])<2)
		{
			$sumError.='请填写中文名称\n';
		}
		if(!$attr['name']['en']||strlen($attr['name']['en'])<2)
		{
			$sumError.='请填写英文名称\n';
		}
		if(!$attr['ingredient']['cn']||strlen($attr['ingredient']['cn'])<2)
		{
			$sumError.='请填写中文材料\n';
		}
		if(!$attr['ingredient']['en']||strlen($attr['ingredient']['en'])<2)
		{
			$sumError.='请填写英文材料\n';
		}
		if(!$attr['washing']['cn']||strlen($attr['washing']['cn'])<2)
		{
			$sumError.='请填写中文洗涤\n';
		}
		if(!$attr['washing']['en']||strlen($attr['washing']['en'])<2)
		{
			$sumError.='请填写英文洗涤\n';
		}
		if(!$attr['fabric']['cn']||strlen($attr['fabric']['cn'])<2)
		{
			$sumError.='请填写中文面料\n';
		}
		if(!$attr['fabric']['en']||strlen($attr['fabric']['en'])<2)
		{
			$sumError.='请填写英文面料\n';
		}
		if(!$attr['description']['cn']||strlen($attr['description']['cn'])<2)
		{
			$sumError.='请填写中文简介\n';
		}
		if(!$attr['description']['en']||strlen($attr['description']['en'])<2)
		{
			$sumError.='请填写英文简介\n';
		}
		if(!isset($attr['image']) || count(explode(',',$attr['image'])) <1)
			$sumError.='至少添加 1 种颜色(一张图片)\r\n';	
		if($sumError)
		{
			$sumError='请检查一下信息:\n'.$sumError;
		}
		return $sumError;
	}
	public function create()
	{
		$atts = $this->input->post('atts');
		$categories = $this->input->post('cates');
		$atts['cates'] = $categories;
		$error = $this->_validation($atts);
		if($error)
		{
			$this->javascript('alert("'.$error.'"); window.history.back();');
		}
		else
		{	
			$this->_add_product($atts, $categories);
			redirect('admin/product');
		}
	}
	public function delete($model){
		$this->productModel->del_where(array('model'=>$model));
			$this->product_categoriesModel->del_where(array('model'=>$model));
		redirect($_SERVER['HTTP_REFERER']);
	}
	public function edit($model){
		$products = $this->productModel->get_list(array('model'=>$model),'id asc');
		$obj = false;
		foreach ($products as $prod)
		{
				
			if(!$obj)
			{
				$obj =  new stdClass();
				$obj->model = $prod->model;
				$obj->size = $prod->size;
				$obj->image = array();
				$obj->name = array();
				$obj->color = array();
				$obj->fabric = array();
				$obj->washing = array();
				$obj->ingredient = array();
				$obj->description = array();
		
			}
			$obj->name[$prod->language] = $prod->name;
			$obj->washing[$prod->language] = $prod->washing;
			$obj->ingredient[$prod->language] = $prod->ingredient;
			$obj->description[$prod->language] = $prod->description;
			$obj->fabric[$prod->language] = $prod->fabric;
			//$obj->color = array_unique($obj->color,$prod->color);
			if(!$this->_value_exists($obj->color,$prod->color))
				$obj->color[] =  $prod->color;
			//$obj->image = array_unique($obj->image,$prod->image);
			if(!$this->_value_exists($obj->image,$prod->image))
				$obj->image[] = $prod->image;
				
		}
		
		$categories = array();
		$list = $this->product_categoriesModel->get_list(array('model'=>$model));
		foreach($list as $cate){
			$categories[$cate->category_id] = $cate;
		}
		$this->view_data['used_category'] = $categories;
		$this->view_data['product'] = $obj;
		$this->view();
	}
	private function _value_exists($array,$value)
	{
		foreach($array as $v)
		{
			if($value == $v)
				return true;
		}
		return false;
	}
	public function upload(){
		$id = isset($_POST['id'])?$_POST['id']:'photo_'.time();
		header('content-type:text/json');
		exit(json_encode(array('id'=>$id,'data'=>$this->_upload())));
	}
	public function update($model){
		$atts = $this->input->post('atts');
		$categories = $this->input->post('cates');
		$atts['cates'] = $categories;
		$error = $this->_validation($atts,true);
		if($error)
		{
			$this->javascript('alert("'.$error.'"); window.history.back();');
		}
		else
		{
			$this->productModel->del_where(array('model'=>$model));
			$this->product_categoriesModel->del_where(array('model'=>$model));
			unset($atts['cates']);
			$this->_add_product($atts, $categories);
			redirect('admin/product');
		}
		
		
		$atts = $this->input->post('atts');
		$categories = $this->input->post('cates');
		$atts['cates'] = $categories;
		
	}
	private function _extend($file_name)
	{
		$extend =explode(".", $file_name);
		$va=count($extend)-1;
		return $extend[$va];
	}
	private function _upload()
	{
		$extend = $this->_extend($_FILES['mainImage']['name']);
		$image = md5(time() . $_FILES['mainImage']['name']) .'.'.$extend;
		$config['upload_path'] = './upload/products/';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size'] = '100000000';
		$config['max_width']  = '100000';
		$config['max_height']  = '1000000';
		$config['file_name']  = $image;
		$this->load->library('upload', $config);
		if (!$this->upload->do_upload('mainImage')){
			return false;
		}else{
			$config['image_library'] = 'gd2';
			$config['source_image'] = './upload/products/'.$image;
			$config['create_thumb'] = TRUE;
			$config['maintain_ratio'] = TRUE;
			$config['width'] = 100;
			$config['height'] = 100;				
			$this->load->library('image_lib', $config);
			if (!$this->image_lib->resize()) {
				return false;
			}
			return str_replace(".$extend", "_thumb.$extend", $image);
		}
	}

}
?>