//AJAX Prefilter to direct all the requests to the backend server
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = 'http://localhost/wish-list' + options.url;
});

/*Global Variables*/
var currentItemId;

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
    url: '/items/itemsByList/1',
    model: Item
});

//var item1 = new Item({
//    id: '1',
//    title: 'Item1',
//    url: 'item1url',
//    list_id: '1',
//    price: '123',
//    priority: '1'
//});
//
//var item2 = new Item({
//    id: '2',
//    title: 'Item2',
//    url: 'item1url',
//    list_id: '1',
//    price: '123',
//    priority: '1'
//});

//Instantiate collection
var items = new Items();

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

        //Setting the text feilds
        var title = this.model.get('title');
        var url = this.model.get('url');
        var price = this.model.get('price');
        var priority = this.model.get('priority');
        setFeilds(title, url, price, priority);

        //Ready the model and set the currentItemId
        currentItemId = this.model.get('id');
        console.log("Current update id " + currentItemId);
        readyModal('edit');
        $('#itemModal').modal('show');
    },
    open_delete: function() {
        currentItemId = this.model.get('id');
        $('#delete-modal-item-title').text(this.model.get('title'));
        $('#deleteModal').modal('show');
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
        var self = this;
        this.$el.html(''); //Flush
        _.each(this.model.toArray(), function(item) {
            self.$el.append((new ItemView({model: item})).render().$el);
        });
        return this;
    }
});

//Initialize items view
var itemsView = new ItemsView();

$(document).ready(function() {

    //Opening Add modal to add item
    $('#item-add-modal-btn').on('click', function() {
        readyModal('add');
    });

    //Clicking save button to save the new item
    $('#save-item-btn').on('click', function() {
        var item = new Item();
        item.save(getCurrentModalItem(), {
            success: function(model, response) {
                //Id is the response on this endpoint
                item.set('id', response);
                items.add(item);
            },
            error: function() {
                console.log('Failed to post');
            }
        });
    });

    //Clicking the update button to update the item
    $('#update-item-btn').on('click', function() {
        var item = items.get(currentItemId);
        item.save(getCurrentModalItem(), {
            success: function() {
                items.set(item, {remove: false})
            },
            error: function() { 
                console.log('Failed to update!');
            }
        });
    });

    //Clicking the delete button to delete the item
    $('#delete-item-btn').on('click', function() {
        items.remove(currentItemId);
        console.log(items.toJSON());
    });

});


function readyModal(state) {
    if (state == 'add') {
        $('#itemModalLabel').text('Add Item');
        $('#update-item-btn').hide();
        $('#save-item-btn').show();
        clearFeilds();
    }
    else if (state == 'edit') {
        $('#itemModalLabel').text('Edit Item');
        $('#save-item-btn').hide();
        $('#update-item-btn').show();
    }
}

function getCurrentModalItem() {
    var item = {
        title: $('#input-title').val(),
        url: $('#input-url').val(),
        price: $('#input-price').val(),
        priority: $('#input-priority').val(),
        list_id: 1
    };
    return item;
}

function displayInfo(title, message) {
    $('#infoModalLabel').text(title);
    $('#info-modal-description').text(message);
    $('#infoModal').modal('show');

}

function setFeilds(title, url, price, priority) {
    $('#input-title').val(title);
    $('#input-url').val(url);
    $('#input-price').val(price);
    $('#input-priority').val(priority);
}

function clearFeilds() {
    $('#input-title').val('');
    $('#input-url').val('');
    $('#input-price').val('');
    $('#input-priority').val('');

}