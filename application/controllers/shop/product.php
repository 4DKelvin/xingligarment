<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class product extends MY_ShopController {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	
	function __construct() {
		parent::__construct ();
		$this->load->model('productModel');
		$this->load->model('categoryModel');
	}
	/*
	public function index($category_id = false)
	{
		global $LANG;
		$pageCount = 20;
		$pageIndex = $this->input->post('pageIndex')? $this->input->post('pageIndex'):1;
		$this->view_data['pageIndex'] = $pageIndex;
		$pageIndex = ($pageIndex - 1) * $pageCount;
		$catewhere = '';
		if($category_id)
		{
			$catewhere = " and category_id = $category_id";
		}
		$products = $this->productModel->query("select `product`.`id`,`name`,`product`.`model`,`image` from `product` , product_categories where language = '$LANG' and `product`.model = product_categories.model order by `name` limit $pageIndex,$pageCount;");
		$count = $this->productModel->query("select count(`product`.`id`) 'count' from `product` , product_categories  where language = '$LANG' and `product`.model = product_categories.model $catewhere;");
		$count = current($count);
		$this->view_data['pageCount'] = $pageCount;
		$this->view_data['rowCount']  = $count->count;
		$this->view_data['products'] = $products;
		var_dump($products);
		//echo  $count->count;
	}
	*/
	
	public function index()
	{
		global $LANG;
		
		$category_id = isset($_GET['cid'])?$_GET['cid']:false;
		$catewhere = '';
		if($category_id)
		{
			$catewhere = " and category_id = $category_id";
		}
		$products = $this->productModel->query("select DISTINCT(`product`.`model`),`product`.`id`,`name`,`product`.`model`,`image` from `product` , product_categories where language = '$LANG' and `product`.model = product_categories.model $catewhere order by `category_id`");
	
		$this->view_data['products'] = $products;
		
		$this->view();
		//echo  $count->count;
	}
	public function search()
	{
	}
	public function show($id)
	{
		global $LANG;
		$product = $this->productModel->get($id);
		$product or die('unauthorized access');
		$sameProducts = $this->productModel->query("select `id`,`color` from product where language = '$LANG' and model = '$product->model' and `id` <> $product->id;");
		$this->view_data['product'] = $product;
		$this->view_data['colors'] = $sameProducts;
		$this->load->model('product_imageModel');
		$product->images = $this->product_imageModel->get_list(array('product_id'=>$id));
		$this->view();
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */