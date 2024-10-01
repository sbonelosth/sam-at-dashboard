// static DOM strings
const strings = {
    heroText: "Safeguarding and managing Information Systems assets.",
    featuresText: [
        "Only authorized access to the resources",
        "See what assets are available and make requests",
        "Notifications are sent for timely updates",
        "Report issues to help improve the service",
    ]
}

document.getElementById("hero-text").innerText = strings.heroText;

const featureText = document.querySelectorAll(".feature-text>p");
featureText.forEach((feature, index) => {
    feature.innerText = strings.featuresText[index];
});

// toggle, show and close forms
const closeForm = document.getElementById("close-form");
const openForm = document.querySelectorAll(".auth-btn");
const formsContainer = document.getElementById("forms");
let showSignup = false;

const formToggle = document.querySelectorAll(".form-toggle-btn");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

openForm.forEach(btn => {
    btn.addEventListener("click", () => {
        formsContainer.style.display = "flex";
        showSignup = btn.innerText == "Login" ? false : true;
        loginForm.style.display = showSignup ? "none" : "flex";
        signupForm.style.display = showSignup ? "flex" : "none";
    });
});

formToggle.forEach(btn => {
    btn.addEventListener("click", () => {
        showSignup = !showSignup;
        loginForm.style.display = showSignup ? "none" : "flex";
        signupForm.style.display = showSignup ? "flex" : "none";
    });
});

closeForm.addEventListener("click", () => {
    formsContainer.style.display = "none";
});

// show or hide password
var showPassword = false;
const passwordMask = document.querySelectorAll(".pw-mask");
const passwordField = document.querySelectorAll("[name=password]");
const inputFields = document.querySelectorAll(".input-wrapper input");
const signupButton = document.getElementById("signup-btn");

passwordMask.forEach(btn => {
    btn.addEventListener("click", () => {
        showPassword = !showPassword;
        passwordField.forEach(field => {
            field.type = showPassword ? "text" : "password";
        });
        btn.className = "pw-mask fa-solid"
        btn.classList.add(showPassword ? "fa-eye-slash" : "fa-eye");
    });
});

const inputWrappers = document.querySelectorAll(".input-wrapper");

// form validation signup
inputFields.forEach((field, index) => {
    field.addEventListener("keyup", (e) => {
        const wrapper = inputWrappers[index];
        if (wrapper) {
            wrapper.classList.remove("valid", "invalid");

            if (field.name === "password") {
                wrapper.classList.add(field.value.length > 7 ? "valid" : "invalid");
            } else if (field.name === "email") {
                wrapper.classList.add(isValidEmail(field.value) ? "valid" : "invalid");
            } else if (field.name === "fullname") {
                wrapper.classList.add(isValidFullname(field.value) ? "valid" : "invalid");
            }

            const error = wrapper.querySelector(".input-error");

            if (error) {
                error.style.display = wrapper.classList.contains("valid") ? "none" : "block";
            }
        }
    });
});

// helper functions for form validation
function isValidEmail(email) {
    const regex = /^(?:\d{8}@dut4life\.ac\.za|[a-zA-Z]+\d*@dut\.ac\.za)$/;
    return regex.test(email);
}

function isValidFullname(fullname) {
    const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(fullname);
}

// login and signup requests
const loginError = document.getElementById("login-error");
const signupError = document.getElementById("signup-error");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get form values
    const identifier = document.querySelector('[name=identifier]').value;
    const password = document.querySelector('[name=password]').value;

    // send login request
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password })
    });

    // parse response to JSON
    let data = await response.json();

    // redirect to dashboard if login is successful
    if (response.ok) {
        if (data.RoleID == 13) {
            window.location.href = "admin.html"; // admin dashboard
        }
        else if (data.RoleID == 10) {
            window.location.href = "requests.html"; // HOD dashboard
        }
        else {
            window.location.href = "dashboard.html"; // main dashboard
        }
        
        console.log("User:", data);
    }
    else {
        // show error message if login fails
        loginError.style.display = "block";
        loginError.innerText = data.error;
        console.log("Failed to fetch");
    }
});

// clear error message on focus
inputFields.forEach(field => {
    field.addEventListener('focus', () => {
        loginError.style.display = 'none';
    });
});

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector('[name=email]').value;
    const fullName = document.querySelector('[name=fullname]').value;
    const password = document.querySelector('#signup-password').value;
    const staffRole = document.querySelector('[name=staffrole]').value;

    // validation checks
    if (!isValidEmail(email) || !isValidFullname(fullName) || password.length <= 7) {
        signupError.style.display = "block";
        signupError.innerText = "Please enter valid details";
        return;
    }

    // if validation passes, proceed with the fetch request
    const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName, password, staffRole })
    });

    // parse response to JSON
    let data = await response.json();
    
    // redirect to success page if signup is successful
    if (response.ok) {
        window.location.href = "success.html";
    } else {
        // show error message if signup fails
        signupError.style.display = "block";
        signupError.innerText = data.error;
        console.log("Failed to fetch");
    }
});

// clear error message on focus
inputFields.forEach(field => {
    field.addEventListener('focus', () => {
        signupError.style.display = 'none';
    });
});
