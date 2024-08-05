document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const postId = event.target.getAttribute('data-post-id');
      console.log('Button is working')
      try {
        const response = await fetch(`/api/items/like/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          alert('Post added to favorites');
        } else {
          alert('Failed to add post to favorites');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add post to favorites');
      }
    });
  });
});




