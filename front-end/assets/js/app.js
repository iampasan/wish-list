/* Backbone Router*/
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "list",
        "login": "login",
        "register": "register",
        "view-list/:list_id": "viewList"
    },

    initialize: function () {
        this.loginView = new LoginView();
        this.registerView = new RegisterView();
        this.mainView = new MainView();
    },

    list: function () {
        if (localStorage.getItem('wl_username') && localStorage.getItem('wl_list_id')) {
            $('#log-out-btn').show();
            this.mainView.render();
        } else {
            Backbone.history.navigate("/login", { trigger: true });
        }
    },

    login: function () {
        $('#log-out-btn').hide();
        this.loginView.render();
    },

    register: function () {
        $('#log-out-btn').hide();
        this.registerView.render();
    },

    viewList: function (list_id) {
        $('#content').html('ViewList' + list_id);
    }
});




var router = new AppRouter();

$(function () {
    Backbone.history.start();
});


$( document ).ready(function() {
    $('#log-out-btn').on('click', function() {
        localStorage.clear();
        Backbone.history.navigate("#login", { trigger: true });
    });

});