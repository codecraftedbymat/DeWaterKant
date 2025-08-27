 const images = document.querySelectorAll('.background img');
    const randomIndex = Math.floor(Math.random() * images.length);
    images[randomIndex].style.display = 'block';
  