<div class="container" id="signin-container">
    <form class="form-signin mx-auto  needs-validation" id="sign-in-form" style="width:20rem;margin-top:10rem;" novalidate>
        <?php //echo form_open('auth', 'class="form-signin mx-auto text-center" style="width:20rem;margin-top:10rem;"');?>
        <h2 class="form-signin-heading text-center">Wish List</h2>
        <label for="inputEmail" class="sr-only">User name :</label>
        <input type="text" id="input-username" name="username" class="form-control" placeholder="Username" required autofocus>
        <div class="invalid-feedback">
            Please enter username!
        </div>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="input-password" name="password" id="inputPassword" class="form-control mt-2" placeholder="Password" required>
        <div class="invalid-feedback">
            Please enter password!
        </div>
        <button class="btn btn-lg btn-primary btn-block mt-4" id="login-btn">Sign in</button>
        <small class="mt-1"><a class="text-light text-center" href="http://localhost/wish-list/register">Not a user? Register Now!</a></small>
        <!--<p class='mt-2 text-danger'><?php //echo $errmsg      ?></p>-->
    </form>
</div>

<style>
    html { 
        background: url(<?php echo base_url("assets/img/items.jpeg"); ?>) no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    
    body{
       background-color:transparent;
    }
</style>
<script src="<?php echo base_url("assets/js/signin.js"); ?>"></script>