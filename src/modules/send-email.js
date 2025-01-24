/////////////////////////////////////
///// validate and sends email /////
////////////////////////////////////



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
    else {
        let form = document.getElementById("form"),
            contact = document.getElementById("contact"),
            templateParams = {
                from_name: name,
                message: message,
                from_email: email,
                "g-recaptcha-response": captchaToken
            };

        emailjs.init({
            publicKey: "wcwKCcPMETQ63x_aP",
            blockHeadless: true,
            limitRate: {
                id: 'app',
                throttle: 10000,
            },
        });

        emailjs.send('service_j2mkwmy', 'template_zilck42', templateParams).then(
            (response) => {
                alert("Message successfully sent!");
            },
            (error) => {
                alert("There was an error in sending the message. Please contact support@georgescoding.com.")
            });

        form.reset();
        grecaptcha.reset();
        contact.scrollIntoView();
    }
}