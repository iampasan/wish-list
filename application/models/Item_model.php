<?php
  class Item_model extends CI_Model {
       
    public function __construct(){
          
        $this->load->database();
        
    }
      
    //Get Item by ID
    public function getItemById($id){  
           
        $query = $this->db->get_where('item', array('id' => $id));
          
        return $query->row_array();

    }
      
    //Get Items by List ID
    public function getItemsByListId($list_id){
        
        $this->db->select('id, title, url, price, priority');
          
        $query = $this->db->get_where('item', array('list_id' => $list_id));
         
        return $query->result_array();
         
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