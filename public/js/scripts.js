/*document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      alert(`Username: ${username}\nPassword: ${password}`);
    });
  });
  */

  // js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-gallery img');
  let currentImageIndex = 0;

  function showNextImage() {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
  }

  images[currentImageIndex].classList.add('active');
  setInterval(showNextImage, 3000); // Change image every 3 seconds
});
