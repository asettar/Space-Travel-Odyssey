// const confirmBtn = document.getElementById('confirm-btn');


function    addErrorMessage(message) {
    const error = document.createElement('p');
    error.innerHTML = message; 
    error.style.color = 'red';
    error.style.fontSize = '12px';
    return error;
}

function    isValidName(input) {
    const pattern = /^[a-zA-Z]{5,}$/;
    const parent = input.parentElement;
    const isValid = pattern.test(input.value);
    const lastChild = parent.lastElementChild; 
    if (isValid) {
        input.style["border-color"] = 'green';
        if (lastChild.tagName == 'P')   // isError
            lastChild.remove();
    }
    else {
        input.style["border-color"] = 'red';
        // add an error
        if (lastChild.tagName != 'P') {
            const error = addErrorMessage("name should contains only characters and at least a lenght of 5.");
            parent.appendChild(error);
        }
    }
    return isValid;
}

function    isValidFirstNames() {
    let firstNamesInput = document.querySelectorAll('.first-name');
    for (let input of firstNamesInput) {
        if (!isValidName(input)) return false; 
    }
    return false;
}

function    formValidate() {
    if (isValidFirstNames())
        return true ;
    return false;
}
