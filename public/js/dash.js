
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

document.getElementById('division-selector').addEventListener('change', function () {
    let selection = this.value;
    if(selection != "Pick a division..."){
        save.style.display = "initial";
        cancel.style.display = "initial";
        divisionForm.style.display = "flex";
    }else{
        save.style.display = "none";
        cancel.style.display = "none";
        divisionForm.style.display = "none"
    }
});

document.getElementById('PAI-form').onreset = () => {
    clearErrors();
    document.getElementById("division-selector").value = "none";
}