let form = document.getElementById('summary-edit-form')
let buttons = document.getElementsByClassName('buttons')

clearInputs();

table = new DataTable('#loc-table');
table.on('click', 'tbody tr', function () {
    document.getElementById('please-select-program').style.display="none";
    let data = table.row(this).data();
    console.log(data)
    
    document.getElementById('division-summary').value = data[0]
    document.getElementById('program-summary').value = data[1]
    document.getElementById('payee-summary').value = data[6]
    document.getElementById('paid-summary').value = data[7]
    document.getElementById('report-summary').value = data[8]
    document.getElementById('notes-summary').value = data[9]

    for(let i = 0; i < buttons.length; i++){
        buttons[i].style.display= "initial";
    }
})

function clearInputs(){
    let inputs = document.getElementsByTagName("input")
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value= null;
    }
}

document.getElementById('summary-edit-form').onsubmit = () => {
    let isValid = true;

    let program = document.getElementById('program-summary').value;
    if(!program){
        isValid = false;
        document.getElementById('err-program').style.display="initial"
    }
    return isValid;
}
document.getElementById('summary-edit-form').onreset = () => {
    clearInputs();
    document.getElementById('please-select-program').style.display="initial";
    document.getElementById('err-program').style.display="none"
}
document.getElementById('program-summary').addEventListener('change', () =>{
    document.getElementById('err-program').style.display="none"
})
