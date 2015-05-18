<?php
class MY_Controller extends CI_Controller {
	var $bodyclass='';
	var $view_data = array ();
	var $current_user = false;
	var $contact_us = 'contact';
	var $about_us = 'about';
	var $corporate_culture = 'corporate_culture';
	var $terms_of_service = 'terms_of_service';
	var $disclaimer = 'disclaimer';
	var $processing_plant = 'processing_plant';
	var $weaving_factory = 'weaving_factory';
	var $hiring = 'hiring';
	var $links;
	var $odm = 'odm';
	var $company_overview = 'company_overview';
	function __construct() {
		parent::__construct ();		
		global $LANG;
		date_default_timezone_set ( 'Asia/Shanghai' );

		if($this->session->userdata('language'))
		{
			$LANG = $this->session->userdata('language');
		}
		else
		{

			$LANG = 'cn';
			$this->session->set_userdata(array('language'=>$LANG));
		}

		$this->load->helper('lang');
		$method = $this->router->fetch_method ();
		$controller = $this->router->fetch_class ();
		$this->view_data ['controller_name'] = $controller;
		$this->view_data ['method_name'] = $method;
		$this->links = array($this->contact_us=>'/page/index/' .$this->contact_us,
				$this->about_us=>'/page/index/' .$this->company_overview,
				$this->corporate_culture=>'/page/index/'.$this->corporate_culture,
				$this->processing_plant=>'/page/index/' .$this->processing_plant,
				$this->weaving_factory=>'/page/index/' . $this->weaving_factory,
				$this->hiring=>'/page/index/' . $this->hiring,
				$this->odm=>'/page/index/' . $this->processing_plant
				);

		$this->view_data['links'] = $this->links;
		$this->view_data['pageTitle'] = '';
	}
	function format($format) {
		$args = func_get_args ();
		$format = array_shift ( $args );
		preg_match_all ( '/(?=\{)\{(\d+)\}(?!\})/', $format, $matches, PREG_OFFSET_CAPTURE );
		$offset = 0;
		foreach ( $matches [1] as $data ) {
			$i = $data [0];
			$format = substr_replace ( $format, @$args [$i], $offset + $data [1] - 1, 2 + strlen ( $i ) );
			$offset += strlen ( @$args [$i] ) - 2 - strlen ( $i );
		}

		return $format;
	}
	function language($lan)
	{
		header('Content-Type: text/html; charset=utf-8');
		global $LANG;
		$LANG = $lan;
		$this->session->set_userdata(array('language'=>$lan));
		redirect($_SERVER['HTTP_REFERER']);
		//echo "<script type='text/javascript'>$script</script>";
	}
	function view() {
		$this->view_data['bodyclass'] = $this->bodyclass;
		$this->load->view ( 'base', $this->view_data );
	}
	function javascript($script)
	{
		header("Content-type: text/html; charset=utf-8");
		echo "<script type='text/javascript'>$script</script>";
		exit();
	}
}
?>