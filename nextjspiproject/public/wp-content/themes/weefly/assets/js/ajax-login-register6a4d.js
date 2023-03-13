// import jQuery from "jquery"

jQuery(document).ready(function($) {
 
    /**
     * When user clicks on button...
     *
     */
    $('#btn-new-user').click( function(event) {
   
      /**
       * Prevent default action, so when user clicks button he doesn't navigate away from page
       *
       */
      if (event.preventDefault) {
          event.preventDefault();
      } else {
          event.returnValue = false;
      }
   
      // Show 'Please wait' loader to user, so she/he knows something is going on
      $('.indicator').show();
   
      // If for some reason result field is visible hide it
      $('.result-message').hide();
   
      // Collect data from inputs
      var reg_nonce = $('#vb_new_user_nonce').val();
      var reg_user  = $('#vb_username').val();
      var reg_pass  = $('#vb_pass').val();
      var reg_mail  = $('#vb_email').val();
      var reg_name  = $('#vb_name').val();
      var reg_nick  = $('#vb_nick').val();
   
      /**
       * AJAX URL where to send data
       * (from localize_script)
       */
      var ajax_url = vb_reg_vars.vb_ajax_url;
   
      // Data to send
      data = {
        action: 'register_user',
        nonce: reg_nonce,
        user: reg_user,
        pass: reg_pass,
        mail: reg_mail,
        name: reg_name,
        nick: reg_nick,
      };
   
      // Do AJAX request
      $.post( ajax_url, data, function(response) {
   
        // If we have response
        if( response ) {
   
          // Hide 'Please wait' indicator
          $('.indicator').hide();
   
          if( response === '1' ) {
            // If user is created
            $('.result-message').html('Your submission is complete.'); // Add success message to results div
            $('.result-message').addClass('alert-success'); // Add class success to results div
            $('.result-message').show(); // Show results div
          } else {
            $('.result-message').html( response ); // If there was an error, display it in results div
            $('.result-message').addClass('alert-danger'); // Add class failed to results div
            $('.result-message').show(); // Show results div
          }
        }
      });
   
    });
  });




  jQuery(document).ready(function($) {

    // Show the login dialog box on click
    $('a#show_login').on('click', function(e){
        $('body').prepend('<div class="login_overlay"></div>');
        $('form#login').fadeIn(500);
        $('div.login_overlay, form#login a.close').on('click', function(){
            $('div.login_overlay').remove();
            $('form#login').hide();
        });
        e.preventDefault();
    });

    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e){
        $('form#login p.status').show().text(ajax_login_object.loadingmessage);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_login_object.ajaxurl,
            data: { 
                'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': $('form#login #username').val(), 
                'password': $('form#login #password').val(), 
                'security': $('form#login #security').val() },
            success: function(data){
                $('form#login p.status').text(data.message);
                if (data.loggedin == true){
                    document.location.href = ajax_login_object.redirecturl;
                }
            }
        });
        e.preventDefault();
    });

});