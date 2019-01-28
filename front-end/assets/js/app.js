/* Backbone Router*/
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "list",
        "login": "login",
        "register": "register",
        "view/:list_id": "viewList"
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
        if (localStorage.getItem('wl_username') && localStorage.getItem('wl_list_id')) {
            Backbone.history.navigate("/", { trigger: true });
        } else {
            $('#log-out-btn').hide();
            this.loginView.render();
        }

    },

    register: function () {
        if (localStorage.getItem('wl_username') && localStorage.getItem('wl_list_id')) {
            Backbone.history.navigate("/", { trigger: true });
        } else {
            $('#log-out-btn').hide();
            this.registerView.render();
        }
    },

    viewList: function (share_id) {
        $('#log-out-btn').hide();
        var self = this;
        $.ajax({
            url: listRequestUrl + "/getShareDetails/" + share_id,
            type: 'GET',
            crossDomain: true,
            success: function (response) {
                console.log(response);
                self.mainView.render(response);
            },
            error: function (response) {
                $.toaster({ priority: 'danger', title: 'Error!', message:response });
            }
        });
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
    $('#btn-share-link').on('click', function() {
        alert("hii");
    });
    
});