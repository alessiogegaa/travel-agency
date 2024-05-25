document.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.getElementById('homeLink');
    const bookingsLink = document.getElementById('bookingsLink');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        homeLink.style.display = 'inline-block';
        bookingsLink.style.display = 'inline-block';
        logoutLink.style.display = 'inline-block';
        loginLink.style.display = 'none';
    } else {
        homeLink.style.display = 'inline-block';
        bookingsLink.style.display = 'none';
        loginLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
        bookingsLink.addEventListener('click', preventIfNotLoggedIn);
    }
});
function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', function() {

  const currentYear = new Date().getFullYear();

  document.getElementById('currentYear').textContent = currentYear;
});
document.addEventListener('alpine:init', () => {
    Alpine.store('accordion', {
      tab: 0
    });
    
    Alpine.data('accordion', (idx) => ({
      init() {
        this.idx = idx;
      },
      idx: -1,
      handleClick() {
        this.$store.accordion.tab = this.$store.accordion.tab === this.idx ? 0 : this.idx;
      },
      handleRotate() {
        return this.$store.accordion.tab === this.idx ? 'rotate-180' : '';
      },
      handleToggle() {
        return this.$store.accordion.tab === this.idx ? `max-height: ${this.$refs.tab.scrollHeight}px` : '';
      }
    }));
  })