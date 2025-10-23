
//Ryan - Functions should be here
async function fetchDivisionData(division){

    const response = await fetch(`/division-data?division=${division}`);

    const divisionData = await response.json();
    return divisionData;
}

//Ryan - page elements should be here
let divisionInput = document.getElementById('division-name');
let deanInput = document.getElementById('dean');
let penContactInput = document.getElementById('PEN-contact');
let locRepInput = document.getElementById('LOC-rep');
let chairInput = document.getElementById('chair');


document.getElementById('PAI-form').onsubmit = () => {

    clearErrors();

    let isValid = true;

    let divisionName = document.getElementById('divison-name').value.trim();
    if (!divisionName) {
        document.getElementById("err-divison-name").style.display = "block";
        isValid = false;
    }

    let dean = document.getElementById('dean').value.trim();
    if (!dean) {
        document.getElementById("err-dean").style.display = "block";
        isValid = false;
    }

    let PENContact = document.getElementById('PEN-contact').value.trim();
    if (!PENContact) {
        document.getElementById("err-PEN-contact").style.display = "block";
        isValid = false;
    }

    let LOCRep = document.getElementById('LOC-rep').value.trim();
    if (!LOCRep) {
        document.getElementById("err-LOC-rep").style.display = "block";
        isValid = false;
    }

    let chair = document.getElementById('chair').value.trim();
    if (!chair) {
        document.getElementById("err-chair").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}

let cancel = document.getElementById('cancel-button');
let save = document.getElementById('save-button');
let divisionForm = document.getElementById('toggle-display-form');
let divisionData = null;
document.getElementById('division-selector').addEventListener('change', async function() {
    let selection = this.value;
    if(selection !== "none"){
        save.style.display = "initial";
        cancel.style.display = "initial";
        divisionForm.style.display = "flex";
    }else{
        save.style.display = "none";
        cancel.style.display = "none";
        divisionForm.style.display = "none";
    }

    divisionData = await fetchDivisionData(selection);
    let firstRecentData = divisionData[0];
    console.log(firstRecentData);
    //putting the most recent submitted data in the input fields
    divisionInput.value = firstRecentData.Division ?? '';
    deanInput.value = firstRecentData.Dean ?? '';
    penContactInput.value = firstRecentData['PEN Contact'] ?? '';
    locRepInput.value = firstRecentData['LOC Rep'] ?? '';
    
});



document.getElementById('PAI-form').onreset = () => {
    clearErrors();
    document.getElementById("division-selector").value = "none";
}
