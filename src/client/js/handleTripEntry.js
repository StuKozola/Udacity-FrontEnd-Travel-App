const handleTripEntry = event => {
    event.preventDefault();
    resetModal();
    
    // ***** Show the Modal to select Hotel ***** //
    const modal = document.getElementById("save-modal");
    const addbtn = document.getElementById("addBtn");
    const cancelbtn = document.getElementById("cancelBtn");
    const savebtn = document.getElementById("saveBtn");
    const closebtn = document.getElementsByClassName("close")[0];

    // Fill in the modal with the trip data
    document.getElementById("modal-city").innerHTML = document.getElementById("location").value;
    document.getElementById("departure").innerHTML = document.getElementById("start_date").value;
    document.getElementById("return").innerHTML = document.getElementById("return_date").value;
    modal.style.display = "block";

    // When the user clicks on the close span element or cancel button, close the modal
    closebtn.onclick = function () {
        modal.style.display = "none";
    }
    cancelbtn.onclick = function () {
        modal.style.display = "none";
    }

    // When user clicks outside of modal, close the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// function to validate the form data
function validateForm() {
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("return_date").value;

    if (location == "") {
        alert("Please enter a location");
        return false;
    }
    if (startDate == "") {
        alert("Please enter a start date");
        return false;
    }
    if (endDate == "") {
        alert("Please enter an return date");
        return false;
    }

    return true;
}

// function to reset modal data
function resetModal() {
    document.getElementById("modal-city").innerHTML = "";
    document.getElementById("departure").innerHTML = "";
    document.getElementById("return").innerHTML = "";
    document.getElementById("hotel").innerHTML = '<option value="none">None</option>';
}

export { handleTripEntry, validateForm, resetModal }