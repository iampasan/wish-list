var requestUrl = "http://localhost/wish-list/users";

$(document).ready(function() {

    $('#login-btn').on('click', function() {
        event.preventDefault(); // Prevent submitting form
        var userDetails = {
            username: $('#input-username').val(),
            password: $('#input-password').val()
        };

        if (validateForm()){
            $.ajax({
                url: requestUrl + "/login",
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                data: userDetails,
                success: function(response) {
                    console.log(["Login success: ", response]);
//                    localStorage.setItem("wl_username", response.username);
//                    localStorage.setItem("wl_list_id", response.list_id);
                    $.cookie('wl_username', response.username);
                    $.cookie('wl_list_id', response.list_id);
                    window.location.href = "http://localhost/wish-list/";
                },
                error: function(response) {
                    $.toaster({ priority : 'danger', title : 'Error', message : response.responseText});
                    console.log(["Login failed: ", response]);
                }
            });
        }
    });
});

function validateForm() {
    if($('#input-username').val()== "" || $('#input-username').val() == ""){
        console.log("form invalid");
        document.getElementById("sign-in-form").classList.add("was-validated");
        return false;
    }
    return true;
}