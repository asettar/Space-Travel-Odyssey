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

function    isValidPhoneNumber(input) {
    const pattern = /^\+?\d{10}$/
    const parent = input.parentElement;
    const isValid = pattern.test(input.value);
    const lastChild = parent.lastElementChild; 
    if (isValid) {
        input.style["border-color"] = 'green';
        if (lastChild.tagName == 'P')   // isError
            lastChild.remove();
    }
    else    addError(input, "Phone should contain exactly 10 digits");
    return isValid;
}

function    isValidPhoneNumbers() {
    let phonenumInputs = document.querySelectorAll('.phone-number');
    for (let input of phonenumInputs) {
        if (!isValidPhoneNumber(input)) return false; 
    }
    return false;
}

function    isValidName(input) {
    const pattern = /^[a-zA-Z]{5,}$/;
    const isValid = pattern.test(input.value);
    const parent = input.parentElement;
    
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
    return false;
}

function    isValidForm() {
    return (isValidNames() && isValidPhoneNumbers());
}
