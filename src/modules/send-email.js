//////////////////////////////////////////////////
///// validate and sends email using _______ /////
//////////////////////////////////////////////////



// Validates the contents of the form and reCAPTCHA and sends the email is everything is correct
export function validate() {
    let name = String(document.querySelector('[name="name"]').value),
        email = String(document.querySelector('[name="email"]').value),
        message = String(document.querySelector('[name="message"]').value),
        format = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        captchaToken = grecaptcha.getResponse();

    if (name == "") {
        alert("Name must be filled");
        document.getElementById("name").focus();
    }
    else if (email == "") {
        alert("Email must be filled");
        document.getElementById("email").focus();
    }
    else if (message == "") {
        alert("You must include a message");
        document.getElementById("message").focus();
    }
    else if (!(String(email).match(format))) {
        alert("Email is incorrect");
        document.getElementById("email").focus();
    }
    else if (captchaToken.length == 0) {
        alert("Please complete the reCAPTCHA before sending your message!")
    }
    else { send(name, email, message); }
}


// Sends form to email via EmailJS, resets form and reCAPTCHA
function send(name, email, message) {
    
    /* send email here */

    // reset form and recaptcha
    document.getElementById("form").reset();
    grecaptcha.reset();
}