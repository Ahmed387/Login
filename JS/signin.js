let Name = document.querySelector("#Name");
let Email = document.querySelector("#Email");
let Pass = document.querySelector("#Pass");
let required = document.querySelector("#required");
let required2 = document.querySelector("#required2");
let BTN = document.querySelector("#BTN");
//*******/
let Emailin = document.querySelector("#Emailin");
let Passin = document.querySelector("#Passin");
let incorrect = document.querySelector("#incorrect");
let BTNIIN = document.querySelector("#BTNIIN");
let Invalid = document.querySelector("#Invalid");
//**********/
let Logout = document.querySelector("#Logout");
let WUS = document.querySelector("#WUS");

// start sign up page
let Allusers = JSON.parse(localStorage.getItem("USERS")) || [];
function addsignUp() {
  let user = {
    UName: Name.value,
    UEmail: Email.value,
    UPass: Pass.value,
  };

  let userExists = Allusers.some(function (el) {
    return el.UEmail === user.UEmail;
  });

  if (userExists) {
    required2.classList.replace("d-none", "d-block");
  } else if (Allvalidation(user)) {
    Allusers.push(user);
    localStorage.setItem("USERS", JSON.stringify(Allusers));
    window.location.href = "./signin.html";
    required.classList.replace("d-block", "d-none");
    Invalid.classList.replace("d-block", "d-none");
    reset();
  } else if (
    !Allvalidation(user) &&
    user.UEmail.length > 0 &&
    user.UName.length > 0 &&
    user.UPass.length > 0
  ) {
    Invalid.classList.replace("d-none", "d-block");
  } else if (
    user.UEmail.length == "" ||
    user.UName.length == "" ||
    user.UPass.length == ""
  ) {
    required.classList.replace("d-none", "d-block");
  }
}

function reset() {
  Name.value = "";
  Email.value = "";
  Pass.value = "";
}

function Allvalidation(user) {
  return (
    ValidateName(user.UName) &&
    ValidateEmail(user.UEmail) &&
    ValidatePassword(user.UPass)
  );
}

function ValidateName(UN) {
  let Regex = /^[a-zA-Z0-9]{2,20}$/; //enter from 2digit to 15 from (A to Z ||a to z || 0 to 9)
  return Regex.test(UN);
}

function ValidateEmail(UE) {
  let Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //At least @ one time . At least one time
  return Regex.test(UE);
}

function ValidatePassword(UP) {
  //At least one lowercase char and one upeercase char and spesial char at least enter 4 digit
  let Regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,}$/;
  return Regex.test(UP);
}

// end of sign up page
// start of sign in page

var XUser;
function ADD2() {
  let newuser = {
    Emailin: Emailin.value,
    Passin: Passin.value,
  };

  let userExists2 = Allusers.some(function (ELE) {
    if (ELE.UEmail === newuser.Emailin && ELE.UPass === newuser.Passin) {
      XUser = ELE.UName;
      return ELE.UEmail === newuser.Emailin && ELE.UPass === newuser.Passin;
    }
  });

  if (userExists2) {
    localStorage.setItem("XUser", XUser);
    window.location.href = "./welcome.html";
    reset();
  } else if (newuser.Emailin.length == "" || newuser.Passin.length == "") {
    required.classList.replace("d-none", "d-block");
  } else {
    incorrect.classList.replace("d-none", "d-block");
  }
}

// end sign in

//start welcome page

document.addEventListener("DOMContentLoaded", function () {
  const userName = localStorage.getItem("XUser");
  if (userName) {
    WUS.innerHTML = `Welcome ${userName} `;
  }
});

function OUT() {
  localStorage.removeItem("XUser");
  window.location.href = "./signin.html";
}
