const baseUrl = "https://backend.getlinked.ai";
// GET Category List
const categoriesUrl = `${baseUrl}/hackathon/categories-list`;

// POST REGISTRATION APPLICATION
const reg_api_Url = `${baseUrl}/hackathon/registration`;

const checkBoxElem = document.getElementById("acceptTerms");
const appFormElem = document.getElementById("AppForm");
const btnElem = document.getElementById("btnElem");
const popupElem = document.getElementById("successful-popup");
popupElem.style.display = "none";
appFormElem.style.display = "none";
//SCRIPTS FOR FETCHING CATEGORIES DATA

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  showCategory(data);
}
// Calling that async function
getapi(categoriesUrl);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
  appFormElem.style.display = "block";
}
// Function to define innerHTML for HTML Select Element

function showCategory(data) {
  let optionTab = `<option value="">select your category</option>`;

  //loop to access all category options
  for (let opt of data) {
    optionTab += `<option value="${opt.id}">${opt.name}</option>`;
  }

  document.getElementById("categories").innerHTML = optionTab;
}

// SCRIPTS FOR SUBMITTING APPLICATION FORM

function checkValidity() {
  console.log("clicked!");
  //validate checkbox
  if (checkBoxElem.checked) {
    checkBoxElem.value = true;
    alert("Accepted!");
    btnElem.removeAttribute("disabled");
    btnElem.focus();
  } else {
    btnElem.disabled = true;
  }
}

appFormElem.addEventListener("submit", async (event) => {
  event.preventDefault();

  // create a FormData Object
  // The FormData object stores a set of key-value pairs
  // representing form fields and their values.
  // The set of key-value pairs can be sent over the network using fetch,

  let teamInputElem = document.getElementById("teamInput");
  let phoneInputElem = document.getElementById("phoneInput");
  let emailInputElem = document.getElementById("emailInput");
  let projectInputElem = document.getElementById("projectInput");
  let catOptElem = document.getElementById("categories");
  let groupOptElem = document.getElementById("group");
  let acceptTermsElem = document.getElementById("acceptTerms");

  const data = new FormData(appFormElem);
  //   data.set("date_created", new Date().toISOString());
  //   data.set("last_updated", new Date().toISOString());
  //   data.append('variable1', variable1);

  //   "date_created": "2023-09-18T22:51:20.528019+01:00",
  //   "last_updated": "2023-09-18T22:51:20.528019+01:00",

  //   console.log(Array.from(data));

  try {
    const res = await fetch(reg_api_Url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //   body: data,
      body: `{
            "email": ${emailInputElem.value},
            "phone_number": ${phoneInputElem.value},
            "team_name": ${teamInputElem.value},
            "group_size": ${groupOptElem.value},
            "project_topic": ${projectInputElem.value},
            "category": ${catOptElem.value},
            "privacy_poclicy_accepted": ${acceptTermsElem}
        }`,
    });

    // "body": JSON.stringify(data)

    const resData = await res.json();
    popupElem.style.display = "grid";
    console.log(resData);
  } catch (err) {
    console.log(err.message);
  }
});