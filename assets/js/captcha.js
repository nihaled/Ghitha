$("#contact_form").submit(function () {
  // we stoped it
  event.preventDefault();
  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();
  // needs for recaptacha ready
  grecaptcha.ready(function () {
    // do request for recaptcha token
    // response is promise with passed token
    grecaptcha
      .execute("YOUR_SITE_KEY", { action: "contact" })
      .then(function (token) {
        // add token to form
        $("#contact_form").prepend(
          '<input type="hidden" name="g-recaptcha-response" value="' + token + '">'
        );
        $.post(
          "google-v3-recaptcha-validate-php.php",
          { name: name, email: email, subject: subject, message: message, token: token },
          function (result) {
            console.log(result);
            if (result.success) {
              alert("Thanks for contacting with us.");
            } else {
              alert("Something goes to wrong");
            }
          }
        );
      });
  });
});
