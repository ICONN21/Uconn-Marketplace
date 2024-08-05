const logout = async () => {
  try {
      const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
          document.location.replace('/login'); // Redirect to login page instead of home
      } else {
          // Possible to enhance by parsing and displaying error message from server
          alert('Failed to log out. Please try again.');
      }
  } catch (error) {
      // Catch and handle errors related to the fetch operation
      console.error('Logout failed:', error);
      alert('Failed to log out due to a network error.');
  }
};

document.querySelector('#sign-out').addEventListener('click', logout);
