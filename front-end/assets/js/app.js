/* Backbone Router*/

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "list",
        "login": "login",
        "register": "register",
        "view-list/:list_id": "viewList"
    },

    initialize: function(){
        this.loginView = new LoginView();
    },

    list:function(){
        $('#content').html('Load the list');
    },

    login:function(){
        this.loginView.render();
    },

    register:function(){
        $('#content').html('Load login page');
    },

    viewList:function(list_id){
        $('#content').html('ViewList' + list_id);
    }
});

var router = new AppRouter();

$(function(){
    Backbone.history.start();
});

