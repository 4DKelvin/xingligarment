<?php
class MY_Model extends CI_Model {
	
	var $tbl_name = '';
	
	var $pri_key = 'id';
	
	var $df_order = false;
	
	var $addTime = '';
	
	// the models that should be get at the same time
	var $_get_sub_objects = array();
	
	var $_current_sub_object_level = 0;
	
	var $_get_one_objects = array();
	
	var $rs_key_column = '';
	
	var $rs_key_column_unique = true;
	
	var $_rs_key_backup = array();
        
        var $sub_object_extra_where_str = '';
	
	function __construct()
	{
		parent::__construct();
	}
	function get_pri_key_where($args)
	{
		if(!is_array($this->pri_key))
			return array($this->pri_key=>$args[0]);
		else
		{
			$where = array();
			foreach ($this->pri_key as $k=>$pkey)
			{
				$where[$pkey]=$args[$k];
			}
			return $where;
		}
	}
	function query($sql){
		
		$result = $this->db->query($sql);
		return $result->result();
	}
	function count($where=array())
	{
		$this->db->where($where);
		return $this->db->count_all_results($this->tbl_name);
	}
	function set_sub_objects($objs)
	{
		if(is_array($objs))
			$this->_get_sub_objects = $objs;
		else
			$this->_get_sub_objects = array($objs=>$objs);
	}
	function set_one_objects($objs)
	{
		if(is_array($objs))
			$this->_get_one_objects = $objs;
		else
			$this->_get_one_objects = array($objs);
	}
	function get_list($where = array(),$order=false,$limit=false,$start = 0)
	{
		$this->_current_sub_object_level++;
		if($order==false)
			$order = $this->df_order;
		if($order)
			$this->db->order_by($order);
		if($limit)
			$this->db->limit($limit,$start);
		$rs = $this->db->get_where($this->tbl_name,$where)->result();
		
		$CI = &get_instance();
		if(count($rs)>0 && count($this->_get_sub_objects)>0)
		{
			$ids = array();
			foreach ($rs as $item)
				$ids[] = $item->id;
			$ids = implode(',',$ids);
			
			foreach($this->_get_sub_objects as $model_name => $column_name)
			{
				$real_model_name = $model_name.'Model';
				$CI->load->model($real_model_name);
				
				$old_value = $CI->$real_model_name->set_rs_key($column_name.'_id',false);
                                $where_str = $column_name.'_id in ('.$ids.')';
                                if($this->sub_object_extra_where_str)
                                    $where_str .= ' AND '.$this->sub_object_extra_where_str;
				$sub_list = $CI->$real_model_name->get_list($where_str,$CI->$real_model_name->df_order);
				$CI->$real_model_name->set_rs_key($old_value[0],$old_value[1]);

				foreach ($rs as $item)
					$item->{$model_name.'_list'} = isset($sub_list[$item->id])?$sub_list[$item->id]:array();
			}
		}
	
		if(count($rs)>0 && count($this->_get_one_objects)>0)
		{			
			foreach($this->_get_one_objects as $model_name)
			{
				$column_name = $model_name.'_id';
				$ids = array();
				foreach ($rs as $item)
					$ids[] = $item->$column_name;
				$ids = implode(',',$ids);
				
				$real_model_name = $model_name.'Model';
				$CI->load->model($real_model_name);
				
				$old_value = $CI->$real_model_name->set_rs_key('id',true);
				$sub_list = $CI->$real_model_name->get_list('id in ('.$ids.')');
				$CI->$real_model_name->set_rs_key($old_value[0],$old_value[1]);

				foreach ($rs as $item)
					$item->$model_name = isset($sub_list[$item->$column_name])?$sub_list[$item->$column_name]:false;
			}
		}
		$b_reset_rs = $this->rs_key_column != '';
		$b_call_access = $this->access_item()!=false;
		if($b_reset_rs || $b_call_access)
		{
			$new_rs = array();
			foreach ($rs as $item)
			{
				if($b_call_access)
					$this->access_item($item);
				if($b_reset_rs)
				{
					if($this->rs_key_column_unique)
						$new_rs[$item->{$this->rs_key_column}] = $item;
					else
					{
						if(!isset($new_rs[$item->{$this->rs_key_column}]))
							$new_rs[$item->{$this->rs_key_column}] = array();
						$new_rs[$item->{$this->rs_key_column}][] = $item;
					}
				}
			}
		}
		$this->_current_sub_object_level--;
		if($this->_current_sub_object_level==0)
			$this->_get_sub_objects = array();
		return $b_reset_rs?$new_rs:$rs;
	}
	function access_item(&$item = false)
	{
		return false;
	}
	
	function get()
	{
		$where = $this->get_pri_key_where(func_get_args());
		$objects = $this->get_list($where,false,1);
		return isset($objects[0])?$objects[0]:false;
	}
	function get_where($where)
	{
		$objects = $this->get_list($where,false,1);
		return isset($objects[0])?$objects[0]:false;	
	}
	function add($info)
	{
		if($this->addTime!='')
			$info[$this->addTime] = time();
		if($this->db->insert($this->tbl_name,$info))
			return $this->db->insert_id();
		else return false;
	}
	function affected_rows()
	{
		return $this->db->affected_rows();
	}
	function exist($where)
	{
		return $this->count($where)>0;
	}
	
	function del($id)
	{
		//$id *= 1;
		return $this->del_where(array($this->pri_key=>$id));
	}
	
	function del_where($where)
	{
		return $this->db->delete($this->tbl_name,$where);
	}
	function execNonQuery($sql)
	{
		return $this->db->query($sql);
	}
	function edit()
	{
		$args = func_get_args();
		$where = $this->get_pri_key_where($args);
		return $this->db->update($this->tbl_name,array_pop($args),$where);
	}
    function edit_by_where($where,$updates)
	{
		return $this->db->update($this->tbl_name,$updates,$where);
	}
        
	function set_rs_key($column,$unique = true)
	{
		$backup = array($this->rs_key_column,$this->rs_key_column_unique);
		$this->rs_key_column = $column;
		$this->rs_key_column_unique = $unique;
		return $backup;
	}
}