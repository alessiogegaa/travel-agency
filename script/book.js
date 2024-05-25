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

document.addEventListener('DOMContentLoaded', function () {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        window.location.href = '/login.html'; 
    }

        const currentYear = new Date().getFullYear();
      
        document.getElementById('currentYear').textContent = currentYear;

});
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

var accessToken = localStorage.getItem('accessToken');
var id = localStorage.getItem('id');
var role = localStorage.getItem('role');

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
        gender:_Gender,
        user_id: id
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
        data: {user_id: id, role: role},
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

        newRow.className = 'bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600';

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        const cell8 = newRow.insertCell(7);
        const cell9 = newRow.insertCell(8);

        cell1.className = 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white';
        cell2.className = 'px-6 py-4';
        cell3.className = 'px-6 py-4';
        cell4.className = 'px-6 py-4';
        cell5.className = 'px-6 py-4';
        cell6.className = 'px-6 py-4';
        cell7.className = 'px-6 py-4';
        cell8.className = 'px-6 py-4';

        cell1.innerHTML = bookings[i].booking_id; 
        cell2.innerHTML = bookings[i].first_name;
        cell3.innerHTML = bookings[i].last_name;
        cell4.innerHTML = bookings[i].email;
        cell5.innerHTML = bookings[i].phone_number;
        cell6.innerHTML = bookings[i].number_of_persons;
        cell7.innerHTML = bookings[i].leaving_from;
        cell8.innerHTML = bookings[i].traveling_to;
        cell9.innerHTML = bookings[i].gender;

        const userRole = localStorage.getItem('role');

        if (userRole && userRole === 'admin') {
            const cell10 = newRow.insertCell(9);
            cell10.innerHTML = '<span class="edit-btn" onclick="editRow(this)">Edit</span> <span class="remove-btn" onclick="removeRow(this)">Remove</span>';
            cell10.className = 'px-6 py-4';
        }
    }
}
$(document).ready(function() {
    let timeoutId;

    function delayedSearch() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(searchBookings, 2000); 
    }

    function searchBookings() {
        const filter = $('#table-search').val().toUpperCase();
        const rows = $('#reservationTable').find('tr');

        rows.each(function(index, row) {
            if (index > 0) { 
                const cells = $(row).find('td');
                let found = false;

                if (filter === '') {
                    $(row).show(); 
                } else {
                    cells.each(function(index, cell) {
                        const txtValue = $(cell).text().toUpperCase();
                        if (txtValue.indexOf(filter) > -1) {
                            found = true;
                            return false; 
                        }
                    });

                    if (found) {
                        $(row).show();
                    } else {
                        $(row).hide();
                    }
                }
            }
        });
    }

    $('#table-search').on('input', delayedSearch);
});


 
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


