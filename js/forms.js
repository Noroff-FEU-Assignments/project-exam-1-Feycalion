let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isSubjectValid = false;
let isMessageValid = false;

const firstName = document.querySelector("#firstName");
firstName.onblur = () => validateOnBlurFirstName(firstName.value);
const lastName = document.querySelector("#lastName");
lastName.onblur = () => validateOnBlurLastName(lastName.value);
const email = document.querySelector("#email");
email.onblur = () => validateOnBlurEmail(email.value);
const subject = document.querySelector("#subject");
subject.onblur = () => validateOnBlurSubject(subject.value);
const message = document.querySelector("#message");
message.onblur = () => validateOnBlurMessage(message.value);

function clearInputValues() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
}

function resetElementInnerText(element) {
  element.innerText = "";
}

function validateOnBlurFirstName(value) {
  let element = document.getElementById("firstNameError");
  if (value.length > 0 && value.length < 5) {
    element.innerText = "First name must be more than 5 characters.";
    isFirstNameValid = false;
  } else if (value.length > 0 && value.length > 5) {
    resetElementInnerText(element);
    isFirstNameValid = true;
  }
}

function validateOnBlurLastName(value) {
  let element = document.getElementById("firstNameError");
  if (value.length > 0 && value.length < 5) {
    element.innerText = "Last name must be more than 5 characters.";
    isLastNameValid = false;
  } else if (value.length > 0 && value.length > 5) {
    resetElementInnerText(element);
    isLastNameValid = true;
  }
}

function validateOnBlurEmail(value) {
  let element = document.getElementById("emailError");

  if (value.length > 0) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      element.innerText = "Enter a valid email address.";
      isEmailValid = false;
    } else {
      resetElementInnerText(element);
      isEmailValid = true;
    }
  } else {
    resetElementInnerText(element);
    isEmailValid = false;
  }
}

function validateOnBlurSubject(value) {
  let element = document.getElementById("subjectError");
  if (value.length > 0 && value.length < 15) {
    element.innerText = "Subject must be more than 15 characters.";
    isSubjectValid = false;
  } else if (value.length > 0 && value.length > 15) {
    resetElementInnerText(element);
    isSubjectValid = true;
  }
}

function validateOnBlurMessage(value) {
  let element = document.getElementById("messageError");
  if (value.length > 0 && value.length < 25) {
    element.innerText = "Message must be more than 25 characters.";
    isMessageValid = false;
  } else if (value.length > 0 && value.length > 25) {
    resetElementInnerText(element);
    isMessageValid = true;
  }
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isSubjectValid ||
      !isMessageValid
    ) {
      return;
    }

    clearInputValues();

    alert("Message sent!");
  });
