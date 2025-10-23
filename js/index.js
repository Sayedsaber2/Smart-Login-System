let signUpName = document.getElementById("signupName");
let signUpEmail = document.getElementById("signupEmail");
let signUpPassword = document.getElementById("signuppassword");

let signInEmail = document.getElementById("signinEmail");
let signInPassword = document.getElementById("signinpassword");

let signUpArray = [];
if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
  let signupobj = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };
  if (empty() == false) {
    document.getElementById(
      "exit"
    ).innerHTML = `<span class="text-danger m-3">All inputs is required</span>`;
    return;
  }
  if (isEmailExist() == true) {
    document.getElementById(
      "exit"
    ).innerHTML = `<span class="text-danger m-3">emil already exists</span>`;
    return;
  }
  signUpArray.push(signupobj);
  localStorage.setItem("users", JSON.stringify(signUpArray));

  document.getElementById(
    "exit"
  ).innerHTML = `<span class="text-success m-3">Success</span>`;
}

function empty() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmailExist() {
  for (let i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function logEmpty() {
  if (signInEmail.value == "" || signInPassword.value == "") {
    return false;
  } else {
    return true;
  }
}
function login() {
  if (logEmpty() == false) {
    document.getElementById(
      "incorrect"
    ).innerHTML = `<span class="text-danger m-3">All inputs is required</span>`;
    return;
  }
  let found = false;
  for (let i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == signInEmail.value.toLowerCase() &&
      signUpArray[i].password == signInPassword.value
    ) {
      localStorage.setItem("log", signUpArray[i].name);
      window.location.href = "welcome.html";
    //   let userName=localStorage.getItem("log")
    //   document.getElementById('welcomeUser').innerHTML=`Welcome ${userName}`
      found = true;
      break;
    }
  }
  if (found == false) {
    document.getElementById(
      "incorrect"
    ).innerHTML = `<span class="text-danger m-3">incorrect email or password</span>`;
  }
}
window.addEventListener("DOMContentLoaded", () => {
    let userName = localStorage.getItem("log");
  let welcomeUser = document.getElementById("welcomeUser");

  if (welcomeUser) {
    if (userName) {
      welcomeUser.innerHTML = `Welcome ${userName} `;
    } else {
     
      window.location.href = "index.html";
    }
  }
});
function logout(){
    localStorage.removeItem('log')
    window.location.href = "index.html"
}