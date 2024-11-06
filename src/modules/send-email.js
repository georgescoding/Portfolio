//////////////////////////////////////////////////
///// validate and sends email using EmailJS /////
//////////////////////////////////////////////////



// Validates the contents of the form and reCAPTCHA and sends the email is everything is correct
export function validate() {
    var name = String(document.querySelector('[name="name"]').value);
    var email = String(document.querySelector('[name="email"]').value);
    var message = String(document.querySelector('[name="message"]').value);
    var format = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    var captchaToken = grecaptcha.getResponse();

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
    else { send(name, email, message, captchaToken); }
}


// Sends form to email via EmailJS, resets form and reCAPTCHA
function send(name, email, message, captchaToken) {
    var templateParams = {
        from_name: name,
        message: message,
        from_email: email,
        "g-recaptcha-response": captchaToken
    };
    emailjs.send('service_j2mkwmy', 'template_zilck42', templateParams).then(
        (response) => {
            alert("Message successfully sent!");
        },
        (error) => {
            alert("There was an error in sending the message. Please contact support@georgescoding.com.");
        },
    );
    document.getElementById("form").reset();
    grecaptcha.reset();
}