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
        Swal.fire({
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "rgb(23, 39, 45)",
            background: "rgb(62, 105, 121)",
            title: "<h5 style='color:white'>Name must be filled!</h5>",
        })

        document.getElementById("name").focus();
    }
    else if (email == "") {

        Swal.fire({
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "rgb(23, 39, 45)",
            background: "rgb(62, 105, 121)",
            title: "<h5 style='color:white'>Email must be filled!</h5>",
        });
        document.getElementById("email").focus();
    }
    else if (!(String(email).match(format))) {
        Swal.fire({
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "rgb(23, 39, 45)",
            background: "rgb(62, 105, 121)",
            title: "<h5 style='color:white'>Invalid email</h5>",
        })
        document.getElementById("email").focus();
    }
    else if (message == "") {

        Swal.fire({
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "rgb(23, 39, 45)",
            background: "rgb(62, 105, 121)",
            title: "<h5 style='color:white'>You must include a message</h5>",
        });
        document.getElementById("message").focus();
    }
    else if (captchaToken.length == 1) {
        Swal.fire({
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "rgb(23, 39, 45)",
            background: "rgb(62, 105, 121)",
            title: "<h5 style='color:white'>Please complete the reCAPTCHA before sending your message!</h5>",
        })
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
                Swal.fire({
                    icon: "success",
                    title: "<h5 style='color:white'>Message sent successfully!</h5>",
                    heightAuto: false,
                    timer: 2000,
                    showConfirmButton: false,
                    background: "rgb(62, 105, 121)",
                })
            },
            (error) => {
                Swal.fire({
                    icon: "error",
                    heightAuto: false,
                    confirmButtonColor: "rgb(23, 39, 45)",
                    background: "rgb(62, 105, 121)",
                    title: "<h5 style='color:white'>There was an error in sending the message. Please contact support@georgescoding.com</h5>",
                })
            });

        form.reset();
        grecaptcha.reset();
        contact.scrollIntoView();
    }
}