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
    const number_of_persons =document.getElementById("check").value;
    const gender = getSelectedGender();
    document.getElementById("NameSpn").innerHTML = "";
    document.getElementById("LastNameSpn").innerHTML = "";
    document.getElementById("EmailSpn").innerHTML = "";
    document.getElementById("PhoneNumberSpn").innerHTML = "";
    

    const first_name = document.getElementById("Name").value;
    if(first_name.length < 3){
        document.getElementById("NameSpn").innerHTML = "Name must be min 3 chars";
        isValidated = false;
    }
    const last_name = document.getElementById("LastName").value;
    if(last_name.length < 3){
        document.getElementById("LastNameSpn").innerHTML = "LastName must be min 3 chars";
        isValidated = false;
    }

    const email = document.getElementById("Email").value;

    if(email.endsWith("@gmail.com")){
    } else {
        document.getElementById("EmailSpn").innerHTML = "This is not a valid Email"
        isValidated = false;
    }

    const phone_number = document.getElementById("PhoneNumber").value;
    if(phone_number.length < 10){
        document.getElementById("PhoneNumberSpn").innerHTML = "PhoneNumber must be min 10 numbers";
        isValidated = false;
    }
    const leaving_from = document.getElementById("LState").value.toString()+" "+ document.getElementById("LCity").value.toString();
    const traveling_to = document.getElementById("TState").value.toString()+" "+ document.getElementById("TCity").value.toString();
    if((!document.getElementById("Male").checked)  && (!document.getElementById("Female").checked)){
       isValidated=false;
    }
    else{
        isValidated=true;
    }
    
    if (!first_name || !last_name || !email || !phone_number || !isValidated || !number_of_persons) {
        alert("Please fill in all required fields.");
    } else {
        handleSubmit(first_name,last_name,email, number_of_persons, phone_number,gender,leaving_from,traveling_to); 
    }


}

const accessToken = localStorage.getItem('accessToken') || null;
document.addEventListener('DOMContentLoaded', function () { 
    const homeLink = document.getElementById('homeLink');
    const bookFlightLink = document.getElementById('bookFlightLink');
    const bookingsLink = document.getElementById('bookingsLink');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');

    if (accessToken!=null) {
      homeLink.style.display = 'inline-block';
      bookFlightLink.style.display = 'inline-block';
      bookingsLink.style.display = 'inline-block';
      loginLink.style.display = 'none';
      logoutLink.style.display = 'inline-block';
    } else {
      homeLink.style.display = 'inline-block';
      bookFlightLink.style.display = 'none';
      bookingsLink.style.display = 'none';
      loginLink.style.display = 'inline-block';
      logoutLink.style.display = 'none';
    }
}); 

  function logout() {
    localStorage.removeItem('accessToken');

    window.location.href = '/login.html';

  }

function handleSubmit(_Name,_LastName, _Email, _NumberOfPersons, _PhoneNumber, _Gender,leaving,travelling){
   
    var newBook = {
        first_name: _Name,
        last_name:_LastName,
        email: _Email,
        phone_number:_PhoneNumber,
        number_of_persons: _NumberOfPersons,
        leaving_from: leaving,
        traveling_to: travelling,
        gender:_Gender
    }
    var jsonString = JSON.stringify(newBook);
    console.log(jsonString);

    $.ajax({
        url: 'http://localhost:3000/api/bookings',
        method: 'POST',
        contentType: 'application/json', 
        data: jsonString, 
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },  
        success: function(data) {
          alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error:', textStatus, errorThrown);
          console.log('Response:', jqXHR.responseText);
        }
      });

    }

document.addEventListener('DOMContentLoaded', (event) => {
    const bookNowBtn = document.getElementById("submitBtn")
    if(bookNowBtn){
        bookNowBtn.addEventListener("click", validateAndSubmit)
    }
});
function renderData(data)
{
    JSON.parse(data);
}
function submitForm() {
    $.ajax({
        url: 'http://localhost:3000/api/bookings',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        success: function (data) {
            addDataToTable(data);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });
}

function addDataToTable(bookings) {
    const table = document.getElementById('reservationTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    for (let i = 0; i < bookings.length; i++) {
        const newRow = table.insertRow(table.rows.length);

        const cell0 = newRow.insertCell(0); 
        const cell1 = newRow.insertCell(1);
        const cell2 = newRow.insertCell(2);
        const cell3 = newRow.insertCell(3);
        const cell4 = newRow.insertCell(4);
        const cell5 = newRow.insertCell(5);
        const cell6 = newRow.insertCell(6);
        const cell7 = newRow.insertCell(7);
        const cell8 = newRow.insertCell(8);
        const cell9 = newRow.insertCell(9); 

        cell0.innerHTML = bookings[i].booking_id; 
        cell1.innerHTML = bookings[i].first_name;
        cell2.innerHTML = bookings[i].last_name;
        cell3.innerHTML = bookings[i].email;
        cell4.innerHTML = bookings[i].phone_number;
        cell5.innerHTML = bookings[i].number_of_persons;
        cell6.innerHTML = bookings[i].leaving_from;
        cell7.innerHTML = bookings[i].traveling_to;
        cell8.innerHTML = bookings[i].gender;
        //admin alesiogega5@epoka.edu.al Gegaalessio2003
        const userRole = localStorage.getItem('role');

        if (userRole && userRole === 'admin') {
            cell9.innerHTML = '<span class="edit-btn" onclick="editRow(this)">Edit</span> <span class="remove-btn" onclick="removeRow(this)">Remove</span>';
        }
    }
}


$(document).ready(function () {
    submitForm();
});


$(document).ready(function () {
    $('#reservationTable').on('click', '.edit-btn', function () {
        var row = $(this).closest('tr');

        row.find('td:not(:last-child)').each(function (index) {
            if (index === 0) {
                return;
            }

            var currentText = $(this).text();
            $(this).html('<input type="text" class="edit-input" value="' + currentText + '">');
        });

        $(this).text('Save').toggleClass('edit-btn save-btn');
    });

    $('#reservationTable').on('click', '.save-btn', function () {
        var row = $(this).closest('tr');
        var updateBook = {
            booking_id: row.find('td:first-child').text(),
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            number_of_persons: "",
            leaving_from: "",
            traveling_to: "",
            gender: ""
        };

        row.find('td:not(:last-child)').each(function (index) {
            if (index === 0) {
                return;
            }

            var fieldName = [
                "first_name",
                "last_name",
                "email",
                "phone_number",
                "number_of_persons",
                "leaving_from",
                "traveling_to",
                "gender"
            ][index - 1]; 

            var newValue = $(this).find('.edit-input').val();
            updateBook[fieldName] = newValue;

            $(this).html(newValue);
        });

        $(this).text('Edit').toggleClass('edit-btn save-btn');

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/api/bookings/' + updateBook.booking_id,
            contentType: 'application/json',
            data: JSON.stringify(updateBook),
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        }).done(function () {
            alert("Data Updated Successfully");
        }).fail(function () {
            alert("Error");
        })
    });
});

$(document).ready(function (){
    $('#reservationTable').on('click', '.remove-btn', function () {
        var row = $(this).closest('tr');
        var bookingId = parseInt(row.find('td:first-child').text(), 10);

        $.ajax({
            url: 'http://localhost:3000/api/bookings/' + bookingId,
            type: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            success: function(data) {
                row.remove();
                alert(data);
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
});



