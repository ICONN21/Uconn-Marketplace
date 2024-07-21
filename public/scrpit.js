document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.like-btn').forEach(button => {
      button.addEventListener('click', async (event) => {
        const postId = event.target.getAttribute('data-id');
        try {
          const response = await fetch(`/items/like/${postId}`, {
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
  



