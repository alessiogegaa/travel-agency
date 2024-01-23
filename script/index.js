function scrollToPrices() {
    const pricesSection = document.getElementById("prices");
    pricesSection.scrollIntoView({
        behavior: "smooth"
    });
}
function scrollToDestination(){
        const dest = document.getElementById("destination");
        dest.scrollIntoView({
            behavior:'smooth'
        });
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
    function moveToBook()
    {
        if(accessToken!=null)
        {
        window.location.href = 'book.html';
        }
        else{
            window.location.href = 'login.html';
        }
    }  