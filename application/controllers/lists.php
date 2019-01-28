<?php

use Restserver\Libraries\REST_Controller;

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Lists extends REST_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('item_model');
        $this->load->model('list_model');
        $this->load->model('user_model');
    }

    //Get List by ID
    function list_get($id) {

        //$id  = $this->get('id');

        if (!$id) {

            $this->response("No item ID specified!", 400);

            exit;
        }

        $list = $this->list_model->getListById($id);

        if ($list) {

            //$list = $this->appendItems($list);
            //Put owner's name instead of user ID
            //$list['owner'] = $this->user_model->getName($list['owner'])['name'];
            unset($list['owner']);

            $this->response($list, 200);

            exit;
        } else {

            $this->response("Invalid ID", 404);

            exit;
        }
    }

    function getListByUser_get() {

        $username = $this->get('username');

        if (!$username) {

            $this->response("No username specified!", 400);

            exit;
        } elseif (!$this->user_model->userExists($username)) {

            $this->response("Invalid user name!", 400);

            exit;
        }

        $list = $this->list_model->getListByUser($username);

        if ($list) {

            $list = $this->appendItems($list);

            $this->response($list, 200);

            exit;
        } else {

            $this->response("No list available for this user.", 404);

            exit;
        }
    }

    private function appendItems($list) {
        $items = $this->item_model->getItemsByListId($list['id']);

        $list['items'] = $items;

        return $list;
    }

    public function getShareLink_get($username) {
        $encoded_username = $this->base64url_encode($username);
        $this->response($encoded_username, 200);
    }

    public function getShareDetails_get($encoded_username) {
        $decoded_username = $this->base64url_decode($encoded_username);
        $user = $this->user_model->getUser($decoded_username);
        if($user){
            $response['owner_name'] = $user['name'];
            $response['list_id'] = $this->list_model->getListByUser($user['username'])['id'];
            $this->response($response, 200);
        }else{
            $this->response("Invalid URL", 400);
        }
        
        
        $this->response($decoded_username, 200);
    }

    private function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64url_decode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }

}
