let loginSection = document.getElementById("login-register");
let userNameInput = document.getElementById("name");
let userEmailInput = document.getElementById("email");
let emailValidationSpan = document.getElementById("emailValidation");
let userPassInput = document.getElementById("password");
let loginBtn = document.getElementById("login-btn");
let messageSpan = document.getElementById("message");
let regBtn = document.getElementById("register-btn");
let haveAccountP = document.getElementById("haveAccount");
let changeFormTypeA = document.getElementById("changeFormType");


const emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

let listOfUsers = localStorage.getItem("ourUsers") == null ? [] : 
JSON.parse(localStorage.getItem("ourUsers"));

emailValidationSpan.style.display = 'none';

showSigninForm();
function showSigninForm(){
    regBtn.style.display = 'none';
    userNameInput.style.display = 'none';
    haveAccountP.innerHTML = "Don’t have an account? &nbsp"
    changeFormTypeA.innerHTML = "Sign Up"
    loginBtn.style.display = 'block'
}

function showRegisterForm(){
    haveAccountP.innerHTML = "You have an account? &nbsp"
        changeFormTypeA.innerHTML = "Signin"
        regBtn.style.display = 'block';
        userNameInput.style.display = 'block';
        loginBtn.style.display = 'none'
}
 
changeFormTypeA.addEventListener("click", function(evt){
    if (evt.target.innerHTML == "Sign Up") {
        showRegisterForm();
        clearLoginInputs();
    }
    else{
        showSigninForm();
        clearLoginInputs();
    }
});

function checkLoginValidation() {
    if (userEmailInput.value == "" || userPassInput.value == "" || userNameInput.value == "" || !emailPattern.test(userEmailInput.value)) {
        if (!emailPattern.test(userEmailInput.value) ) {
            emailValidationSpan.style.display = 'block';
            emailValidationSpan.innerHTML = 'Email Shoulbe like name@mailbox.com';
        }
        return false
    }
    for (let i = 0; i < listOfUsers.length; i++) {
        if (userEmailInput.value.toLowerCase() == listOfUsers[i].userEmail.toLowerCase()) {
            emailValidationSpan.style.display = 'block';
            emailValidationSpan.innerHTML = 'Email already Registered';
            return false;
        }
     }
     
    return true;
}

loginBtn.addEventListener("click", function(){
    for (let i = 0; i < listOfUsers.length; i++) {
        if (userEmailInput.value.toLowerCase() == listOfUsers[i].userEmail.toLowerCase() && userPassInput.value == listOfUsers[i].userPassword) {
            localStorage.setItem("loggedinUser", `Welcome ${listOfUsers[i].userName}`)
            clearLoginInputs();
            window.location.href = window.location.origin + "/home.html";  

            return 0;
        }
     }
    messageSpan.innerHTML = "Incorrect email or password!!"
    messageSpan.classList.replace("text-success", "text-danger")
})

regBtn.addEventListener("click", function(){
    if (!checkLoginValidation()) {
        messageSpan.innerHTML = "All inputs are required and should be valid!"
        messageSpan.classList.replace("text-success", "text-danger")
        showSigninForm();
    }
    else{
        let userObj ={
            userName : userNameInput.value,
            userEmail : userEmailInput.value,
            userPassword : userPassInput.value
        }
        listOfUsers.push(userObj);
        saveUser();
        clearLoginInputs();
        messageSpan.innerHTML = "Register success"
        messageSpan.classList.replace("text-danger", "text-success")
    }
    
})

function saveUser(){
    localStorage.setItem("ourUsers", JSON.stringify(listOfUsers))
}

function clearLoginInputs(){
    userNameInput.value = "";
    userEmailInput.value = "";
    userPassInput.value = "";
}

