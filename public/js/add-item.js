async function newFormHandler(event) {
  event.preventDefault();
  const image = document.querySelector('#item_image').value.trim();
  const title = document.querySelector('#item_title').value.trim();
  const description = document.querySelector('#item_description').value.trim();

  if (title && description) {
    const response = await fetch('/api/items', {  // Ensure this matches the POST route in your server
      method: 'POST',
      body: JSON.stringify({
        item_image: image,
        item_title: title,
        item_description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/browse'); // Redirect to the browse page if successful
    } else {
      const errorData = await response.json();
      alert(`Failed to add item: ${errorData.message}`);
    }
  } else {
    alert('Please fill in all fields');
  }
}

document.querySelector('.new-item-form').addEventListener('submit', newFormHandler);
