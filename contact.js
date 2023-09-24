//CONTACT FORM SCRIPTS

const baseUrl = "https://backend.getlinked.ai";

// POST CONTACT FORM
const contactApiUrl = `${baseUrl}/hackathon/contact-form`;

const formElem = document.getElementById("contactForm");
// Add a submit event listener, to listen to when the form is being submitted
formElem.addEventListener("submit", async (event) => {
  //event.preventDefault() method is to prevent the browser from refreshing the page.
  event.preventDefault();

//   let phoneNoElem = document.getElementById("phoneNumber");
  let firstNameElem = document.getElementById("firstName");
  let emailElem = document.getElementById("email");
  let messageBoxElem = document.getElementById("messageBox");

  if (
    // phoneNoElem.value == "" ||
    firstNameElem.value == "" ||
    emailElem.value == "" ||
    messageBoxElem.value == ""
  ) {
    alert("Ensure you input a value in all fields!");
  } else {
    // perform operation with form input
    alert("This form has been successfully submitted!");
    console.log(
      `This form has the following details: ${firstNameElem.value}, 
      ${emailElem.value}, ${messageBoxElem.value}`
    );

    firstNameElem.value = "";
    emailElem.value = "";
    messageBoxElem.value = "";
  }

  try {
    const res = await fetch(contactApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //   body: data,
      body: `{
            "email": ${emailElem.value},
            "first_name": ${firstNameElem.value},
            "message": ${messageBoxElem}
        }`,
    });

    const resData = await res.json();

    console.log(resData);
  } catch (err) {
    console.log(err.message);
  }
});