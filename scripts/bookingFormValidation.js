// const confirmBtn = document.getElementById('confirm-btn');


// errors styles updates
function    addErrorMessage(message) {
    const error = document.createElement('p');
    error.innerHTML = message; 
    error.style.color = 'red';
    error.style.fontSize = '12px';
    return error;
}

function    addError(input, errorMsg) {
    input.style["border-color"] = 'red';
    const parent = input.parentElement;
    const lastChild = parent.lastElementChild;
    // add an error
    if (lastChild.tagName != 'P') {
        const error = addErrorMessage(errorMsg);
        parent.appendChild(error);
    }
    input.focus();
}

function    updateStyleOnSuccess(input) {
    const lastChild = input.nextElementSibling;
    input.style["border-color"] = 'green';
    if (lastChild && lastChild.tagName == 'P')   // isError
        lastChild.remove();
}

// fucntions to  check validation of inputs feilds

function    isValidMessage(input) {
    const pattern = /^[a-zA-Z]{4,}$/
    const isValid = pattern.test(input.value);

    if (isValid) updateStyleOnSuccess(input);
    else  addError(input, "Message should contain only alphabetic characters and at have at least 4 lenght.");
    return isValid;
}

function    isValidMessages() {
    let messageInputs = document.querySelectorAll('.special-requirements');
    for (let input of messageInputs) {
        if (!isValidMessage(input)) return false; 
    }
    return true;
}

function    isValidEmail(input) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = pattern.test(input.value);

    if (isValid) updateStyleOnSuccess(input);
    else  addError(input, "invalid mail");
    return isValid;
}

function    isValidEmails() {
    let emailInputs = document.querySelectorAll('.email-address');
    for (let input of emailInputs) {
        if (!isValidEmail(input)) return false; 
    }
    return true;
}

function    isValidPhoneNumber(input) {
    const pattern = /^\+?\d{10}$/
    const isValid = pattern.test(input.value);

    if (isValid) updateStyleOnSuccess(input);
    else  addError(input, "Phone should contain exactly 10 digits");
    return isValid;
}

function    isValidPhoneNumbers() {
    let phonenumInputs = document.querySelectorAll('.phone-number');
    for (let input of phonenumInputs) {
        if (!isValidPhoneNumber(input)) return false; 
    }
    return true;
}

function    isValidName(input) {
    const pattern = /^[a-zA-Z]{5,}$/;
    const isValid = pattern.test(input.value);
    
    if (isValid) updateStyleOnSuccess(input);
    else
        addError(input, "name should contains only characters and have at least a length of 5.");
    return isValid;
}

function    isValidNames() {
    let namesInput = document.querySelectorAll('.first-name, .last-name');
    for (let input of namesInput) {
        if (!isValidName(input)) return false; 
    }
    return true;
}

function    isRadioSelected() {
    let radio = document.querySelector('input[name="choice"]:checked');
    return (radio);
}

function    isValidForm() {
    return (isValidNames() && isValidEmails() && isValidPhoneNumbers() && isValidMessages() && isRadioSelected());
}
