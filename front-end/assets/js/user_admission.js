/* Req URL for users controller*/
var userRequestUrl = config.apiBaseUrl + '/users'

var LoginView = Backbone.View.extend({

    el: $('#content'),

    template: _.template($('#login-template').html()),

    events: {
        "click #login-btn": "login"
    },

    login: function () {
        event.preventDefault(); // Prevent submitting form
        var userDetails = {
            username: $('#input-username').val(),
            password: $('#input-password').val()
        };

        if ($('#input-username').val() == "" || $('#input-password').val() == "") {
            document.getElementById("sign-in-form").classList.add("was-validated");
        } else {
            $.ajax({
                url: userRequestUrl + "/login",
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                data: userDetails,
                success: function (response) {
                    console.log(["Login success: ", response]);
                    localStorage.setItem("wl_username", response.username);
                    localStorage.setItem("wl_list_id", response.list_id);
                    Backbone.history.navigate("/", { trigger: true });
                },
                error: function (response) {
                    $.toaster({ priority: 'danger', title: 'Error', message: response.responseText });
                    console.log(["Login failed: ", response]);
                }
            });
        }
    },

    render: function () {
        this.$el.html(this.template());
    }

});



var RegisterView = Backbone.View.extend({

    el: $('#content'),

    template: _.template($('#register-template').html()),

    events: {
        "click #register-btn": "register"
    },

    register: function () {
        console.log('register_called');
        event.preventDefault(); // Prevent submitting form

        var username = $('#input-username').val();
        var password = $('#input-password').val();
        var name = $('#input-name').val();
        var list_name = $('#input-list-name').val();
        var list_description = $('#input-list-description').val();

        if (username == "" 
         || password == ""
         || name == ""
         || list_name == ""
         || list_description == ""
         ) {
            document.getElementById("sign-in-form").classList.add("was-validated");
        } else {
            console.log('goes to else');
            var registerDetails = {
                    username:username,
                    name:name,
                    password:password,
                    list_name:list_name,
                    list_description:list_description
            };

            console.log(registerDetails);

            $.ajax({
                url: userRequestUrl + "/register",
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                data: registerDetails,
                success: function (response) {
                    localStorage.setItem("wl_username", response.username);
                    localStorage.setItem("wl_list_id", response.list_id);
                    Backbone.history.navigate("/", { trigger: true });
                },
                error: function (response) {
                    $.toaster({ priority: 'danger', title: 'Error', message: response.responseText });
                    console.log(["Login failed: ", response]);
                }
            });
        }
    },

    render: function () {
        this.$el.html(this.template());
    }

});