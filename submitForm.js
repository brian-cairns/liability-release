let submit = document.getElementById('submit')
console.log(submit)
const formName = 'releaseOfLiability'
console.log('form: ' + formName)
let newForm = {}

let caregiverName = document.querySelector('input#caregiverName')
caregiverName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
  })
  
let clientName = document.querySelector('input#clientName')
clientName.addEventListener('change', (e) => {
	newForm.clientName = e.target.value;
  console.log(newForm.clientName);
})

let caregiverSignature = document.querySelector('input#caregiverSignature')
caregiverSignature.addEventListener('change', (e) => {
	newForm.caregiverSignature = e.target.value;
  console.log(newForm.caregiverSignature);
})

let staffSignature = document.querySelector('input#staffSignature')
staffSignature.addEventListener('change', (e) => {
	newForm.staffSignature = e.target.value;
  console.log(newForm.staffSignature);
})

let date = document.querySelector('input#date')
date.addEventListener('change', (e) => {
	newForm.date = e.target.value;
  console.log(newForm.date);
})
  
document.getElementById('submit').addEventListener("click", async (event) => {
    submitForm(newForm, formName)
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}