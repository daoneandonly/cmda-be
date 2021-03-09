const deleteButton = document.querySelector('.button.delete');

deleteButton.addEventListener('click', () => {
  fetch(window.location.href, {
    method: 'delete'
  })
    .then(res => {
      if (res.ok) {
        console.log('User successfully deleted!')
        window.location.href = "/profile";
      }
    })
})