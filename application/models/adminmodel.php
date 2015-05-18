<?php
class adminModel extends MY_Model {
	
	var $tbl_name = 'admin';
	
	var $login_user_session_key = 'admin';
	
	var $hashfeed = 'xingli';
	
	var $sign_up_keys = array('username','password','name');
	
	function __construct()
	{
		parent::__construct();
		$CI =& get_instance();
		$CI->load->library('session');
	}
	
	
	function login($username, $password)
	{
		$admin = $this->get_where(array('username'=>$username));
		if($admin)
		{
			if($admin->password == md5($this->hashfeed . $password))
			{
				$this->session->set_userdata(array('admin'=>$admin));
				return true;
			}
		}
		return false;
	}
	
	function logout()
	{
		$this->session->unset_userdata('admin');
	}
	function get_login_user()
	{
		return $this->session->userdata('admin');
	}
	/*
	function signup($info)
	{
		$info['pwdhash'] = $this->get_pwd_hash($info['password']);
		unset($info['password']);
		if(!isset($info['role_id']))
			$info['role_id'] = $this->sign_up_role_id;
		$rs = $this->db->insert($this->tbl_name,$info);
		return $rs?$this->db->insert_id():0;
	}
	function edit_password($uid,$newpwd)
	{
		$hash = $this->get_pwd_hash($newpwd);
		return $this->edit($uid,array('pwdhash'=>$hash));		
	}
        function is_super($user){
            return $user->role_id == self::$SUPER_ID;
        }*/
}