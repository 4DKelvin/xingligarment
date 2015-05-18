<?php
class MY_URI extends CI_URI {
    function _filter_uri($str)
    {
		$str = urlencode($str);
		$str = parent::_filter_uri($str);
		$str = urldecode($str);
        return $str;
    }  
}
?>