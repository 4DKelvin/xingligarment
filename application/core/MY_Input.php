<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class MY_Input extends CI_Input {
	
	var $_query_get_data = false;
	/**
	* Fetch items from the GET array
	*
	* @access	public
	* @param	mixed
	* @param	bool
	* @return	string
	*/
	function get($index = '', $xss_clean = FALSE)
	{
		if(is_array($index))
		{
			$rt = array();
			foreach ($index as $key)
				$rt[$key] = $this->_fetch_from_array($_GET, $key, $xss_clean);
			return $rt;
		}
		else
			return $this->_fetch_from_array($_GET, $index, $xss_clean);
	}

	// --------------------------------------------------------------------

	/**
	* Fetch items from the POST array
	*
	* @access	public
	* @param	mixed
	* @param	bool
	* @return	string
	*/
	function post($index = '', $xss_clean = FALSE)
	{
		if(is_array($index))
		{
			$rt = array();
			foreach ($index as $key)
				$rt[$key] = $this->_fetch_from_array($_POST, $key, $xss_clean);
			return $rt;
		}
		else
			return $this->_fetch_from_array($_POST, $index, $xss_clean);
	}
	
	function nget($index = false)
	{
		if(!is_array($this->_query_get_data))
		{
			parse_str($_SERVER['QUERY_STRING'],$this->_query_get_data);
		}
		if($index)
			return isset($this->_query_get_data[$index])?$this->_query_get_data[$index]:false;
		else
			return $this->_query_get_data;
	}
}