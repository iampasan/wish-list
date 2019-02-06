<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Pages extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('cookie');
    }

    public function index() {
        echo "Welcome to WISHLIST API!";
    }   

}
