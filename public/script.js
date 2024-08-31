// static DOM
const strings = {
    heroText: "A comprehensive tool for safeguarding and managing the assets of the Information Systems Department. The system ensures the security and efficient tracking of both staff members and assets, minimizing the risk of theft and loss.",
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

// show and close forms
const closeForm = document.getElementById("close-form");
const openForm = document.querySelectorAll(".auth-btn");
const formsContainer = document.getElementById("forms");
let showSignup = false;

// open, toggle and close forms
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

function submitButtonState() {
    let allValid = true;

    inputFields.forEach(field => {
        if (field.parentNode === signupForm) {
            if (!field.classList.contains("valid")) {
                allValid = false;
            }
        }
    });

    signupButton.disabled = !allValid;
}


inputFields.forEach((field, index) => {
    field.addEventListener("keyup", (e) => {
        console.log("Change detected");
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

        submitButtonState();
    });
});

function isValidEmail(email) {
    const regex = /^(?:\d{8}@dut4life\.ac\.za|[a-zA-Z]+\d*@dut\.ac\.za)$/;
    return regex.test(email);
}

function isValidFullname(fullname) {
    const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(fullname);
}


loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const identifier = document.querySelector('[name=identifier]').value;
    const password = document.querySelector('[name=password]').value;
    const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password })
    });

    let data = await response.json();

    if (response.ok) {
        console.log("User:", data);
    }
    else {
        console.log("Failed to fetch");
    }
})

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector('[name=email]').value;
    const fullName = document.querySelector('[name=fullname]').value;
    const password = document.querySelector('[name=password]').value;
    const department = document.querySelector('[name=department]').value;
    const staffRole = document.querySelector('[name=staffrole]').value;

    const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName, password, staffRole, department })
    });

    let data = await response.json();

    if (response.ok) {
        console.log("User:", data);
    }
    else {
        console.log("Failed to fetch");
    }
})