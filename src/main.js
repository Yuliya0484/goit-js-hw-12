import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const loaderEl = document.querySelector('.loader');
let lightbox;

formEl.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  clearGallery();
  loaderEl.style.display = 'block';

  try {
    const images = await fetchImages(query);

    loaderEl.style.display = 'none';
    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(images);

      // Ініціалізуємо або оновлюємо SimpleLightbox
      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a');
      }
    }
  } catch (error) {
    loaderEl.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});
// let lightbox = new SimpleLightbox('.gallery a');

// const gallery = document.querySelector('.gallery');
// gallery.insertAdjacentHTML(
//   'beforeend',
//   `<a href="large-image3.jpg"><img src="small-image3.jpg" alt="Image 3"></a>`
// );

// lightbox.refresh();
