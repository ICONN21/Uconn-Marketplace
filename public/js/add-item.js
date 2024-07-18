async function newFormHandler(event) {
  event.preventDefault();
  const image = document.querySelector('#item_image').value;
  const title = document.querySelector('#item_title').value;
  const description = document.querySelector('#item_description').value;

  // ? Send fetch request to add a new item
  const response = await fetch(`/api/item`, {
    method: 'POST',
    body: JSON.stringify({
      image,
      title,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if the item is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add item');
  }
}

document
  .querySelector('.new-item-form')
  .addEventListener('submit', newFormHandler);
