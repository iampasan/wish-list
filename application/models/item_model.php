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
          
        $query = $this->db->get_where('item', array('list_id' => $list_id));
         
        return $query->result_array();
         
    }
    
    //Add new item
    public function addItem($data){

        $this->db->insert('book', $data);

        return $this->db->insert_id();

    }
   
    //Delete Item
    public function deleteItem($id){

        $this->db->where('id', $id);

        return $this->db->delete('item');
        
    }
    
    //Update Item
    public function update($id, $data){

       $this->db->where('id', $id);

       return $this->db->update('item', $data);

    }

}