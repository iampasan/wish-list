/*Check if username and list id available*/
//if (localStorage.getItem("wl_username") != null || localStorage.getItem("wl_list_id") != null) {
//    var currentListId = localStorage.getItem("wl_list_id");
//    loadList();
//} else {
//    window.location.href = "http://localhost/wish-list/login";
//}

var currentListId = $.cookie('wl_list_id');
loadList();

function loadList() {

//AJAX Prefilter to direct all the requests to the backend server
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        options.url = 'http://localhost/wish-list' + options.url;
    });

//List Modal
    var List = Backbone.Model.extend({
        url: '/lists/list/' + currentListId,
        defaults: {
            title: '',
            url: '',
            price: '',
            priority: ''
        }
    });

//Item Model
    var Item = Backbone.Model.extend({
        urlRoot: '/items/item',
        defaults: {
            title: '',
            url: '',
            price: '',
            priority: ''
        }
    });

//Items collection
    var Items = Backbone.Collection.extend({
        url: '/items/itemsByList/' + currentListId,
        model: Item,
        comparator: function(item) {
            switch (item.get('priority')) {
                case 'High':
                    return 1;
                case 'Medium':
                    return 2;
                case 'Low':
                    return 3;
                default:
                    return Infinity;
            }
        }
    });

//Instantiate collection
    var items = new Items();

//Backbone view list details
    var ListView = Backbone.View.extend({
        model: new List(),
        el: $('.list-details-container'),
        initialize: function() {
            this.template = _.template($('.list-details-template').html());
            var self = this;
            this.model.fetch({
                success: function() {
                    self.render();
                    console.log('Succeessfully loaded!');
                },
                error: function() {
                    console.log('Failed to load items!');
                }
            });
        },
        events: {
            'click #logout-btn': 'logout',
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        logout: function() {
            $.removeCookie('wl_username');
            $.removeCookie('wl_list_id');
            location.reload();
        }
    });

//Backbone View single Item
    var ItemView = Backbone.View.extend({
        model: new Item(),
        tagName: 'tr',
        initialize: function() {
            this.template = _.template($('.item-template').html());
        },
        events: {
            'click #update-item-trigger-btn': 'open_update',
            'click #delete-item-trigger-btn': 'open_delete'
        },
        open_update: function() {
            itemOperationsView.show(this.model);
        },
        open_delete: function() {
            itemDeleteView.show(this.model);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

//Backbone view for collection of items
    var ItemsView = Backbone.View.extend({
        model: items,
        el: $('.items-list'),
        initialize: function() {
            this.render();
            this.model.bind('add change remove', this.render, this);
            this.model.fetch({
                success: function() {
                    console.log('Succeessfully loaded!');
                },
                error: function() {
                    console.log('Failed to load items!');
                }
            });
        },
        render: function() {
            this.model.sort();
            var self = this;
            this.$el.html(''); //Flush
            _.each(this.model.toArray(), function(item) {
                self.$el.append((new ItemView({model: item})).render().$el);
            });
            return this;
        }
    });

    var ItemOperationView = Backbone.View.extend({
        el: $('.item-operation-modal'),
        initialize: function() {
            this.template = _.template($('.item-operation-template').html());
        },
        render: function() {
            this.$el.html(''); //Flush
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #save-item-btn': 'save',
            'click #update-item-btn': 'update'
        },
        show: function(new_model) {
            this.model = new_model;
            this.render();
            if (!this.model.get('id')) {
                //No ID means adding new item
                this.$('#itemModalLabel').html('Add Item');
                $('#update-item-btn').hide();
                $('#save-item-btn').show();
            } else {
                //Have an ID means updating an item
                setOperationFeilds(
                        this.model.get('title'),
                        this.model.get('url'),
                        this.model.get('price'),
                        this.model.get('priority')
                        );
                this.$('#itemModalLabel').html('Edit Item');
                $('#save-item-btn').hide();
                $('#update-item-btn').show();
            }
            $('#itemModal').modal('show');
        },
        hide: function() {
            $('#itemModal').modal('hide');
        },
        save: function() {
            var self = this;
            self.model.save(getCurrentModalItem(), {
                wait: true,
                success: function(model, response) {
                    //Id is the response on this endpoint
                    self.model.set('id', response);
                    items.add(self.model);
                },
                error: function() {
                    console.log('Failed to post');
                }
            }).always(
                    function() {
                        self.hide();
                    }
            );
        },
        update: function() {
            var self = this;
            this.model.save(getCurrentModalItem(), {
                wait: true,
                success: function() {
                    console.log('Updated successfully');
                },
                error: function() {
                    console.log('Failed to update!');
                }
            }).always(
                    function() {
                        self.hide();
                    }
            );
        }
    });

    var ItemDeleteView = Backbone.View.extend({
        el: $('.item-operation-modal'),
        initialize: function() {
            this.template = _.template($('.item-delete-template').html());
        },
        render: function() {
            this.$el.html(''); //Flush
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #delete-item-btn': 'delete',
        },
        show: function(new_model) {
            this.model = new_model;
            this.render();
            $('#deleteModal').modal('show');
        },
        hide: function() {
            $('#deleteModal').modal('hide');
        },
        delete: function() {
            var self = this;
            this.model.destroy({
                wait: true,
                success: function() {
                    console.log('Removed Successfully!!');
                },
                error: function() {
                    console.log('Failed to delete item');
                }
            }).always(
                    function() {
                        self.hide();
                    }
            );
        }
    });

//Initialize Views
    var itemsView = new ItemsView();
    var itemOperationsView = new ItemOperationView();
    var listView = new ListView();
    var itemDeleteView = new ItemDeleteView();

    $(document).ready(function() {
        //Opening Add modal to add item
        $('#item-add-modal-btn').on('click', function() {
            itemOperationsView.show(new Item());
        });

    });


    /*-----Helper Methods-----*/

    function getCurrentModalItem() {
        var item = {
            title: $('#input-title').val(),
            url: $('#input-url').val(),
            price: $('#input-price').val(),
            priority: $('#input-priority').val(),
            list_id: currentListId
        };
        return item;
    }

    function displayInfo(title, message) {
        $('#infoModalLabel').text(title);
        $('#info-modal-description').text(message);
        $('#infoModal').modal('show');

    }

    function setOperationFeilds(title, url, price, priority) {
        $('#input-title').val(title);
        $('#input-url').val(url);
        $('#input-price').val(price);
        $('#input-priority').val(priority);
    }

    function clearOperationFeilds() {
        $('#input-title').val('');
        $('#input-url').val('');
        $('#input-price').val('');
        $('#input-priority').val('Medium');
    }

}