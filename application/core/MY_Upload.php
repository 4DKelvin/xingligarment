<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Upload extends CI_Upload {
	var $ignore_mime = false;
	/**
	 * get the file infomation uploaded
	 *
	 * @access	public
	 * @return	bool
	 */	
	function get_upload_info($field = 'userfile')
	{
		// Is $_FILES[$field] set? If not, no reason to continue.
		if ( ! isset($_FILES[$field]))
		{
			$this->set_error('upload_no_file_selected');
			return FALSE;
		}
		$rt = array();
		$rt['file_ext']	 = $this->get_extension($_FILES[$field]['name']);

		return $rt;
	}
	
	function is_allowed_filetype($ignore_mime = FALSE)
	{
		return parent::is_allowed_filetype($ignore_mime || $this->ignore_mime);
	}
}