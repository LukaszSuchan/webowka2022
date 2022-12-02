{/* <i id="two" class="fa-solid fa-circle-check"></i> */}

const togglePassword1 = document.getElementById("toggle-password1");
const togglePassword2 = document.getElementById("toggle-password2");
const newPassword = document.getElementById("new-password")
const confirmPassword = document.getElementById("confirm-password");

togglePassword1.addEventListener("click", function() {
    const type = newPassword.getAttribute('type') == 'password' ? 'text' : 'password';
    newPassword.setAttribute('type', type);

    if(type == "text") {
        this.className = "far fa-eye-slash";
    }
    else {
        this.className = "far fa-eye";
    }
    
});
togglePassword2.addEventListener("click", function() {
    const type = confirmPassword.getAttribute('type') == 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);

    if(type == "text") {
        this.className = "far fa-eye-slash";
    }
    else {
        this.className = "far fa-eye";
    }
});

newPassword.addEventListener("input", validate)

confirmPassword.addEventListener("keydown", function(e) {
    if(e.code == "Enter") {
        confirmation();
    }
})

function containsSpecialChars(str) {
    const specialChars =
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

function containsEightChars(str) {
    const eightChars = 
    /^(?=.*\d).{8,}$/
    return eightChars.test(str);
}

function containsCapitalLetter(str) {
    const capitalLetter =
    /(?=.*[A-Z])/
    return capitalLetter.test(str);
}

function containsDigit(str) {
    const digit = 
    /\d/;
    return digit.test(str);
}

function validate() {
    console.log("ok")
    const newPassword = document.getElementById("new-password")
    const icon1 = document.getElementById("one");
    if(containsEightChars(newPassword.value)) {
        icon1.className = "fa-regular fa-circle-check"
    }
    else {
        icon1.className = "fa-regular fa-circle-xmark"
    }
    const icon2 = document.getElementById("two");
    if(containsSpecialChars(newPassword.value)) {
        icon2.className = "fa-regular fa-circle-check"
    } 
    else {
        icon2.className = "fa-regular fa-circle-xmark"
    }
    const icon3 = document.getElementById("three");
    if(containsCapitalLetter(newPassword.value)) {
        console.log("jest wielka litera")
        icon3.className ="fa-regular fa-circle-check"
    }
    else {
        icon3.className = "fa-regular fa-circle-xmark"
    }
    const icon4 = document.getElementById("four");
    if(containsDigit(newPassword.value)) {
        console.log("jest liczba") 
        icon4.className ="fa-regular fa-circle-check";  
    }
    else {
        icon4.className = "fa-regular fa-circle-xmark"
    }
}

function confirmation() {
    const newPassword = document.getElementById("new-password")
    const confirmPassword = document.getElementById("confirm-password"); 
    if(newPassword.value != confirmPassword.value) {
        alert("passwords given are incompatible");
    }
}