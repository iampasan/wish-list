<?php

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Users extends REST_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('user_model');
        $this->load->model('list_model');
    }

    //Log in call
    function login_post() {

        $username = $this->post('username');

        $password = $this->post('password');
        
        $password = crypt($password,'randomSault'); 

        if (!$username || !$password) {

            $this->response("Login information missing", 400);
        } else {

            $user = $this->user_model->validateUser($username, $password);

            if (empty($user)) {
                $this->response("Username or password does not match, please try again.", 400);
            } else {

                $list = $this->list_model->getListByUser($username);

                $response["username"] = $username;

                $response["list_id"] = $list['id'];

                $this->response($response, 200);
            }
        }
    }

    function register_post() {

        $username = $this->post('username');

        $password = $this->post('password');
        
        $password = crypt($password,'randomSault');
        
        $name = $this->post('name');
        
        $list_name = $this->post('list_name');
        
        $list_description = $this->post('list_description');
        

        if ($this->user_model->userExists($username)) {

            $this->response("Username not available!", 400);
        } else {
            
            $user['username'] = $username;
            $user['password'] = $password;
            $user['name'] = $name;
            $list['name'] = $list_name;
            $list['description'] = $list_description;
            $list['owner'] = $username;
            
            $user_register = $this->user_model->addUser($user);
            $list_creation = $this->list_model->createList($list);            
            
            
            if($user_register && $list_creation){
                $response["username"] = $username;
                $response["list_id"] = $this->list_model->getListByUser($username)['id'];
                
                 $this->response($response, 200);
            }else{
               $this->response("An error occured! Please try again!".$user_register."+".$list_creation, 400);
            }

        }
    }

    //Update an item
    function item_put() {

        $id = $this->put('id');

        $title = $this->put('title');

        $list_id = $this->put('list_id');

        $url = $this->put('url');

        $price = $this->put('price');

        $priority = $this->put('priority');


        if (!$id || !$title || !$list_id || !$url || !$price || !$priority) {

            $this->response($id . "+" . $title . "+" . $list_id . "+" . $url . "+" . $price . "+" . $priority, 400);

            //$this->response("Item information missing", 400);
        } else {
            $result = $this->item_model->updateItem($id, array("title" => $title, "list_id" => $list_id, "url" => $url, "price" => $price, "priority" => $priority));

            if ($result) {

                $this->response("Success", 200);
            } else {

                $this->response("Item not saved", 404);
            }
        }
    }

    //Delete an item
    function item_delete($id) {

        //$id  = $this->get('id');

        if (!$id) {

            $this->response("ID missing", 404);
        }

        if ($this->item_model->deleteItem($id)) {

            $this->response("Successfully Deleted", 200);
        } else {

            $this->response("Deleting failed", 400);
        }
    }

}
