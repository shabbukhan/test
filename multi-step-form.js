//Global variables
const myform = document.getElementById("myForm");

const genderContainer = document.getElementById("gender");
const gender = document.getElementsByName("gender");
const generr = document.getElementById("error-msg-gender");
const experience = document.getElementById("experience");
const experr = document.getElementById("error-msg-exp");
const skillContainer = document.getElementById("skillSet");
const skillSet = document.querySelectorAll('input[name="skill"]');
const skillerr = document.getElementById("error-msg-skill");
const success = document.getElementById("success");
const preButton = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const subBtn = document.getElementById("subBtn");

//multi step
// var x = document.getElementsByClassName("tab");
// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

const ALPHANUMERIC_REGEX = /^[a-zA-Z ]+$/;

function showTab(n) {
  x[n].className = "tab show"; // display 1st tab

  if (n == 0) {
    //console.log(n)
    preButton.className = "hide";
    subBtn.className = "hide";
  } else {
    preButton.className = "show";
  }

  if (n == x.length - 1) {
    preButton.className = "show";
    nextBtn.className = "hide";
    subBtn.className = "show";
  } else {
    nextBtn.className = "show";
    subBtn.className = "hide";
  }
}

function nextPrev(n) {
  //console.log('n ' + n);
  //console.log('currentTab ' + currentTab);

  if (currentTab == 0 && validateSectionOne()) {
    x[currentTab].className = "tab hide";
    currentTab = currentTab + n;
  }

  if (currentTab == 1 && step2()) {
    x[currentTab].className = "tab hide";
    currentTab = currentTab + n;
  }

  if (currentTab == 2 && submit()) {
    preButton.className = "hide";
    currentTab = currentTab + n;
  }
  if (n == -1) {
    x[currentTab].className = "tab hide";
    currentTab = currentTab + n;
  }

  showTab(currentTab);
}

//form step validation

function step2() {
  if (validateGender() && validateExperience()) {
    return true;
  }
}

function submit() {
  if (validateSkill()) {
    success.innerHTML = "form has been successfully submitted!";
    myform.reset();
    console.log("submitted");
    return true;
  }
}
// ends
/*
function validatePassword() {
  // Empty check
  if (checkIfEmpty(passerr, password)) return false;
  // Must of in certain length
  if (!meetLength(passerr, password, 4, 100)) return false;

  return true;
}*/
/*
confirmPassword.addEventListener("focusout", validateConfirmPassword);
function validateConfirmPassword() {
  if (password == "") {
    setInvalid(passerr, `${confirmPassword.name} Password must be valid`);
    return false;
  }
  // If they match
  if (password.value !== confirmPassword.value) {
    setInvalid(conpasserr, `${confirmPassword.name} Password must match`);
    return false;
  } else {
    setValid(conpasserr);
  }
  return true;
}
*/
/*
genderContainer.addEventListener("focusout", validateGender);
function validateGender() {
  if (radioCheck(gender)) return true;
  return false;
}

experience.addEventListener("focusout", validateExperience);
function validateExperience() {
  if (experience.value == 0) {
    setInvalid(experr, `${experience.name} must be selected`);
    return false;
  } else {
    setValid(experr);
    return true;
  }
}
*/

// ends

//radio or checkbox
function checkItem(checkGruoup) {
  return Array.prototype.slice.call(checkGruoup).filter(item => item.checked);
}

skillContainer.addEventListener("focusout", validateSkill);
function validateSkill() {
  var checkedTwo = checkItem(skillSet);
  //console.log(checkedTwo)
  if (checkedTwo.length < 2) {
    setInvalid(skillerr, `${skillContainer.id} must be selected atleast 2`);
    return false;
  } else {
    setValid(skillerr);
    return true;
  }
}

// Utility functions
function checkIfEmpty(errmsg, field) {
  if (isEmpty(field.value.trim())) {
    setInvalid(errmsg, `${field.name} must not be empty`);
    return false;
  } else {
    setValid(errmsg);
    return true;
  }
}

function radioCheck(field) {
  if (isRadioChecked(field)) {
    setValid(generr);
    return true;
  } else {
    setInvalid(generr, `${field[0].name} must be checked`);
    return false;
  }
}

function isRadioChecked(field) {
  checkOne = checkItem(field);
  if (checkOne.length > 0) return true;
  return false;
}

function isEmpty(value) {
  if (value === "") return true;
  return false;
}

function setInvalid(errmsg, message) {
  errmsg.className = "show-error";
  errmsg.innerHTML = message;
}

function setValid(errmsg) {
  errmsg.className = "hide-error";
}

function checkIfOnlyLetters(errmsg, field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(errmsg);
    return true;
  } else {
    setInvalid(errmsg, `${field.name} must contain only letters`);
    return false;
  }
}

function meetLength(errmsg, field, minLength, maxLength) {
  if (field.value.length >= minLength && field.value.length < maxLength) {
    setValid(errmsg);
    return true;
  } else if (field.value.length < minLength) {
    setInvalid(
      errmsg,
      `${field.name} must be at least ${minLength} characters long`
    );
    return false;
  } else {
    setInvalid(
      errmsg,
      `${field.name} must be shorter than ${maxLength} characters`
    );
    return false;
  }
}

document.addEventListener("DOMContentLoaded", e => {
  {
    /* event bindings of tab one */
    // section one button click
    const validateUser = e => {
      const username = document.forms.userForm.username.value;
      const usererr = document.getElementById("error-msg-user");

      if (!username) {
        setInvalid(usererr, "User name must not be empty");
        return false;
      } else if (!ALPHANUMERIC_REGEX.test(username)) {
        setInvalid(usererr, "User name must contains only letters");
        return false;
      } else {
        setInvalid(usererr, "");
        return true;
      }
    };

    const validatePasswords = (fldVal, errFld, fldLabel, compFldVal) => {
      if (!fldVal) {
        setInvalid(errFld, `${fldLabel} must not be empty`);
        return false;
      } else if (password.length < 4 || password.length > 10) {
        setInvalid(errFld, `${fldLabel} should be 4 to 10 characters long`);
        return false;
      } else if (fldVal !== compFldVal) {
        setInvalid(errFld, `Password and Confirm password should match`);
        return false;
      } else {
        setInvalid(errFld, "");
        return true;
      }
    };

    const validatePassword = e => {
      const password = document.forms.userForm.password.value;
      const passerr = document.getElementById("error-msg-pass");
      const confirmPassword = document.forms.userForm.confirmpassword.value;

      return validatePasswords(password, passerr, "Password", confirmPassword);
    };

    const validateConfirmPassword = e => {
      const confirmPassword = document.forms.userForm.confirmpassword.value;
      const passerr = document.getElementById("error-msg-conpass");
      const password = document.forms.userForm.password.value;

      return validatePasswords(
        confirmPassword,
        passerr,
        "Confirm password",
        password
      );
    };

    const validateSectionOne = () => {
      if (validateUser()) {
        if (validatePassword()) {
          if (validateConfirmPassword()) {
            document.getElementById("sectionOne").classList.add("hide");
            document.getElementById("sectionTwo").classList.remove("hide");
          }
        }
      }
    };

    document
      .getElementById("sectionOneBtn")
      .addEventListener("click", validateSectionOne);
    // validate username
    document
      .getElementById("username")
      .addEventListener("focusout", validateUser);
    // validate password
    document
      .getElementById("password")
      .addEventListener("focusout", validatePassword);
    // validate confirm password
    document
      .getElementById("confirmpassword")
      .addEventListener("focusout", validateConfirmPassword);
  }

  {
    /* event binding of section two */
    const gotoSectionOne = e => {
      document.getElementById("sectionTwo").classList.add("hide");
      document.getElementById("sectionOne").classList.remove("hide");
    };

    const validateSectionTwo = e => {
      if (validateGender()) {
        if (validateExperience()) {
          // goto section two
        }
      }
    };
    // go to section one
    document
      .getElementById("sectionTwoPreBtn")
      .addEventListener("click", gotoSectionOne);
    // next button binding
    document
      .getElementById("sectionTwoBtn")
      .addEventListener("click", validateSectionTwo);
  }
});
