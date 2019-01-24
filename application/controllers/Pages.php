<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Pages extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('cookie');
    }

    public function index() {
        if (!is_null(get_cookie('wl_list_id'))) {
            $this->load->view('head');
            $this->load->view('list_view');
            $this->load->view('footer');
        }else{
            $this->login();
        }
    }

    public function login() {
        $this->load->view('head');
        $this->load->view('signin');
        $this->load->view('footer');
    }

}
