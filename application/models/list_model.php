<?php
  class List_model extends CI_Model {
       
    public function __construct(){
          
        $this->load->database();
        
    }
      
    //Get List by ID
    public function getListById($id){  
           
        $query = $this->db->get_where('list', array('id' => $id));
          
        return $query->row_array();

    }
      
    //Get list by username
    public function getListByUser($user_name){
          
        $query = $this->db->get_where('list', array('owner' => $user_name));
         
        return $query->result_array();
         
    }
    
    //Create a list
    public function createList($data){

        $this->db->insert('list', $data);

        return $this->db->insert_id();

    }
    
    
    
    /*These operations not needed for list controller*/
    

//   
//    //Delete Item
//    public function deleteItem($id){
//
//        $this->db->where('id', $id);
//
//        return $this->db->delete('item');
//        
//    }
//    
//    //Update Item
//    public function updateItem($id, $data){
//
//       $this->db->where('id', $id);
//
//       return $this->db->update('item', $data);
//
//    }

}