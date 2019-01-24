<?php

class User_model extends CI_Model {

    public function __construct() {

        $this->load->database();
    }

    //Get user by username
    public function getUser($username) {

        $query = $this->db->get_where('user', array('username' => $username));

        return $query->row_array();
    }

    //Get user's name only
    public function getName($username) {

        $this->db->select('name');

        $query = $this->db->get_where('user', array('username' => $username));

        return $query->row_array();
    }

    //Check if a user exists
    public function userExists($username) {
        $query = $this->db->get_where('user', array('username' => $username));

        if ($query->row_array()) {
            return true;
        } else {
            return false;
        }
    }
    
    public function validateUser($user_name, $password) {
        $query = $this->db->get_where('user', array('username' => $user_name, 'password' => $password));
        return $query->row_array();
    }

    //Add new item
    public function addUser($data) {

        $this->db->insert('item', $data);

        return $this->db->insert_id();
    }

}
