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

            <!--Add Item-->
            <span>
                <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input class="form-control" id="input-title" placeholder="Enter Title">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">URL</label>
                    <input class="form-control" id="input-url" placeholder="Enter URL">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Price</label>
                    <input class="form-control" id="input-price" placeholder="Enter Price">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Priority</label>
                    <input class="form-control" id="input-priority" placeholder="Enter Priority">
                </div>

                <button id="add-item" class="btn btn-primary">Submit</button>
            </span>






            <div class="container wish-list">

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
            <td><button class="btn btn-primary">Edit</button></td> 

        </script>



        <script language="javascript">
            //Backbone Model
            var Item = Backbone.Model.extend({
                defaults: {
                    id: '',
                    title: '',
                    url: '',
                    list_id: '',
                    price: '',
                    priority: '',
                }
            });
            //Backbone Collections
            var Items = Backbone.Collection.extend({});
            var item1 = new Item({
                id: '1',
                title: 'Item1',
                url: 'item1url',
                list_id: '1',
                price: '123',
                priority: '1'
            });
            var item2 = new Item({
                id: '2',
                title: 'Item2',
                url: 'item1url',
                list_id: '1',
                price: '123',
                priority: '1'
            });
            //Instantiate collection
            var items = new Items([item1, item2]);
            //Backbone View for 1 Item
            var ItemView = Backbone.View.extend({
                model: new Item(),
                tagName: 'tr',
                initialize: function() {
                    this.template = _.template($('.item-template').html())
                },
                render: function() {
                    this.$el.html(this.template(this.model.toJSON()));
                }
            });

            var ItemsView = Backbone.View.extend({
                model: items,
                el: $('.items-list'),
                initialize: function() {
                    this.model.on('add', this.render(), this)
                },
                render: function() {
                    var self = this;
                    this.$el.html(''); //Flush
                    _.each(this.model.toArray(), function(item) {
                        self.$el.append((new Blogview({model: item})).render().$el);
                    });
                }


            });
            $(document).ready(function() {
                $('#add-item').on('click', function() {
                    var item = new Item({
                        id: '2',
                        title: $('#input-title').val(),
                        url: $('#input-title').val(),
                        list_id: '1',
                        price: $('#input-price').val(),
                        priority: $('#input-priority').val()
                    });
                    console.log(item.toJSON());
                });
            });




        </script>

    </body>
</html>