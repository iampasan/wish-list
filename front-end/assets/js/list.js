/*Current List Id*/
var currentListId;

/* Req URL for list and items controllers*/
var listRequestUrl = config.apiBaseUrl + '/lists';
var itemsRequestUrl = config.apiBaseUrl + '/items';

//List Modal
var List = Backbone.Model.extend({
    url: function () {
        console.log(currentListId);
        return listRequestUrl + '/list/' + currentListId;
    },
    defaults: {
        title: '',
        url: '',
        price: '',
        priority: ''
    }
});

//Item Model
var Item = Backbone.Model.extend({
    urlRoot: itemsRequestUrl + '/item',
    defaults: {
        title: '',
        url: '',
        price: '',
        priority: ''
    }
});

//Items collection
var Items = Backbone.Collection.extend({
    model: Item,
    url: function () {
        console.log(currentListId);
        return itemsRequestUrl + '/itemsByList/' + currentListId;
    },
    comparator: function (item) {
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

//Backbone main view
var MainView = Backbone.View.extend({
    el: $('#content'),
    template: _.template($('#main-template').html()),
    items: new Items(),
    isOwner: true,
    ownerDetails: {},
    initialize: function () {
        this.listDetailsView = new ListDetailsView({ parent: this });
        this.itemsView = new ItemsView({ model: this.items, parent: this });
        this.itemOperationsView = new ItemOperationView({ parent: this });
        this.itemDeleteView = new ItemDeleteView();
        var self = this;
    },
    events: {
        'click #item-add-modal-btn': 'open_add'
    },
    open_add() {
        this.itemOperationsView.show(new Item());
    },
    render: function (shareDetails) {
        if (shareDetails) {
            this.isOwner = false;
            this.ownerDetails = shareDetails;
            currentListId = this.ownerDetails.list_id;
        } else {
            currentListId = localStorage.getItem('wl_list_id');
            this.isOwner = true;
            this.ownerDetails = {}
        }
        this.itemsView.updateModel();
        this.listDetailsView.updateModel();
        var main_model = { isOwner: this.isOwner };
        this.$el.html(this.template(main_model));
        this.$('.list-details-container').html(this.listDetailsView.$el);
        this.$('#list-table') > $("#items-list").remove();
        this.$('#list-table').append(this.itemsView.$el);
        return this;
    },
});

//Backbone view list details
var ListDetailsView = Backbone.View.extend({
    model: new List(),
    initialize: function (options) {
        this.parent = options.parent;
        this.template = _.template($('#list-details-template').html());
    },
    events: {
        'click #share-btn': 'shareClick'
    },
    shareClick() {
        console.log(config);
        var username = localStorage.getItem("wl_username");
        var viewLink = config.frontEndBaseUrl + "/view/"
        $.ajax({
            url: listRequestUrl + "/getShareLink/" + username,
            type: 'GET',
            crossDomain: true,
            success: function (response) {
                var shareLink = viewLink + response;
                copyToClipboard(shareLink);
                $.toaster({ priority: 'success', title: 'Shared!', message: 'Share link copied to clipboard!' });
            },
            error: function (response) {
                $.toaster({ priority: 'danger', title: 'Error', message: 'Error creating link! Try again!' });
                console.log(["Login failed: ", response]);
            }
        });
    },
    updateModel() {
        var self = this;
        this.model.fetch({
            success: function () {
                self.render();
                console.log('Succeessfully loaded!');
            },
            error: function () {
                console.log('Failed to load items!');
            }
        });
    },
    render: function () {
        var listDetailsModal = this.model.toJSON();
        listDetailsModal.isOwner = this.parent.isOwner;
        listDetailsModal.ownerDetails = this.parent.ownerDetails;
        this.$el.html(this.template(listDetailsModal));
        return this;
    }
});

var ItemsView = Backbone.View.extend({
    model: new Items(),
    tagName: 'tbody',
    className: 'items-list',
    initialize: function (options) {
        this.parent = options.parent;
        this.model.bind('add change remove', this.render, this);
    },
    updateModel() {
        var self = this;
        this.model.fetch({
            success: function (response) {
                console.log(response);
                console.log('Succeessfully loaded!');
                self.render();
            },
            error: function () {
                self.render();
                console.log('Failed to load items!');
            }
        });
    },
    render: function () {
        this.model.sort();
        var self = this;
        this.$el.html(''); //Flush
        if (this.model.toArray().length == 0) {
            self.$el.html('<tr><td colspan = 5><h4 class="text-center">The list is empty!</h3></td></tr>');
        } else {
            _.each(this.model.toArray(), function (item) {
                self.$el.append((new ItemView({ model: item, parent: self.parent })).render().$el);
            });
        }
        return this;
    }
});

//Backbone View single Item
var ItemView = Backbone.View.extend({
    model: new Item(),
    tagName: 'tr',
    initialize: function (options) {
        this.parent = options.parent;
        this.template = _.template($('#item-template').html());
    },
    events: {
        'click #update-item-trigger-btn': 'open_update',
        'click #delete-item-trigger-btn': 'open_delete'
    },
    open_update: function () {
        this.parent.itemOperationsView.show(this.model);
    },
    open_delete: function () {
        this.parent.itemDeleteView.show(this.model);
    },
    render: function () {
        var viewItemModel = this.model.toJSON();
        viewItemModel.isOwner = this.parent.isOwner;
        this.$el.html(this.template(viewItemModel));
        return this;
    }
});


var ItemOperationView = Backbone.View.extend({
    el: $('.item-operation-modal'),
    initialize: function (options) {
        this.parent = options.parent;
        this.template = _.template($('#item-operation-template').html());
    },
    render: function () {
        this.$el.html(''); //Flush
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click #save-item-btn': 'save',
        'click #update-item-btn': 'update'
    },
    show: function (new_model) {
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
    hide: function () {
        $('#itemModal').modal('hide');
    },
    save: function () {
        var self = this;
        self.model.save(getCurrentModalItem(), {
            wait: true,
            success: function (model, response) {
                //Id is the response on this endpoint
                self.model.set('id', response);
                self.parent.items.add(self.model);
            },
            error: function () {
                console.log('Failed to post');
            }
        }).always(
            function () {
                self.hide();
            }
        );
    },
    update: function () {
        var self = this;
        this.model.save(getCurrentModalItem(), {
            wait: true,
            success: function () {
                console.log('Updated successfully');
            },
            error: function () {
                console.log('Failed to update!');
            }
        }).always(
            function () {
                self.hide();
            }
        );
    }
});

var ItemDeleteView = Backbone.View.extend({
    el: $('.item-operation-modal'),
    initialize: function () {
        this.template = _.template($('#item-delete-template').html());
    },
    render: function () {
        this.$el.html(''); //Flush
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click #delete-item-btn': 'delete',
    },
    show: function (new_model) {
        this.model = new_model;
        this.render();
        $('#deleteModal').modal('show');
    },
    hide: function () {
        $('#deleteModal').modal('hide');
    },
    delete: function () {
        var self = this;
        this.model.destroy({
            wait: true,
            success: function () {
                console.log('Removed Successfully!!');
            },
            error: function () {
                console.log('Failed to delete item');
            }
        }).always(
            function () {
                self.hide();
            }
        );
    }
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

function copyToClipboard(text) {
    console.log("called");
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}