/* Req URL for list and items controllers*/
var listRequestUrl = config.apiBaseUrl + '/lists';
var userRequestUrl = config.apiBaseUrl + '/items';

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

//Backbone view list details
var ListView = Backbone.View.extend({
    el: $('#content'),
    template:_.template($('#list-template').html()),
    initialize: function() {
        //Instantiate collection
        var items = new Items();
        var self = this;
    },
    events: {
        'click #logout-btn': 'logout',
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
});

//Backbone view list details
var ListDetailsView = Backbone.View.extend({
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



