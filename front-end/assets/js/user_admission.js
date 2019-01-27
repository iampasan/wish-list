/* Req URL for users controller*/
var userRequestUrl = config.apiBaseUrl + '/users'




var LoginView = Backbone.View.extend({

    el: $('#content'),

    template: _.template($('#login-template').html()),

    events: {
        "click #login-btn": "login"
    },

    login: function(){
        //login here
    },

    render: function () {
        this.$el.html(this.template());
    }

});