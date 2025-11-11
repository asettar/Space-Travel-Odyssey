const   usersData = {
    "admin@gmail" : "admin",
    "achraf@gmail.com" : "achraf",
    "admin" : "admin",
    "achraf": "achraf",
    "user@gmail.com" : "user"
};


const   mailInput = document.getElementById('mail-input');
const   passwdInput = document.getElementById('passwd-input');
const   loginSubmitBtn = document.getElementById('submit-btn');
const   loginHeader = document.getElementById('login-header')
const   logoutBtn = document.getElementById('logout-btn');
const   logoutName = document.getElementById('logout-name');

if (localStorage.getItem('isLoggedIn')) updateHeader();
console.log("localstorage", localStorage.getItem('isLoggedIn'));
console.log(logoutBtn);
// console.log(loginHeader);
// console.log(logoutName);

function    userExist() {
    let mailValue = mailInput.value;
    let passwdValue = passwdInput.value;
    if (!usersData.hasOwnProperty(mailValue) || usersData[mailValue] !== passwdValue) 
        return false;
    return true;
}

function    updateHeader() {
    logoutName.style.display = 'flex';
    logoutName.firstElementChild.innerHTML = localStorage.getItem('isLoggedIn');
    loginHeader.style.display = 'none';
}

function    deleteUserSession() {
    console.log("logout");
    logoutName.style.display = 'none';
    loginHeader.style.display = 'inline';
    localStorage.removeItem('isLoggedIn');
}

// events 

// only on login page  
if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (localStorage.getItem('isLoggedIn')) 
            alert("user is already logged in.");
        if (!userExist()) alert("User is not regitered.");
        localStorage.setItem('isLoggedIn', mailInput.value);
        updateHeader();
        window.location.href = "../index.html";
    })
}


logoutBtn.addEventListener('click', deleteUserSession);