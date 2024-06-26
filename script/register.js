$(document).ready(function () {
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        const email = $('#emailInput').val();
        const password = $('#passwordInput').val();
        const confirmPassword = $('#confirmPasswordInput').val();

        if (!email || !password || password !== confirmPassword) {
            alert('Please fill in all fields and make sure passwords match.');
            return;
        }

        $.ajax({
            url: 'http://localhost:3000/api/user/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                password: password,
                role: 'user', 
            }),
            success: function () {
                alert("User Registered Successufully");
            },
            error: function (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });
});
var accessToken = localStorage.getItem('accessToken') ;
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

  document.addEventListener('DOMContentLoaded', function () {
    const passwordToggleIcons = document.querySelectorAll('.input-icon');
    const passwordInputs = document.querySelectorAll('.password-input');

    passwordToggleIcons.forEach((icon, index) => {
        icon.addEventListener('click', function () {
            passwordInputs[index].type = passwordInputs[index].type === 'password' ? 'text' : 'password';
            icon.src = passwordInputs[index].type === 'password' ? '../assets/password-hide.png' : '../assets/password-icon.png';
        });
    });
});