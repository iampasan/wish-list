//Backbone Model
var Item = Backbone.Model.extend({
    defaults: {
        id: '',
        title: '',
        url: '',
        list_id: '',
        price: '',
        priority: ''
    }
});

//Backbone Collections
var Items = Backbone.Collection.extend({
    model:Item
});

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
        this.template = _.template($('.item-template').html());
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var ItemsView = Backbone.View.extend({
    model: items,
    el: $('.items-list'),
    initialize: function() {
        this.render();
        this.model.bind('add change', this.render, this);
        console.log(this.model);
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

var itemsView = new ItemsView();

$(document).ready(function() {
    
    $('#item-add-modal-btn').on('click',function(){
        $('#itemModalLabel').text('Add Item');
    });


    $('#save-item').on('click', function() {
        var item = new Item({
            title: $('#input-title').val(),
            url: $('#input-url').val(),
            list_id: '1',
            price: $('#input-price').val(),
            priority: $('#input-priority').val()
        });
        console.log(item.toJSON());
        items.add(item);
        console.log(items.toJSON());
    });


});

function clearFeilds(){
    $('#input-title').val('');
    $('##input-url').val('');
    $('#input-price').val('');
    $('#input-priority').val('');
}