<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>List View</title>

        <!--JQuery -->
        <script src="<?php echo base_url("assets/js/jquery-3.3.1.min.js"); ?>"></script>

        <!--UnderScore JS-->
        <script src="<?php echo base_url("assets/js/underscore-min.js"); ?>"></script>

        <!--Backbone JS -->
        <script src="<?php echo base_url("assets/js/backbone-min.js"); ?>"></script>

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

        <!-- Bootstrap JS -->
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

    </head>

    <body>

        <div class="container-fluid">
            <div class="jumbotron jumbotron-fluid">
                <div class="container-fluid">
                    <h1 class="display-4">Wish List</h1>
                    <p class="lead">Welcome to the wish list app!</p>
                </div>
            </div>

            <!-- Add and update Modal -->
            <div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="itemModalLabel">Item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <div class="form-group">
                                    <label for="inputTitle">Title</label>
                                    <input class="form-control" id="input-title" placeholder="Enter Title">
                                </div>
                                <div class="form-group">
                                    <label for="inputURL">URL</label>
                                    <input class="form-control" id="input-url" placeholder="Enter URL">
                                </div>
                                <div class="form-group">
                                    <label for="inputPrice">Price</label>
                                    <input class="form-control" id="input-price" placeholder="Enter Price">
                                </div>
<!--                                <div class="form-group">
                                    <label for="inputPriority">Priority</label>
                                    <input class="form-control" id="input-priority" placeholder="Enter Priority">
                                </div>-->
                                <div class="form-group">
                                    <label for="inputPriority">Priority</label>
                                    <select class="form-control" id="input-priority">
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button id="save-item-btn" class="btn btn-primary">Save</button>
                            <button id="update-item-btn" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--Delete Modal -->
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="itemModalLabel">Delete Item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <span id="delete-modal-description">
                                    Are you sure you want to delete 
                                    <span id="delete-modal-item-title" style="font-weight: bold"></span>
                                    ?
                                </span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button id="delete-item-btn" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>


            <!--Info Modal -->
            <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="infoModalLabel">Info</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <span id="info-modal-description">
                                </span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>




            <div class="container wish-list">

                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary mb-3" id="item-add-modal-btn" data-toggle="modal" data-target="#itemModal">
                    Add Item
                </button>

                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">URL</th>
                            <th scope="col">Price</th>
                            <th scope="col">Priority</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody class="items-list">
                    </tbody>
                </table>

            </div>
        </div>

        <script type="text/template" class="item-template">
            <td><span class="title"><%= title %></span></td>
            <td><span class="url"><%= url %></span></td>
            <td><span class="price"><%= price %></span></td>
            <td><span class="priority"><%= priority %></span></td>
            <td>
            <button class="btn btn-primary" id="update-item-trigger-btn">Edit</button>
            <button class="btn btn-danger" id="delete-item-trigger-btn">Delete</button>
            </td> 

        </script>



        <script src="<?php echo base_url("assets/js/list.js"); ?>"></script>

    </body>
</html>