<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class page extends MY_Controller {

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


	function _getpages($title)
	{
		 $aboutpages= array($this->company_overview,$this->corporate_culture);
		 $odmPages = array($this->processing_plant,$this->weaving_factory);
		 $contactPages = array($this->contact_us,$this->hiring);
		 foreach ($aboutpages as $p)
		 {
		 	if($p == $title)
		 		return $aboutpages;
		 }
		 foreach ($odmPages as $p)
		 {
		 	if($p == $title)
		 		return $odmPages;
		 }
		 foreach ($contactPages as $p)
		 {
		 	if($p == $title)
		 		return $contactPages;
		 }
	}
	private function _convertTitle($title)
	{
		$convert = array(getlable($this->processing_plant)=>getlable($this->odm),getlable($this->company_overview)=>getlable($this->about_us),
				getlable($this->corporate_culture)=>getlable($this->about_us),getlable($this->terms_of_service)=>getlable($this->about_us),
				getlable($this->disclaimer)=>getlable($this->about_us)
				);
		if(key_exists($title, $convert))
			return $convert[$title];
		return false;
	}
	function __construct() {
		parent::__construct ();
		$this->load->model('pageModel');
	}
	public function index($key)
	{
		$title = getlable($key);
		$ptitle = getPageTitle($key);
		$page = $this->pageModel->get_where(array('title' =>$ptitle));
	    $page or die('unauthorized access');
		$this->view_data['page'] = $page;
		$pages =$this->_getpages($key);
		
		$this->view_data['pages'] = $pages;
		$selectTop = $this->_convertTitle($title);
		$selectTop = $selectTop? $selectTop:$title;
		$this->view_data['pageTitle']= $selectTop;
		$this->view_data['selectedTitle'] = $title;
		$this->view();
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */