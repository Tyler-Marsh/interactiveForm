// interactive form script
// make input cursor on first field on load
document.getElementById('name').focus();




// hook the title select menu otherField
document.getElementById("otherField").remove();

const selectMenu = document.getElementById('title');
// change it all bc it has to work without javascript :D
// add an event listener to note when "other" is selected
// leave the code I liked in here that create and removes the elements
let boolOther = false;


// make an event listener that checks whether the 
// other option is selected && if the other box is there
// this avoid populating the form with many "other role jobs"
selectMenu.addEventListener("change", (e) => {
  if (e.target.value === "other" && boolOther === false) {
    insertOtherInput(addOtherField());
    boolOther = true;
  }
  // if it is currently there and you select
  // a different field delete the element
  // then take the opposite of boolOther
  else if (boolOther && e.target.value !== "other") {
    document.getElementById("otherField").remove();
    boolOther = !boolOther;
  }
});

// create addOtherField() function

function addOtherField() {

  // create a label for the field
  
  const otherField = document.createElement('label');
  otherField.textContent = "Your job role: ";
  otherField.for = "otherInput";
  // make the for and id match

  // create the input field
  const otherInput = document.createElement('input');
  otherInput.id = "otherInput";
  otherInput.name = "other_job";
  
  // make a container to easily insert otherField
  // and otherInput name into
  const container = document.createElement('div');

  // appendChild the otherfield and input into the container
  container.appendChild(otherField);
  container.appendChild(otherInput);
  // give the container an id so it is easily targeted with the above event listener
  container.id = "otherField"
  return container
}

// create a function that wll insert result of addOtherField()
// into the DOM where it should go.
function insertOtherInput(ele) {
  const fieldset1 = document.querySelector('fieldset');
  fieldset1.appendChild(ele)
}






/*                              HANDLE T-SHIRT COLOR ISSUES                             */





// disable the t-shirt color select menu.
// attach it to a variable first
const colors = document.getElementById("color");

// create an option of "Please select a t-shirt design"
const pleaseSelect = document.createElement("option");
pleaseSelect.text = "Please select a T-shirt theme";


// add it to the top of the list
colors.add(pleaseSelect, 0);
colors.selectedIndex = 0;

// create a function to toggle colors.disabled


function disableColors() {
  colors.disabled = ! colors.disabled;
}
// toggle the colors section because a t-shirt is not selected at first.

disableColors();

// add an event listener to the theme selection so that 
// when a theme is selected the colors are enabled and 
// the first element is deleted

// associate the theme option with a var

let theme = document.getElementById('design');

theme.addEventListener("change", (e) => {
  if (colors.disabled) {

    disableColors();
    colors[0].remove();
  }
  // init regular expressions to filter with
  const puns = /Puns/
  // if the value of the theme is js puns
  if (e.target.value === "js puns") {
    // loop through all the select options
    for (let i = 0; i < colors.options.length; i++) {
      // if the option contains the string Puns
        if (puns.test(colors[i].textContent)) {
          colors[i].className = "";
          // keep the class name blank
        }
      else {
        // if shirt doesn't contain /Puns/
        // change the class to is-hidden because users should not be ordering
        // a shirt that is not within the Puns theme/design
        colors[i].className = "is-hidden";
      }
      if (i === 5) {
        // change the shown selection to a JS shirt not JS puns
        colors.selectedIndex = 0;
      }
    }
  }
      


  else {
    // if the logic does NOT contain Puns
    // it must be a js Theme shirt so regex for that
    // for exercise use regex to search for missing string
    const noPuns = /^((?!Puns).)*$/
      for (let i = 0; i < colors.options.length; i++) {
        // loop through if passes regex
        if (noPuns.test(colors[i].textContent)) {
          // if it passes we need to set the classname to blank
          // especially if somone changes their mind
          colors[i].className = "";
        }
        else {
          // then set the to other shirt options to hidden
          colors[i].className = "is-hidden";
        }
        if (i === 5) {
          // change the index to the first JS theme shirt
          // so users know that is an appropriate selection
          colors.selectedIndex = 3;
        }
      }
  }
});







/*                        SCHEDULING && PAYMENT CALCULATION + DISPLAY         */


// only two pairs of events class. soo add an event listener to make sure
// a user cannot sign up for both

// pair #1 frameworks and express
// pair #2 node and javascript libraries

// Total cost of selected activities display this cost of activities
// make global variables to hook all checkboxes
activities = document.querySelectorAll(".activities input");
const schedule = document.querySelector(".activities");

schedule.addEventListener("click", (e) => {
  if(e.target.tagName === "INPUT") {
    checkSchedule(e.target);
    // call a function to disable other checkboxes or enable them
    // if they occur at the same time
    // call the functions to calculate the total price
    // another function to append it to the DOM if it isn't there
    appendPrice(calcTotal(activities));
  }
});



// make a function to tally the cost of selected activities
// goes through all checkboxes so unchecking updates total.
function calcTotal(activityList) {
  let total = 0;
  for (let i = 0; i < activityList.length; i++) {
    if (activityList[i].checked) {
      total += parseInt(activityList[i].dataset.cost);
    }
  }
  return total
}

// create a function to append the price underneath the activities

function appendPrice(total) {
  if (document.getElementById("appendPrice")) {
    document.getElementById("appendPrice").textContent = "Total cost of selected activities: $" +  total;
  }
  else {
  const price = document.createElement('legend');
  price.textContent = "Total cost of selected activities: $" +  total;
  price.id = "appendPrice"
  schedule.appendChild(price);
  }
}

// make a function to make sure the date and time don't clash

function checkSchedule(event) {
  let eventName = event.name
  // iterate through the activities
  for (let i = 0; i < activities.length; i++) {
    // skip clicked item
    if (activities[i].name != eventName) {
      //check dataset dayAndTime for conflict
      if (activities[i].dataset.dayAndTime === event.dataset.dayAndTime) {
        // prevent time conflicts
        activities[i].disabled = ! activities[i].disabled;
      }
    }
  }
  console.log(event.dataset.dayAndTime, eventName)

}






/*                                     HIDE PAYMENT OPTIONS                            */





// make variables for the payment sections

const paypal  = document.getElementById('paypal');

const bitcoin = document.getElementById('bitcoin');

const creditCard = document.getElementById('credit-card');

// initialize the display to block for validation purposes
creditCard.style.display = "block";

// initially hide the bitcoin and paypal options
bitcoin.style.display = "none";
paypal.style.display = "none";


// add an event listener to payment select <option>

const payment = document.getElementById('payment');

payment.addEventListener('change', (event) => {
  if (event.target.value === "credit card" || event.target.value === "select method") {
    paypal.style.display = "none";
    bitcoin.style.display = "none"
    creditCard.style.display = "block";
  }
  else if (event.target.value === "paypal") {
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
    paypal.style.display = "block";
  }
  else {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "block";
  }
});



// make the window refresh after submitting


const submitButton = document.querySelector('button');

submitButton.addEventListener('click', (e) => {
  // prevent the form submission
  e.preventDefault();
  if (creditCard.style.display === "block") {
    
      if (fieldsValidate()) {

    
    // just reload the page like specifications say
    window.location.reload();
    }
    else {
      warningValidate();
    }
  }
    else {
      if (validateEmail(mailInput.value) &&validateName(nameInput.value)) {
        window.location.reload();
      }
      else {
        createRedBorder(validateEmail, mailInput);
        createRedBorder(validateName, nameInput);
      }
    }
});


// make function fieldsValidate()

function fieldsValidate() {


  if (validateEmail(mailInput.value) && validateName(nameInput.value)
  && validateCVV(cvvInput.value)
  && validateCreditNum(creditCardInput.value)
  && validateZip(zipInput.value)
  && validateActivities(activities)) {
    return true
  }
  return false
}

// make function warningValidate();
function warningValidate() {
  // call function to test each input and make border red
  // a visual cue to make sure customers fill in the field.
  createRedBorder(validateCVV, cvvInput);
  createRedBorder(validateCreditNum, creditCardInput);
  createRedBorder(validateEmail, mailInput);
  createRedBorder(validateName, nameInput);
  createRedBorder(validateZip, zipInput);
  scheduleRedBorder(validateActivities, activities, schedule)
 

}
// function to create red border
// if they don't pass validation test.

// create a function to validate the schedule
function scheduleRedBorder(callback, list, element) {
  if (! callback(list)) {
    element.style.border = "3px solid red";
  }
}

function createRedBorder(callback, input) {
  if (! callback(input.value)) {
    input.style.border = "3px solid red";
  }
}




/*                                    VALIDATE FIELDS                            */

// I pulled this off of stack overflow as a VERY lenient way to check emails
// it makes anything but whitespace then @ . anything but whitespace
function validateEmail (email) {
  return /\S+@\S+\.\S+/.test(email)
}

// make sure name isn't blank
function validateName (name) {
  return /\S+/.test(name)
}
// to validate check all the fields.
//
function validateCreditNum (creditNum) {
  return /^[0-9]{13,16}$/.test(creditNum)
}


function validateZip (zip) {
  return /^[0-9]{5}$/.test(zip)
}


function validateCVV (cvv) {
  return /^[0-9]{3}$/.test(cvv)
}


// add event listeners to all the fields that need validated
// first hook them

const creditCardInput = document.getElementById("cc-num");

const cvvInput = document.getElementById("cvv")

const nameInput = document.getElementById("name")

const mailInput = document.getElementById("mail")

const zipInput = document.getElementById("zip")

// if the border is red due to form validation 
// check on every keyup to see it it is now valid to let
// the user know they did good

function addValidationEvent(theInput, theFunction) {
  theInput.addEventListener("keyup", () => {
    if (theInput.style.border === "3px solid red" 
    && theFunction(theInput.value)) {
      theInput.style.border = "";
    }
  });
}

addValidationEvent(zipInput, validateZip);

addValidationEvent(mailInput, validateEmail);

addValidationEvent(cvvInput, validateCVV);

addValidationEvent(creditCardInput, validateCreditNum);

addValidationEvent(nameInput, validateName);


// make a function to validate the activies


function validateActivities(activitiesList) {
  for (let i = 0; i < activitiesList.length; i++) {
    if (activitiesList[i].checked) {
      return true
    }
  }
  return false
}

// add an event listener so when something is checked the red border
// goes away

schedule.addEventListener("change", (e) => {
  if (e.target.checked) {
    schedule.style.border = "";
  }
});