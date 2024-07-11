document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
  
    loginBtn.addEventListener('click', function() {
      loginModal.style.display = 'block';
    });
  
    closeBtn.addEventListener('click', function() {
      loginModal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == loginModal) {
        loginModal.style.display = 'none';
      }
    });
  
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      alert(`Username: ${username}\nPassword: ${password}`);
      loginModal.style.display = 'none';
    });
  });
  