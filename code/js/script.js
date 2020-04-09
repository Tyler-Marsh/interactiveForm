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