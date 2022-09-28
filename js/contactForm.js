/******w*************
    
    Project 3
    Name: Yue Kwong Kevin Lau
    Date: April 16, 2022
    Description: This is the JavaScript file for the Contact page of the Project 3: WEBSITE DEVELOPMENT & DEPLOYMENT.

********************/

/*
 * Hides all of the error elements.
 */
function hideErrors(){
    // Get an array of error elements
    let error = document.getElementsByClassName("error");

    // Loop through each element in the error array
    for ( let i = 0; i < error.length; i++ ){
        // Hide the error element by setting it's display style to "none"
        error[i].style.display = "none";
    }
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){
    hideErrors();

    //  Determine if the form has errors
    if(formHasErrors()){
        //  Prevents the form from submitting
        e.preventDefault();
        //  Returning false prevents the form from submitting
        return false;
    }

    return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors(){
    let errorFlag = false;

    // Check the required input fields for shipping information
    let contactInfoElementIDs = ["fullname", "phone", "email"];
    for(let i=0; i<contactInfoElementIDs.length; i++){
        let contactInfoElement = document.getElementById(contactInfoElementIDs[i]);

        if (contactInfoElement.value == null || trim(contactInfoElement.value) == ""){
            document.getElementById(contactInfoElementIDs[i] + "_error").style.display = "block";

            if(!errorFlag){
                contactInfoElement.focus();
            }

            errorFlag = true;
        }
    }

    // Check if the phone is invalid
    if (document.getElementById("phone_error").style.display == "none"){
        let phoneElement = document.getElementById("phone");
        let phone = phoneElement.value;

        if (isNaN(phone) || phone.length != 10){
            document.getElementById(phoneElement.id + "format_error").style.display = "block";

            if(!errorFlag){
                phoneElement.focus();
            }

            errorFlag = true;            
        }


/*
        let phoneRegExp = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);

        if(!phoneRegExp.test(phoneElement.value)){
            document.getElementById(phoneElement.id + "format_error").style.display = "block";

            if(!errorFlag){
                phoneElement.focus();
            }

            errorFlag = true;
        }
*/

    }

    // Check if the email is invalid
    if (document.getElementById("email_error").style.display == "none"){
        let emailElement = document.getElementById("email");

        let emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

        if(!emailRegExp.test(emailElement.value)){
            document.getElementById(emailElement.id + "format_error").style.display = "block";

            if(!errorFlag){
                emailElement.focus();
            }

            errorFlag = true;
        }
    }

    return errorFlag;
}

/*
 * Handles the load event of the document.
 */
function load(){
    hideErrors();

    document.getElementById("contactForm").addEventListener("submit", validate);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);