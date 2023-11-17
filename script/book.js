function getSelectedGender() {
    var genderRadios = document.getElementsByName('Gender');
    var selectedGender;

    for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            selectedGender = genderRadios[i].id;
            break;
        }
    }
    return selectedGender;
}

function validateAndSubmit(event){
    event.preventDefault();

    var isValidated = true;
    const NumberOfPersons =document.getElementById("check").value;
    const Gender = getSelectedGender();
    document.getElementById("NameSpn").innerHTML = "";
    document.getElementById("LastNameSpn").innerHTML = "";
    document.getElementById("EmailSpn").innerHTML = "";
    document.getElementById("PhoneNumberSpn").innerHTML = "";
    

    const Name = document.getElementById("Name").value;
    if(Name.length < 3){
        document.getElementById("NameSpn").innerHTML = "Name must be min 3 chars";
        isValidated = false;
    }
    const LastName = document.getElementById("LastName").value;
    if(LastName.length < 3){
        document.getElementById("LastNameSpn").innerHTML = "LastName must be min 3 chars";
        isValidated = false;
    }

    const Email = document.getElementById("Email").value;

    if(Email.endsWith("@gmail.com")){
    } else {
        document.getElementById("EmailSpn").innerHTML = "This is not a valid Email"
        isValidated = false;
    }

    const PhoneNumber = document.getElementById("PhoneNumber").value;
    if(PhoneNumber.length < 10){
        document.getElementById("PhoneNumberSpn").innerHTML = "PhoneNumber must be min 10 numbers";
        isValidated = false;
    }
    const leaving = document.getElementById("LState").value.toString()+" "+ document.getElementById("LCity").value.toString();
    const travelling = document.getElementById("TState").value.toString()+" "+ document.getElementById("TCity").value.toString();
    if((!document.getElementById("Male").checked)  && (!document.getElementById("Female").checked)){
       isValidated=false;
    }
    else{
        isValidated=true;
    }
    
    if (!Name || !LastName || !Email || !PhoneNumber || !isValidated || !NumberOfPersons) {
        alert("Please fill in all required fields.");
    } else {
        handleSubmit(Name,LastName,Email, NumberOfPersons, PhoneNumber,Gender,leaving,travelling); 
    }


}

function handleSubmit(_Name,_LastName, _Email, _NumberOfPersons, _PhoneNumber, _Gender,leaving,travelling){
   
    var newBook = {
        Name: _Name,
        LastName:_LastName,
        Email: _Email,
        NumberOfPersons: _NumberOfPersons,
        PhoneNumber:_PhoneNumber,
        LeavingFrom: leaving,
        TravellingTo: travelling,
        Gender:_Gender
    }

    console.log('newBook Object = ', newBook);

    var existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    existingBookings.push(newBook);

    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    alert('Your Booking is confirmed');
}



document.addEventListener('DOMContentLoaded', (event) => {
    const bookNowBtn = document.getElementById("submitBtn")
    if(bookNowBtn){
        bookNowBtn.addEventListener("click", validateAndSubmit)
    }
});
function submitForm() {

    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const table = document.getElementById('reservationTable').getElementsByTagName('tbody')[0];

    for (let i = 0; i < bookings.length; i++) {
        const newRow = table.insertRow(table.rows.length);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        const cell8 = newRow.insertCell(7);
        const cell9 = newRow.insertCell(8);

        cell1.innerHTML = bookings[i].Name;
        cell2.innerHTML = bookings[i].LastName;
        cell3.innerHTML = bookings[i].Email;
        cell4.innerHTML = bookings[i].PhoneNumber;
        cell5.innerHTML = bookings[i].NumberOfPersons;
        cell6.innerHTML = bookings[i].LeavingFrom;
        cell7.innerHTML = bookings[i].TravellingTo;
        cell8.innerHTML = bookings[i].Gender;
        cell9.innerHTML = '<span class="edit-btn" onclick="editRow(this)">Edit</span> <span class="remove-btn" onclick="removeRow(this)">Remove</span>';
    }

}
submitForm();
function editRow(editBtn) {
    const row = editBtn.closest('tr');
    const rowIndex = row.rowIndex - 1; 

    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const editedFirstName = prompt('Edit First Name:', bookings[rowIndex].Name);
    const editedLastName = prompt('Edit Last Name:', bookings[rowIndex].LastName);
    const editedEmail = prompt('Edit Email:', bookings[rowIndex].Email);
    const editedPhoneNumber = prompt('Edit Phone Number:', bookings[rowIndex].PhoneNumber);
    const editedPersons = prompt('Edit Persons:', bookings[rowIndex].NumberOfPersons);
    const editedFrom = prompt('Edit From:', bookings[rowIndex].LeavingFrom);
    const editedTo = prompt('Edit To:', bookings[rowIndex].TravellingTo);
    const editedGender = prompt('Edit Gender:', bookings[rowIndex].Gender);

    bookings[rowIndex] = {
        Name: editedFirstName,
        LastName: editedLastName,
        Email: editedEmail,
        PhoneNumber: editedPhoneNumber,
        NumberOfPersons: editedPersons,
        LeavingFrom: editedFrom,
        TravellingTo: editedTo,
        Gender: editedGender,
    };
    updateTableRow(row, bookings[rowIndex]);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

function removeRow(removeBtn) {
    const row = removeBtn.closest('tr');
    const rowIndex = row.rowIndex - 1; 

    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    bookings.splice(rowIndex, 1);

    localStorage.setItem('bookings', JSON.stringify(bookings));

    row.remove();
}

function updateTableRow(row, booking) {
    row.cells[0].innerHTML = booking.Name;
    row.cells[1].innerHTML = booking.LastName;
    row.cells[2].innerHTML = booking.Email;
    row.cells[3].innerHTML = booking.PhoneNumber;
    row.cells[4].innerHTML = booking.NumberOfPersons;
    row.cells[5].innerHTML = booking.LeavingFrom;
    row.cells[6].innerHTML = booking.TravellingTo;
    row.cells[7].innerHTML = booking.Gender;
}
