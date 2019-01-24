<div id ="list-view-container">
        <div class="list-details-container"></div>
    <!--<script type="text/template" class="items-table-template">-->
        <div class="container-fluid wish-list">
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
            <!--</script>-->
        </div>


    <div class="item-operation-modal"><!--Renders the add,update and delete modals here--></div>

    <!--List details Template-->
    <script type="text/template" class="list-details-template">
        <div class="jumbotron jumbotron-fluid">
        <button type="button" class="btn btn-outline-danger mt-1 mr-1 float-right" id="logout-btn">Logout</button>
        <div class="container-fluid">
        <h1 class="display-4"><%= name %></h1>
        <p class="lead"><%= description %>.</p>
        </div>
        </div>
    </script>

    <!--Operations modal template-->
    <script type="text/template" class="item-operation-template">
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
        <div class="form-group">
        <label for="inputPriority">Priority</label>
        <select class="form-control" id="input-priority">
        <option>High</option>
        <option selected>Medium</option>
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
    </script>

    <!--Delete Modal Template-->
    <script type="text/template" class="item-delete-template">
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
        <span style="font-weight: bold"><%= title %></span>
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
    </script>

    <!--Table row template-->
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

</div>