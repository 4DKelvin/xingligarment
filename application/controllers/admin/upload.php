<?php
class upload extends MY_AdminController
{
    function __construct() {
        parent::__construct();
    }
    function index()
    {
    	$fn=$_GET['CKEditorFuncNum'];
		
		$extend = $this->_extend($_FILES['upload']['name']);
		$image = md5(time() . $_FILES['upload']['name']) .'.'.$extend;
		$config['upload_path'] = './upload';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size'] = '100000000';
		$config['max_width']  = '100000';
		$config['max_height']  = '1000000';
		$config['file_name']  = $image;
		$this->load->library('upload', $config);
		$message = '文件上传成功';
		$fileurl = base_url( 'upload') . '/'. $image;
		if (!$this->upload->do_upload('upload'))
		{
			$message = '图片上传失败';
			$fileurl = '';
		}
		$this->javascript('window.parent.CKEDITOR.tools.callFunction('.$fn.', \''.$fileurl.'\', \''.$message.'\');');
    	
    }
    function _extend($file_name)
    {
    	$extend =explode(".", $file_name);
    	$va=count($extend)-1;
    	return $extend[$va];
    }
}