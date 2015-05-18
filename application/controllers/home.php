<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home extends MY_Controller {

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
	/* resource key
	 * HOME_TOP_SILDER_IMAGE_CN
		HOME_TOP_SILDER_IMAGE_EN
		HOME_TOP_SILDER_TEXT_CN
		HOME_TOP_SILDER_TEXT_EN
		HOME_CENTER_SILDER_IMAGE
		CORPORATE_CULTURE_CN
		CORPORATE_CULTURE_EN
		WE_CHAT_CN
		WE_CHAT_EN
	 */
	function __construct() {
		parent::__construct ();
		$this->load->model('resourcesModel');
		$this->bodyclass = 'home';
	}
	
	public function index()
	{
		global $LANG;
		
		$resources =$this->resourcesModel->get_list();
		$arrResources = array();
		foreach ($resources as $rs)
		{
			$arrResources[$rs->key] = $rs->value;
		}
		$sliderImageKey = strtoupper('HOME_TOP_SILDER_IMAGE_'.$LANG);
		$sliderTextKey = strtoupper('HOME_TOP_SILDER_TEXT_'.$LANG);
		$slider = array(
					'images'=>explode(chr(10), $arrResources[$sliderImageKey]),
					'texts'=>explode(chr(10), $arrResources[$sliderTextKey])
				);
		$webChatkey =  strtoupper('WE_CHAT_'.$LANG);
		$webChatContent = $arrResources[$webChatkey];
		$corporate_culture = $arrResources[ strtoupper('CORPORATE_CULTURE_'.$LANG)];
		$centerSliderImages = explode(chr(10), $arrResources['HOME_CENTER_SILDER_IMAGE']);
		$this->view_data['slider'] =  $slider;
		$this->view_data['webChatContent'] =  $webChatContent;
		$this->view_data['centerSliderImages'] =  $centerSliderImages;
		$this->view_data['corporate_culture'] =  $corporate_culture;
		$this->view_data['pageTitle'] = getlable('home');
		$this->view();
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */