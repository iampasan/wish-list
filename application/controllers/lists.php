<?php

use Restserver\Libraries\REST_Controller;
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';
 
class Lists extends REST_Controller{
    
    public function __construct()
    {
        parent::__construct();

        $this->load->model('item_model');
        $this->load->model('list_model');
    }

    //Get Item by ID
    function getListById_get(){

        $id  = $this->get('id');
        
        if(!$id){

            $this->response("No item ID specified!", 400);

            exit;
        }

        $list = $this->list_model-> getListById($id);

        if($list){
            
            $items = $this->item_model->getItemsByListId($list['id']);
            
            $list['items'] = $items;
            
            $this->response($list, 200); 

            exit;
        } 
        else{

             $this->response("Invalid ID", 404);

            exit;
        }
    } 

    //Get items by List ID
//    function getItemsByListId_get(){
//        
//        $list_id  = $this->get('list_id');
//        
//        if(!$list_id){
//
//            $this->response("No list ID specified!", 400);
//
//            exit;
//        }
//        
//        $result = $this->item_model->getItemsByListId($list_id);
//
//        if($result){
//
//            $this->response($result, 200); 
//
//        } 
//
//        else{
//
//            $this->response("No items found", 404);
//
//        }
//    }
     
    //Create a new item
    function addItem_post(){

         $title = $this->post('title');

         $list_id = $this->post('list_id');

         $url = $this->post('url');

         $price = $this->post('price');

         $priority = $this->post('priority');
        
         if(!$title || !$list_id || !$url || !$price || !$priority ){

                $this->response("Item information missing", 400);

         }else{

            $result = $this->item_model->addItem(array("title"=>$title, "list_id"=>$list_id, "url"=>$url, "price"=>$price, "priority"=>$priority));

            if($result){
                
                $this->response("Success", 200);  

            }else{
                
                $this->response("Item not saved", 404);
                          
            }

        }

    }

    
    //Update an item
    function updateItem_put(){
         
         $id = $this->put('id');
         
         $title = $this->put('title');

         $list_id = $this->put('list_id');

         $url = $this->put('url');

         $price = $this->put('price');

         $priority = $this->put('priority');
         
         
         if(!$id || !$title || !$list_id || !$url || !$price || !$priority ){
             
                $this->response($id."+".$title."+".$list_id."+".$url."+".$price."+".$priority, 400);

                //$this->response("Item information missing", 400);

         }else{
            $result = $this->item_model->updateItem($id, array("title"=>$title, "list_id"=>$list_id, "url"=>$url, "price"=>$price, "priority"=>$priority));

            if($result){
                
                $this->response("Success", 200);

            }else{

                $this->response("Item not saved", 404);  

            }

        }

    }

    //Delete an item
    function deleteItem_delete()
    {

        $id  = $this->delete('id');

        if(!$id){

            $this->response("ID missing", 404);

        }
         
        if($this->item_model->deleteItem($id))
        {

            $this->response("Successfully Deleted", 200);

        } 
        else
        {

            $this->response("Deleting failed", 400);

        }

    }


}