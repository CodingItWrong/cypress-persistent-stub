const container = document.getElementById('message');

axios
  .get('https://sandboxapi.codingitwrong.com/posts')
  .then(() => {
    container.innerHTML = 'Success';
  })
  .catch(() => {
    container.innerHTML = 'Failure';
  });
