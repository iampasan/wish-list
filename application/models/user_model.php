<?php
  class User_model extends CI_Model {
       
    public function __construct(){
          
        $this->load->database();
        
    }
      
    //Get user by username
    public function getUser($username){  
           
        $query = $this->db->get_where('user', array('username' => $username));
          
        return $query->row_array();

    }
      
    //Get user's name only
    public function getName($username){
        
        $this->db->select('name');
          
        $query = $this->db->get_where('user', array('username' => $username));
         
        return $query->row_array();
         
    }
    
    public function userExists($username){
        
        $query = $this->db->get_where('user', array('username' => $username));
        
        if($query->row_array()){
            return true;
        }else{
            return false;
        }
    }
    
    //Add new item
    public function addItem($data){

        $this->db->insert('item', $data);

        return $this->db->insert_id();

    }
   
    //Delete Item
    public function deleteItem($id){

        $this->db->where('id', $id);

        return $this->db->delete('item');
        
    }
    
    //Update Item
    public function updateItem($id, $data){

       $this->db->where('id', $id);

       return $this->db->update('item', $data);

    }

}